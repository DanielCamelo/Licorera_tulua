const Off = require("../../models/Off.js");

const getAllDiscount = async (req, res) => {
    try {
        const allDiscount = await Off.find();

        res.status(200).json({
            message: "All discount find",
            success: true,
            error: false,
            data: allDiscount,
        })
        
    } catch (err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = getAllDiscount;