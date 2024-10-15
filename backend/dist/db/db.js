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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./config.env" });
const validateEnvVars = () => {
    const requiredVars = ["DATABASE", "DATABASE_PASSWORD", "DB_NAME"];
    requiredVars.forEach((varName) => {
        if (!process.env[varName]) {
            throw new Error(`Missing required environment variable: ${varName}`);
        }
    });
    if (!process.env.DATABASE.includes("<db_PASSWORD>") ||
        !process.env.DATABASE.includes("<db_NAME>")) {
        throw new Error("DATABASE connection string format is incorrect. Ensure it includes <db_PASSWORD> and <db_NAME> placeholders.");
    }
};
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate environment variables
        validateEnvVars();
        // Replace placeholders in the DATABASE string
        const DB = process.env
            .DATABASE.replace("<db_PASSWORD>", process.env.DATABASE_PASSWORD)
            .replace("<db_NAME>", process.env.DB_NAME);
        // Validate that the DB string is not empty after replacements
        if (!DB) {
            throw new Error("DB string is empty after replacements");
        }
        // Connect to MongoDB
        yield mongoose_1.default.connect(DB);
        console.log(`MongoDB connected successfully to ${process.env.DB_NAME}`);
    }
    catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
    }
});
exports.default = connectDB;
