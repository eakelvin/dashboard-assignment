export type Auth = {
    email: string;
    password: string;
    remember?: boolean;
};

export type Summary = {
    data: {
        update: {
            percentage_change: string;
            date: string;
        },
        net_income: {
            amount: string;
            currency: string;
            percentage_change: string;
        },
        total_return: {
            amount: string;
            currency: string;
            percentage_change: string;
        },
        sales_report: {
            product_launched: string;
            ongoing_product: string;
            product_sold: string;
        },
        revenue: {
            amount: string;
            currency: string;
            percentage_change: string;
            break_down: {
                week: string,
                revenue: string,
                expense: string
            }[];
        },
        total_view_perfomance: {
            view_count: string;
            sales: string;
            percentage: string;
            total_count: string;
        }
    }
    // message: string
    // status: boolean
};

interface UserProfile {
    id: string;
    first_name: string;
    last_name: string;
    user_name: string;
    gender: "Male" | "Female" | "Other";
    date_of_birth: string;
    picture: string;
    customer_id: string;
};

export interface User {
    id: string;
    email: string;
    phone_number: string;
    profile: UserProfile;
};
