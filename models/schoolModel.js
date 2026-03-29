const db = require('../utils/connectDb');

const schoolModel = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM school');
        return rows;   // 🔥 ONLY rows
    },
    searchBynameAndAddress: async (name,address) => { 
        const [rows] = await db.query('SELECT name FROM school WHERE name = ? AND address = ?',
  [name, address]); 
        return rows;
    },
    create: (data) => db.query('INSERT INTO SCHOOL SET ?',[data])
}

module.exports = schoolModel;