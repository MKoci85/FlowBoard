'use client'

import { Project, TaskProject } from "@/types/index"
import { useNavigate, useParams, Link } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTask } from "@/api/TaskAPI"
import { toast } from "react-toastify"
import { useDraggable } from "@dnd-kit/core"
import { getProjectDetails } from "@/api/ProjectAPI"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"

type TaskCardProps = {
  task: TaskProject
  canEdit: boolean
}

export default function TaskCard({ task, canEdit }: TaskCardProps) {

  const [project, setProject] = useState<Project | null>(null)
  const { data: user} = useAuth()
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  })
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const params = useParams()
  const projectId = params.projectId!
  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] })
      toast.success(data)
    },
  })

  useEffect(() => {
    async function fetchProject() {
      try {
        const projectData = await getProjectDetails(projectId)
        if (projectData) {
            setProject(projectData)
          } else {
            toast.error("Project data is undefined")
          }
      } catch (error) {
        toast.error((error as Error).message)
      }
    }

    fetchProject()
  }, [projectId])

  const style = transform
    ? {
        transform: `translate3D(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <div
      className="bg-white rounded-lg shadow-slate-500 shadow-md hover:shadow-sky-800 hover:shadow-2xl transition-shadow cursor-grab"
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      style={style}
    >
      <div className="w-full flex items-center justify-between p-6 space-x-6">
      <div className="flex-1 truncate">
          <Link
            to={location.pathname + `?viewTask=${task._id}`}
            onPointerDown={(e) => e.stopPropagation()}
            onPointerUp={(e) => {
                if (e.button === 0) {
                    navigate(`?viewTask=${task._id}`);
                  }
            }}
            className="text-gray-900 text-2xl font-bold hover:underline cursor-pointer"
          >
            {task.name}
          </Link>



          <p className="mt-1 text-gray-500 text-sm truncate">{task.description}</p>
        </div>
      </div>
      <div className ={`flex divide-x divide-gray-200  ${project?.manager !== user?._id ? 'pointer-events-none opacity-50' : ''}` }>
        <div className="w-0 flex-1 flex bg-orange-300 hover:bg-orange-100 border-r-2 border-slate-500 hover:shadow-xl opacity-80 transition-all duration-300 ease-in-out">
        <Link
            to={location.pathname + `?editTask=${task._id}`}
            className={`relative w-0 flex-1 inline-flex items-center justify-center py-1 text-sm text-gray-700 font-medium border border-transparent hover:text-gray-500 ${
              !canEdit ? "pointer-events-none opacity-50" : ""
            }`}
            onPointerDown={(e) => e.stopPropagation()} 
            onClick={(e) => {
              if (!canEdit) {
                e.preventDefault();
                toast.error("Only the manager can edit tasks");
              }
            }}
          >
            Edit Task
          </Link>
        </div>
        <div className="w-0 flex-1 flex bg-rose-300 hover:bg-red-200 opacity-80 transition-all duration-300 ease-in-out">
          <button
            type="button"
            className={`relative w-0 flex-1 inline-flex items-center justify-center py-1 text-sm text-red-500 font-medium border border-transparent hover:text-red-700 ${
              !canEdit ? "pointer-events-none opacity-50" : ""
            }`}
            onPointerDown={(e) => e.stopPropagation()} 
            onClick={(e) => {
              if (canEdit) {
                mutate({ projectId, taskId: task._id })
              } else {
                e.preventDefault()
                toast.error("Only the manager can delete tasks")
              }
            }}
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  )
}