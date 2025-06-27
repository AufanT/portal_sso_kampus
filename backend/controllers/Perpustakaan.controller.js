const db = require('../models');
const { Book, BookBorrow } = db;
const { Op } = require('sequelize');

// GET: Melihat semua buku yang tersedia (untuk semua user)
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll({
            where: {
                stock: { [Op.gt]: 0 } // Hanya tampilkan buku yang stoknya > 0
            }
        });
        res.status(200).send(books);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// POST: Meminjam buku
exports.borrowBook = async (req, res) => {
    const { book_id } = req.body;
    const user_id = req.userId;

    try {
        // === LANGKAH 1: Validasi Peminjaman Aktif (Logika Baru) ===
        const existingLoan = await BookBorrow.findOne({
            where: {
                user_id: user_id,
                book_id: book_id,
                status: 'Dipinjam' // Cek hanya untuk buku yang statusnya masih 'Dipinjam'
            }
        });

        // Jika sudah ada data peminjaman aktif untuk buku ini oleh user ini, tolak.
        if (existingLoan) {
            return res.status(400).send({
                message: "Anda sudah meminjam buku ini dan belum mengembalikannya."
            });
        }

        // === LANGKAH 2: Validasi Stok Buku (Logika Lama yang Tetap Penting) ===
        const book = await Book.findByPk(book_id);
        if (!book || book.stock < 1) {
            return res.status(404).send({ message: "Buku tidak tersedia atau stok habis." });
        }

        // === LANGKAH 3: Proses Peminjaman (Jika semua validasi lolos) ===
        
        // Gunakan transaksi untuk memastikan kedua operasi (update stok & insert peminjaman) berhasil atau gagal bersamaan
        const result = await db.sequelize.transaction(async (t) => {
            // Kurangi stok buku
            await book.decrement('stock', { transaction: t });

            // Catat peminjaman
            const borrowDate = new Date();
            const dueDate = new Date();
            dueDate.setDate(borrowDate.getDate() + 7); // Batas waktu 7 hari

            const newBorrow = await BookBorrow.create({
                book_id,
                user_id,
                borrow_date: borrowDate,
                due_date: dueDate,
                status: 'Dipinjam'
            }, { transaction: t });

            return newBorrow;
        });

        res.status(201).send({ message: "Buku berhasil dipinjam.", data: result });

    } catch (error) {
        console.error("Error saat meminjam buku:", error);
        res.status(500).send({ message: "Terjadi kesalahan pada server." });
    }
};

// GET: Melihat riwayat peminjaman user yang sedang login
exports.getBorrowHistory = async (req, res) => {
    try {
        const history = await BookBorrow.findAll({
            where: { user_id: req.userId },
            include: [Book], // Sertakan detail buku yang dipinjam
            order: [['borrow_date', 'DESC']]
        });
        res.status(200).send(history);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};