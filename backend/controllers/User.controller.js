const db = require('../models');
const { User, Role } = db;

// GET: Mengambil data profil user yang sedang login
exports.getProfile = async (req, res) => {
    try {
        // userId didapat dari middleware verifyToken
        const user = await User.findByPk(req.userId, {
            // Kita kecualikan password_hash demi keamanan
            attributes: { exclude: ['password_hash'] },
            // Sertakan informasi peran (role) agar frontend tahu dia siapa
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

// PUT: Memperbarui data profil user yang sedang login
exports.updateProfile = async (req, res) => {
    // Ambil ID user dari token
    const userId = req.userId;
    // Ambil data baru dari body request yang boleh diubah
    const { full_name, identity_number } = req.body;

    try {
        // Cari user yang akan diupdate
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).send({ message: "User tidak ditemukan." });
        }

        // Update data user dengan data baru jika ada
        user.full_name = full_name || user.full_name;
        user.identity_number = identity_number || user.identity_number;
        
        // Simpan perubahan ke database
        await user.save();

        // Ambil kembali data yang sudah diupdate untuk dikirim sebagai respons
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