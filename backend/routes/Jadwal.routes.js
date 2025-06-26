const authenticate = require("../middlewares/authenticate.js");
const controller = require("../controllers/Jadwal.controller.js");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/jadwal", [authenticate.verifyToken], controller.getJadwalUser);
    app.post("/presensi", [authenticate.verifyToken, authenticate.isMahasiswa], controller.lakukanPresensi);
    app.get("/presensi/:classId", [authenticate.verifyToken], controller.lihatPresensi);
};