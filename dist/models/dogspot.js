"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dogSpotSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    kind: { type: String, required: true },
    selectedFile: { type: String, required: true },
    rating: { type: [Number], default: [0] },
    mapDirections: { type: String, required: true },
});
exports.default = (0, mongoose_1.model)('DogSpot', dogSpotSchema);
