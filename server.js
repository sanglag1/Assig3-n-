require('dotenv').config(); // Để sử dụng biến môi trường từ tệp .env
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = 4000;

// Kết nối đến MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB Atlas");
}).catch(err => {
    console.error("Could not connect to MongoDB Atlas", err);
});

// Middleware
app.use(bodyParser.json()); // Để phân tích cú pháp JSON trong yêu cầu

// Sử dụng các route
app.use('/students', studentRoutes);

// Endpoint R1: Lấy thông tin cá nhân
app.get('/info', (req, res) => {
    const userInfo = {
        fullName: "Trinh Xuan Sang",
        studentCode: "QE170101"
    };
    res.status(200).json({ data: userInfo });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});