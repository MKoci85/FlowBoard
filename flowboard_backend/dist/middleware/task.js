"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasAuthorization = exports.taskBelongsToProject = exports.taskExists = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const taskExists = async (req, res, next) => {
    try {
        const { taskId } = req.params;
        const task = await Task_1.default.findById(taskId);
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        req.task = task;
        next();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.taskExists = taskExists;
const taskBelongsToProject = async (req, res, next) => {
    if (req.task.project._id.toString() !== req.project.id) {
        res.status(403).json({ message: 'Task does not belong to this project' });
        return;
    }
    next();
};
exports.taskBelongsToProject = taskBelongsToProject;
const hasAuthorization = async (req, res, next) => {
    if (req.user.id.toString() !== req.project.manager.toString()) {
        res.status(403).json({ message: 'Unauthorized action' });
        return;
    }
    next();
};
exports.hasAuthorization = hasAuthorization;
//# sourceMappingURL=task.js.map