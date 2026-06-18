const {
    addCat,
    getAllCats,
    getCatById,
    updateCat,
    deleteCat
} = require("../controller/catController");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "cat_gallery",
        allowed_formats: ["jpg", "png", "jpeg"]
    }
});

const upload = multer({
    storage
});

const passport = require("passport");

router.post("/add/cat", passport.authenticate("jwt", { session: false }), upload.single("image"), addCat);
router.get("/get/cats", getAllCats);
router.get("/get/cat/:id", getCatById);
router.put("/update/cat/:id", passport.authenticate("jwt", { session: false }), upload.single("image"), updateCat);
router.delete("/del/cat/:id", passport.authenticate("jwt", { session: false }), deleteCat);

module.exports = router;
