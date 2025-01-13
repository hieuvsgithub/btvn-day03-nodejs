import { Error } from "mongoose";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

const getAllProduct = async (req, res) => {
  try {
    const data = await Product.find().populate("categoryId", "title");
    if (!data || !data.length) {
      return res.status(404).send({ message: "Not found" });
    }
    return res.status(200).send({ message: "Get successfully", data });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Error!", error: error.message || "Error!" });
  }
};
const getByIdProduct = async (req, res, next) => {
  try {
    const data = await Product.findById(req.params.id).populate("categoryId");
    if (!data) {
      return res.status(404).send({ message: "Not found" });
    }
    return res.status(200).send({ message: "Get successfully", data });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ message: "Error!", error: error.message || "Error!" });
    next();
  }
};
const createProduct = async (req, res) => {
  try {
    const { title, price, description, categoryId } = req.body;
    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
      categoryId = "6783838c6975badc60e3ae0f";
    } else {
      const category = await Category.findById(categoryId);
      if (!category) {
        return next(new Error("Category not found"));
      }
    }
    const newProduct = await Product.create({
      title,
      price,
      description,
      categoryId,
    });

    await Category.updateOne(
      { _id: categoryId },
      { $push: { products: newProduct._id } }
    );
    return res.status(201).json(newProduct);
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Error!", error: error.message || "Error!" });
  }
};
const updateByIdProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, price, description, categoryId } = req.body;
    const category = await Category.findById(categoryId);
    if (!category) {
      return next(new Error("category not found"));
    }

    const productUpdate = Product.findByIdAndUpdate(
      id,
      {
        title,
        price,
        description,
        categoryId,
      },
      { new: true, timestamps: true }
    );

    if (productUpdate.categoryId.toString() !== categoryId) {
      await Category.updateOne(
        { _id: productUpdate.categoryId },
        { $pull: { products: id } }
      );
      await Category.updateOne(
        { _id: categoryId },
        { $push: { products: id } }
      );
    }
    return res.status(201).json(productUpdate);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ message: "Error!", error: error.message || "Error!" });
  }
};
const removeByIdProduct = async (req, res) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).send({ message: "Not found" });
    }
    return res.status(200).send({ message: "Delete successfully", data });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ message: "Error!", error: error.message || "Error!" });
  }
};

const deleteSoftProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, {
      deletedAt: new Date(),
      isHidden: true,
    });
    if (!product) {
      return res.status(400).json({
        message: "Failed!",
      });
    }
    return res.status(200).json({
      message: "update  successfully",
      product,
    });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Error!", error: error.message || "Error!" });
  }
};

export {
  getAllProduct,
  getByIdProduct,
  createProduct,
  updateByIdProduct,
  removeByIdProduct,
  deleteSoftProduct,
};
