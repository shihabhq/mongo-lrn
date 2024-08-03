import mongoose, { mongo } from "mongoose";

const uri = "mongodb://127.0.0.1:27017/Dev-shop";

mongoose.connect(uri);

//creating schema

const productsSchema = new mongoose.Schema({
  name: String,
  company: String,
  price: Number,
  colors: [String],
  image: String,
  category: String,
  isFeatured: Boolean,
});

//create a model
const Product = new mongoose.model("Product", productsSchema); //Mongoose will convert the model name "Product" to the collection name "products". It does this by making the model name lowercase and plural.

const dataToInsert = {
  name: "Bontel s1",
  company: "646ufjhudfhusryghuyghujhfg8e",
  price: 2155,
  colors: ["00000"],
  image: "/images/bontel-s1",
  category: "64iuxhfugiydruhbvhjrhdj887",
  isFeatured: true,
};

const main = async () => {
  try {
    await Product.insertMany(dataToInsert)
    await Product.updateOne({price:{$gt:2000}},{price:1000}) //or findOneAndUpdate()
    const data = await Product.find({ price: { $eq: 1000 } });
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.connection.close();
  }
};
main();
