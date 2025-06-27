const db = require('../models');
const User = db.User;
const Role = db.Role;

exports.isDosen = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId, { include: [Role] });

        if (user && user.Role.name === 'dosen') {
            req.user = user;
            next();
            return;
        }
        res.status(403).send({ message: 'Membutuhkan peran Dosen!' });
    } catch (error) {
        console.error("ERROR di middleware isDosen:", error);
        res.status(500).send({ message: 'Terjadi kesalahan saat verifikasi peran Dosen.' });
    }
};

exports.isMahasiswa = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId, { include: [Role] });

        if (user && user.Role.name === 'mahasiswa') {
            req.user = user;
            next();
            return;
        }
        res.status(403).send({ message: 'Membutuhkan peran Mahasiswa!' });
    } catch (error) {
        console.error("ERROR di middleware isMahasiswa:", error);
        res.status(500).send({ message: 'Terjadi kesalahan saat verifikasi peran Mahasiswa.' });
    }
};

exports.getUserWithRole = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId, { include: [Role] });

        if (!user) {
            return res.status(404).send({ message: "User tidak ditemukan." });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Error di middleware getUserWithRole:", error);
        res.status(500).send({ message: "Terjadi kesalahan saat mengambil data user." });
    }
};