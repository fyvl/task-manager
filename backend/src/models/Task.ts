import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  number: number;
  title: string;
  description: string;
  createdAt: Date;
  dueDate?: Date;
  tags?: string[];
}

const TaskSchema: Schema = new Schema({
  number: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  dueDate: { type: Date },
  tags: [{ type: String }],
});

export default mongoose.model<ITask>('Task', TaskSchema);