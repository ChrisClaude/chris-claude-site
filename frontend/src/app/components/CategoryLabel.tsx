import Link from 'next/link';

export default function CategoryLabel({ category }: {category: string}) {
  const colorKey: { [key: string]: any; } =
  {
    JavaScript: 'yellow',
    CSS: 'blue',
    '.NET Core': 'blue',
    Python: 'green',
    PHP: 'purple',
    Ruby: 'red',
  };

  return (
    <div
      className={`px-2 py-1 bg-blue-600 text-gray-100 font-bold rounded`}
    >
      <Link href={`/blog/category/${category?.toLowerCase()}`}>{category}</Link>
    </div>
  );
}
