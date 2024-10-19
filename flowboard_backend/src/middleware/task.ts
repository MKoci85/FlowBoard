import { isValidObjectId } from 'mongoose'
import type { Request, Response, NextFunction } from 'express'
import Task, { ITask } from '../models/Task'

declare global {
    namespace Express {
        interface Request {
            task: ITask
        }
    }
}

export const taskExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { taskId } = req.params
        if (!isValidObjectId(taskId)) {
            res.status(400).json({ message: 'Invalid task ID' })
            return
        }
        const task = await Task.findById(taskId)
        if (!task) {
            res.status(404).json({ message: 'Task not found' })
            return
        }
        req.task = task
        next()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const taskBelongsToProject = async (req: Request, res: Response, next: NextFunction) => {
    if (req.task.project._id.toString() !== req.project.id) {
        res.status(403).json({ message: 'Task does not belong to this project' })
        return
    }
    next()
}
