require("dotenv").config();

const connectDB = require("./config/db");
const Product = require("./models/product");
const productsData = require("./data/product.json");

const seedProducts = async () => {
  try {
    await connectDB();

    const products = [];

    // New Arrivals
    productsData.newArrivals.forEach((product) => {
      products.push({
        productId: String(product.id),
        title: product.title,
        price: product.price,
        oldPrice: product.oldPrice,
        rating: product.rating,
        imageUrl: product.imageUrl,
        section: "newArrivals",
      });
    });

    // Top Selling
    productsData.topSelling.forEach((product) => {
      products.push({
        productId: String(product.id),
        title: product.title,
        price: product.price,
        oldPrice: product.oldPrice,
        rating: product.rating,
        imageUrl: product.imageUrl,
        section: "topSelling",
      });
    });

    // You Might Also Like
    productsData.youMightAlsoLike.forEach((product) => {
      products.push({
        productId: String(product.id),
        title: product.title,
        price: product.price,
        oldPrice: product.oldPrice,
        rating: product.rating,
        imageUrl: product.imageUrl,
        section: "youMightAlsoLike",
      });
    });

    // Categories
    const categories = ["casual", "formal", "party", "gym"];

    categories.forEach((category) => {
      productsData[category].forEach((product) => {
        products.push({
          productId: String(product.id),
          title: product.title,
          price: product.price,
          oldPrice: product.originalPrice,
          discount: product.discount,
          rating: product.rating,
          imageUrl: product.imageUrl,
          description: product.description,
          category: product.category,
          section: "category",
        });
      });
    });

    // Existing products remove
    await Product.deleteMany({});

    // Products MongoDB mein insert
    await Product.insertMany(products);

    console.log("--------------------------------");
    console.log("PRODUCT SEEDING SUCCESSFUL");
    console.log(`TOTAL PRODUCTS: ${products.length}`);
    console.log("--------------------------------");

    process.exit(0);
  } catch (error) {
    console.log("SEED ERROR:", error.message);
    process.exit(1);
  }
};

seedProducts();