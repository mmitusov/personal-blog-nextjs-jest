import React from 'react'

const Banner = () => {
  return (
    <div className='flex justify-between items-center px-10 py-5 mb-10 flex-col font-bold lg:flex-row lg:space-x-5'>
      <div>
        <h1 className="text-7xl">Max's Daily Blog</h1> 
        <h2 className="mt-5 md:mt-0">
          Welcome to {" "} 
            <span className="underline decoration-4 decoration-[#F7AB0A]">
              Every Developers 
            </span>
          {" "} favourite blog in the DevoSphere 
        </h2>
      </div>

      <p className="mt-5 md:mt-2 text-gray-400 max-w-sm">
        New product features | The latest in technology | Debugging nightmares & More!
      </p>
    </div>
  )
}

export default Banner