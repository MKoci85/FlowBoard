import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "@/api/ProjectAPI"
import EditProjectForm from "@/components/Projects/EditProjectForm"

export default function EditProjectView() {

    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ["editProject", projectId],
        queryFn: () => getProjectById(projectId)
    })

    if(isLoading) return <p>Loading...</p>
    if(isError) return <Navigate to="/404" />
  
    if(data) return <EditProjectForm data={data} projectId={projectId}/>
}
