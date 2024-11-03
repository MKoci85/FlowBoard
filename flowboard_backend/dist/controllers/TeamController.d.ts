import type { Request, Response } from "express";
export declare class TeamController {
    static findMemberByEmail: (req: Request, res: Response) => Promise<void>;
    static getProjectTeam: (req: Request, res: Response) => Promise<void>;
    static addUserById: (req: Request, res: Response) => Promise<void>;
    static removeUserById: (req: Request, res: Response) => Promise<void>;
}
