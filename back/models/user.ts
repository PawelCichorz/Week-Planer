import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    email: string;
    password: string;
    refreshToken: string;
}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true 
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [4, 'hasło powinno zawierać co najmniej 4 znaki']
    },
    refreshToken: { type: String }
});


userSchema.pre<IUser>('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    const hashedPassword = await bcrypt.hash(this.password, 10); 
    this.password = hashedPassword;
    next();
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;