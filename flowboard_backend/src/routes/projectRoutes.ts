import { Router } from 'express'
import { body, param } from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import { handleInputErrors } from '../middleware/validation'
import { TaskController } from '../controllers/TaskController'
import { projectExists } from '../middleware/project'
import { taskBelongsToProject, taskExists } from '../middleware/task'

const router = Router()

router.post('/', 
    body('projectName').notEmpty().withMessage('Project name is required'),
    body('clientName').notEmpty().withMessage('Client name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    handleInputErrors,
    ProjectController.createProject
)
router.get('/', ProjectController.getAllProjects)
router.get('/:id', 
    param('id').isMongoId().withMessage('Invalid project ID'),
    handleInputErrors,
    ProjectController.getProjectById
)
router.put('/:id', 
    param('id').isMongoId().withMessage('Invalid project ID'),
    body('projectName').notEmpty().withMessage('Project name is required'),
    body('clientName').notEmpty().withMessage('Client name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    handleInputErrors,
    ProjectController.updateProject
)
router.delete('/:id', 
    param('id').isMongoId().withMessage('Invalid project ID'),
    handleInputErrors,
    ProjectController.deleteProject
)

// Routes for tasks
router.param('projectId', projectExists)
router.param('taskId', taskExists)
router.param('taskId', taskBelongsToProject)

router.post('/:projectId/tasks', 
    body('name').notEmpty().withMessage('Task name is required'),
    body('description').notEmpty().withMessage('Task description is required'),
    handleInputErrors,
    TaskController.createTask
)

router.get('/:projectId/tasks', 
    handleInputErrors,
    TaskController.getAllTasks
)

router.get('/:projectId/tasks/:taskId', 
    param('taskId').isMongoId().withMessage('Invalid task ID'),
    handleInputErrors,
    TaskController.getTaskById
)

router.put('/:projectId/tasks/:taskId', 
    param('taskId').isMongoId().withMessage('Invalid task ID'),
    body('name').notEmpty().withMessage('Task name is required'),
    body('description').notEmpty().withMessage('Task description is required'),
    handleInputErrors,
    TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId', 
    param('taskId').isMongoId().withMessage('Invalid task ID'),
    handleInputErrors,
    TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status', 
    param('taskId').isMongoId().withMessage('Invalid task ID'),
    body('status').notEmpty().withMessage('Task status is required'),
    handleInputErrors,
    TaskController.updateTaskStatus
)

export default router