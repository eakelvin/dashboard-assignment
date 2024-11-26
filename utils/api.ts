import axios from "axios";

export const getReports = async (
    token: string | null
): Promise<Summary> => {
    try {
        const { data } = await axios.get(
            `${process.env.BASE_URL}/report/summary/`, 
            { 
                headers: { 
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return data;
    } catch (error:any) {
        return error
    }
};