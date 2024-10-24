import { useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

    const queryClient = useQueryClient()
    const { mutate }= useMutation({
        mutationFn: updateProjectById,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['projects']})
            queryClient.invalidateQueries({ queryKey: ["editProject", projectId]})
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
                <p className="text-2xl font-light text-gray-500 mt-5">Update the details to modify your project.</p>
    
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
                        value="Save Changes"
                        className='bg-sky-500 hover:bg-sky-700 text-white py-1 px-5 rounded-full text-xl font-bold cursor-pointer transition-colors shadow-md shadow-black/50 w-full block text-center'
                    />
                </form>
            </div>
        </>
      )
    }