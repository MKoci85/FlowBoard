import { Router } from 'express'
import { body, param } from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import { handleInputErrors } from '../middleware/validation'
import { TaskController } from '../controllers/TaskController'
import { projectExists } from '../middleware/project'
import { hasAuthorization, taskBelongsToProject, taskExists } from '../middleware/task'
import { authenticate } from '../middleware/auth'
import { TeamController } from '../controllers/TeamController'

const router = Router()

router.use(authenticate)

router.post('/', 
    authenticate,
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
    hasAuthorization,
    param('taskId').isMongoId().withMessage('Invalid task ID'),
    body('name').notEmpty().withMessage('Task name is required'),
    body('description').notEmpty().withMessage('Task description is required'),
    handleInputErrors,
    TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId', 
    hasAuthorization,
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



/** Routes for teams */
router.post('/:projectId/team/find',
    body('email').isEmail().withMessage('Invalid email'),
    handleInputErrors,
    TeamController.findMemberByEmail
)

router.get('/:projectId/team',
    TeamController.getProjectTeam
)

router.post('/:projectId/team',
    body('id').isMongoId().withMessage('Invalid ID'),
    handleInputErrors,
    TeamController.addUserById
)

router.delete('/:projectId/team/:userId',
    param('userId').isMongoId().withMessage('Invalid User ID'),
    handleInputErrors,
    TeamController.removeUserById
)

export default router