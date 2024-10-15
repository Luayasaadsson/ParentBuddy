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
exports.getActivityRecommendation = void 0;
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./config.env" });
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
const getActivityRecommendation = (messages) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const conversation = [
            {
                role: "system",
                content: "You are an expert in suggesting activities for parents with small children based on the child's age and preferences.",
            },
            ...messages,
        ];
        console.log("Sending the following messages to OpenAI:", conversation);
        const response = yield openai.chat.completions.create({
            model: "gpt-4",
            /*   model: "gpt-3.5-turbo", */
            messages: conversation,
            max_tokens: 1000,
            temperature: 0.5,
        });
        const message = (_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content;
        if (!message) {
            throw new Error("No response from the AI.");
        }
        return message;
    }
    catch (error) {
        console.error("Error fetching recommendation from OpenAI:", error);
        throw new Error("An error occurred while getting the activity recommendation.");
    }
});
exports.getActivityRecommendation = getActivityRecommendation;
