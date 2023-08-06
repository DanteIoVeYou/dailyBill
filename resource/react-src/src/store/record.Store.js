import { makeAutoObservable } from "mobx";
import http from "@/utils/http";
class RecordStore {
    constructor() {
        makeAutoObservable(this);
    }
    getBillList = async (userid, item, category, paymentMethod, incomeExpense, startDate, endDate) => {
        const resp = await http.get("/bill/billlist", {
            params: {
                userid: userid,
                item: item,
                category: category,
                paymentMethod: paymentMethod,
                incomeExpense: incomeExpense,
                startDate: startDate,
                endDate: endDate,
            }
        });
        return resp;
    }
    submitBillInfo = async (userid, username, item, category, paymentMethod, amount, incomeExpense) => {
        const resp = await http.post("/bill/add/bill", {
            userid: userid,
            username: username,
            item: item,
            category: category,
            paymentMethod: paymentMethod,
            amount: amount,
            incomeExpense: incomeExpense
        });
        return resp;
    }
    submitOldBillInfo = async (recordid, item, category, paymentMethod, amount, incomeExpense) => {
        const resp = await http.post("/bill/modify/bill", {
            recordid: recordid,
            item: item,
            category: category,
            paymentMethod: paymentMethod,
            amount: amount,
            incomeExpense: incomeExpense
        });
        return resp;
    }

    deleteBillInfo = async (recordid) => {
        const resp = await http.post("/bill/delete/bill", {
            recordid: recordid
        });
        return resp;
    }
}
export default RecordStore;