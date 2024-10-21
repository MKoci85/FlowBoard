import ErrorMessage from "../ErrorMessage";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ProjectFormData } from "types";
import BackButton from "../BackButton";
import { useNavigate } from "react-router-dom";

type ProjectFormProps = {
    register: UseFormRegister<ProjectFormData>
    errors: FieldErrors<ProjectFormData>
}

export default function ProjectForm({register, errors}: ProjectFormProps) {

    const navigate = useNavigate()

    const handleBack = () => {
        navigate('/')
      };
    
    return (
        <>
            <div className="mb-5 space-y-3">
                <nav className='flex justify-end'>
                    <BackButton onClick={handleBack} />
                </nav>
                <label htmlFor="projectName" className="text-sm uppercase font-bold">
                    Project Name
                </label>
                <input
                    id="projectName"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    autoFocus
                    autoComplete="off"
                    placeholder="Project Name"
                    {...register("projectName", {
                        required: "Project Name is required",
                    })}
                />

                {errors.projectName && (
                    <ErrorMessage>{errors.projectName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="clientName" className="text-sm uppercase font-bold">
                    Client Name
                </label>
                <input
                    id="clientName"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    autoComplete="off"
                    placeholder="Client Name"
                    {...register("clientName", {
                        required: "Client Name is required",
                    })}
                />

                {errors.clientName && (
                    <ErrorMessage>{errors.clientName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="description" className="text-sm uppercase font-bold">
                    Description
                </label>
                <textarea
                    id="description"
                    className="w-full p-3  border border-gray-200"
                    placeholder="Project Description"
                    {...register("description", {
                        required: "A project description is required"
                    })}
                />

                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}