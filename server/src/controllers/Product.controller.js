import { productModel } from "../models/product.model.js";
import { cloudinary } from "../config/cloudinary.js";
import fs from "fs";
import { categoryModel } from "../models/category.model.js";

const deleteUploadedFiles = (files) => {
  if (!files) return;
  Object.values(files)
    .flat()
    .forEach((file) => {
      if (file?.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await productModel.find({ bestSeller: true });
    if (!featuredProducts) {
      return res
        .status(404)
        .json({ success: false, message: "No featured product found" });
    }
    res.status(200).json({ success: true, featuredProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({}).populate("category","name");

    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addProduct = async (req, res) => {
  const { name, description, price, sizes, category, isFeatured } = req.body;
  try {
    const categoryDoc = await categoryModel.findById(category);
    const parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;

    const mainImage = req.files?.mainImage?.[0]?.path;
    if(!mainImage){
      return res.status(400).json({ success: false, message: "Main image is required." });
    }
    const uploadMainImage = await cloudinary.uploader.upload(mainImage, {
      folder: `e-commerce/${categoryDoc.name}`,
      resource_type: 'image',
    });

   const image1 = req.files.image1 && req.files.image1[0];
   const image2 = req.files.image2 && req.files.image2[0];
   const image3 = req.files.image3 && req.files.image3[0];
   const image4 = req.files.image4 && req.files.image4[0];
   const imageArray = [image1, image2, image3, image4].filter((image) => image);

   const imagesURL = await Promise.all(
    imageArray.map(async (img) => {
      let result = await cloudinary.uploader.upload(img.path, {
        resource_type: "image",
        folder: `e-commerce/${categoryDoc.name}/subImages`
      });
      return result.secure_url;
    })
   )

    const product = new productModel({
      name,
      description,
      price,
      isFeatured,
      sizes: parsedSizes,
      category:categoryDoc._id,
      image: uploadMainImage.secure_url,
      subImages: imagesURL,
    });
    await product.save();
    res.status(201).json({ message: "Product added successfully.",product });
  } catch (error) {
    console.error("Add product error:", error);
    return res.status(500).json({ success: false, message: "Add product controller error", error: error.message });
  }
};
export const addCategory = async (req, res) => {
    const {name} = req.body;
    try {
        const categoryName = name.trim().toLowerCase()
        const categoryExists = await categoryModel.findOne({name: categoryName});
        if(categoryExists){
            return res.status(500).json({success: false, message: "Category already exists"})
        }
        const categoryImage = req.file.path;
        const categoryImageUrl = await cloudinary.uploader.upload(categoryImage, {
            folder: "category",
            resource_type: "auto"
        })
        fs.unlinkSync(categoryImage);

        const productCategory = new categoryModel({
            name: categoryName,
            image: categoryImageUrl.secure_url
        });
        await productCategory.save();
        res.status(201).json({success: true, message: "New Category added", category: productCategory})
    } catch (error) {
      console.log(error)
        return res.status(500).json({ success: false, message: "Add category controller error", error: error.message });
    }finally{
        deleteUploadedFiles({file : req.file})
    }
}

export const listCategory = async (req, res) => {
    try {
    const category = await categoryModel.find({});

    res.status(200).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("deleted image from cloudinary");
      } catch (error) {
        console.log("Error deleting image from cloudinary", error);
      }
    }

    await productModel.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully.." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRecomendedProducts = async (req, res) => {
  try {
    const product = await productModel.aggregate([
      {
        $sample: { size: 3 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          images: 1,
          price: 1,
          category: 1,
          subCategory: 1,
          sizes: 1,
        },
      },
    ]);
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
