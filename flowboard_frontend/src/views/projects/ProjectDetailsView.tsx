import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "@/api/ProjectAPI"
import AddTaskModal from "@/components/Tasks/AddTaskModal"
import TaskList from "@/components/Tasks/TaskList"
import EditTaskData from "@/components/Tasks/EditTaskData"

export default function ProjectDetailsView() {

    const navigate = useNavigate()

    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => getProjectById(projectId),
        retry: false
    })

    if(isLoading) return <p>Loading...</p>
    if(isError) return <Navigate to="/404" />
  
    if(data) return (
        <>
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

            <nav className="my-5 flex gap-3">
                <button
                    className="bg-sky-500 hover:bg-sky-600 px-10 py-1 text-white text-xl font-bold cursor-pointer transition-colors rounded shadow-black shadow"
                    onClick={() => navigate(location.pathname + '?newTask=true')} 
                >
                    Add Task
                </button>
            </nav>
            <TaskList tasks={data.tasks}/>
            <AddTaskModal />
            <EditTaskData />
        </>
    )
}
