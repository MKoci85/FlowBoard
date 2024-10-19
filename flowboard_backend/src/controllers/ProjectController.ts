import type { Request, Response } from 'express'
import Project from '../models/Project'

export class ProjectController {

    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body)
        try {
            await project.save()
            res.send('Project created successfully')
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static getAllProjects = async (req: Request, res: Response) => {
        try {   
            const projects = await Project.find({})
            res.json(projects)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static getProjectById = async (req: Request, res: Response) => {
        try {
            const project = await Project.findById(req.params.id).populate('tasks')
            if (!project) {
                res.status(404).json({ message: 'Project not found' })
                return
            }
            res.json(project)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static updateProject = async (req: Request, res: Response) => {
        const { id } = req.params
        const { projectName, clientName, description } = req.body
        try {
            const project = await Project.findById(id)
            if (!project) {
                res.status(404).json({ message: 'Project not found' })
                return
            }
            project.projectName = projectName
            project.clientName = clientName
            project.description = description
            await project.save()
            res.send('Project updated successfully')
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static deleteProject = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const project = await Project.findById(id)
            if (!project) {
                res.status(404).json({ message: 'Project not found' })
                return
            }
            await project.deleteOne()
            res.send('Project deleted successfully')
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}
