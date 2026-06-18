const User = require("../models/Auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const existingUser = await User.findOne({
            email: req.body.email
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error during registration",
            error: err.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            "mykeypswrd",
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token
        });

    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error during login",
            error: err.message
        });
    }
};