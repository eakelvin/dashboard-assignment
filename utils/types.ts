type Auth = {
    email: string;
    password: string;
    remember?: boolean;
};

type Summary = {
    update: {
        percentage_change: number;
        date: Date;
    },
    net_income: {
        amount: number;
        currency: string;
        percentage_change: number;
    },
    total_return: {
        amount: number;
        currency: string;
        percentage_change: number;
    },
    sales_report: {
        product_launched: number;
        ongoing_product: number;
        product_sold: number;
    },
    revenue: {
        amount: number;
        currency: string;
        percentage_change: number;
        break_down: {
            week: number,
            revenue: number,
            expense: number
        }[];
    },
    total_view_perfomance: {
        view_count: number;
        sales: number;
        percentage: number;
        total_count: number;
    }
};

  