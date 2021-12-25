"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    message: String,
    creator: { type: String, required: true },
    tags: { type: [String], default: [] },
    selectedFile: String,
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    createdAt: {
        type: String,
        default: Date.now().toString(),
    },
});
exports.default = (0, mongoose_1.model)('Post', postSchema);
