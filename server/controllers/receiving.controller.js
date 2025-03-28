import Receiving from "../models/receiving.models.js";
export const createReceiving = async (req, res) => {
    try {
        const receivingData = req.body;
        const newReceiving = new Receiving(receivingData);
        await newReceiving.save();

        res.status(201).json({
            success: true,
            data: newReceiving,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getReceiving = async (req, res) => {
    try {
        const receiving = await Receiving.find({});
        res.status(200).json({
            success: true,
            data: receiving,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
