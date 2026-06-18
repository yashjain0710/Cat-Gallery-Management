const {
    addFootballer,
    getAllFootballers,
    getFootballerById,
    updateFootballer,
    deleteFootballer
} = require("../controller/footballerController");
const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({
    storage
});

router.post("/add/footballer", upload.single("image"), addFootballer);
router.get("/get/footballers", getAllFootballers);
router.get("/get/footballer/:id", getFootballerById);
router.put("/update/footballer/:id", upload.single("image"), updateFootballer);
router.delete("/del/footballer/:id", deleteFootballer);

module.exports = router;
