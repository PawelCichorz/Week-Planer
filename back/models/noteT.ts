import mongoose, { Schema, Document } from 'mongoose';

export interface INoteW extends Document {
    title: string;
    body: string;
    userId: mongoose.Types.ObjectId}

const NoteWSchema: Schema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }}
);

const NoteWModel = mongoose.model<INoteW>('NoteT', NoteWSchema);

export default NoteWModel;