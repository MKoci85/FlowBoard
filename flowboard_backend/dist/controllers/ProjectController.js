"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const Project_1 = __importDefault(require("../models/Project"));
class ProjectController {
    static createProject = async (req, res) => {
        const project = new Project_1.default(req.body);
        project.manager = req.user.id;
        try {
            await project.save();
            res.send('Project created successfully');
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    static getAllProjects = async (req, res) => {
        try {
            const projects = await Project_1.default.find({
                $or: [
                    { manager: { $in: req.user.id } },
                    { team: { $in: req.user.id } }
                ]
            });
            res.json(projects);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    static getProjectById = async (req, res) => {
        try {
            const project = await Project_1.default.findById(req.params.id).populate({
                path: 'tasks',
                populate: [
                    { path: 'completedBy.user', model: 'User', select: 'id name email' },
                    { path: 'notes', model: 'Note', populate: { path: 'createdBy', model: 'User', select: 'id name email' } }
                ]
            });
            if (!project) {
                res.status(404).json({ message: 'Project not found.' });
                return;
            }
            if (project.manager.toString() !== req.user.id && !project.team.includes(req.user.id)) {
                res.status(401).json({ message: 'Unauthorized!' });
                return;
            }
            res.json(project);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    static updateProject = async (req, res) => {
        const { projectName, clientName, description } = req.body;
        try {
            req.project.projectName = projectName;
            req.project.clientName = clientName;
            req.project.description = description;
            await req.project.save();
            res.send('Project updated successfully');
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    static deleteProject = async (req, res) => {
        try {
            await req.project.deleteOne();
            res.send('Project deleted successfully');
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}
exports.ProjectController = ProjectController;
//# sourceMappingURL=ProjectController.js.map