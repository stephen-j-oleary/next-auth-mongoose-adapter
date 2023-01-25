"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// @Schema
const SessionSchema = new mongoose_1.Schema({
    expires: {
        type: Date,
        trim: true,
    },
    sessionToken: {
        type: String,
        trim: true,
    },
    userId: {
        type: String,
        ref: "User",
    },
});
// @Model
const registeredModel = mongoose_1.models.Session;
exports.default = registeredModel ||
    (0, mongoose_1.model)("Session", SessionSchema);
