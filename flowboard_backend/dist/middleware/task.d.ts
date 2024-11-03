import type { Request, Response, NextFunction } from 'express';
import { ITask } from '../models/Task';
declare global {
    namespace Express {
        interface Request {
            task: ITask;
        }
    }
}
export declare const taskExists: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const taskBelongsToProject: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const hasAuthorization: (req: Request, res: Response, next: NextFunction) => Promise<void>;
