
import { ConfigService } from './ConfigService';
import { HttpClient, is } from '@tuval/core';
import { RealmHttpClient } from '@tuval/forms';

export interface GetSessionInfoResponse {
    is_real_admin: boolean;
    is_tenant_admin: boolean;
}
export interface GetRealmInfoResponse {
    key: string;
    value: string;
}


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

    public static async GetTenants(session_id: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('session_id', session_id);

            HttpClient.Post(ConfigService.GetRealmBrokerUrl() + 'GetTenants', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }
    public static async GetTenantAccounts(session_id: string, tenant_id: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('session_id', session_id);
            form.append('tenant_id', tenant_id);

            HttpClient.Post(ConfigService.GetRealmBrokerUrl() + 'GetTenantAccounts', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }
    public static async GetAccounts(session_id: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('session_id', session_id);

            HttpClient.Post(ConfigService.GetRealmBrokerUrl() + 'GetAccounts', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetApps(session_id: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('session_id', session_id);

            HttpClient.Post(ConfigService.GetRealmBrokerUrl() + 'GetApps', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async CreateTenant(session_id: string, tenant_name: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('session_id', session_id);
            form.append('tenant_name', tenant_name);

            HttpClient.Post(ConfigService.GetRealmBrokerUrl() + 'CreateTenant', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }
    public static async CreateAccount(session_id: string, account_name: string, account_password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('session_id', session_id);
            form.append('account_name', account_name);
            form.append('account_password', account_password);

            HttpClient.Post(ConfigService.GetRealmBrokerUrl() + 'CreateAccount', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetSessionInfo(): Promise<GetSessionInfoResponse> {
        return new Promise((resolve, reject) => {
            //const form = new FormData();
            //form.append('session_id', session_id);

            RealmHttpClient.Post(ConfigService.GetRealmBrokerUrl() + 'GetSessionInfo')
                .then(response => {
                    resolve(response.data);
                });
        });
    }

    public static async GetRealmInfo(session_id: string, key: string): Promise<GetRealmInfoResponse> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('session_id', session_id);
            form.append('key', key);

            HttpClient.Post(ConfigService.GetRealmBrokerUrl() + 'GetRealmInfo', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }
    public static async GetRealmInfos(session_id: string): Promise<GetRealmInfoResponse[]> {
        return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('session_id', session_id);

            HttpClient.Post(ConfigService.GetRealmBrokerUrl() + 'GetRealmInfos', form)
                .then(response => {
                    resolve(response.data);
                });
        });
    }


}