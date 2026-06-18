const Cat = require("../models/Cat");

exports.addCat = async (req, res) => {
    try {
        const cat = await Cat.create({
            name: req.body.name,
            breed: req.body.breed,
            description: req.body.description,
            image: req.file ? req.file.path : undefined
        });

        res.status(201).json({
            success: true,
            message: "Cat added successfully",
            data: cat
        });
    } catch (err) {
        console.error("Error adding cat:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error while adding cat",
            error: err.message
        });
    }
};

exports.getAllCats = async (req, res) => {
    try {
        const cats = await Cat.find();
        
        res.status(200).json({
            success: true,
            message: "Cats retrieved successfully",
            data: cats
        });
    } catch (err) {
        console.error("Error retrieving cats:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error while retrieving cats",
            error: err.message
        });
    }
};

exports.getCatById = async (req, res) => {
    try {
        const cat = await Cat.findById(req.params.id);

        if (!cat) {
            return res.status(404).json({
                success: false,
                message: "Cat not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Cat details retrieved successfully",
            data: cat
        });
    } catch (err) {
        console.error("Error retrieving cat details:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error while retrieving cat details",
            error: err.message
        });
    }
};

exports.updateCat = async (req, res) => {
    try {
        // If there's an image file uploaded, update it too
        if (req.file) {
            req.body.image = req.file.path;
        }

        const cat = await Cat.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!cat) {
            return res.status(404).json({
                success: false,
                message: "Cat not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Cat updated successfully",
            data: cat
        });
    } catch (err) {
        console.error("Error updating cat:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error while updating cat",
            error: err.message
        });
    }
};

exports.deleteCat = async (req, res) => {
    try {
        const cat = await Cat.findByIdAndDelete(req.params.id);

        if (!cat) {
            return res.status(404).json({
                success: false,
                message: "Cat not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Cat deleted successfully",
            data: null
        });
    } catch (err) {
        console.error("Error deleting cat:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error while deleting cat",
            error: err.message
        });
    }
};
