import React from 'react'
import { PackagePlus } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-red-50 p-4'>
   <div className="bg-white rounded-2xl shadow-lg overflow-hidden  border border-fuchsia-100 text-center p-12">
          <div className="mx-auto w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mb-6">
            <PackagePlus className="h-10 w-10 text-rose-500" />
          </div>
          <h2 className="text-4xl font-semibold text-gray-800 mb-3">
             404  
          </h2>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            Not found
          </h3>
          <p className="text-gray-500 mb-6">
            The page you are looking for does not exist.
          </p>
          
        </div>
    </div>
  )
}
