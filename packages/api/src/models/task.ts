import { Schema, Document, model } from 'mongoose';

export interface ITask extends Document {
    _id: string;
    owner_Id: string;
    title: string;
    desc: string;
    status: string;
    priority: string;
    dueDate: number;
    allDay: boolean;
    completed: boolean;
    createdAt: number;
    updatedAt: number;
    __v: number;
}

const TaskSchema = new Schema({
    owner_Id: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String },
    status: { type: String, required: true },
    priority: { type: String, required: true },
    dueDate: { type: Number },
    allDay: { type: Boolean, required: true, default: false },
    completed: { type: Boolean, required: true, default: false },
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: Date.now },
});

export default model<ITask>('tasks', TaskSchema);
