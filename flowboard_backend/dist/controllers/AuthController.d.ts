import type { Request, Response } from "express";
export declare class AuthController {
    static createAccount: (req: Request, res: Response) => Promise<void>;
    static verifyEmail: (req: Request, res: Response) => Promise<void>;
    static login: (req: Request, res: Response) => Promise<void>;
    static requestConfirmationCode: (req: Request, res: Response) => Promise<void>;
    static forgotPassword: (req: Request, res: Response) => Promise<void>;
    static verifyCode: (req: Request, res: Response) => Promise<void>;
    static updatePasswordWithToken: (req: Request, res: Response) => Promise<void>;
    static getUser: (req: Request, res: Response) => Promise<void>;
    static updateProfile: (req: Request, res: Response) => Promise<void>;
    static updateCurrentPassword: (req: Request, res: Response) => Promise<void>;
    static checkPassword: (req: Request, res: Response) => Promise<void>;
}
