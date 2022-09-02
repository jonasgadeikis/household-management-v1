import ExpenseType from "../types/ExpenseType";
import {generateUid} from "../utils";

class ExpenseModel implements ExpenseType {
    uid: string;
    id?: number;
    name: string | null;
    amount?: number;
    username: string | null;
    settled: boolean;

    constructor({
        uid,
        id,
        name,
        amount,
        username,
        settled,
    }: ExpenseType = {
        uid: generateUid(),
        name: null,
        username: null,
        settled: false,
    }) {
        this.uid = uid;
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.username = username;
        this.settled = settled;
    }
}

export default ExpenseModel;
