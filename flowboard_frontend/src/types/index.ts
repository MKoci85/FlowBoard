import { z } from "zod";

/** Projects */
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string().min(1, {message: "Project Name is required"}),
    clientName: z.string().min(1, {message: "Client Name is required"}),
    description: z.string().min(1, {message: "Description is required"}),
})

export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true
    })
)

export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, "projectName" | "clientName" | "description">
