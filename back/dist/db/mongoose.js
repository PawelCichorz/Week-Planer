"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const databaseUrl = process.env.DATABASE;
try {
    mongoose_1.default.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Połączono z bazą danych');
}
catch (err) {
    console.error('Błąd podczas łączenia z bazą danych:', err);
}
