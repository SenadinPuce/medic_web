export type User = {
    id: string;
    username: string;
    name: string;
    orders: number; 
    lastLoginDate: string;
    imageUrl: string | null;
isBlocked: boolean;
    dateOfBirth: string;
};