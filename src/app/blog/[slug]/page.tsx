import React from 'react'

const Page = ({ params }: { params: { slug: string } }) => {

  return (
    <div>My Post: {params.slug}</div>
  )
}

/*export async function generateStaticParams() {
  const files = fs.readdirSync(path.join('data/articles'));

  const numPages = Math.ceil(files.length / ARTICLES_PER_PAGE);

  let paths = [];

  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { pageIndex: i.toString() },
    });
  }

  return {
    paths,
    fallback: false,
  };
}*/

export default Page