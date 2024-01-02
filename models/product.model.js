import {model, Schema } from "mongoose";

const courseSchmea = new Schema(
  {
    title: {
      type: String,
      require: [true, "title is required"],
      minLength: [2, "Title must be atleast 2 characters"],
      maxLength: [30, "Title should be less than 30 characters"],
      trim: true,
    },
    price: {
      type: Number,
      require: [true, "Price is required"],
      default: 0,
    },
    category: {
      type: String,
      require: [true, "Category is required"],
      trim: true,
    },
    description: {
      type: String,
      require: [true, "Description is required"],
      minLength: [2, "Title must be atleast 2 characters"],
      maxLength: [30, "Title should be less than 30 characters"],
      trim: true,
    },
    image: {
        type: String,
        require: [true, 'image is required'],
    }
  },
  {
    timestamps: true,
  }
);

const Product= model("Product", courseSchmea);

export default Product;