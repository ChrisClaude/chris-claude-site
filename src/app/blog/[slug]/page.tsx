import React from 'react'

const Page = ({ params }: { params: { slug: string } }) => {
  return (
    <div>My Post: {params.slug}</div>
  )
}

export default Page