import { extendObservable } from "mobx";

/**
 * UserStore
 */

class UserStore {
    constructor() {
        extendObservable(this, {
            loading: true,
            isLoggedIn: false,
            //there must be some form of auth token or similar here, the client can not be trusted
            username: ""
        })
    }
}

export default new UserStore();