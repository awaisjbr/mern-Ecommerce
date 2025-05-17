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
    const parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
    
    const mainImage = req.files.mainImage[0]?.path;
    const uploadMainImage = await cloudinary.uploader.upload(mainImage, {
      folder: `e-commerce/${category}`,
      resource_type: "auto",
    });
    fs.unlinkSync(mainImage);

    const subImages = req.files.subImages?.map((file) => file.path) || [];
    const subImagesArray = [];
    for (const path of subImages) {
      const uploaded = await cloudinary.uploader.upload(path, {
        folder: `e-commerce/${category}/subImages`,
        resource_type: "auto",
      });
      fs.unlinkSync(path);
      subImagesArray.push(uploaded.secure_url);
    }

    const product = new productModel({
      name,
      description,
      price,
      isFeatured,
      sizes: parsedSizes,
      category,
      image: uploadMainImage.secure_url,
      subImages: subImagesArray,
    });
    await product.save();
    res.status(201).json({ message: "Product added successfully.", product });
  } catch (error) {
    console.error("Add product error:", error);
    return res.status(500).json({ success: false, message: "Add product controller error", error: error.message });
  } finally {
    deleteUploadedFiles(req.files); // Ensure temp files are cleaned up on error
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
    if (product.images) {
      const publicId = product.images.split("/").pop().split(".")[0];
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
