const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerDocs = require('./config/swagger');
const authRoutes = require('./newroutes/authRoutes');
const courseRoutes = require('./newroutes/courseRoutes');
const progressRoutes = require('./newroutes/progressRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Welcome to the LMS');
})
app.use('/auth', authRoutes);
app.use('/api', courseRoutes);
app.use('/api', progressRoutes);

swaggerDocs(app);

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => console.error(err));
    
