import Category from "../models/Category.js";

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    console.log(categories);
    if (!categories || !categories.length) {
      return res.status(400).send({ message: "not found categories" });
    }
    return res.status(200).send({ message: "Get successfully", categories });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Error!", error: error.message || "Error!" });
  }
};
const getByIdCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send({ message: "Not found" });
    }
    return res.status(200).send({ message: "Get successfully", category });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ message: "Error!", error: error.message || "Error!" });
  }
};
const createCategory = async (req, res) => {
  try {
    const data = await Category.create(req.body);
    if (!data) {
      return res.status(400).json({
        message: "Failed!",
      });
    }
    return res.status(200).json({
      message: "create Category successfully",
      data,
    });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Error!", error: error.message || "Error!" });
  }
};
const updateByIdCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      timestamps: true,
    });
    if (!category) {
      return res.status(400).json({
        message: "Failed!",
      });
    }
    return res.status(200).json({
      message: "update  successfully",
      category,
    });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Error!", error: error.message || "Error!" });
  }
};
const removeByIdCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).send({ message: "Not found" });
    }
    return res.status(200).send({ message: "Delete successfully", category });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Error!", error: error.message || "Error!" });
  }
};

const deleteSoftCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        deletedAt: new Date(),
        isHidden: true,
      },
      { new: true }
    );
    if (!category) {
      return res.status(400).json({
        message: "Failed!",
      });
    }
    return res.status(200).json({
      message: "update  successfully",
      category,
    });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Error!", error: error.message || "Error!" });
  }
};

export {
  getAllCategory,
  getByIdCategory,
  createCategory,
  updateByIdCategory,
  removeByIdCategory,
  deleteSoftCategory,
};
