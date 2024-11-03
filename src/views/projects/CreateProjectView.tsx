import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import ProjectForm from '@/components/Projects/ProjectForm'
import { ProjectFormData } from '@/types/index'
import { createProject } from '@/api/ProjectAPI'

export default function CreateProjectView() {
    const navigate = useNavigate()
    const initialValues: ProjectFormData = {
        projectName: "",
        clientName: "",
        description: ""
    }
    const { register, handleSubmit, formState: { errors } } = useForm({defaultValues: initialValues})

    const { mutate } = useMutation({
        mutationFn: createProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            navigate("/")
        }
    })

    const handleForm = (data: ProjectFormData) => mutate(data)


  return (
    <>
        <div className='max-w-3xl mx-auto'>
            <h1 className="text-5xl font-black">Create Project</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Fill the form to create your project.</p>

            <form
                className='mt-10, bg-white shadow-lg p-10 rounded-lg mt-5'
                onSubmit={handleSubmit(handleForm)}
                noValidate
            >
                <ProjectForm 
                    register={register} 
                    errors={errors} 
                />
                <input
                    type="submit"
                    value="Create Project"
                    className='bg-sky-500 hover:bg-sky-700 text-white py-1 px-5 rounded-full text-xl font-bold cursor-pointer transition-colors shadow-md shadow-black/50 w-full block text-center'
                />
            </form>
        </div>
    </>
  )
}