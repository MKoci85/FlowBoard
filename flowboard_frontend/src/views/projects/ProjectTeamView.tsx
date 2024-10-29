import BackButton from "@/components/BackButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddMemberModal from "@/components/Teams/AddMemberModal";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getProjectTeam, removeUserFromProject } from "@/api/TeamAPI";
import { toast } from "react-toastify";


export default function ProjectTeamView() {

    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!
    const queryClient = useQueryClient()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['projectTeam', projectId],
        queryFn: () => getProjectTeam(projectId),
        retry: false
    })

    const { mutate } = useMutation({
        mutationFn: removeUserFromProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: [`projectTeam`, projectId]})
        }
    })

    if(isLoading) return 'Loading...'
    if(isError) return <Navigate to={'/404'} />
    
    const handleBack = () => navigate(`/projects/${projectId}`)
    

    if (data) return (
        <>
            <h1 className="text-5xl font-black">Manage Team</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Manage the team members of your project</p>
            
            <nav className="my-5 flex justify-between items-center">
                <div className="flex gap-3">
                    <button
                        className="bg-sky-500 hover:bg-sky-700 text-white py-3 px-10 rounded-full text-xl font-bold cursor-pointer 
                            transition-transform transform hover:scale-110 active:scale-95 shadow-lg shadow-black/50 flex items-center gap-2"
                        onClick={() => navigate(location.pathname + '?addMember=true')} 
                    >
                    <span>Add Member</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    </button>
                </div>
                <BackButton onClick={handleBack} />
            </nav>
        
            <h2 className="text-2xl font-black my-10 text-sky-950">Actual Members</h2>
            {data.length ? (
                <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
                    {data.map((member) => (
                        <li key={member._id} className="col-span-1 bg-white rounded-lg shadow-slate-500 shadow-md hover:shadow-sky-800 hover:shadow-2xl transition-shadow">
                            <div className="w-full flex items-center justify-between p-6 space-x-6">
                                <div className="flex-1 truncate">
                                    <p className="text-gray-900 text-3xl font-bold hover:underline">
                                        {member.name}
                                    </p>
                                    <p className="mt-1 text-gray-500 text-sm truncate">
                                        {member.email}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div className="-mt-px flex divide-x divide-gray-200">
                                    <div className="w-0 flex-1 flex bg-rose-300 hover:bg-rose-100">
                                        <button 
                                            type='button' 
                                            className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-red-500 font-medium border border-transparent rounded-br-lg hover:text-red-700"
                                            onClick={() => {mutate({projectId, userId: member._id})}}
                                        >
                                            Remove from Project
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-center py-20'>No members in this team</p>
            )}
        
            <AddMemberModal />
        </>
        )
}
