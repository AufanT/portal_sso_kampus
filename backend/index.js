const express = require('express');
const PORT = process.env.PORT || 3000;
// const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

// app.use(cors());
app.use(express.json());
dotenv.config();

const authRoutes = require('./routes/Auth.routes');
const akademikRoutes = require('./routes/akademik.routes'); 
const jadwalRoutes = require('./routes/Jadwal.routes'); 
const iLearnRoutes = require('./routes/Ilearn.routes');


app.use('/auth', authRoutes);
app.use('/akademik', akademikRoutes);
app.use('/jadwal', jadwalRoutes);
app.use('/ilearn', iLearnRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
