import mongoose, { Schema, Document } from 'mongoose';

export interface INoteSo extends Document {
    title: string;
    body: string;
}

const NoteSoSchema: Schema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true }
});

const NoteSoModel = mongoose.model<INoteSo>('NoteS', NoteSoSchema);

export default NoteSoModel;