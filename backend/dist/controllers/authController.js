"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel"));
const validators_1 = require("../utils/validators");
// Registration function
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, location } = req.body;
    try {
        const { error, hashedPassword } = yield (0, validators_1.validateAndHashPassword)(password);
        if (error) {
            res.status(400).json({ message: error });
            return;
        }
        // Check if the user already exists
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "Email address is already registered" });
            return;
        }
        // Create a new user without childAge
        const newUser = new userModel_1.default({
            name,
            email,
            password: hashedPassword,
            location: location
                ? { latitude: location.lat, longitude: location.lon }
                : undefined,
        });
        yield newUser.save();
        res.status(201).json({ message: "User created" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.registerUser = registerUser;
// Login function
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, location } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Verify the password
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Incorrect password" });
            return;
        }
        if (location) {
            user.location = {
                latitude: location.latitude,
                longitude: location.longitude,
            };
            yield user.save();
        }
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.status(200).json({ token, name: user.name });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.loginUser = loginUser;
