import Sidebar from "@/components/sidebar/sidebar"

const AdminLayout = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <div className="flex h-[100%] w-full">
            <Sidebar />
            <div className="w-full flex flex-col lg:ml-[220px] py-16 pt-20 px-4 lg:px-14">
                {children}
            </div>
        </div>
    )
}

export default AdminLayout