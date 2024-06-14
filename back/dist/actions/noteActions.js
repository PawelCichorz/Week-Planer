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
const noteW_1 = __importDefault(require("../models/noteW"));
const noteT_1 = __importDefault(require("../models/noteT"));
const noteTh_1 = __importDefault(require("../models/noteTh"));
const noteF_1 = __importDefault(require("../models/noteF"));
const noteS_1 = __importDefault(require("../models/noteS"));
const noteSu_1 = __importDefault(require("../models/noteSu"));
const mongoose_1 = __importDefault(require("mongoose"));
const noteActions = {
    // Poniedziałek
    saveNoteM(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.session.user);
            const { title, body } = req.body;
            const email = req.body.email;
            const userId = `${email}12345`;
            const newNote = new noteM_1.default({
                title,
                body,
                userId
            });
            yield newNote.save();
            res.json(newNote);
        });
    },
    getAllnotesM(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = new mongoose_1.default.Types.ObjectId(req.session.user);
            const doc = yield noteM_1.default.find({ userId });
            res.json(doc);
        });
    },
    getNoteM(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const note = yield noteM_1.default.findOne({ _id: id });
            res.json(note);
        });
    },
    updateNoteM(req, res) {
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
    deleteNoteM(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield noteM_1.default.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                return res.status(404).json({ error: "Note not found" });
            }
            res.send(`Note deleted: ${id}`);
        });
    },
    // Wtorek
    saveNoteT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, body } = req.body;
            const userId = new mongoose_1.default.Types.ObjectId(req.session.user);
            const newNote = new noteT_1.default({
                title,
                body,
                userId
            });
            yield newNote.save();
            res.json(newNote);
        });
    },
    getAllnotesT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = new mongoose_1.default.Types.ObjectId(req.session.user);
            const doc = yield noteT_1.default.find({ userId });
            res.json(doc);
        });
    },
    getNoteT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const note = yield noteT_1.default.findOne({ _id: id });
            res.json(note);
        });
    },
    updateNoteT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, body } = req.body;
            const { id } = req.params;
            const note = yield noteT_1.default.findOne({ _id: id });
            if (!note) {
                return res.status(404).json({ error: "Note not found" });
            }
            note.title = title;
            note.body = body;
            yield note.save();
            res.json(note);
        });
    },
    deleteNoteT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield noteT_1.default.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                return res.status(404).json({ error: "Note not found" });
            }
            res.send(`Note deleted: ${id}`);
        });
    },
    // Środa
    saveNoteW(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, body } = req.body;
            const userId = new mongoose_1.default.Types.ObjectId(req.session.user);
            const newNote = new noteW_1.default({
                title,
                body,
                userId
            });
            yield newNote.save();
            res.json(newNote);
        });
    },
    getAllnotesW(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = new mongoose_1.default.Types.ObjectId(req.session.user);
            const doc = yield noteW_1.default.find({ userId });
            res.json(doc);
        });
    },
    getNoteW(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const note = yield noteW_1.default.findOne({ _id: id });
            res.json(note);
        });
    },
    updateNoteW(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, body } = req.body;
            const { id } = req.params;
            const note = yield noteW_1.default.findOne({ _id: id });
            if (!note) {
                return res.status(404).json({ error: "Note not found" });
            }
            note.title = title;
            note.body = body;
            yield note.save();
            res.json(note);
        });
    },
    deleteNoteW(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield noteW_1.default.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                return res.status(404).json({ error: "Note not found" });
            }
            res.send(`Note deleted: ${id}`);
        });
    },
    // Czwartek
    saveNoteTh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = new mongoose_1.default.Types.ObjectId(req.session.user);
            const { title, body } = req.body;
            const newNote = new noteTh_1.default({
                title,
                body,
                userId
            });
            yield newNote.save();
            res.json(newNote);
        });
    },
    getAllnotesTh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = new mongoose_1.default.Types.ObjectId(req.session.user);
            const doc = yield noteTh_1.default.find({ userId });
            res.json(doc);
        });
    },
    getNoteTh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const note = yield noteTh_1.default.findOne({ _id: id });
            res.json(note);
        });
    },
    updateNoteTh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, body } = req.body;
            const { id } = req.params;
            const note = yield noteTh_1.default.findOne({ _id: id });
            if (!note) {
                return res.status(404).json({ error: "Note not found" });
            }
            note.title = title;
            note.body = body;
            yield note.save();
            res.json(note);
        });
    },
    deleteNoteTh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield noteTh_1.default.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                return res.status(404).json({ error: "Note not found" });
            }
            res.send(`Note deleted: ${id}`);
        });
    },
    // Piątek
    saveNoteF(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = new mongoose_1.default.Types.ObjectId(req.session.user);
            const { title, body } = req.body;
            const newNote = new noteF_1.default({
                title,
                body,
                userId
            });
            yield newNote.save();
            res.json(newNote);
        });
    },
    getAllnotesF(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = new mongoose_1.default.Types.ObjectId(req.session.user);
            const doc = yield noteF_1.default.find({ userId });
            res.json(doc);
        });
    },
    getNoteF(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const note = yield noteF_1.default.findOne({ _id: id });
            res.json(note);
        });
    },
    updateNoteF(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, body } = req.body;
            const { id } = req.params;
            const note = yield noteF_1.default.findOne({ _id: id });
            if (!note) {
                return res.status(404).json({ error: "Note not found" });
            }
            note.title = title;
            note.body = body;
            yield note.save();
            res.json(note);
        });
    },
    deleteNoteF(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield noteF_1.default.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                return res.status(404).json({ error: "Note not found" });
            }
            res.send(`Note deleted: ${id}`);
        });
    },
    // Sobota
    saveNoteS(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = new mongoose_1.default.Types.ObjectId(req.session.user);
            const { title, body } = req.body;
            const newNote = new noteS_1.default({
                title,
                body,
                userId
            });
            yield newNote.save();
            res.json(newNote);
        });
    },
    getAllnotesS(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = new mongoose_1.default.Types.ObjectId(req.session.user);
            const doc = yield noteS_1.default.find({ userId });
            res.json(doc);
        });
    },
    getNoteS(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const note = yield noteS_1.default.findOne({ _id: id });
            res.json(note);
        });
    },
    updateNoteS(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, body } = req.body;
            const { id } = req.params;
            const note = yield noteS_1.default.findOne({ _id: id });
            if (!note) {
                return res.status(404).json({ error: "Note not found" });
            }
            note.title = title;
            note.body = body;
            yield note.save();
            res.json(note);
        });
    },
    deleteNoteS(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield noteS_1.default.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                return res.status(404).json({ error: "Note not found" });
            }
            res.send(`Note deleted: ${id}`);
        });
    },
    // Niedziela
    saveNoteSu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = new mongoose_1.default.Types.ObjectId(req.session.user);
            const { title, body } = req.body;
            const newNote = new noteSu_1.default({
                title,
                body,
                userId
            });
            yield newNote.save();
            res.json(newNote);
        });
    },
    getAllnotesSu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = new mongoose_1.default.Types.ObjectId(req.session.user);
            const doc = yield noteSu_1.default.find({ userId });
            res.json(doc);
        });
    },
    getNoteSu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const note = yield noteSu_1.default.findOne({ _id: id });
            res.json(note);
        });
    },
    updateNoteSu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, body } = req.body;
            const { id } = req.params;
            const note = yield noteSu_1.default.findOne({ _id: id });
            if (!note) {
                return res.status(404).json({ error: "Note not found" });
            }
            note.title = title;
            note.body = body;
            yield note.save();
            res.json(note);
        });
    },
    deleteNoteSu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield noteSu_1.default.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                return res.status(404).json({ error: "Note not found" });
            }
            res.send(`Note deleted: ${id}`);
        });
    },
};
exports.default = noteActions;
