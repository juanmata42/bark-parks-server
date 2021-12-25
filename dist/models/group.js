"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const groupSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    creator: { type: String, required: true },
    members: { type: [String], required: true },
    createdAt: {
        type: String,
        default: Date.now().toString(),
    },
    invitations: [String],
    meetups: {
        type: [{ frequency: String, time: String, dogSpotId: String }],
        default: [],
    },
    description: { type: String, required: true },
    selectedFile: {
        type: String,
        default: 'https://i.pinimg.com/originals/5c/e5/e2/5ce5e2ceac058952506371f624c27e8f.jpg',
    },
});
exports.default = (0, mongoose_1.model)('Group', groupSchema);
