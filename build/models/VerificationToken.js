"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// @Schema
const VerificationTokenSchema = new mongoose_1.default.Schema({
    expires: {
        type: Date,
        trim: true,
    },
    token: {
        type: String,
        trim: true,
    },
    identifier: {
        type: String,
        trim: true,
    },
});
// @Model
const registeredModel = mongoose_1.default.models.VerificationToken;
exports.default = registeredModel ||
    mongoose_1.default.model("VerificationToken", VerificationTokenSchema);
