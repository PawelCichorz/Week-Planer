"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
try {
    mongoose_1.default.connect(config_1.default.database, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Połączono z bazą danych');
}
catch (err) {
    console.error('Błąd podczas łączenia z bazą danych:', err);
}
