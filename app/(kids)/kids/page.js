import React from 'react'
import Kids from './Kids'

export const metadata = {
    title: 'Kids-section',
    description: 'Generated by create next app',
}

const Page = async () => {
  return (
    <div className='flex flex-row w-[100vw] h-[100vh] '>
      <Kids/>
    </div>
  )
}

export default Page
