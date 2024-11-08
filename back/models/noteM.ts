import mongoose, { Schema, Document } from 'mongoose';

export interface NoteM extends Document {
    title: string;
    body: string;
    userId: mongoose.Types.ObjectId;
day:string}

const NotePSchema: Schema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    day:{ type: String, required: true }}
);

const NoteM = mongoose.model<NoteM>('Note', NotePSchema);

export default NoteM;