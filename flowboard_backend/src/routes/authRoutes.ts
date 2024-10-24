import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/AuthController";
import { handleInputErrors } from "../middleware/validation";

const router = Router()

router.post('/create-account', 
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match')
        }
        return true
    }),
    handleInputErrors,
    AuthController.createAccount
)

router.post('/verify-email',
    body('token').notEmpty().withMessage('Token is required'),
    handleInputErrors,
    AuthController.verifyEmail
)

router.post('/login',
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Wrong password'),
    handleInputErrors,
    AuthController.login
)

router.post('/request-code',
    body('email').isEmail().withMessage('Invalid email'),
    handleInputErrors,
    AuthController.requestConfirmationCode
)

export default router