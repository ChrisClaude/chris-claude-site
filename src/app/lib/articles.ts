import { ArticleContent } from '@/AppTypes';
import { APP_ENV, S3_Bucket, S3_MAX_KEYS, S3_REGION } from '@/config';
import { sortByDate } from '@/utils/index';
import {
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
  _Object,
} from "@aws-sdk/client-s3";
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const files = fs.readdirSync(path.join('data/articles'));

export const getArticles = async (): Promise<ArticleContent[]> => {
  if (APP_ENV === 'production') {
    const articlesKeys = await listObjectFromS3Bucket();
    const articles: ArticleContent[] = [];

    for (var key of articlesKeys) {
      const content = await getArticleFromBucket(key);
      const { data: frontmatter } = matter(content);

      articles.push({
        slug: key.replace('.md', ''),
        frontmatter: frontmatter,
        content: undefined,
      });
    }

    return articles;
  }

  const articles = files.map((filename) => {
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

  return articles.sort(sortByDate);
};

export const getArticleById = async (id: string): Promise<ArticleContent | undefined> => {
  if (APP_ENV === 'production') {
    let key = id + '.md';
    const contentString = await getArticleFromBucket(key);

    const { data: frontmatter, content } = matter(contentString);

    console.log(frontmatter);


    return {
      slug: id,
      frontmatter,
      content,
    };
  }

  const currentFileName = files.find((filename) => {
    const slug = filename.replace('.md', '');
    return slug.toLocaleLowerCase() === id.toLocaleLowerCase();
  });

  if (currentFileName === undefined)
  {
    return undefined;
  }
  const slug = currentFileName.replace('.md', '');

  const markdownWithMeta = fs.readFileSync(
    path.join('data/articles', currentFileName),
    'utf-8'
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    slug,
    frontmatter,
    content,
  };
};

const getClient = () : S3Client => new S3Client({
  region: S3_REGION as string,
});

const listObjectFromS3Bucket = async (): Promise<string[]> => {
  const client = getClient();

  const command = new ListObjectsV2Command({
    Bucket: S3_Bucket,
    MaxKeys: parseInt(S3_MAX_KEYS as string),
  });

  try {
    let isTruncated = true;

    let bucketContent: undefined | _Object[] = undefined;

    while (isTruncated) {
      const {
        Contents,
        IsTruncated,
        NextContinuationToken,
      } = await client.send(command);

      command.input.ContinuationToken = NextContinuationToken;
      isTruncated = IsTruncated ?? false;

      if (!isTruncated) {
        bucketContent = Contents;
      }
    }

    return bucketContent !== undefined? bucketContent?.map(c => c.Key as string) : [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

const getArticleFromBucket = async (key: string): Promise<string> => {
  const client = getClient();
  const command = new GetObjectCommand({
    Bucket: S3_Bucket,
    Key: key,
  });

  try {
    const response = await client.send(command);
    const str = await response.Body?.transformToString();
    return str ?? "";
  } catch (err) {
    console.error(err);
    return "";
  }
};