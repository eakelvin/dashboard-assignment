import Dashboard from '@/components/dashboard/dashboard';
import { getReports } from '@/utils/api'

const page = async () => {
    // const token = localStorage.getItem("token");
    // const reports = await getReports(token);
    // console.log('Reports:', reports);

    return (
        <div>
            <Dashboard />
        </div>
    )
}

export default page
