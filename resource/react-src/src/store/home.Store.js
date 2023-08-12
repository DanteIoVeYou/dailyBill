import http from "@/utils/http";

const { makeAutoObservable } = require("mobx");

class HomeStore {
    constructor() {
        makeAutoObservable(this);
    }

    getMouthBill = async (userid, year, month) => {
        const resp = await http.get("/bill/monthbill", {
            params: {
                userid: userid,
                year: year,
                month: month
            }
        });
        return resp.data;
    }

}
export default HomeStore;