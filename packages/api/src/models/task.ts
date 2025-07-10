import { Schema, Document, model } from 'mongoose';

export interface ITask extends Document {
    title: string;
    desc: string;
    status: string;
    priority: string;
    dueDate: number;
    allDay: boolean;
    completed: boolean;
}

const TaskSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    title: String,
    desc: String,
    status: String,
    priority: String,
    dueDate: Number,
    allDay: Boolean,
    completed: Boolean,
});

export default model<ITask>('Task', TaskSchema);
