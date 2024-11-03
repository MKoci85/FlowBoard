import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjectDetails } from "@/api/ProjectAPI"
import AddTaskModal from "@/components/Tasks/AddTaskModal"
import TaskList from "@/components/Tasks/TaskList"
import EditTaskData from "@/components/Tasks/EditTaskData"
import TaskModalDetails from "@/components/Tasks/TaskModalDetails"
import BackButton from "@/components/BackButton"
import { useAuth } from "@/hooks/useAuth"
import { isManager } from "@/utils/policies"
import { useMemo } from "react"

export default function ProjectDetailsView() {

    const {data: user, isLoading: authLoading } = useAuth()

    const navigate = useNavigate()

    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => getProjectDetails(projectId),
        retry: false,
        
    })

    const canEdit = useMemo(() => data?.manager === user?._id, [data, user])

    if(isLoading && authLoading) return <p>Loading...</p>
    if(isError) return <Navigate to="/404" />

    const handleBack = () => {
        navigate('/')
      };
  
    if(data && user) return (
        <>
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>
            

                <nav className="my-5 flex justify-between items-center">
                    <div className="flex gap-3">
                        <button
                                className="bg-sky-500 hover:bg-sky-700 text-white py-3 px-10 rounded-full text-xl font-bold cursor-pointer 
                                    transition-transform transform hover:scale-110 active:scale-95 shadow-lg shadow-black/50 flex items-center gap-2"
                                onClick={() => navigate(location.pathname + '?newTask=true')} 
                            >
                            <span>Add Task</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                        {isManager(data.manager, user._id) && (
                                <Link className="bg-amber-500 hover:bg-amber-700 text-white py-3 px-10 rounded-full text-xl font-bold cursor-pointer 
                                        transition-transform transform hover:scale-110 active:scale-95 shadow-lg shadow-black/50 flex items-center gap-2"
                                    to={'team'}
                                > Team
                                </Link>
                        )}
                    </div>
                    <BackButton onClick={handleBack} />
                </nav>
            
            <TaskList tasks={data.tasks} canEdit={canEdit}/>
            <AddTaskModal />
            <EditTaskData />
            <TaskModalDetails />
        </>
    )
}
