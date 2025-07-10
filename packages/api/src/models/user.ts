import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export default model<IUser>('User', UserSchema);
