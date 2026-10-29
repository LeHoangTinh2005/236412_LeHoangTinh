# BÀI THI KẾT THÚC HỌC PHẦN
- Họ và tên: Lê Hoàng Tính
- MSSV: 236412_LeHoangTinh
- Repository: https://github.com/LeHoangTinh2005/236412_LeHoangTinh

## 1. Thông tin Triển khai trên Render
- **URL Frontend**: https://236412-lehoangtinh-1.onrender.com
- **URL Backend API**: https://two36412-lehoangtinh.onrender.com

## 2. Đường dẫn Docker Hub Image
- **Backend Image**: `docker pull lehoangtinh2005/236412_lehoangtinh_backend:latest`
- **Frontend Image**: `docker pull lehoangtinh2005/236412_lehoangtinh_frontend:latest`

## 3. Hướng dẫn chạy ứng dụng bằng Docker
### Chạy Backend Container:
```bash
docker run -d -p 5000:5000 -e MONGODB_URI="mongodb+srv://100zazazazaza_db_user:Tinh123@cluster0.ks3884d.mongodb.net/236412_LeHoangTinh?retryWrites=true&w=majority" lehoangtinh2005/236412_lehoangtinh_backend:latest