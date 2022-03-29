import { makeAutoObservable, runInAction } from "mobx";
import { useHistory } from "react-router-dom";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";

export default class UserStore {

    user: User | null = null;
    isLoggedOut: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {

            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() =>
                this.user = user
                
            );
            runInAction(() =>               
                this.isLoggedOut = false
            );


            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }

    }

    logout = () => {
        store.commonStore.setToken(null);
        store.commonStore.appLoaded = false;
        window.localStorage.removeItem('jwt');       
        this.user = null;
        this.isLoggedOut = true;

    }


    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        }
        catch (error) {
            console.log(error);
        }
    }


    register = async (creds: UserFormValues) => {
        try {

            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() =>
                this.user = user

            );
            runInAction(() =>
                this.isLoggedOut = false
            );


            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }


    }



}