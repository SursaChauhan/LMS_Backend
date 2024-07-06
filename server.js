const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerDocs = require('./config/swagger');
const authRoutes = require('./newroutes/authRoutes');
const courseRoutes = require('./newroutes/courseRoutes');
const progressRoutes = require('./newroutes/progressRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Welcome to the LMS');
})
app.use('/api', authRoutes);
app.use('/api', courseRoutes);
app.use('/api', progressRoutes);

swaggerDocs(app);

const PORT =  8080;


mongoose.connect(process.env.MONGO_URL)


const connectDB = mongoose.connection;

// Event listeners to track the connection status
connectDB.on('error', console.error.bind(console, 'MongoDB connection error:'));
connectDB.once('open', () => {
    console.log('MongoDB connected successfully!');
});



 app.listen(
    PORT,
    connectDB,
    console.log(
      `Server running in  mode on port ${PORT}`
    )
  );
    
