import React, { useState } from 'react';
import { useCartContext } from '../context/useCartContext';
import Loading from '../components/Loading';
import upload_area from "../assets/upload_area.png"

const sizesArray = ["S","M","L","XL","2XL","3XL","4XL"]

const AddProduct = () => {
    const {addNewProduct, addCategory, loading, categories} = useCartContext();
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      price: '',      
      category: '',
      sizes: [],
      isFeatured: false,
    });
    const [mainImage, setMainImage] = useState(null);
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);

    const handleTextChange = (e) => {
      const { name, value, type, checked } = e.target;

      if (name === 'sizes') {
        setFormData(prev => ({
          ...prev,
          sizes: checked ? [...prev.sizes, value] : prev.sizes.filter(size => size !== value),
        }));
      }else if(name === "category"){
        setFormData(prev => ({
        ...prev,
        category: e.target.value  // this should be the category _id
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value,
        }));
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const dataForm = new FormData();

      dataForm.append("name", formData.name);
      dataForm.append("description", formData.description);
      dataForm.append("price", formData.price);
      dataForm.append("category", formData.category);
      dataForm.append("isFeatured", formData.isFeatured);
      dataForm.append("sizes", JSON.stringify(formData.sizes));
      image1 && dataForm.append("image1", image1);
      image2 && dataForm.append("image2", image2);
      image3 && dataForm.append("image3", image3);
      image4 && dataForm.append("image4", image4);
      mainImage && dataForm.append("mainImage", mainImage)
      await addNewProduct(dataForm);
      setImage1(null);
      setImage2(null);
      setImage3(null);
      setImage4(null)
      setFormData({sizes:[],category:""});
    };

    if(loading) return <Loading />
    
      return (
        <form onSubmit={handleSubmit} className="space-y-4 pt-32 flex flex-col max-w-lg mx-auto">
          <input className='border outline-none p-2 rounded-lg' type="text" name="name" placeholder="Name" onChange={handleTextChange} required autoComplete='off'/>
          <textarea className='border outline-none p-2 rounded-lg' name="description" placeholder="Description" onChange={handleTextChange} required />
          <input className='border outline-none p-2 rounded-lg' type="number" name="price" placeholder="Price" onChange={handleTextChange} required min="1" />
          <input className='border outline-none p-2 rounded-lg' type="file" accept="image/*" onChange={(e) => setMainImage(e.target.files[0])} required />
          <div className='flex items-center border outline-none p-2 rounded-lg justify-evenly'>
            <label htmlFor="image1"><img className='w-20' src={!image1 ? upload_area : URL.createObjectURL(image1)} alt="" /><input type="file" id='image1' onChange={(e) => setImage1(e.target.files[0])} className='hidden' /></label>
            <label htmlFor="image2"><img className='w-20' src={!image2 ? upload_area : URL.createObjectURL(image2)} alt="" /><input type="file" id='image2' onChange={(e) => setImage2(e.target.files[0])} className='hidden' /></label>
            <label htmlFor="image3"><img className='w-20' src={!image3 ? upload_area : URL.createObjectURL(image3)} alt="" /><input type="file" id='image3' onChange={(e) => setImage3(e.target.files[0])} className='hidden' /></label>
            <label htmlFor="image4"><img className='w-20' src={!image4 ? upload_area : URL.createObjectURL(image4)} alt="" /><input type="file" id='image4' onChange={(e) => setImage4(e.target.files[0])} className='hidden' /></label>
          </div>
          <input className='border outline-none p-2 rounded-lg' type="text" name="subCategory" placeholder="Sub-category" onChange={handleTextChange} required />
          <div className='flex items-center gap-7 border outline-none p-2 rounded-lg'>
          {sizesArray.map((size) => (
            <label key={size} className='flex items-center gap-1'><input type="checkbox" name='sizes' value={size} checked={formData.sizes.includes(size)} onChange={handleTextChange} />{size}</label>
          ))}</div>
          <select className='border outline-none p-2 rounded-lg' name="category" value={formData.category} onChange={handleTextChange} required  >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          <label className='border outline-none p-2 rounded-lg'><input type="checkbox" name="bestSeller" onChange={handleTextChange} />Best Seller</label>
          <button type="submit" className='bg-green-800 w-fit mx-auto px-3 py-2 rounded-md text-white font-semibold active:bg-green-600'>Add Product</button>
        </form>
      );
}

export default AddProduct

//  const [formData, setFormData] = useState({
//       name: "",
//       image: ""
//     })
    
//       const handleTextChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({...prev, [name]:value}))
//       };
    
//       const handleMainImage = async (e) => {
//         const file = e.target.files[0];
//         setFormData(prev => ({ ...prev, image:  file}));
//       };
      
//       const handleSubmit = async (e) => {
//         e.preventDefault();
//         await addCategory(formData)
//       };

//       if(loading) return <Loading />
    
//       return (
//         <form onSubmit={handleSubmit} className="space-y-4 pt-32 flex flex-col max-w-lg mx-auto">
//           <input type="text" name="name" placeholder="Name" onChange={handleTextChange} required />
//           <input type="file" accept="image/*" onChange={handleMainImage} required />
//           <button type="submit">Add Product</button>
//         </form>
//       );


