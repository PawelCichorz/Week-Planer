import express from 'express';
const router = express.Router();
import NoteM from '../models/noteM'

import noteActions from '../actions/noteActions';
import * as userController from '../actions/user-controler';
import {  verifyToken ,refreshAccessToken} from '../middleware/auth';
router.get('/', function hello(req, res) {
    res.send("siema Paweł");
});
const actions = noteActions(NoteM)


router.get('/notes', verifyToken,actions.getAllNotes);
router.get('/notes/:id',verifyToken, actions.getNote);
router.post('/notes', verifyToken,actions.saveNote);
router.put('/notes/:id', verifyToken,actions.updateNote);
router.delete('/notes/:id', verifyToken,actions.deleteNote);
router.post('/refresh-token',refreshAccessToken );


router.post('/zarejestruj', userController.register);

router.post('/logowanie', userController.login);

router.put('/change-password', verifyToken,userController.changePassword);

router.put('/reset-password', userController.sendResetPasswordEmail);

export default router;