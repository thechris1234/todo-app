import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    createdAt: number;
    __v: number;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Number, default: Date.now },
});

export default model<IUser>('accounts', UserSchema);
