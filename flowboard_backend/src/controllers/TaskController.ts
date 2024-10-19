import type { Request, Response } from 'express'
import Task from '../models/Task'
import Project from '../models/Project'

export class TaskController {

    static createTask = async (req: Request, res: Response) => {
        try {
            const task = new Task(req.body)
            task.project = req.project.id
            req.project.tasks.push(task.id)
            await Promise.allSettled([task.save(), req.project.save()])
            res.send('Task created successfully')
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static getAllTasks = async (req: Request, res: Response) => {
        try {
            const { projectId } = req.params
            const tasks = await Task.find({ project: projectId }).populate('project')
            res.json(tasks)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static getTaskById = async (req: Request, res: Response) => {
        try {
            if (req.task.project._id.toString() !== req.project.id) {
                res.status(403).json({ message: 'Task does not belong to this project' })
                return
            }
            res.json(req.task)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static updateTask = async (req: Request, res: Response) => {
        try {
            req.task.name = req.body.name
            req.task.description = req.body.description
            await req.task.save()
            res.send('Task updated successfully')
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static deleteTask = async (req: Request, res: Response) => {
        try {
            req.project.tasks = req.project.tasks.filter(task => task.toString() !== req.task.id)
            await Promise.allSettled([req.task.deleteOne(), req.project.save()])
            res.send('Task deleted successfully')
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static updateTaskStatus = async (req: Request, res: Response) => {
        try {
            req.task.status = req.body.status
            await req.task.save()
            res.send('Task status updated successfully')
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

}