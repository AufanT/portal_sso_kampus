const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { email, password, full_name, identity_number, role_id } = req.body;

    try {
        // Cek apakah email sudah terdaftar
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const newUser = await User.create({
        email,
        password_hash: hashedPassword,
        full_name,
        identity_number,
        role_id
    });

    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: newUser.id,
            email: newUser.email,
            full_name: newUser.full_name,
            identity_number: newUser.identity_number,
            role_id: newUser.role_id
        }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Cek apakah user dengan email tersebut ada
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Verifikasi password
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

        // Buat token JWT
        const token = jwt.sign({ id: user.id, role_id: user.role_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                identity_number: user.identity_number,
                role_id: user.role_id
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
};

module.exports = {
    register,
    login
};