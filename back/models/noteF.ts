import mongoose, { Schema, Document } from 'mongoose';

export interface INotePi extends Document {
    title: string;
    body: string;
    userId: mongoose.Types.ObjectId}

const NotePiSchema: Schema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }}
);

const NotePiModel = mongoose.model<INotePi>('NoteF', NotePiSchema);

export default NotePiModel;