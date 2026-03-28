const db = require('../utils/connectDb');

const schoolModel = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM school');
        return rows;   // 🔥 ONLY rows
    },
    searchByname: async (name) => { 
        const [rows] = await db.query('SELECT NAME FROM SCHOOL WHERE NAME = ?',[name]); 
        return rows;
    },
    create: (data) => db.query('INSERT INTO SCHOOL SET ?',[data])
}

module.exports = schoolModel;