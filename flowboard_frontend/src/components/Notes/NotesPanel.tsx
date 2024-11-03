import { Task } from "@/types/index";
import AddNoteForm from "./AddNoteForm";
import NoteDetail from "./NoteDetail";

type NotesPanelProps = {
    notes: Task['notes']
}

export default function NotesPanel({notes}: NotesPanelProps) {
  return (
    <>
        <AddNoteForm />

        <div className="divide-y divide-gray-100 mt-10">
            {notes.length ? (
                <>
                    <p className="text-lg text-purple-900 font-bold mb-2">Notes:</p>
                    {notes.map((note) => (
                        <NoteDetail key={note._id} note={note} />
                    ))}
                </>
            ) : <p>No notes yet </p>}
        </div>
    </>
  )
}
