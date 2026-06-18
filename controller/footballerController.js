const Footballer = require("../models/Footballer");

exports.addFootballer = async (req, res) => {
    try {
        const footballer = await Footballer.create({
            name: req.body.name,
            club: req.body.club,
            position: req.body.position,
            image: req.file ? req.file.path : undefined
        });

        res.status(201).json({
            success: true,
            message: "Footballer added successfully",
            data: footballer
        });
    } catch (err) {
        console.error("Error adding footballer:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error while adding footballer",
            error: err.message
        });
    }
};

exports.getAllFootballers = async (req, res) => {
    try {
        const footballers = await Footballer.find();
        
        res.status(200).json({
            success: true,
            message: "Footballers retrieved successfully",
            data: footballers
        });
    } catch (err) {
        console.error("Error retrieving footballers:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error while retrieving footballers",
            error: err.message
        });
    }
};

exports.getFootballerById = async (req, res) => {
    try {
        const footballer = await Footballer.findById(req.params.id);

        if (!footballer) {
            return res.status(404).json({
                success: false,
                message: "Footballer not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Footballer details retrieved successfully",
            data: footballer
        });
    } catch (err) {
        console.error("Error retrieving footballer details:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error while retrieving footballer details",
            error: err.message
        });
    }
};

exports.updateFootballer = async (req, res) => {
    try {
        // If there's an image file uploaded, update it too
        if (req.file) {
            req.body.image = req.file.path;
        }

        const footballer = await Footballer.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!footballer) {
            return res.status(404).json({
                success: false,
                message: "Footballer not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Footballer updated successfully",
            data: footballer
        });
    } catch (err) {
        console.error("Error updating footballer:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error while updating footballer",
            error: err.message
        });
    }
};

exports.deleteFootballer = async (req, res) => {
    try {
        const footballer = await Footballer.findByIdAndDelete(req.params.id);

        if (!footballer) {
            return res.status(404).json({
                success: false,
                message: "Footballer not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Footballer deleted successfully",
            data: null
        });
    } catch (err) {
        console.error("Error deleting footballer:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error while deleting footballer",
            error: err.message
        });
    }
};
