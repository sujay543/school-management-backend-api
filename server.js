const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const express = require('express');
const db = require('./utils/connectDb');
const schoolRouter = require('./routers/schoolRouter');
const app = express();
app.use(express.json());


app.use('/api/v1/schools',schoolRouter);
app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'School management Backend is running'
    });
});

const checkDb  = async () => {
    try{
    const connection = await db.getConnection();
        console.log('database connected');
        connection.release();
    }catch(err){
        console.log('database not connected',err);
    }
}
checkDb();


const port = process.env.PORT || 3000;

app.listen(port,()=> {
    console.log(`server running on port ${port}`);
})