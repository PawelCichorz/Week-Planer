import mongoose, { Schema, Document } from 'mongoose';

export interface INoteC extends Document {
    title: string;
    body: string;
    userId: mongoose.Types.ObjectId}

const NoteCSchema: Schema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }}
);

const NoteCModel = mongoose.model<INoteC>('NoteTh', NoteCSchema);

export default NoteCModel;