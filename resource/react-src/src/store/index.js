import React from "react";
import LoginStore from "./login.Store";
import AdminStore from "./admin.Store";
import RecordStore from "./record.Store";

class RootStore {
    constructor() {
        this.loginStore = new LoginStore();
        this.adminStore = new AdminStore();
        this.recordStore = new RecordStore();
    };
};

const rootStore = new RootStore();
const context = React.createContext(rootStore);
const useStore = () => {
    return React.useContext(context);
}
export default useStore;