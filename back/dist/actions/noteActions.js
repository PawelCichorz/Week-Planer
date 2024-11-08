"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const noteM_1 = __importDefault(require("../models/noteM"));
const noteActions = {
    // Poniedziałek
    saveNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, body, day } = req.body;
            const userId = req.session.userId;
            const newNote = new noteM_1.default({
                title,
                body,
                userId,
                day
            });
            yield newNote.save();
            res.json(newNote);
        });
    },
    getAllNotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.session.userId;
            const { day } = req.query;
            const doc = yield noteM_1.default.find({ userId, day });
            res.json(doc);
        });
    },
    getNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const note = yield noteM_1.default.findOne({ _id: id });
            res.json(note);
        });
    },
    updateNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, body } = req.body;
            const { id } = req.params;
            const note = yield noteM_1.default.findOne({ _id: id });
            if (!note) {
                return res.status(404).json({ error: "Note not found" });
            }
            note.title = title;
            note.body = body;
            yield note.save();
            res.json(note);
        });
    },
    deleteNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield noteM_1.default.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                return res.status(404).json({ error: "Note not found" });
            }
            res.send(`Note deleted: ${id}`);
        });
    },
    //     // Wtorek
    //     async saveNoteT(req: NoteRequest, res: Response) {
    //         const { title, body } = req.body;
    //         const userId = req.session.userId
    //         const newNote = new NoteT({
    //             title,
    //             body,
    //             userId
    //         });
    //         await newNote.save();
    //         res.json(newNote);
    //     },
    //     async getAllnotesT(req: NoteRequest, res: Response) {
    //         const userId = req.session.userId
    //         const doc = await NoteT.find({userId});
    //         res.json(doc);
    //     },
    //     async getNoteT(req: NoteRequest, res: Response) {
    //         const { id } = req.params;
    //         const note = await NoteT.findOne({ _id: id });
    //         res.json(note);
    //     },
    //     async updateNoteT(req: NoteRequest, res: Response) {
    //         const { title, body } = req.body;
    //         const { id } = req.params;
    //         const note = await NoteT.findOne({ _id: id });
    //         if (!note) {
    //             return res.status(404).json({ error: "Note not found" });
    //         }
    //         note.title = title;
    //         note.body = body;
    //         await note.save();
    //         res.json(note);
    //     },
    //     async deleteNoteT(req: NoteRequest, res: Response) {
    //         const { id } = req.params;
    //         const result = await NoteT.deleteOne({ _id: id });
    //         if (result.deletedCount === 0) {
    //             return res.status(404).json({ error: "Note not found" });
    //         }
    //         res.send(`Note deleted: ${id}`);
    //     },
    //     // Środa
    //     async saveNoteW(req: NoteRequest, res: Response) {
    //         const { title, body } = req.body;
    //         const userId = req.session.userId
    //         const newNote = new NoteW({
    //             title,
    //             body,
    //             userId
    //         });
    //         await newNote.save();
    //         res.json(newNote);
    //     },
    //     async getAllnotesW(req: NoteRequest, res: Response) {
    //         const userId = req.session.userId
    //         const doc = await NoteW.find({userId});
    //         res.json(doc);
    //     },
    //     async getNoteW(req: NoteRequest, res: Response) {
    //         const { id } = req.params;
    //         const note = await NoteW.findOne({ _id: id });
    //         res.json(note);
    //     },
    //     async updateNoteW(req: NoteRequest, res: Response) {
    //         const { title, body } = req.body;
    //         const { id } = req.params;
    //         const note = await NoteW.findOne({ _id: id });
    //         if (!note) {
    //             return res.status(404).json({ error: "Note not found" });
    //         }
    //         note.title = title;
    //         note.body = body;
    //         await note.save();
    //         res.json(note);
    //     },
    //     async deleteNoteW(req: NoteRequest, res: Response) {
    //         const { id } = req.params;
    //         const result = await NoteW.deleteOne({ _id: id });
    //         if (result.deletedCount === 0) {
    //             return res.status(404).json({ error: "Note not found" });
    //         }
    //         res.send(`Note deleted: ${id}`);
    //     },
    //     // Czwartek
    //     async saveNoteTh(req: NoteRequest, res: Response) {
    //         const userId = req.session.userId
    //         const { title, body } = req.body;
    //         const newNote = new NoteTh({
    //             title,
    //             body,
    //             userId
    //         });
    //         await newNote.save();
    //         res.json(newNote);
    //     },
    //     async getAllnotesTh(req: NoteRequest, res: Response) {
    //         const userId = req.session.userId
    //         const doc = await NoteTh.find({userId});
    //         res.json(doc);
    //     },
    //     async getNoteTh(req: NoteRequest, res: Response) {
    //         const { id } = req.params;
    //         const note = await NoteTh.findOne({ _id: id });
    //         res.json(note);
    //     },
    //     async updateNoteTh(req: NoteRequest, res: Response) {
    //         const { title, body } = req.body;
    //         const { id } = req.params;
    //         const note = await NoteTh.findOne({ _id: id });
    //         if (!note) {
    //             return res.status(404).json({ error: "Note not found" });
    //         }
    //         note.title = title;
    //         note.body = body;
    //         await note.save();
    //         res.json(note);
    //     },
    //     async deleteNoteTh(req: NoteRequest, res: Response) {
    //         const { id } = req.params;
    //         const result = await NoteTh.deleteOne({ _id: id });
    //         if (result.deletedCount === 0) {
    //             return res.status(404).json({ error: "Note not found" });
    //         }
    //         res.send(`Note deleted: ${id}`);
    //     },
    //     // Piątek
    //     async saveNoteF(req: NoteRequest, res: Response) {
    //         const userId = req.session.userId
    //         const { title, body } = req.body;
    //         const newNote = new NoteF({
    //             title,
    //             body,
    //             userId
    //         });
    //         await newNote.save();
    //         res.json(newNote);
    //     },
    //     async getAllnotesF(req: NoteRequest, res: Response) {
    //         const userId = req.session.userId
    //         const doc = await NoteF.find({userId});
    //         res.json(doc);
    //     },
    //     async getNoteF(req: NoteRequest, res: Response) {
    //         const { id } = req.params;
    //         const note = await NoteF.findOne({ _id: id });
    //         res.json(note);
    //     },
    //     async updateNoteF(req: NoteRequest, res: Response) {
    //         const { title, body } = req.body;
    //         const { id } = req.params;
    //         const note = await NoteF.findOne({ _id: id });
    //         if (!note) {
    //             return res.status(404).json({ error: "Note not found" });
    //         }
    //         note.title = title;
    //         note.body = body;
    //         await note.save();
    //         res.json(note);
    //     },
    //     async deleteNoteF(req: NoteRequest, res: Response) {
    //         const { id } = req.params;
    //         const result = await NoteF.deleteOne({ _id: id });
    //         if (result.deletedCount === 0) {
    //             return res.status(404).json({ error: "Note not found" });
    //         }
    //         res.send(`Note deleted: ${id}`);
    //     },
    //     // Sobota
    //     async saveNoteS(req: NoteRequest, res: Response) {
    //         const userId = req.session.userId
    //         const { title, body,day } = req.body;
    //         const newNote = new NoteS({
    //             title,
    //             body,
    //             userId,
    //             day
    //         });
    //         await newNote.save();
    //         res.json(newNote);
    //     },
    //     async getAllnotesS(req: NoteRequest, res: Response) {
    //         const userId = req.session.userId
    //         const doc = await NoteS.find({userId});
    //         res.json(doc);
    //     },
    //     async getNoteS(req: NoteRequest, res: Response) {
    //         const { id } = req.params;
    //         const note = await NoteS.findOne({ _id: id });
    //         res.json(note);
    //     },
    //     async updateNoteS(req: NoteRequest, res: Response) {
    //         const { title, body } = req.body;
    //         const { id } = req.params;
    //         const note = await NoteS.findOne({ _id: id });
    //         if (!note) {
    //             return res.status(404).json({ error: "Note not found" });
    //         }
    //         note.title = title;
    //         note.body = body;
    //         await note.save();
    //         res.json(note);
    //     },
    //     async deleteNoteS(req: NoteRequest, res: Response) {
    //         const { id } = req.params;
    //         const result = await NoteS.deleteOne({ _id: id });
    //         if (result.deletedCount === 0) {
    //             return res.status(404).json({ error: "Note not found" });
    //         }
    //         res.send(`Note deleted: ${id}`);
    //     },
    //     // Niedziela
    //     async saveNoteSu(req: NoteRequest, res: Response) {
    //         const userId = req.session.userId
    //         const { title, body } = req.body;
    //         const newNote = new NoteSu({
    //             title,
    //             body,
    //             userId
    //         });
    //         await newNote.save();
    //         res.json(newNote);
    //     },
    //     async getAllnotesSu(req: NoteRequest, res: Response) {
    //         const userId = req.session.userId
    //         const doc = await NoteSu.find({userId});
    //         res.json(doc);
    //     },
    //     async getNoteSu(req: NoteRequest, res: Response) {
    //         const { id } = req.params;
    //         const note = await NoteSu.findOne({ _id: id });
    //         res.json(note);
    //     },
    //     async updateNoteSu(req: NoteRequest, res: Response) {
    //         const { title, body } = req.body;
    //         const { id } = req.params;
    //         const note = await NoteSu.findOne({ _id: id });
    //         if (!note) {
    //             return res.status(404).json({ error: "Note not found" });
    //         }
    //         note.title = title;
    //         note.body = body;
    //         await note.save();
    //         res.json(note);
    //     },
    //     async deleteNoteSu(req: NoteRequest, res: Response) {
    //         const { id } = req.params;
    //         const result = await NoteSu.deleteOne({ _id: id });
    //         if (result.deletedCount === 0) {
    //             return res.status(404).json({ error: "Note not found" });
    //         }
    //         res.send(`Note deleted: ${id}`);
    //     },
};
exports.default = noteActions;
