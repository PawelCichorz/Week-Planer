"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
require("./db/mongoose");
const app = (0, express_1.default)();
app.use((0, express_session_1.default)({
    secret: 'klominkaa',
    saveUninitialized: true,
    cookie: { maxAge: 3600000 },
    resave: false
}));
app.use((0, cors_1.default)({
    origin: true,
    credentials: true
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Import API router
const api_1 = __importDefault(require("./routes/api"));
app.use('/', api_1.default);
app.listen(config_1.default.port, () => {
    console.log('Serwer Chodzi');
});
