"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generic_controller_1 = require("../controllers/generic.controller");
const router = (0, express_1.Router)();
router.get('/dogspots', generic_controller_1.getDogspots);
router.get('/shelters', generic_controller_1.getShelters);
router.post('/shelters/postshelter', generic_controller_1.postShelter);
exports.default = router;
