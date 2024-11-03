"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteController = void 0;
const Note_1 = __importDefault(require("../models/Note"));
class NoteController {
    static createNote = async (req, res) => {
        const { content } = req.body;
        const note = new Note_1.default();
        note.content = content;
        note.createdBy = req.user.id;
        note.task = req.task.id;
        req.task.notes.push(note.id);
        try {
            await Promise.allSettled([req.task.save(), note.save()]);
            res.send('Note created successfully');
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    static getTaskNotes = async (req, res) => {
        try {
            const notes = await Note_1.default.find({ task: req.task.id });
            res.json(notes);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    static deleteNote = async (req, res) => {
        const { noteId } = req.params;
        const note = await Note_1.default.findById(noteId);
        if (!note) {
            const error = new Error('Note not found');
            res.status(404).json({ message: error.message });
            return;
        }
        if (note.createdBy.toString() !== req.user.id) {
            const error = new Error('Invalid Action');
            res.status(404).json({ message: error.message });
            return;
        }
        req.task.notes = req.task.notes.filter(note => note.toString() !== noteId.toString());
        try {
            await Promise.allSettled([note.deleteOne(), req.task.save()]);
            res.send('Note deleted successfully');
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}
exports.NoteController = NoteController;
//# sourceMappingURL=NoteController.js.map