import streamifier from "streamifier";
import productModel from "../model/productModel.js";
import cloudinary from "../config/cloudinary.js";

export const productAdd = async (req, res) => {
  try {  
    const { productName, productPrice } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ error: "Cloudinary upload failed" });
        }

        const product = await productModel.create({
          productName,
          productPrice,
          imageUrl: result.secure_url,
          createdBy: req.user._id,
        });

        res.status(201).json({ message: "Product added successfully", product });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ error: "Server error" });
  }
};


export const productGet = async (req, res) => {
    try {
        const products = await productModel.find({ user: req.user_id });

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.json({
            message: "Products fetched successfully",
            user: req.user_id,
            products,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


