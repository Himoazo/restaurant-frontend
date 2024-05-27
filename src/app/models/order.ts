export interface Order {
    customer: {
        name: string;
        email: string;
    };
    items: {
        menuItem: string;
        itemType: 'meal' | 'side' | 'dipp';
        quantity: number;
        price: number;
    }[];
    total: number;
    status: 'pending' | 'in progress' | 'ready' | 'completed';
    createdAt?: Date;
    updatedAt?: Date;
}
