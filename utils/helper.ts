export function convertDate(date:any) {
    const newDate = new Date(date);

    const formattedDate = newDate.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return formattedDate
    
};

export function dateFormat(date: any) {
    const newDate = new Date(date);

    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
};

export function formatNumber(value:any) {
    const number = typeof value === 'string' ? parseInt(value, 10) : value;
    const formattedNumber = number.toLocaleString();
    return formattedNumber
};
