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
exports.deleteActivity = exports.getFavoriteActivities = exports.toggleFavoriteActivity = exports.getActivityHistory = exports.getActivityRecommendations = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const openaiService_1 = require("../services/openaiService");
const activityHistoryModel_1 = __importDefault(require("../models/activityHistoryModel"));
// Function to detect language using OpenAI
const detectLanguage = (text) => __awaiter(void 0, void 0, void 0, function* () {
    const systemMessage = {
        role: "system",
        content: "Detect the language of the following text. Respond with just the language name.",
    };
    const userMessage = {
        role: "user",
        content: `The following text is about activities for children: "${text}"`,
    };
    const response = yield (0, openaiService_1.getActivityRecommendation)([
        systemMessage,
        userMessage,
    ]);
    const language = response === null || response === void 0 ? void 0 : response.trim().toLowerCase();
    console.log("Detected language:", language);
    if (language.includes("swedish")) {
        return "swedish";
    }
    else {
        return "english";
    }
});
const getActivityRecommendations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { childAge, preferences, location, activityType, duration, budget } = req.body;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            res.status(401).json({ error: "No valid user identifier." });
            return;
        }
        const user = yield userModel_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ error: "User not found." });
            return;
        }
        // Detect the language based on preferences
        const language = yield detectLanguage(preferences);
        let systemMessage;
        if (!location || !location.latitude || !location.longitude) {
            // If location is missing, use generic recommendations without location information
            systemMessage = {
                role: "system",
                content: language === "swedish"
                    ? "Du är en expert på att ge föräldrar förslag på aktiviteter för barn i Sverige. Ge generella rekommendationer på svenska baserat på barnets ålder, preferenser, aktivitetstyp, längd på aktivitet och budget."
                    : "You are an expert in providing parents with activity suggestions for children. Provide general recommendations in English based on the child's age, preferences, activity type, duration, and budget.",
            };
        }
        else {
            // If location exists, include location in the recommendations
            systemMessage = {
                role: "system",
                content: language === "swedish"
                    ? `Du är en expert på att ge föräldrar förslag på aktiviteter för barn i Sverige. Ge rekommendationer på svenska baserat på barnets ålder, plats (${location.latitude}, ${location.longitude}), preferenser, aktivitetstyp, längd på aktivitet och budget.`
                    : `You are an expert in providing parents with activity suggestions for children. Provide recommendations in English based on the child's age, location (${location.latitude}, ${location.longitude}), preferences, activity type, duration, and budget.`,
            };
        }
        const userMessage = {
            role: "user",
            content: `I have a child who is ${childAge} years old, prefers ${preferences}, and I am looking for ${activityType} activities that last ${duration} hours, with a budget of ${budget}.`,
        };
        const recommendation = yield (0, openaiService_1.getActivityRecommendation)([
            systemMessage,
            userMessage,
        ]);
        if (!recommendation) {
            throw new Error("No recommendation received from OpenAI");
        }
        // Save activity history
        const activityHistory = new activityHistoryModel_1.default({
            user: user._id,
            recommendations: recommendation,
            preferences: preferences,
            location: location
                ? { latitude: location.latitude, longitude: location.longitude }
                : null,
            activityType,
            duration,
            budget,
        });
        yield activityHistory.save();
        res.json({ recommendation });
    }
    catch (error) {
        console.error("Error fetching recommendations:", error.message);
        res.status(500).json({ error: "Error fetching recommendations." });
    }
});
exports.getActivityRecommendations = getActivityRecommendations;
const getActivityHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Retrieve the user's _id from the JWT token
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        console.log("Fetching history for userId:", userId);
        // Check that userId exists
        if (!userId) {
            res.status(401).json({ error: "No valid user identifier." });
            return;
        }
        // Retrieve the user based on userId from the token
        const user = yield userModel_1.default.findById(userId);
        console.log("User found:", user === null || user === void 0 ? void 0 : user.email);
        if (!user) {
            res.status(404).json({ error: "User not found." });
            return;
        }
        // Retrieve activity history based on the user's _id
        const history = yield activityHistoryModel_1.default.find({ user: user._id }).populate("user", "name email");
        console.log("History found:", history);
        if (!history.length) {
            res.status(200).json([]);
            return;
        }
        res.json(history); // Send the response back to the client
    }
    catch (error) {
        res.status(500).json({ error: "Error retrieving activity history." });
    }
});
exports.getActivityHistory = getActivityHistory;
// Function to toggle favorite status for an activity
const toggleFavoriteActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { activityId } = req.params;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            res.status(401).json({ error: "No valid user identifier." });
            return;
        }
        // Retrieve the activity from history
        const activity = yield activityHistoryModel_1.default.findOne({
            _id: activityId,
            user: userId,
        });
        if (!activity) {
            res.status(404).json({ error: "Activity not found." });
            return;
        }
        // Toggle favoriting (true/false)
        activity.isFavorited = !activity.isFavorited;
        yield activity.save();
        res.json({
            message: `Activity ${activity.isFavorited ? "favorited" : "unfavorited"} successfully.`,
        });
    }
    catch (error) {
        console.error("Error updating favorite status:", error);
        res.status(500).json({ error: "Error updating activity favorite status." });
    }
});
exports.toggleFavoriteActivity = toggleFavoriteActivity;
// Retrieve the user's favorite activities
const getFavoriteActivities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            res.status(401).json({ message: "No valid user identifier." });
            return;
        }
        const favoriteActivities = yield activityHistoryModel_1.default.find({
            user: userId,
            isFavorited: true,
        });
        if (!favoriteActivities.length) {
            res.status(200).json([]);
            return;
        }
        res.status(200).json(favoriteActivities);
    }
    catch (error) {
        console.error("Error fetching favorite activities:", error);
        res.status(500).json({ message: "Server error." });
    }
});
exports.getFavoriteActivities = getFavoriteActivities;
const deleteActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { activityId } = req.params;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            res.status(401).json({ error: "No valid user identifier." });
            return;
        }
        // Find and remove the activity from the database
        const activity = yield activityHistoryModel_1.default.findOneAndDelete({
            _id: activityId,
            user: userId,
        });
        if (!activity) {
            res.status(404).json({ error: "Activity not found." });
            return;
        }
        res.status(200).json({ message: "Activity deleted successfully." });
    }
    catch (error) {
        console.error("Error deleting activity:", error);
        res.status(500).json({ error: "Server error while deleting activity." });
    }
});
exports.deleteActivity = deleteActivity;
