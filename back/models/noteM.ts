import mongoose, { Schema, Document } from 'mongoose';

export interface INoteP extends Document {
    title: string;
    body: string;
}

const NotePSchema: Schema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true }
});

const NotePModel = mongoose.model<INoteP>('NoteM', NotePSchema);

export default NotePModel;