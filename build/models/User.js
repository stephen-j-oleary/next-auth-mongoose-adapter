"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// @Schema
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    emailVerified: {
        type: Date,
        trim: true,
    },
    image: {
        type: String,
        trim: true,
    },
});
// @Model
const registeredModel = mongoose_1.default.models.User;
exports.default = registeredModel ||
    mongoose_1.default.model("User", UserSchema);
