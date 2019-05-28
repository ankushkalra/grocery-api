const express = require("express");
const products = require("./products");
const cors = require("cors");
const _ = require("lodash");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get("/products", (req, res) => {
  res.send(products);
});

app.post("/upvote", (req, res) => {
  const product_id = req.body.product_id;
  const product = findProduct(product_id);

  if (!product) {
    return productNotFound(res);
  }

  product.upvotes++;
  return res.status(200).send(product);
});

app.post("/downvote", (req, res) => {
  const product_id = req.body.product_id;
  const product = findProduct(product_id);

  if (!product) {
    return productNotFound(res);
  }

  product.downvotes++;
  return res.status(200).send(product);
});

const productNotFound = res => {
  return res.status(404).send("Product with the given id not found");
};

const findProduct = product_id => {
  if (!product_id) {
    return null;
  }
  const product = _.find(products, function(product) {
    return product.product_id === product_id;
  });
  return product || null;
};

app.listen(PORT, () => {
  console.log(`Started listening on ${PORT}`);
});
