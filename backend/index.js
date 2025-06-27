const express = require('express');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express'); 
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./dokumentasi-api.yaml');
const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const authRoutes = require('./routes/Auth.routes');
const akademikRoutes = require('./routes/akademik.routes'); 
const jadwalRoutes = require('./routes/Jadwal.routes'); 
const iLearnRoutes = require('./routes/Ilearn.routes');
const perpustakaanRoutes = require('./routes/Perpustakaan.routes'); 
const uktRoutes = require('./routes/Ukt.routes');   
const userRoutes = require('./routes/User.routes');  


app.use('/auth', authRoutes);
app.use('/akademik', akademikRoutes);
app.use('/jadwal', jadwalRoutes);
app.use('/ilearn', iLearnRoutes);
app.use('/perpustakaan', perpustakaanRoutes);
app.use('/ukt', uktRoutes);   
app.use('/user', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
