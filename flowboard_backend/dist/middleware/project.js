"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectExists = void 0;
const mongoose_1 = require("mongoose");
const Project_1 = __importDefault(require("../models/Project"));
const projectExists = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(projectId)) {
            res.status(400).json({ message: 'Invalid project ID' });
            return;
        }
        const project = await Project_1.default.findById(projectId);
        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        req.project = project;
        next();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.projectExists = projectExists;
//# sourceMappingURL=project.js.map