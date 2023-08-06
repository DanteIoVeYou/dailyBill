import http from '@/utils/http';
import { makeAutoObservable } from 'mobx';
class AdminStore {
    constructor() {
        makeAutoObservable(this);
    }

    getUserList = async () => {
        const resp = await http.get("/user/userlist?username=");
        return resp.data;
    }

    submitUserInfo = async (username, password, email) => {
        const resp = await http.post("/user/add/user", {
            username: username,
            password: password,
            email: email
        });
        return resp;
    }

    updateUserState = async (userid, state) => {
        console.log(userid);
        console.log(state);
        const resp = await http.post("/user/modify/user/info", {
            userid: userid,
            state: state
        });
        return resp;
    }
};
export default AdminStore;