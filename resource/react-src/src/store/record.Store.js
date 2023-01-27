import { makeAutoObservable } from "mobx";
import http from "@/utils/http";
class RecordStore {
    constructor() {
        makeAutoObservable(this);
    }
    getBillList = async (item, category, paymentMethod, incomeExpense) => {
        const resp = await http.get("/bill/billlist", {
            params: {
                item: item,
                category: category,
                paymentMethod: paymentMethod,
                incomeExpense: incomeExpense
            }
        });
        return resp;
    }
    submitBillInfo = async (item, category, paymentMethod, amount, incomeExpense) => {
        const resp = await http.post("/bill/add/bill", {
            item: item,
            category: category,
            paymentMethod: paymentMethod,
            amount: amount,
            incomeExpense: incomeExpense
        });
        return resp;
    }
}
export default RecordStore;