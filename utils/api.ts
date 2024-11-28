import axios from "axios";
import { Summary, User } from "./types";

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

// export const getUser = async (
//     token: string | null, id: string | null
// ): Promise<User> => {
//     try {
//         const { data } = await axios.get(
//             `${process.env.BASE_URL}/user/{id}`, 
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             }
//         )
//         return data;
//     } catch (error:any) {
//         return error
//     }
// };