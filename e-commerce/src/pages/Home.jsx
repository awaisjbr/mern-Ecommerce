import React, { lazy, Suspense, useState } from 'react';
import banner2 from "../assets/banner2.png"
import Product from '../components/Product';
import { useCartContext } from '../context/useCartContext';
import Loading from '../components/Loading';
// import CategoryList from '../components/CategoryList';
// import ProductList from '../components/ProductList';

const CategoryList = lazy(() => import("../components/CategoryList"));
const ProductList = lazy(() => import("../components/ProductList"));


const Home = () => {
  const {products, categories} = useCartContext();
  const [category, setCategory] = useState("All");
  // console.log(category);
  
  // const productIds = [];
 const myCategories =  categories.map((product) => product);
  
  return (
    <div className="pt-28 px-10 relative">
      <div className="p-5 bg-gradient-to-r from-green-900 to-green-500">
        <img src={banner2} className="w-[80%] h-auto mx-auto" alt="banner"/>
      </div>
    <Suspense fallback={<Loading />}>
      {/* Category List   */}
        <CategoryList categorylist={myCategories} category={category} setCategory={setCategory}/>

      {/* Product List */}
      <ProductList productList={products} category={category}/>
    </Suspense>
    </div>
  )
}

export default Home

// style={{backgroundImage: `linear-gradient(to right, ${fromColor}, ${toColor})`}}>
