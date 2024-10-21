import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { updateProjectById } from "@/api/ProjectAPI";
import { toast } from "react-toastify";

type EditProjectFormProps = {
    data: ProjectFormData,
    projectId: string
}

export default function EditProjectForm({data, projectId}: EditProjectFormProps) {

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({defaultValues: {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description
    }})

    const { mutate }= useMutation({
        mutationFn: updateProjectById,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            console.log(data)
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm = (formData: ProjectFormData) => {
        const data = {
            formData,
            projectId
        }
        mutate(data)
    }

    
    return (
        <>
            <div className='max-w-3xl mx-auto'>
                <h1 className="text-5xl font-black">Edit Project</h1>
                <nav className='my-5'>
                    <Link 
                        className='bg-sky-500 hover:bg-sky-700 text-white py-1 px-3 rounded-lg text-xl font-bold cursor-pointer transition-colors shadow-md shadow-black/50'
                        to='/'
                    >
                        Dashboard
                    </Link>
                </nav>
    
                <form
                    className='mt-10, bg-white shadow-lg p-10 rounded-lg'
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <ProjectForm 
                        register={register} 
                        errors={errors} 
                    />
                    <input
                        type="submit"
                        value="Save Changes"
                        className='bg-sky-500 hover:bg-sky-700 text-white py-1 px-5 rounded-lg text-xl font-bold cursor-pointer transition-colors shadow-md shadow-black/50 w-full block text-center'
                    />
                </form>
            </div>
        </>
      )
    }