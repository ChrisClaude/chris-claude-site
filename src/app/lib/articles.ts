import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { sortByDate } from '@/utils/index'
import { ArticleContent } from '@/AppTypes'

const files = fs.readdirSync(path.join('data/articles'))

export const getArticles = (): ArticleContent[] => {
  const articles = files.map((filename) => {
    const slug = filename.replace('.md', '')

    const markdownWithMeta = fs.readFileSync(
      path.join('data/articles', filename),
      'utf-8'
    )

    const { data: frontmatter } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter,
    }
  })

  return articles.sort(sortByDate)
};

export const getArticleById = (id: string): ArticleContent | undefined => {
  const currentFileName = files.find((filename) => {
    const slug = filename.replace('.md', '')
    return slug.toLocaleLowerCase() === id.toLocaleLowerCase()
  });

  if (currentFileName === undefined)
  {
    return undefined;
  }
  const slug = currentFileName.replace('.md', '');

  const markdownWithMeta = fs.readFileSync(
    path.join('data/articles', currentFileName),
    'utf-8'
  )

  const { data: frontmatter } = matter(markdownWithMeta)

  return {
    slug,
    frontmatter,
  }
}