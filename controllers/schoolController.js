const schoolModel = require('../models/schoolModel');

exports.getSchools = async(req,res,next) => {
    try{
    const data = await schoolModel.getAll();
    if(!data || data.length == 0)
    {
        return res.status(404).json(
            {
                status: 'success',
                message: 'no record found'
            }
        )
    }

    res.status(200).json(
        {
            status: 'success',
            data: {
                data
            }
        }
    )
    }catch(err)
    {
        res.status(500).json(
            {
                status:'Failed',
             message: 'error occurs',
             err
            }
        )
    }
}


exports.insertSchool = (req,res) => {
    const {name, address , latitude, longitude} = req.body;
    if(!name || !address || !latitude || !longitude)
    {
        return res.send('please provide name, address, latitude and longitude');
    }

    const ifExist = 
}