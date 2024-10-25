import type { Request, Response } from "express"
import User from "../models/User"

export class TeamController {
    static findMemberByEmail = async (req: Request, res: Response) => {
        const { email } = req.body

        // Find user
        const user = await User.findOne({ email}).select('id name email')
        if(!user) {
            res.status(404).json({message: 'User not found'})
            return
        }

        res.json(user)
    }

    static addUserById = async (req: Request, res: Response) => {
        const { id } = req.body

        // Find user
        const user = await User.findById(id).select('id')
        if(!user) {
            res.status(404).json({message: 'User not found'})
            return
        }
        if(req.project.team.some(member => member.toString() === user.id.toString())) {
            res.status(409).json({message: 'User already in team'})
            return
        }
        req.project.team.push(user.id)
        await req.project.save()
        res.send('User added to team')
    }
}