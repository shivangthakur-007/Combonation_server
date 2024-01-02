import Product from "../models/product.model.js";
import appError from "../utils/error.utils.js";

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.find({});
    res.status(200).json({
      success: true,
      message: "All Courses",
      product,
    });
  } catch (e) {
    return next(new appError(e.message, 400));
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { title, price, category, description, image } = req.body;

    if (!title || !price) {
      return next(new appError("All fields are required", 500));
    }

    const product = await Product.create({
      title,
      price,
      category,
      description,
      image,
    });

    if (!product) {
      return next(new appError("could not be created, please try again", 500));
    }
    await product.save();
    res.status(200).json({
      success: true,
      message: "product created successfully",
      product,
    });
  } catch (e) {
    return next(new appError(e.message, 500));
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        runValidators: true,
      }
    );
    if (!product) {
      return next(new appError("product with given id is not exist", 500));
    }
    res.status(200).json({
      success: true,
      message: "product update successfully",
      product,
    });
  } catch (e) {
    return next(new appError(e.message, 500));
  }
};

const removeProduct = async (req, res, next) => {
  try {
    const {id}= req.params;
    const product= Product.findById(id);

    if(!product){
        return next(new appError('Product with given id does not exist', 500))
    }
    await Product.findByIdAndDelete();
    res.status(200).json({
        success: true,
        message: 'removed successfully',
        Product
    })
  } catch (e) {
    return next(new appError(e.message, 500))
  }
};

export { getProduct, createProduct, updateProduct, removeProduct };
