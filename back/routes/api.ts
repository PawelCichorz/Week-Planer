import express from 'express';
const router = express.Router();

import noteActions from '../actions/noteActions';
import * as userController from '../actions/user-controler';

router.get('/', function hello(req, res) {
    res.send("siema");
});

router.get('/notes', noteActions.getAllNotes);
router.get('/notes/:id', noteActions.getNote);
router.post('/notes', noteActions.saveNote);
router.put('/notes/:id', noteActions.updateNote);
router.delete('/notes/:id', noteActions.deleteNote);

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

export default router;