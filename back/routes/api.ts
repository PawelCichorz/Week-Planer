import express from 'express';
const router = express.Router();

import noteActions from '../actions/noteActions';
import * as userController from '../actions/user-controler';
import {  verifyToken ,refreshAccessToken} from '../middleware/auth';
router.get('/', function hello(req, res) {
    res.send("siema Paweł");
});


router.get('/notes', verifyToken,noteActions.getAllNotes);
router.get('/notes/:id',verifyToken, noteActions.getNote);
router.post('/notes', verifyToken,noteActions.saveNote);
router.put('/notes/:id', verifyToken,noteActions.updateNote);
router.delete('/notes/:id', verifyToken,noteActions.deleteNote);
router.post('/refresh-token',refreshAccessToken );



// Rejestracja
router.post('/zarejestruj', userController.register);

// Logowanie
router.post('/logowanie', userController.login);
//zmiana hasła

router.put('/change-password', verifyToken,userController.changePassword);
//reset hasła
router.put('/reset-password', userController.sendResetPasswordEmail);

export default router;