import Link from 'next/link'

const Pagination = ({ currentPage, numPages }: { currentPage: number, numPages: number }) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = `/blog?page=${currentPage - 1}#articles`
  const nextPage = `/blog?page=${currentPage + 1}#articles`

  if (numPages === 1) return <></>

  return (
    <div className='mt-6'>
      <ul className='flex pl-0 list-none my-2 justify-center lg:justify-start'>
        {!isFirst && (
          <Link href={prevPage}>
            <li className='relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer rounded-lg'>
              Previous
            </li>
          </Link>
        )}
        {Array.from({ length: numPages }, (_, i) => (
          <Link href={`/blog?page=${i + 1}#articles`} key={`page-${i}`}>
            <li className={`relative w-10 h-10 flex items-center justify-center border border-transparent transition-colors duration-150 py-2 px-3 leading-tight bg-white text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer rounded-lg ${i + 1 == currentPage ? 'bg-selected-page' : ''}`}>
              {i + 1}
            </li>
          </Link>
        ))}

        {!isLast && (
          <Link href={nextPage}>
            <li className='relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer rounded-lg'>
              Next
            </li>
          </Link>
        )}
      </ul>
    </div>
  )
}

export default Pagination;
