"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const shelterSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    link: { type: String, required: true },
    pnumber: { type: String, required: true },
    country: { type: String, required: true },
    region: { type: String, required: true },
});
exports.default = (0, mongoose_1.model)('Shelter', shelterSchema);
