import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/foods';

function FoodManagement() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    foodId: '',
    name: '',
    category: '',
    cuisine: '',
    price: '',
    quantity: '',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchFoods = async () => {
    try {
      const res = await axios.get(`${API_URL}?search=${search}`);
      setFoods(res.data);
    } catch (err) {
      console.error('Lỗi tải dữ liệu:', err);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [search]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setFormData({ foodId: '', name: '', category: '', cuisine: '', price: '', quantity: '', description: '' });
      setEditingId(null);
      fetchFoods();
    } catch (err) {
      alert(err.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  const handleEdit = (food) => {
    setEditingId(food._id);
    setFormData(food);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa món ăn này?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchFoods();
      } catch (err) {
        alert('Lỗi xóa món ăn');
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Quản Lý Thực Đơn Món Ăn - 236412 LeHoangTinh</h2>
      
      {/* Ô tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm kiếm theo tên, danh mục, ẩm thực..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
      />

      {/* Form Thêm/Sửa */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr' }}>
        <input name="foodId" placeholder="Mã món ăn (foodId)" value={formData.foodId} onChange={handleChange} required disabled={!!editingId} />
        <input name="name" placeholder="Tên món ăn" value={formData.name} onChange={handleChange} required />
        <input name="category" placeholder="Danh mục (Món chính, Tráng miệng...)" value={formData.category} onChange={handleChange} required />
        <input name="cuisine" placeholder="Ẩm thực (Việt Nam, Ý...)" value={formData.cuisine} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Giá tiền" value={formData.price} onChange={handleChange} required />
        <input name="quantity" type="number" placeholder="Số lượng" value={formData.quantity} onChange={handleChange} required />
        <button type="submit" style={{ gridColumn: 'span 2', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}>
          {editingId ? 'Cập Nhật Món Ăn' : 'Thêm Món Ăn Mới'}
        </button>
      </form>

      {/* Bảng danh sách */}
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>Mã Món</th>
            <th>Tên Món</th>
            <th>Danh Mục</th>
            <th>Ẩm Thực</th>
            <th>Giá</th>
            <th>Số Lượng</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((item) => (
            <tr key={item._id}>
              <td>{item.foodId}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.cuisine}</td>
              <td>{item.price?.toLocaleString()} VNĐ</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => handleEdit(item)} style={{ marginRight: '5px' }}>Sửa</button>
                <button onClick={() => handleDelete(item._id)} style={{ color: 'red' }}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FoodManagement;