import http from "@/utils/http";
import { makeAutoObservable } from "mobx";

class LoginStore {
    token = "";
    constructor() {
        makeAutoObservable(this);
    }
    login = async ({ username, password }) => {
        const resp = await http.post("/user/login", {
            username: username,
            password: password
        });
        return resp;
    };
}

export default LoginStore;