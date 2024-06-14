import mongoose, { Schema, Document } from 'mongoose';

export interface INoteSo extends Document {
    title: string;
    body: string;
    userId: mongoose.Types.ObjectId

}

const NoteSoSchema: Schema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }



});

const NoteSoModel = mongoose.model<INoteSo>('NoteS', NoteSoSchema);

export default NoteSoModel;