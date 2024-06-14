import mongoose, { Schema, Document } from 'mongoose';

export interface INoteS extends Document {
    title: string;
    body: string;
    userId: mongoose.Types.ObjectId}

const NoteSSchema: Schema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }}
);

const NoteSModel = mongoose.model<INoteS>('NoteW', NoteSSchema);

export default NoteSModel;