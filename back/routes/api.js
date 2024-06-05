const express = require('express')
const router = express.Router()

const noteActions = require('../actions/noteActions')
const userControler = require('../actions/user-controler')


router.get('/', function hello(req,res) {
    
    res.send("siema")
} )
//Poniedziałek

//pobieranie notatek
router.get('/notesm',noteActions.getAllnotesM)
//pobieranie konkretnej notatki
router.get('/notesm/:id',noteActions.getNoteM)
//zapisywanie
router.post('/notesm',noteActions.saveNoteM)
//edytowanie
router.put('/notesm/:id',noteActions.updateNoteM)
//usuwanie
router.delete('/notesm/:id',noteActions.deleteNoteM)

//Wtorek

//pobieranie notatek
router.get('/notest',noteActions.getAllnotesT)
//pobieranie konkretnej notatki
router.get('/notest/:id',noteActions.getNoteT)
//zapisywanie
router.post('/notest',noteActions.saveNoteT)
//edytowanie
router.put('/notest/:id',noteActions.updateNoteT)
//usuwanie
router.delete('/notest/:id',noteActions.deleteNoteT)

//środa
//pobieranie notatek
router.get('/notesw',noteActions.getAllnotesS)
//pobieranie konkretnej notatki
router.get('/notesw/:id',noteActions.getNoteS)
//zapisywanie
router.post('/notesw',noteActions.saveNoteS)
//edytowanie
router.put('/notesw/:id',noteActions.updateNoteS)
//usuwanie
router.delete('/notesw/:id',noteActions.deleteNoteS)


//czwartek
router.get('/notesth',noteActions.getAllnotesC)
//pobieranie konkretnej notatki
router.get('/notesth/:id',noteActions.getNoteC)
//zapisywanie
router.post('/notesth',noteActions.saveNoteC)
//edytowanie
router.put('/notesth/:id',noteActions.updateNoteC)
//usuwanie
router.delete('/notesth/:id',noteActions.deleteNoteC)


//piątek
router.get('/notesf',noteActions.getAllnotesP)
//pobieranie konkretnej notatki
router.get('/notesf/:id',noteActions.getNoteP)
//zapisywanie
router.post('/notesf',noteActions.saveNoteP)
//edytowanie
router.put('/notesf/:id',noteActions.updateNoteP)
//usuwanie
router.delete('/notesf/:id',noteActions.deleteNoteP)

//sobota


router.get('/notess',noteActions.getAllnotesSo)
//pobieranie konkretnej notatki
router.get('/notess/:id',noteActions.getNoteSo)
//zapisywanie
router.post('/notess',noteActions.saveNoteSo)
//edytowanie
router.put('/notess/:id',noteActions.updateNoteSo)
//usuwanie
router.delete('/notess/:id',noteActions.deleteNoteSo)

//niedziela
router.get('/notessu',noteActions.getAllnotesN)
//pobieranie konkretnej notatki
router.get('/notessu/:id',noteActions.getNoteN)
//zapisywanie
router.post('/notessu',noteActions.saveNoteN)
//edytowanie
router.put('/notessu/:id',noteActions.updateNoteN)
//usuwanie
router.delete('/notessu/:id',noteActions.deleteNoteN)

//rejestracja
router.post('/zarejestruj',userControler.register)

//logowanie
router.post('/logowanie',userControler.login)


    module.exports= router