"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// @Schema
const AccountSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        trim: true,
    },
    type: {
        type: String,
        trim: true,
    },
    provider: {
        type: String,
        trim: true,
    },
    providerAccountId: {
        type: String,
        trim: true,
    },
    refresh_token: {
        type: String,
        trim: true,
    },
    access_token: {
        type: String,
        trim: true,
    },
    expires_at: {
        type: Number,
        trim: true,
    },
    token_type: {
        type: String,
        trim: true,
    },
    scope: {
        type: String,
        trim: true,
    },
    id_token: {
        type: String,
        trim: true,
    },
    session_state: {
        type: String,
        trim: true,
    },
    oauth_token_secret: {
        type: String,
        trim: true,
    },
    oauth_token: {
        type: String,
        trim: true,
    },
});
// @Model
const registeredModel = mongoose_1.default.models.Account;
exports.default = registeredModel ||
    mongoose_1.default.model("Account", AccountSchema);
