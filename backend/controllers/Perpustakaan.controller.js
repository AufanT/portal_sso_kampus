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
    // Diasumsikan frontend mengirim { book_id: 123 }
    const { book_id } = req.body;
    const user_id = req.userId; // Dari token

    try {
        const book = await Book.findByPk(book_id);
        if (!book || book.stock < 1) {
            return res.status(404).send({ message: "Buku tidak tersedia atau stok habis." });
        }

        // Kurangi stok buku
        await book.decrement('stock');

        // Catat peminjaman
        const borrowDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(borrowDate.getDate() + 7); // Batas waktu peminjaman 7 hari

        const newBorrow = await BookBorrow.create({
            book_id,
            user_id,
            borrow_date: borrowDate,
            due_date: dueDate,
            status: 'Dipinjam'
        });

        res.status(201).send({ message: "Buku berhasil dipinjam.", data: newBorrow });

    } catch (error) {
        res.status(500).send({ message: error.message });
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