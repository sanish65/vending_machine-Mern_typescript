"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const drinksSchema = new mongoose_1.Schema({
    fund: {
        type: Number,
        default: 1000,
    },
    income: {
        type: Number,
        default: 0,
    },
    coke: {
        type: Number,
        default: 100,
    },
    pepsi: {
        type: Number,
        default: 100,
    },
    dew: {
        type: Number,
        default: 100,
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Drinks', drinksSchema);
