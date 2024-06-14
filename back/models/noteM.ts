import mongoose, { Schema, Document } from 'mongoose';

export interface INoteP extends Document {
    title: string;
    body: string;
    userId: mongoose.Types.ObjectId}

const NotePSchema: Schema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }}
);

const NotePModel = mongoose.model<INoteP>('NoteM', NotePSchema);

export default NotePModel;