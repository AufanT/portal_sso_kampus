const db = require('../models');
const { User, Role } = db;

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId, {
            attributes: { exclude: ['password_hash'] },
            include: [{
                model: Role,
                attributes: ['name']
            }]
        });

        if (!user) {
            return res.status(404).send({ message: "User tidak ditemukan." });
        }

        res.status(200).send(user);

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    const userId = req.userId;
    const { full_name, identity_number } = req.body;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).send({ message: "User tidak ditemukan." });
        }

        user.full_name = full_name || user.full_name;
        user.identity_number = identity_number || user.identity_number;
        
        await user.save();

        const updatedUser = await User.findByPk(userId, {
            attributes: { exclude: ['password_hash'] }
        });

        res.status(200).send({
            message: "Profil berhasil diperbarui.",
            user: updatedUser
        });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};