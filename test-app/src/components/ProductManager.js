import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products khi component mount
  useEffect(() => {
    axios
      .get('http://localhost:3600/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Xử lý form submission (thêm hoặc cập nhật sản phẩm)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        // Cập nhật sản phẩm
        const response = await axios.put(
          `http://localhost:3600/products/${editingProduct.id}`,
          newProduct
        );
        setProducts(
          products.map((product) =>
            product.id === editingProduct.id ? response.data : product
          )
        );
      } else {
        // Thêm sản phẩm mới
        const response = await axios.post('http://localhost:3600/products', newProduct);
        setProducts([...products, response.data]);
      }

      // Reset trạng thái form
      setEditingProduct(null);
      setNewProduct({ name: '', price: '' });
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  // Xóa sản phẩm
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3600/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Đặt sản phẩm đang chỉnh sửa
  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct({ name: product.name, price: product.price });
  };

  // Hủy trạng thái chỉnh sửa
  const cancelEdit = () => {
    setEditingProduct(null);
    setNewProduct({ name: '', price: '' });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Product Manager</h1>

      {/* Form Thêm/Cập Nhật */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          required
        />
        <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
        {editingProduct && (
          <button type="button" onClick={cancelEdit} style={{ marginLeft: '10px' }}>
            Cancel Edit
          </button>
        )}
      </form>

      {/* Danh sách sản phẩm */}
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManager;
