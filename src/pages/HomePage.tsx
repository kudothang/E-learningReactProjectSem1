// pages/HomePage.tsx
function HomePage() {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-center">Home Page</h1>
      <p className="text-center mt-4">Đây là trang chủ - đang trong quá trình phát triển</p>
      
      {/* Thêm nội dung test */}
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <div className="bg-gray-100 p-8 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Nội dung trang chủ sẽ ở đây</h2>
          <p className="mb-4">Bạn có thể thêm:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Hero section với hình ảnh</li>
            <li>Danh sách khóa học nổi bật</li>
            <li>Giới thiệu về nền tảng</li>
            <li>Testimonials từ học viên</li>
            <li>Blog posts mới nhất</li>
          </ul>
        </div>
        
        {/* Thêm khoảng trống để test scroll */}
        <div className="h-screen mt-8 flex items-center justify-center bg-gradient-to-r from-emerald-50 to-blue-50">
          <p className="text-lg">Khu vực test scroll - cuộn xuống để xem</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;