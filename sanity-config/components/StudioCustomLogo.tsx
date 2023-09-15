import React from 'react'

const StudioCustomLogo = (props: any) => {
  return (
    <div className='flex items-center space-x2'>
      <img
        className="h-5 rounded-full object-cover bg-white" 
        src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" 
        alt="logo" 
      />
      {props.renderDefault(props)}
    </div>
  )
}

export default StudioCustomLogo