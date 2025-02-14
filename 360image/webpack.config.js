const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // Chế độ 'development' hoặc 'production'
  entry: './src/index.js', // Tệp JS chính
  output: {
    path: path.resolve(__dirname, 'dist'), // Thư mục đầu ra
    filename: 'bundle.js', // Tên file đầu ra
    clean: true, // Xóa thư mục 'dist' trước khi build
  },
  module: {
    rules: [
      {
        test: /\.css$/i, // Xử lý file CSS
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|glb|gltf|bin)$/i, // Xử lý file ảnh hoặc mô hình
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Sử dụng file HTML gốc
    }),
  ],
  devServer: {
    static: './dist', // Thư mục tĩnh
    open: true, // Tự động mở trình duyệt khi chạy
    port: 8080, // Cổng server
  },
};
