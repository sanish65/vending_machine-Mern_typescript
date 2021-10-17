"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDrinks = exports.updateDrinks = exports.addDrinks = exports.buyDrinksById = exports.getDrinksById = exports.returnDrinksById = exports.getDrinks = void 0;
const drinks_1 = __importDefault(require("../../models/drinks"));
const getDrinks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const drinks = yield drinks_1.default.find();
        res.status(200).json({ drinks });
    }
    catch (error) {
        throw error;
    }
});
exports.getDrinks = getDrinks;
const getDrinksById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const drinks = yield drinks_1.default.findById({ _id: req.params.id });
        res.status(200).json({ drinks });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.getDrinksById = getDrinksById;
const buyDrinksById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, drink, money } = req.body;
    try {
        const currentDrinks = yield drinks_1.default.findById(id);
        let newValue = currentDrinks;
        let remainder = 0;
        let numOfDrinks = 0;
        let deductSum = 0;
        switch (drink) {
            case 'coke':
                if (money < 20) {
                    numOfDrinks = 0;
                    remainder = money;
                    break;
                }
                else {
                    let numOfCoke = (req.body.money / 20).toString();
                    numOfCoke = numOfCoke.split('.')[0];
                    numOfDrinks = numOfCoke;
                    remainder = req.body.money % 20;
                    newValue.coke = newValue.coke - numOfCoke;
                    deductSum = req.body.money - remainder;
                    break;
                }
            case 'pepsi':
                if (money < 25) {
                    numOfDrinks = 0;
                    remainder = money;
                    break;
                }
                else {
                    let numOfPepsi = (req.body.money / 25).toString();
                    numOfPepsi = numOfPepsi.split('.')[0];
                    numOfDrinks = numOfPepsi;
                    remainder = req.body.money % 25;
                    newValue.pepsi = newValue.pepsi - numOfPepsi;
                    deductSum = req.body.money - remainder;
                    break;
                }
            case 'dew':
                if (money < 20) {
                    numOfDrinks = 0;
                    remainder = money;
                    break;
                }
                else {
                    let numOfDew = (req.body.money / 30).toString();
                    numOfDew = numOfDew.split('.')[0];
                    numOfDrinks = numOfDew;
                    remainder = req.body.money % 30;
                    newValue.dew = newValue.dew - numOfDew;
                    deductSum = req.body.money - remainder;
                    break;
                }
            default:
                newValue = newValue;
                break;
        }
        newValue.fund = newValue.fund - deductSum;
        newValue.income = newValue.income + deductSum;
        const drinks = yield drinks_1.default.findByIdAndUpdate(id, newValue, { new: true });
        res.status(200).json({ drinks, remainder, numOfDrinks });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.buyDrinksById = buyDrinksById;
const returnDrinksById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, drink, numbr } = req.body;
    let money = 0;
    try {
        const currentDrinks = yield drinks_1.default.findById(id);
        let newValue = currentDrinks;
        if (newValue.income <= 0) {
            money = 0;
        }
        else {
            switch (drink) {
                case 'coke':
                    newValue.coke += 1;
                    newValue.fund += 20;
                    newValue.income -= 20;
                    money = 20;
                    break;
                case 'pepsi':
                    newValue.pepsi += 1;
                    newValue.fund += 25;
                    newValue.income -= 25;
                    money = 25;
                    break;
                case 'dew':
                    newValue.dew += 1;
                    newValue.fund += 30;
                    newValue.income -= 30;
                    money = 30;
                    break;
                default:
                    newValue = newValue;
                    break;
            }
        }
        const drinks = yield drinks_1.default.findByIdAndUpdate(id, newValue, { new: true });
        res.status(200).json({ drinks, money });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.returnDrinksById = returnDrinksById;
const addDrinks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const drinks = new drinks_1.default({
            fund: body.fund,
            coke: body.coke,
            pepsi: body.pepsi,
            dew: body.dew,
        });
        const newDrinks = yield drinks.save();
        const allDrinks = yield drinks_1.default.find();
        res.status(201).json({ message: 'Drinks added', addedDrinks: newDrinks, drinks: allDrinks });
    }
    catch (error) {
        throw error;
    }
});
exports.addDrinks = addDrinks;
const updateDrinks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateDrinks = yield drinks_1.default.findByIdAndUpdate({ _id: id }, body);
        const allDrinks = yield drinks_1.default.find();
        res.status(200).json({
            message: 'Drinks updated',
            updatedDrinks: updateDrinks,
            drinks: allDrinks,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateDrinks = updateDrinks;
const deleteDrinks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedDrinks = yield drinks_1.default.findByIdAndRemove(req.params.id);
        const allDrinks = yield drinks_1.default.find();
        res.status(200).json({
            message: 'Todo deleted',
            deletdDrinks: deletedDrinks,
            drinks: allDrinks,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteDrinks = deleteDrinks;
