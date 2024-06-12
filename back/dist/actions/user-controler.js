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
exports.login = exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = req.body.email;
        const password = req.body.password;
        const newUser = new user_1.default({
            email,
            password
        });
        yield newUser.save();
        res.send('zarejestrowano pomyślnie');
    });
}
exports.register = register;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ email: req.body.email });
        if (!user) {
            throw new Error('Nie ma takiego emaila');
        }
        const isValidPassword = yield user.comparePassword(req.body.password);
        if (!isValidPassword) {
            throw new Error('Nieprawidłowe hasło');
        }
        req.session.user = {
            _id: user._id,
            email: user.email
        };
        res.send('');
    });
}
exports.login = login;
