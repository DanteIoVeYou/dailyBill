import React from "react";
import LoginStore from "./login.Store";
import AdminStore from "./admin.Store";
import RecordStore from "./record.Store" 
import HomeStore from "./home.Store";

class RootStore {
    constructor() {
        this.loginStore = new LoginStore();
        this.adminStore = new AdminStore();
        this.recordStore = new RecordStore();
        this.homeStore = new HomeStore();
    };
};

const rootStore = new RootStore();
const context = React.createContext(rootStore);
const useStore = () => {
    return React.useContext(context);
}
export default useStore;