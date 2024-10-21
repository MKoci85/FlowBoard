import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProjectById, getAllProjects } from '@/api/ProjectAPI'
import { toast } from 'react-toastify'

export default function DashboardView() {

    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: getAllProjects
    })

    const { mutate} = useMutation({
        mutationFn: deleteProjectById,
        onError: (error) => {
            toast.error(error.message)
        }, 
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['projects']})
            toast.success(data)
        }
    })

    if(isLoading) return <p>Loading...</p>
  
    if(data) return (
    <>
        <h1 className="text-5xl font-black">Projects</h1>
        <p className="text-2xl font-light text-gray-500 mt-5"> Manage your projects </p>
        <nav className='my-5 max-w-xs'>
            <Link
                className="bg-sky-500 hover:bg-sky-700 text-white py-3 px-10 rounded-full text-xl font-bold cursor-pointer transition-transform transform hover:scale-110 active:scale-95 shadow-lg shadow-black/50 flex items-center gap-2"
                to="/projects/create"
                >
                <span>Create Project</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            </Link>
        </nav>
        {data.length ? (
          
          <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
          {data.map((project) => (
            <li key={project._id} className="col-span-1 bg-white rounded-lg shadow-slate-500 shadow-md hover:shadow-sky-800 hover:shadow-2xl transition-shadow">
                <Link to={`/projects/${project._id}`}>
                    <div className="w-full flex items-center justify-between p-6 space-x-6">
                        <div className="flex-1 truncate">
                            <p className="text-gray-900 text-3xl font-bold hover:underline">
                                {project.projectName}
                            </p>
                            <p className="mt-1 text-gray-500 text-sm truncate">
                                Cliente: {project.clientName}
                            </p>
                            <p className="mt-1 text-gray-500 text-sm truncate">
                                {project.description}
                            </p>
                        </div>
                    </div>
                </Link>
                    <div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                            <div className="w-0 flex-1 flex bg-sky-300 hover:bg-sky-200">
                                <Link to={`/projects/${project._id}`}
                                    className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                                >
                                    View Project
                                </Link>
                            </div>
                            <div className="-ml-px w-0 flex-1 flex bg-orange-300 hover:bg-orange-100">
                                <Link to={`/projects/${project._id}/edit`}
                                    className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                                >
                                    Edit Project
                                </Link>
                            </div>
                            <div className="-ml-px w-0 flex-1 flex bg-rose-300 hover:bg-rose-100">
                                <button 
                                    type='button' 
                                    className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-red-500 font-medium border border-transparent rounded-br-lg hover:text-red-700"
                                    onClick={() => {mutate(project._id)} }
                                >
                                    Delete Project
                                </button>
                            </div>
                        </div>
                    </div>
                
            </li>
          ))}
      </ul>


        ) : (
          <p className='text-center py-20'>No Projects Found {' '}
            <Link 
                  className='text-sky-500 hover:text-sky-700 font-bold'
                  to='/projects/create'
              >
                  Create Project
            </Link>
          </p>
        )}
    </>
  )
}
