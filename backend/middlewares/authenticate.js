const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;
const Role = db.Role;

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({ message: 'Tidak ada token yang diberikan!' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Akses ditolak! Token tidak valid.' });
        }
        
        req.userId = decoded.id;
        next(); 
    });
};

// Middleware untuk mengecek peran Dosen
const isDosen = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId, {
            include: [{ model: Role, attributes: ['name'] }]
        });

        if (user && user.Role.name === 'dosen') {
            req.user = user;
            next();
            return;
        }

        res.status(403).send({ message: 'Membutuhkan peran Dosen!' });
    } catch (error) {
        res.status(500).send({ message: 'Terjadi kesalahan saat verifikasi peran Dosen.' });
    }
};

// Middleware untuk mengecek peran Mahasiswa
const isMahasiswa = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId, {
            include: [{ model: Role, attributes: ['name'] }]
        });

        if (user && user.Role.name === 'mahasiswa') {
            req.user = user;
            next();
            return;
        }

        res.status(403).send({ message: 'Membutuhkan peran Mahasiswa!' });
    } catch (error) {
        res.status(500).send({ message: 'Terjadi kesalahan saat verifikasi peran Mahasiswa.' });
    }
};

const authenticate = {
    verifyToken,
    isDosen,
    isMahasiswa
};

module.exports = authenticate;