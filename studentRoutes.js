const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Endpoint R1: Lấy thông tin cá nhân
router.get('/info', (req, res) => {
    const userInfo = {
        fullName: "Trinh Xuan Sang",
        studentCode: "QE170101"
    };
    res.status(200).json({ data: userInfo });
});

// 1. Tạo Sinh Viên
router.post('/', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json({
            success: true,
            message: "Student created successfully",
            data: student
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// 2. Lấy Tất Cả Sinh Viên
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({
            success: true,
            data: students
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong on the server"
        });
    }
});

// 3. Lấy Sinh Viên theo ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }
        res.status(200).json({
            success: true,
            data: student
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong on the server"
        });
    }
});

// 4. Cập Nhật Sinh Viên
router.put('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: student
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// 5. Xóa Sinh Viên
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Student deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong on the server"
        });
    }
});

module.exports = router;