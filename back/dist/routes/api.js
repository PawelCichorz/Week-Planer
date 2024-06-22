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
    res.send("siema Paweł");
});
router.get('/notes', noteActions_1.default.getAllNotes);
router.get('/notes/:id', noteActions_1.default.getNote);
router.post('/notes', noteActions_1.default.saveNote);
router.put('/notes/:id', noteActions_1.default.updateNote);
router.delete('/notes/:id', noteActions_1.default.deleteNote);
// // Poniedziałek
// // Pobieranie notatek
// router.get('/notesm', noteActions.getAllnotesM);
// // Pobieranie konkretnej notatki
// router.get('/notesm/:id', noteActions.getNoteM);
// // Zapisywanie
// router.post('/notesm', noteActions.saveNoteM);
// // Edytowanie
// router.put('/notesm/:id', noteActions.updateNoteM);
// // Usuwanie
// router.delete('/notesm/:id', noteActions.deleteNoteM);
// // Wtorek
// // Pobieranie notatek
// router.get('/notest', noteActions.getAllnotesT);
// // Pobieranie konkretnej notatki
// router.get('/notest/:id', noteActions.getNoteT);
// // Zapisywanie
// router.post('/notest', noteActions.saveNoteT);
// // Edytowanie
// router.put('/notest/:id', noteActions.updateNoteT);
// // Usuwanie
// router.delete('/notest/:id', noteActions.deleteNoteT);
// // Środa
// // Pobieranie notatek
// router.get('/notesw', noteActions.getAllnotesW);
// // Pobieranie konkretnej notatki
// router.get('/notesw/:id', noteActions.getNoteW);
// // Zapisywanie
// router.post('/notesw', noteActions.saveNoteW);
// // Edytowanie
// router.put('/notesw/:id', noteActions.updateNoteW);
// // Usuwanie
// router.delete('/notesw/:id', noteActions.deleteNoteW);
// // Czwartek
// // Pobieranie notatek
// router.get('/notesth', noteActions.getAllnotesTh);
// // Pobieranie konkretnej notatki
// router.get('/notesth/:id', noteActions.getNoteTh);
// // Zapisywanie
// router.post('/notesth', noteActions.saveNoteTh);
// // Edytowanie
// router.put('/notesth/:id', noteActions.updateNoteTh);
// // Usuwanie
// router.delete('/notesth/:id', noteActions.deleteNoteTh);
// // Piątek
// // Pobieranie notatek
// router.get('/notesf', noteActions.getAllnotesF);
// // Pobieranie konkretnej notatki
// router.get('/notesf/:id', noteActions.getNoteF);
// // Zapisywanie
// router.post('/notesf', noteActions.saveNoteF);
// // Edytowanie
// router.put('/notesf/:id', noteActions.updateNoteF);
// // Usuwanie
// router.delete('/notesf/:id', noteActions.deleteNoteF);
// // Sobota
// router.get('/notess', noteActions.getAllnotesS);
// router.get('/notess/:id', noteActions.getNoteS);
// router.post('/notess', noteActions.saveNoteS);
// router.put('/notess/:id', noteActions.updateNoteS);
// router.delete('/notess/:id', noteActions.deleteNoteS);
// // Niedziela
// router.get('/notessu', noteActions.getAllnotesSu);
// router.get('/notessu/:id', noteActions.getNoteSu);
// router.post('/notessu', noteActions.saveNoteSu);
// router.put('/notessu/:id', noteActions.updateNoteSu);
// router.delete('/notessu/:id', noteActions.deleteNoteSu);
// Rejestracja
router.post('/zarejestruj', userController.register);
// Logowanie
router.post('/logowanie', userController.login);
exports.default = router;
