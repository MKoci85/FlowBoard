"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamController = void 0;
const User_1 = __importDefault(require("../models/User"));
const Project_1 = __importDefault(require("../models/Project"));
class TeamController {
    static findMemberByEmail = async (req, res) => {
        const { email } = req.body;
        // Find user
        const user = await User_1.default.findOne({ email }).select('id name email');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    };
    static getProjectTeam = async (req, res) => {
        const project = await (await Project_1.default.findById(req.project.id)).populate({
            path: 'team',
            select: 'id email name'
        });
        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        res.json(project.team);
    };
    static addUserById = async (req, res) => {
        const { id } = req.body;
        // Find user
        const user = await User_1.default.findById(id).select('id');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        if (req.project.team.some(member => member.toString() === user.id.toString())) {
            res.status(409).json({ message: 'User already in team' });
            return;
        }
        if (req.project.manager.toString() === user.id.toString()) {
            res.status(409).json({ message: 'You cannot add yourself' });
            return;
        }
        req.project.team.push(user.id);
        await req.project.save();
        res.send('User added to team');
    };
    static removeUserById = async (req, res) => {
        const { userId } = req.params;
        if (!req.project.team.some(member => member.toString() === userId)) {
            res.status(404).json({ message: 'User not in team' });
            return;
        }
        req.project.team = req.project.team.filter(member => member.toString() !== userId);
        await req.project.save();
        res.send('User removed from team');
    };
}
exports.TeamController = TeamController;
//# sourceMappingURL=TeamController.js.map