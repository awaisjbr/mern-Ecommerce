import React from 'react';
import {Loader} from "lucide-react"

const Loading = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center'>
        <Loader color='green' strokeWidth={2} className='animate-spin size-16'/>
    </div>
  )
}

export default Loading
