"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const noteActions_1 = __importDefault(require("../actions/noteActions"));
const userController = __importStar(require("../actions/user-controler"));
router.get('/', function hello(req, res) {
    res.send("siema");
});
// Poniedziałek
// Pobieranie notatek
router.get('/notesm', noteActions_1.default.getAllnotesM);
// Pobieranie konkretnej notatki
router.get('/notesm/:id', noteActions_1.default.getNoteM);
// Zapisywanie
router.post('/notesm', noteActions_1.default.saveNoteM);
// Edytowanie
router.put('/notesm/:id', noteActions_1.default.updateNoteM);
// Usuwanie
router.delete('/notesm/:id', noteActions_1.default.deleteNoteM);
// Wtorek
// Pobieranie notatek
router.get('/notest', noteActions_1.default.getAllnotesT);
// Pobieranie konkretnej notatki
router.get('/notest/:id', noteActions_1.default.getNoteT);
// Zapisywanie
router.post('/notest', noteActions_1.default.saveNoteT);
// Edytowanie
router.put('/notest/:id', noteActions_1.default.updateNoteT);
// Usuwanie
router.delete('/notest/:id', noteActions_1.default.deleteNoteT);
// Środa
// Pobieranie notatek
router.get('/notesw', noteActions_1.default.getAllnotesW);
// Pobieranie konkretnej notatki
router.get('/notesw/:id', noteActions_1.default.getNoteW);
// Zapisywanie
router.post('/notesw', noteActions_1.default.saveNoteW);
// Edytowanie
router.put('/notesw/:id', noteActions_1.default.updateNoteW);
// Usuwanie
router.delete('/notesw/:id', noteActions_1.default.deleteNoteW);
// Czwartek
// Pobieranie notatek
router.get('/notesth', noteActions_1.default.getAllnotesTh);
// Pobieranie konkretnej notatki
router.get('/notesth/:id', noteActions_1.default.getNoteTh);
// Zapisywanie
router.post('/notesth', noteActions_1.default.saveNoteTh);
// Edytowanie
router.put('/notesth/:id', noteActions_1.default.updateNoteTh);
// Usuwanie
router.delete('/notesth/:id', noteActions_1.default.deleteNoteTh);
// Piątek
// Pobieranie notatek
router.get('/notesf', noteActions_1.default.getAllnotesF);
// Pobieranie konkretnej notatki
router.get('/notesf/:id', noteActions_1.default.getNoteF);
// Zapisywanie
router.post('/notesf', noteActions_1.default.saveNoteF);
// Edytowanie
router.put('/notesf/:id', noteActions_1.default.updateNoteF);
// Usuwanie
router.delete('/notesf/:id', noteActions_1.default.deleteNoteF);
// Sobota
router.get('/notess', noteActions_1.default.getAllnotesS);
router.get('/notess/:id', noteActions_1.default.getNoteS);
router.post('/notess', noteActions_1.default.saveNoteS);
router.put('/notess/:id', noteActions_1.default.updateNoteS);
router.delete('/notess/:id', noteActions_1.default.deleteNoteS);
// Niedziela
router.get('/notessu', noteActions_1.default.getAllnotesSu);
router.get('/notessu/:id', noteActions_1.default.getNoteSu);
router.post('/notessu', noteActions_1.default.saveNoteSu);
router.put('/notessu/:id', noteActions_1.default.updateNoteSu);
router.delete('/notessu/:id', noteActions_1.default.deleteNoteSu);
// Rejestracja
router.post('/zarejestruj', userController.register);
// Logowanie
router.post('/logowanie', userController.login);
exports.default = router;
