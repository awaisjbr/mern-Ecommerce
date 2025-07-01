import React, { useState } from 'react';
import { useCartContext } from '../context/useCartContext';
import Loading from '../components/Loading';

const sizesArray = ["S","M","L","XL","2XL","3XL","4XL"]

const AddProduct = () => {
    const {addNewProduct, addCategory, loading, categories} = useCartContext();
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      price: '',
      image: null,      
      subImages: [],
      category: '',
      sizes: [],
      isFeatured: false,
    });
    // console.log(formData)
    const handleTextChange = (e) => {
      const { name, value, type, checked } = e.target;

      if (name === 'sizes') {
        setFormData(prev => ({
          ...prev,
          sizes: checked ? [...prev.sizes, value] : prev.sizes.filter(size => size !== value),
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value,
        }));
      }
    };

    const handleMainImage = (e) => {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, image: file }));
    };

    const handleSubImages = (e) => {
      const files = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, subImages: files }));
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

      if (formData.image) {
        dataForm.append("mainImage", formData.image);
      }

      formData.subImages.forEach((file) => {
        dataForm.append("subImages", file);
      });

      await addNewProduct(dataForm);
    };

    if(loading) return <Loading />
    
      return (
        <form onSubmit={handleSubmit} className="space-y-4 pt-32 flex flex-col max-w-lg mx-auto">
          <input className='border outline-none p-2 rounded-lg' type="text" name="name" placeholder="Name" onChange={handleTextChange} required autoComplete='off'/>
          <textarea className='border outline-none p-2 rounded-lg' name="description" placeholder="Description" onChange={handleTextChange} required />
          <input className='border outline-none p-2 rounded-lg' type="number" name="price" placeholder="Price" onChange={handleTextChange} required min="1" />
          <input className='border outline-none p-2 rounded-lg' type="file" accept="image/*" onChange={handleMainImage} required />
          <label className='border outline-none p-2 rounded-lg' ><input type="file" accept="image/*" multiple onChange={handleSubImages} /> <span className='text-red-600'>*</span>Select Max 4 Images</label>
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


