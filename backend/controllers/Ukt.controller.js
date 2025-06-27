const db = require('../models');
const { TuitionBill, User } = db;

// GET: Mahasiswa melihat tagihan UKT miliknya
exports.getMyBills = async (req, res) => {
    try {
        const bills = await TuitionBill.findAll({
            where: { student_id: req.userId },
            order: [['due_date', 'DESC']]
        });
        res.status(200).send(bills);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// --- Fungsi Khusus Admin ---

// POST: Admin membuat tagihan baru untuk seorang mahasiswa
exports.createBill = async (req, res) => {
    // Body: { student_id: 7, billing_period: "Ganjil 2024/2025", amount: 5000000, due_date: "2025-08-30" }
    const { student_id, billing_period, amount, due_date } = req.body;
    try {
        const newBill = await TuitionBill.create({
            student_id,
            billing_period,
            amount,
            due_date,
            status: 'Belum Lunas'
        });
        res.status(201).send({ message: "Tagihan berhasil dibuat.", data: newBill });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};