import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import DashboardView from '@/views/DashboardView'
import CreateProjectView from '@/views/projects/CreateProjectView'
import EditProjectView from './views/projects/EditProjectView'
import NotFoundView from './views/NotFoundView'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardView />} index/>
                    <Route path="/projects/create" element={<CreateProjectView />}/>
                    <Route path="/projects/:projectId/edit" element={<EditProjectView />}/>
                    <Route path="/404" element={<NotFoundView />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

