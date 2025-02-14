const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

// Dữ liệu mẫu cho sản phẩm
let products = [
  { id: 1, name: 'Product A', price: 100 },
  { id: 2, name: 'Product B', price: 200 },
];

// ------------------- API cho ProductManager -------------------

app.get('/', (req, res) => {
    res.send('Welcome to the ProductManager API!');
  });  

// Lấy danh sách sản phẩm
app.get('/products', (req, res) => {
  res.status(200).json(products);
});

// Thêm sản phẩm mới
app.post('/products', (req, res) => {
  const { name, price } = req.body;

  if (!name || price == null) {
    return res.status(400).json({ message: 'Name and price are required.' });
  }

  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1, // Tự động tăng ID
    name,
    price,
  };

  products.push(newProduct);
  res.status(201).json({ message: 'Product added successfully', product: newProduct });
});

// Cập nhật sản phẩm
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const productIndex = products.findIndex((product) => product.id === parseInt(id));
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found.' });
  }

  const updatedProduct = { ...products[productIndex], name, price };
  products[productIndex] = updatedProduct;
  res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
});

// Xóa sản phẩm
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;

  const productIndex = products.findIndex((product) => product.id === parseInt(id));
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found.' });
  }

  const deletedProduct = products.splice(productIndex, 1);
  res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct[0] });
});

// ------------------- Khởi chạy server -------------------
app.listen(3600, () => console.log('Server running on http://localhost:3600'));
