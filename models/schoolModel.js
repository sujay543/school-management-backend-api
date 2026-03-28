const db = require('../utils/connectDb');

const schoolModel = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM school');
        return rows;   // 🔥 ONLY rows
    },

    create: (data) => db.query('INSERT INTO SCHOOL SETS ?',[data])
}

module.exports = schoolModel;