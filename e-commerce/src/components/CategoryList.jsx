import React from 'react'

const CategoryList = ({categorylist, category, setCategory}) => {
    
  return (
    <div className="my-5 lg:my-16 w-[90%] mx-auto">
        <h1 className="font-bigShoulder font-bold text-2xl">Shop Our Top Categories</h1>
        <div className='w-full flex items-center gap-10 overflow-x-scroll my-5 h-72 px-2'>
            {categorylist.map((cat, index) => {
                return <div key={index} onClick={() => setCategory((prev) => prev === cat.name ? "All" : cat.name)} className={`${category === cat.name ? "border-green-600 border-4" : ""} min-h-64 min-w-52 font-poppins font-bold rounded-lg hover:scale-105 capitalize cursor-pointer text-white text-2xl transition-all duration-300 ease-linear flex justify-center pt-8`} style={{background: `url(${cat.image})`, backgroundSize: "cover", backgroundPosition: "center"}}>
                    {cat.name}
                </div>
            })}
        </div>
    </div>
  )
}

export default CategoryList

