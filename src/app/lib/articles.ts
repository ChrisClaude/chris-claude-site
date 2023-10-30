import { ArticleContent, PaginatedArticles } from '@/AppTypes';
import { APP_ENV, ARTICLES_PER_PAGE, S3_Bucket, S3_MAX_KEYS, S3_REGION } from '@/config';
import { sortByDate } from '@/utils/index';
import {
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
  _Object,
} from '@aws-sdk/client-s3';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const localDataPath = 'data/articles';

export const getPaginatedArticles = async (page: number, maxKeys : number | null = null): Promise<PaginatedArticles> => {
  const articles = await getArticles(maxKeys);

  console.log(articles);


  const categories = articles.map(article => article.frontmatter.category);
  const uniqueCategories = [...new Set(categories)];

  const numPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const pageIndex = page - 1;
  const orderedArticles = articles.slice(
    pageIndex * ARTICLES_PER_PAGE,
    (pageIndex + 1) * ARTICLES_PER_PAGE
  );

  return {
    articles: orderedArticles,
    numPages,
    currentPage: page,
    categories: uniqueCategories,
  };
};

export const getArticles = async (maxKeys : number | null = null): Promise<ArticleContent[]> => {
  if (APP_ENV === 'production') {
    const articles = await getArticlesFromS3(maxKeys);

    return articles.sort(sortByDate);
  }

  const articles = getArticlesFromFileSystem();

  return articles.sort(sortByDate);
};

export const getArticleById = async (
  id: string
): Promise<ArticleContent | undefined> => {
  if (APP_ENV === 'production') {
    const articleContentFromS3 = await getArticleContentFromS3(id);

    return articleContentFromS3;
  }

  const articleContentFromFileSystem = getArticleContentFromFileSystem(id);

  return articleContentFromFileSystem;
};

//#region AWS S3 Methods
const getClient = (): S3Client =>
  new S3Client({
    region: S3_REGION as string,
  });

const listObjectsFromS3Bucket = async (maxKeys : number | null = null): Promise<string[]> => {
  const client = getClient();
  console.log("MAX keys: " + maxKeys);

  const command = new ListObjectsV2Command({
    Bucket: S3_Bucket,
    MaxKeys: maxKeys ?? parseInt(S3_MAX_KEYS as string),
  });

  try {
    let isTruncated = true;
    let bucketContent: undefined | _Object[] = undefined;

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
        await client.send(command);

      command.input.ContinuationToken = NextContinuationToken;
      isTruncated = IsTruncated ?? false;

      if (!isTruncated) {
        bucketContent = Contents;
      }
    }

    return bucketContent !== undefined
      ? bucketContent?.map(c => c.Key as string)
      : [];
  } catch (err) {
    console.error(err);

    return [];
  }
};

const getArticleFromS3Bucket = async (key: string): Promise<string> => {
  const client = getClient();
  const command = new GetObjectCommand({
    Bucket: S3_Bucket,
    Key: key,
  });

  try {
    const response = await client.send(command);
    const str = await response.Body?.transformToString();

    return str ?? '';
  } catch (err) {
    console.error(err);

    return '';
  }
};

const getArticleContentFromS3 = async (id: string): Promise<ArticleContent> => {
  let key = id + '.md';
  const contentString = await getArticleFromS3Bucket(key);
  const { data: frontmatter, content } = matter(contentString);

  return {
    slug: id,
    frontmatter,
    content,
  };
};

const getArticlesFromS3 = async (maxKeys : number | null = null): Promise<ArticleContent[]> => {
  const articlesKeys = await listObjectsFromS3Bucket(maxKeys);
  const articles: ArticleContent[] = [];

  for (var key of articlesKeys) {
    const content = await getArticleFromS3Bucket(key);
    const { data: frontmatter } = matter(content);

    articles.push({
      slug: key.replace('.md', ''),
      frontmatter: frontmatter,
      content: undefined,
    });
  }

  return articles;
};
//#endregion

//#region File system Methods
const getArticleContentFromFileSystem = (
  id: string
): ArticleContent | undefined => {
  const files = fs.readdirSync(path.join(localDataPath));

  const currentFileName = files.find(filename => {
    const slug = filename.replace('.md', '');
    return slug.toLocaleLowerCase() === id.toLocaleLowerCase();
  });

  if (currentFileName === undefined) {
    return undefined;
  }

  const slug = currentFileName.replace('.md', '');
  const markdownWithMeta = fs.readFileSync(
    path.join(localDataPath, currentFileName),
    'utf-8'
  );
  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    slug,
    frontmatter,
    content,
  };
};

const getArticlesFromFileSystem = (): ArticleContent[] => {
  const files = fs.readdirSync(path.join(localDataPath));
  const articles = files.map(filename => {
    const slug = filename.replace('.md', '');

    const markdownWithMeta = fs.readFileSync(
      path.join('data/articles', filename),
      'utf-8'
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
      content: undefined,
    };
  });

  return articles;
};
//#endregion
