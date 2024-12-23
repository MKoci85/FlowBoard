import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TeamMember } from "@/types/index"
import { addUserToProject } from "@/api/TeamAPI"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"

type SearchResultProps = {
    user: TeamMember
    reset: () => void
}

export default function SearchResult({user, reset}: SearchResultProps) {

    const params = useParams()
    const projectId = params.projectId!
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: [`projectTeam`, projectId]})
            reset()
        }
    })

    const handleAddUserToProject = () => {
        const data = {
            id: user._id,
            projectId
        }
        
        mutate(data)
    }

  return (
    <>
        <p className="mt-4 text-center font-bold">Result</p>
        <div className="flex justify-between items-center">
            <p>{user.name}</p>
            <button 
                className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer hover:rounded-lg"
                onClick={handleAddUserToProject}
            >
                Add to Project
            </button>
        </div>
    </>
  )
}
