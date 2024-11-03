import Tabs from "@/components/Profile/Tabs"
import { Outlet } from "react-router-dom"

export default function ProfileLayout() {
  return (
    <>
        <Tabs />
        <Outlet />
    </>
  )
}
