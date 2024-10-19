import mongoose, {Schema, Document, Types } from 'mongoose'

const taskStatus = {
    PENDING: 'pending',
    ON_HOLD: 'onHold',
    IN_PROGRESS: 'inProgress',
    UNDER_REVIEW: 'underReview',
    COMPLETED: 'completed'
} as const

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]

export interface ITask extends Document {
    name: string
    description: string
    status: TaskStatus
    project: Types.ObjectId
}

export const TaskSchema = new Schema({
    name: { 
        type: String,
        trim: true,
        required: true 
    },
    description: { 
        type: String, 
        trim: true,
        required: true 
    },
    status: { 
        type: String, 
        required: true,
        enum: Object.values(taskStatus),
        default: taskStatus.PENDING
    },
    project: { 
        type: Types.ObjectId, 
        ref: 'Project' 
    }
}, { timestamps: true })

export default mongoose.model<ITask>('Task', TaskSchema)

