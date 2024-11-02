import { NoteFormData } from '@/types/index'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../ErrorMessage'
import { useMutation } from '@tanstack/react-query'
import { createNote } from '@/api/NoteAPI'
import { toast } from 'react-toastify'
import { useLocation, useParams } from 'react-router-dom'

export default function AddNoteForm() {

    const params = useParams()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)
    const projectId = params.projectId!
    const taskId = queryParams.get('viewTask')!

    const initialValues: NoteFormData = {
        content: ''
    }

    const { register, handleSubmit, formState: {errors}, reset } = useForm({defaultValues: initialValues})

    const { mutate } = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
        }
    })

    const handleAddNote = (formData: NoteFormData) => {
        mutate({projectId, taskId, formData})
    }
  return (
    <form
        onSubmit={handleSubmit(handleAddNote)}
        className="space-y-3"
        noValidate
    >
        <div className="flex flex-col gap-2">
            <label className="font-bold" htmlFor="content">Create note</label>
            <input 
                id="content"
                type="text"
                autoComplete="off"
                placeholder="Note content"
                className="w-full border border-gray-300"
                {...register('content', {
                    required: 'Content note is required'
                })}
            />
            {errors.content && (
                <ErrorMessage>{errors.content.message}</ErrorMessage>
            )}
        </div>
        <input 
            type="submit"
            value="Create Note"
            className="bg-indigo-400 hover:bg-indigo-500 w-full text-white font-black cursor-pointer rounded-lg"
        />
    </form>
  )
}
