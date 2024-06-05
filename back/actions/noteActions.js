const mongoose = require('mongoose')



const NoteP = require('../models/noteP')
const NoteW = require ('../models/noteW')
const NoteS = require('../models/noteS')
const NoteC = require('../models/noteC')
const NotePi = require('../models/notePi')
const NoteSo = require('../models/noteSo')
const NoteN = require('../models/noteN')
module.exports = {
   //poniedziałek
    async saveNoteM(req,res) {
        const title = req.body.title
        const body = req.body.body
        const newNote = new NoteP({
            title,
            body
        })
        await newNote.save()
 
  
res.json(newNote)
        
    },

    async getAllnotesM(req,res) {
    const doc = await NoteP.find({})
            res.json(doc)
        }
        
    ,


    async getNoteM(req,res) {
        const id = req.params.id
        const note = await NoteP.findOne({_id: id})
        res.json(note)
    },
    async updateNoteM(req,res) {
        const title = req.body.title
        const body = req.body.body
        const id = req.params.id
        const note = await NoteP.findOne({_id: id})
        note.title=title
        note.body=body
        await note.save()
        res.json(note)
    },
    async deleteNoteM(req,res) {
        const id = req.params.id
        await NoteP.deleteOne({_id:id})
        res.send(`notatka zostałą usunieta ${id}`)
    },
   

    //wtorek
    async saveNoteT(req,res) {
        const title = req.body.title
        const body = req.body.body
        const newNote = new NoteW({
            title,
            body
        })
        await newNote.save()
 
  
res.json(newNote)
        
    },

    async getAllnotesT(req,res) {
    const doc = await NoteW.find({})
            res.json(doc)
        }
        
    ,


    async getNoteT(req,res) {
        const id = req.params.id
        const note = await NoteW.findOne({_id: id})
        res.json(note)
    },
    async updateNoteT(req,res) {
        const title = req.body.title
        const body = req.body.body
        const id = req.params.id
        const note = await NoteW.findOne({_id: id})
        note.title=title
        note.body=body
        await note.save()
        res.json(note)
    },
    async deleteNoteT(req,res) {
        const id = req.params.id
        await NoteW.deleteOne({_id:id})
        res.send(`notatka zostałą usunieta ${id}`)
    },

    //sroda

    async saveNoteS(req,res) {
        const title = req.body.title
        const body = req.body.body
        const newNote = new NoteS({
            title,
            body
        })
        await newNote.save()
 
  
res.json(newNote)
        
    },

    async getAllnotesS(req,res) {
    const doc = await NoteS.find({})
            res.json(doc)
        }
        
    ,


    async getNoteS(req,res) {
        const id = req.params.id
        const note = await NoteS.findOne({_id: id})
        res.json(note)
    },
    async updateNoteS(req,res) {
        const title = req.body.title
        const body = req.body.body
        const id = req.params.id
        const note = await NoteS.findOne({_id: id})
        note.title=title
        note.body=body
        await note.save()
        res.json(note)
    },
    async deleteNoteS(req,res) {
        const id = req.params.id
        await NoteS.deleteOne({_id:id})
        res.send(`notatka zostałą usunieta ${id}`)
    },
//czwartek
async saveNoteC(req,res) {
    const title = req.body.title
    const body = req.body.body
    const newNote = new NoteC({
        title,
        body
    })
    await newNote.save()


res.json(newNote)
    
},

async getAllnotesC(req,res) {
const doc = await NoteC.find({})
        res.json(doc)
    }
    
,


async getNoteC(req,res) {
    const id = req.params.id
    const note = await NoteC.findOne({_id: id})
    res.json(note)
},
async updateNoteC(req,res) {
    const title = req.body.title
    const body = req.body.body
    const id = req.params.id
    const note = await NoteC.findOne({_id: id})
    note.title=title
    note.body=body
    await note.save()
    res.json(note)
},
async deleteNoteC(req,res) {
    const id = req.params.id
    await NoteC.deleteOne({_id:id})
    res.send(`notatka zostałą usunieta ${id}`)
},

//piątek
async saveNoteP(req,res) {
    const title = req.body.title
    const body = req.body.body
    const newNote = new NotePi({
        title,
        body
    })
    await newNote.save()


res.json(newNote)
    
},

async getAllnotesP(req,res) {
const doc = await NotePi.find({})
        res.json(doc)
    }
    
,


async getNoteP(req,res) {
    const id = req.params.id
    const note = await NotePi.findOne({_id: id})
    res.json(note)
},
async updateNoteP(req,res) {
    const title = req.body.title
    const body = req.body.body
    const id = req.params.id
    const note = await NotePi.findOne({_id: id})
    note.title=title
    note.body=body
    await note.save()
    res.json(note)
},
async deleteNoteP(req,res) {
    const id = req.params.id
    await NotePi.deleteOne({_id:id})
    res.send(`notatka zostałą usunieta ${id}`)
},

//sobota
async saveNoteSo(req,res) {
    const title = req.body.title
    const body = req.body.body
    const newNote = new NoteSo({
        title,
        body
    })
    await newNote.save()


res.json(newNote)
    
},

async getAllnotesSo(req,res) {
const doc = await NoteSo.find({})
        res.json(doc)
    }
    
,


async getNoteSo(req,res) {
    const id = req.params.id
    const note = await NoteSo.findOne({_id: id})
    res.json(note)
},
async updateNoteSo(req,res) {
    const title = req.body.title
    const body = req.body.body
    const id = req.params.id
    const note = await NoteSo.findOne({_id: id})
    note.title=title
    note.body=body
    await note.save()
    res.json(note)
},
async deleteNoteSo(req,res) {
    const id = req.params.id
    await NoteSo.deleteOne({_id:id})
    res.send(`notatka zostałą usunieta ${id}`)
},
//niedziela
async saveNoteN(req,res) {
    const title = req.body.title
    const body = req.body.body
    const newNote = new NoteN({
        title,
        body
    })
    await newNote.save()


res.json(newNote)
    
},

async getAllnotesN(req,res) {
const doc = await NoteN.find({})
        res.json(doc)
    }
    
,


async getNoteN(req,res) {
    const id = req.params.id
    const note = await NoteN.findOne({_id: id})
    res.json(note)
},
async updateNoteN(req,res) {
    const title = req.body.title
    const body = req.body.body
    const id = req.params.id
    const note = await NoteN.findOne({_id: id})
    note.title=title
    note.body=body
    await note.save()
    res.json(note)
},
async deleteNoteN(req,res) {
    const id = req.params.id
    await NoteN.deleteOne({_id:id})
    res.send(`notatka zostałą usunieta ${id}`)
},
}

