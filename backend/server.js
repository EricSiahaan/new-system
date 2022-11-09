const express = require('express')
const driverRoutes = require('./routes/driver.js')
const adminRoutes = require('./routes/admin.js')
const banRoutes = require('./routes/ban.js')
const kendaraanRoutes = require('./routes/kendaraan.js')
const kinerjaRoutes = require('./routes/kinerja.js')
const perRoutes = require('./routes/per.js')
const solarRoutes = require('./routes/solar.js')

const cors = require('cors')
const app = express()


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/v1/driver', driverRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/ban', banRoutes);
app.use('/api/v1/kendaraan', kendaraanRoutes);
app.use('/api/v1/kinerja', kinerjaRoutes);
app.use('/api/v1/per', perRoutes);
app.use('/api/v1/solar', solarRoutes);


app.listen(5000, () => {
    console.log('Server running!');
})