import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getAllProjects } from '@/api/ProjectAPI'

export default function DashboardView() {

    const { data, isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: getAllProjects
    })

    if(isLoading) return <p>Loading...</p>
  
    if(data) return (
    <>
        <h1 className="text-5xl font-black">Projects</h1>
        <p className="text-2xl font-light text-gray-500 mt-5"> Manage your projects </p>
        <nav className='my-5'>
            <Link 
                className='bg-sky-500 hover:bg-sky-700 text-white py-3 px-10 rounded-lg text-xl font-bold cursor-pointer transition-colors shadow-md shadow-black/50'
                to='/projects/create'
            >
                Create Project
            </Link>
        </nav>
        {data.length ? (
          
          <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
          {data.map((project) => (
            <li key={project._id} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                <div className="w-full flex items-center justify-between p-6 space-x-6">
                    <div className="flex-1 truncate">
                        <Link to={``}
                            className="text-gray-900 text-3xl font-bold hover:underline"
                        >{project.projectName}</Link>
                        <p className="mt-1 text-gray-500 text-sm truncate">
                            Cliente: {project.clientName}
                        </p>
                        <p className="mt-1 text-gray-500 text-sm truncate">
                            {project.description}
                        </p>
                    </div>
                </div>
                <div>
                    <div className="-mt-px flex divide-x divide-gray-200">
                        <div className="w-0 flex-1 flex">
                            <Link to={``}
                                className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                            >
                                View Project
                            </Link>
                        </div>
                        <div className="-ml-px w-0 flex-1 flex">
                            <Link to={`/projects/${project._id}/edit`}
                                className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                            >
                                Edit Project
                            </Link>
                        </div>
                        <div className="-ml-px w-0 flex-1 flex">
                            <button 
                                type='button' 
                                className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-red-500 font-medium border border-transparent rounded-br-lg hover:text-red-700"
                                onClick={() => {} }
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
