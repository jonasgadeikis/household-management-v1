interface ExpenseType {
    uid: string,
    id?: number;
    name: string | null;
    amount?: number;
    username: string | null;
    settled: boolean;
}

export default ExpenseType;
