import { Request, Response } from 'express';
// import NoteM from '../models/noteM';
import { SessionData, Session } from 'express-session';
import { Model } from 'mongoose';



interface NoteRequest extends Request {
    session: Session & Partial<SessionData> & { user?: string };
}

interface NoteModel {
    new (args: { title: string; body: string; userId: string; day: string }): any; // Ustaw odpowiedni typ modelu
    save(): Promise<any>;
    find(query: any): Promise<any>;
    findOne(query: any): Promise<any>;
    deleteOne(query: any): Promise<any>;
}


const noteActions = (noteModel: Model<any>) => ({
   
    async saveNote(req: NoteRequest, res: Response) {
  
        const  userId = req.user!.userId;
        const { title, body ,day  } = req.body;
      
    console.log(req.body)
  
        const newNote = new noteModel({
            title,
            body,
            userId,
            day,
            
        });

        await newNote.save();
        res.status(201).json(newNote); 
    },

    async getAllNotes(req: NoteRequest, res: Response) {
        try {
            const userId = req.user!.userId;
            const doc = await noteModel.find({ userId });
            res.status(200).json(doc);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while fetching notes' });
        }
    },

    async getNote(req: NoteRequest, res: Response) {
        const { id } = req.params;
        const note = await noteModel.findOne({ _id: id });
        res.status(200).json(note)
    },

    async updateNote(req: NoteRequest, res: Response) {
        const { title, body } = req.body;
        const { id } = req.params;
        const note = await noteModel.findOne({ _id: id });
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        note.title = title;
        note.body = body;
        await note.save();
        res.status(200).json(note);
    },

    async deleteNote(req: NoteRequest, res: Response) {
        const { id } = req.params;
        const result = await noteModel.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Note not found" });
        }
        res.status(200).send(`Note deleted: ${id}`)
    },

})

export default noteActions;