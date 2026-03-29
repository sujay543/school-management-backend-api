const schoolModel = require('../models/schoolModel');

function isValidCoordinates(lat, lon) {
    return (
        typeof lat === 'number' &&
        typeof lon === 'number' &&
        !isNaN(lat) &&
        !isNaN(lon) &&
        lat >= -90 && lat <= 90 &&
        lon >= -180 && lon <= 180
    );
}

function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km

    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // distance in km
}

exports.getSchools = async(req,res,next) => {
    try{
    const data = await schoolModel.getAll();
    if(!data || data.length == 0)
    {
        return res.status(404).json(
            {
                status: 'error',
                message: 'no record found'
            }
        )
    }

    res.status(200).json(
        {
            status: 'success',
             data
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


exports.addSchool = async (req,res) => {
    try{
    const {name, address , latitude, longitude} = req.body;
    if(!name || !address || latitude == null || longitude== null)
    {
         return res.status(400).json({
            status: 'error',
            message: 'Please provide name, address, latitude and longitude'
        });
    }

  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);
    if(!isValidCoordinates(lat,lng))
    {
        return res.status(400).json({
            status: 'error',
            message: 'please enter valid coordinates'
        })
    }

    const data = await schoolModel.searchBynameAndAddress(name,address);
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
            longitude: lng,
            latitude: lat
        }
    )
    res.status(201).json(
        {
            status: 'success',
            message: 'school has been added'
        }
    )
        }catch (error) {
            console.error("ADD SCHOOL ERROR:", error);
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
}


exports.listSchools = async(req,res,next) => {
    try{
   const {latitude,longitude} = req.query;
    if (latitude == null || longitude == null) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide latitude and longitude'
            });
        }
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    if(!isValidCoordinates(lat,lng))
    {
        return res.status(400).json({
            status: 'error',
            message: 'please enter valid coordinates'
        })
    }
    const schools = await schoolModel.getAll();
    const schoolsWithDistance = schools.map(school => ({
    ...school,
    distance: haversine(lat, lng, school.latitude, school.longitude)
}));

const sortedSchool = schoolsWithDistance.sort((a, b) => a.distance - b.distance);
    res.status(200).json(
        {
            status: 'success',
            data: sortedSchool
        }
    )
}catch(err){
    console.log(err);
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
}
    
}