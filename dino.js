const Product = require("..//./././././product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ updatedAt: 1 })
      .skip(10)
      .limit(3);
    res.status(200).json({ msg: "products fetched !", products });
  } catch (error) {
    res.status(500).json({ msg: "error !", err: error.message });
  }
};
