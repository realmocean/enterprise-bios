import { HttpClient } from "@tuval/core";
import { ConfigService } from "./ConfigService";

export class RealmBrokerClient {

    public static async Login(user: string, password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const form = new FormData();

            form.append('user', user);
            form.append('password', password);
            debugger;
            HttpClient.Post(ConfigService.GetRealmBrokerUrl() + 'LoginService', form)
                .then(response => {
                    resolve(response.data.sessionId);
                })
                .catch(error => {
                    /* console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers); */
                    reject(error.response.data?.detail)
                });
        });
    }

   
    public static async GetMainStoreInfos(session_id: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('session_id', session_id);

            HttpClient.Post(ConfigService.GetRealmBrokerUrl() + 'GetMainStoreInfos', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }


}