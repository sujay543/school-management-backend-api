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


exports.insertSchool = async (req,res) => {
    try{
    const {name, address , latitude, longitude} = req.body;
    if(!name || !address || latitude == null || longitude== null)
    {
         return res.status(400).json({
            status: 'error',
            message: 'Please provide name, address, latitude and longitude'
        });
    }

    const data = await schoolModel.searchByname(name);
    if(data.length != 0)
    {
         return res.status(409).json({
            status: 'error',
            message: 'School already exists'
        });
    }

    await schoolModel.create(
        {
            name: name,
            address: address,
            longitude: longitude,
            latitude: latitude
        }
    )
    res.status(201).json(
        {
            status: 'success',
            message: 'school has been added'
        }
    )
        }catch (error) {
            console.error(error);
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }

}