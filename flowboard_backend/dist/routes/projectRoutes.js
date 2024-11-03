"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const ProjectController_1 = require("../controllers/ProjectController");
const validation_1 = require("../middleware/validation");
const TaskController_1 = require("../controllers/TaskController");
const project_1 = require("../middleware/project");
const task_1 = require("../middleware/task");
const auth_1 = require("../middleware/auth");
const TeamController_1 = require("../controllers/TeamController");
const NoteController_1 = require("../controllers/NoteController");
const router = (0, express_1.Router)();
router.use(auth_1.authenticate);
router.post('/', auth_1.authenticate, (0, express_validator_1.body)('projectName').notEmpty().withMessage('Project name is required'), (0, express_validator_1.body)('clientName').notEmpty().withMessage('Client name is required'), (0, express_validator_1.body)('description').notEmpty().withMessage('Description is required'), validation_1.handleInputErrors, ProjectController_1.ProjectController.createProject);
router.get('/', ProjectController_1.ProjectController.getAllProjects);
router.get('/:id', (0, express_validator_1.param)('id').isMongoId().withMessage('Invalid project ID'), validation_1.handleInputErrors, ProjectController_1.ProjectController.getProjectById);
router.param('projectId', project_1.projectExists);
router.put('/:projectId', (0, express_validator_1.param)('projectId').isMongoId().withMessage('Invalid project ID'), (0, express_validator_1.body)('projectName').notEmpty().withMessage('Project name is required'), (0, express_validator_1.body)('clientName').notEmpty().withMessage('Client name is required'), (0, express_validator_1.body)('description').notEmpty().withMessage('Description is required'), validation_1.handleInputErrors, task_1.hasAuthorization, ProjectController_1.ProjectController.updateProject);
router.delete('/:projectId', (0, express_validator_1.param)('projectId').isMongoId().withMessage('Invalid project ID'), validation_1.handleInputErrors, task_1.hasAuthorization, ProjectController_1.ProjectController.deleteProject);
// Routes for tasks
router.param('taskId', task_1.taskExists);
router.param('taskId', task_1.taskBelongsToProject);
router.post('/:projectId/tasks', (0, express_validator_1.body)('name').notEmpty().withMessage('Task name is required'), (0, express_validator_1.body)('description').notEmpty().withMessage('Task description is required'), validation_1.handleInputErrors, TaskController_1.TaskController.createTask);
router.get('/:projectId/tasks', validation_1.handleInputErrors, TaskController_1.TaskController.getAllTasks);
router.get('/:projectId/tasks/:taskId', (0, express_validator_1.param)('taskId').isMongoId().withMessage('Invalid task ID'), validation_1.handleInputErrors, TaskController_1.TaskController.getTaskById);
router.put('/:projectId/tasks/:taskId', task_1.hasAuthorization, (0, express_validator_1.param)('taskId').isMongoId().withMessage('Invalid task ID'), (0, express_validator_1.body)('name').notEmpty().withMessage('Task name is required'), (0, express_validator_1.body)('description').notEmpty().withMessage('Task description is required'), validation_1.handleInputErrors, TaskController_1.TaskController.updateTask);
router.delete('/:projectId/tasks/:taskId', task_1.hasAuthorization, (0, express_validator_1.param)('taskId').isMongoId().withMessage('Invalid task ID'), validation_1.handleInputErrors, TaskController_1.TaskController.deleteTask);
router.post('/:projectId/tasks/:taskId/status', (0, express_validator_1.param)('taskId').isMongoId().withMessage('Invalid task ID'), (0, express_validator_1.body)('status').notEmpty().withMessage('Task status is required'), validation_1.handleInputErrors, TaskController_1.TaskController.updateTaskStatus);
/** Routes for teams */
router.post('/:projectId/team/find', (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email'), validation_1.handleInputErrors, TeamController_1.TeamController.findMemberByEmail);
router.get('/:projectId/team', TeamController_1.TeamController.getProjectTeam);
router.post('/:projectId/team', (0, express_validator_1.body)('id').isMongoId().withMessage('Invalid ID'), validation_1.handleInputErrors, TeamController_1.TeamController.addUserById);
router.delete('/:projectId/team/:userId', (0, express_validator_1.param)('userId').isMongoId().withMessage('Invalid User ID'), validation_1.handleInputErrors, TeamController_1.TeamController.removeUserById);
/** Routes for notes */
router.post('/:projectId/tasks/:taskId/notes', (0, express_validator_1.body)('content').notEmpty().withMessage('Note content is required'), validation_1.handleInputErrors, NoteController_1.NoteController.createNote);
router.get('/:projectId/tasks/:taskId/notes', NoteController_1.NoteController.getTaskNotes);
router.delete('/:projectId/tasks/:taskId/notes/:noteId', (0, express_validator_1.param)('noteId').isMongoId().withMessage('Invalid Note Id'), validation_1.handleInputErrors, NoteController_1.NoteController.deleteNote);
exports.default = router;
//# sourceMappingURL=projectRoutes.js.map