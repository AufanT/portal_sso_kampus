const db = require('../models');
const { Book, BookBorrow } = db;
const { Op } = require('sequelize');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll({
            where: {
                stock: { [Op.gt]: 0 } 
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
        const existingLoan = await BookBorrow.findOne({
            where: {
                user_id: user_id,
                book_id: book_id,
                status: 'Dipinjam' 
            }
        });

        if (existingLoan) {
            return res.status(400).send({
                message: "Anda sudah meminjam buku ini dan belum mengembalikannya."
            });
        }

        const book = await Book.findByPk(book_id);
        if (!book || book.stock < 1) {
            return res.status(404).send({ message: "Buku tidak tersedia atau stok habis." });
        }

        const result = await db.sequelize.transaction(async (t) => {
            await book.decrement('stock', { transaction: t });

            const borrowDate = new Date();
            const dueDate = new Date();
            dueDate.setDate(borrowDate.getDate() + 7);

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

exports.getBorrowHistory = async (req, res) => {
    try {
        const history = await BookBorrow.findAll({
            where: { user_id: req.userId },
            include: [Book], 
            order: [['borrow_date', 'DESC']]
        });
        res.status(200).send(history);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};