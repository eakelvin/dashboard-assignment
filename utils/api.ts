import axios from "axios";
import { Summary, User } from "./types";

export const getReports = async (
    token: string | null
) => {
    try {
        const { data } = await axios.get(
            `${process.env.BASE_URL}/report/summary/`, 
            { 
                headers: { 
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log('API Response:', data);
        return data;
    } catch (error:any) {
        console.error('Error fetching reports:', error);
        throw new Error('Failed to fetch reports');
    }
};

export const getUser = async (
    token: string | null, id: string | null
) => {
    try {
        const { data } = await axios.get(
            `${process.env.BASE_URL}/user/${id}`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return data;
    } catch (error:any) {
        console.error('Error fetching reports:', error);
        throw new Error('Failed to fetch reports');
    }
};