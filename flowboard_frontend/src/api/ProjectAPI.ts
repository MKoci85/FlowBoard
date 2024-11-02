import { dashboardProjectSchema, Project, ProjectFormData, projectSchema } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFormData) {
    try {
        const { data } = await api.post("/projects", formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
        console.log(error)
    }
}

export async function getAllProjects() {
    try {
        
        const { data } = await api("/projects")
        const response = dashboardProjectSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
        console.log(error)
    }
}

export async function getProjectById(projectId: Project["_id"]) {
    try {
        const { data } = await api(`/projects/${projectId}`)
        const response = projectSchema.safeParse(data)
        console.log(response)
        if(response.success) {
            return response.data
        } else {
            return null
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
        console.log(error)
    }
}

type ProjectAPIType = {
    formData: ProjectFormData,
    projectId: Project['_id']
}

export async function updateProjectById({formData, projectId}: ProjectAPIType) {
    try {
        const { data } = await api.put<string>(`/projects/${projectId}`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
        console.log(error)
    }
}

export async function deleteProjectById(projectId: Project['_id']) {
    try {
        const { data } = await api.delete<string>(`/projects/${projectId}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
        console.log(error)
    }
}