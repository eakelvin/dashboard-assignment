import Sidebar from "@/components/sidebar/sidebar"

const AdminLayout = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <div className="flex h-[100%] w-full">
            <Sidebar />
            <div className="w-full flex flex-col lg:ml-[200px] py-16 pt-20 px-4 lg:px-5 overflow-x-hidden">
                {children}
            </div>
        </div>
    )
}

export default AdminLayout