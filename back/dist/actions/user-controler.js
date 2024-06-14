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
        try {
            const user = yield user_1.default.findOne({ email: req.body.email });
            if (!user) {
                console.log('Nie ma takiego użytkownika');
                return res.status(401).json({ error: 'Nie ma takiego emaila' });
            }
            const isValidPassword = yield user.comparePassword(req.body.password);
            if (!isValidPassword) {
                console.log('Nieprawidłowe hasło');
                return res.status(401).json({ error: 'Nieprawidłowe hasło' });
            }
            req.session.userId = user._id;
            yield req.session.save();
            console.log('Zalogowano pomyślniea:', req.session.id);
            res.json({ message: 'Zalogowano pomyślnie', email: user._id });
        }
        catch (error) {
            console.error('Błąd podczas logowania:', error);
            res.status(500).json({ error: 'Wystąpił błąd podczas logowania' });
        }
    });
}
exports.login = login;
