import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='flex items-center px-10 py-5 justify-between space-x-2 font-bold'>
      <div className='flex items-center space-x-2'>
        <Link href="/">
          <img 
            className='w-10 h-10 rounded-full'
            src="https://media.licdn.com/dms/image/C4D03AQEJKHnUCzaTzQ/profile-displayphoto-shrink_800_800/0/1627924003185?e=2147483647&v=beta&t=krHq5etfeQaUoc1rIBA2ejYoJP5T80_6R_Eq-bftz7Y" 
            alt="logo"
          />
        </Link>
        <h1>Max's Blog</h1>
      </div>

      <div>
        <h1 className='border rounded-md p-2 bg-gray-800 text-[#F7AB0A] sm:text-base'>
          Stay tuned for more!
        </h1>
      </div>
    </header>
  )
}

export default Header