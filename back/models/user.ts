import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    comparePassword(password: string): boolean;
}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true // Pole jest unikatowe
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [4, 'hasło powinno zawierać co najmniej 4 znaki']
    }
});

userSchema.methods.comparePassword = function(password: string): boolean {
    return password === this.password;
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;