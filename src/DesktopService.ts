import { HttpClient, is, ModuleLoader } from "@tuval/core";
import { IAppStoreItem, IDesktopService } from "@tuval/forms";

export class ConfigService {
    public static GetEbaBrokerUrl(): string {
        return 'https://bpmgenesis.com/broker/eba';
    }
    public static GetEnsembleUrl(): string {
        return 'https://bpmgenesis.com/broker/ensemble';
    }
    public static GetSymbolBrokerUrl(): string {
        //return 'http://apidera.com/symbol';
        return 'https://bpmgenesis.com/broker/symbol';
    }
    public static GetMiningBrokerUrl(): string {
        //return 'http://apidera.com/symbol';
        return 'http://127.0.0.1:5001/v1/';
    }
    public static GetRealmBrokerUrl(): string {
        /*  let url = '';
         debugger;
         if (is.localhost()) {
             url = 'http://localhost:5002/v1/';
         } else {
             url = 'https://bpmgenesis.com/broker/realm/v1/';
         } */

        const url = window.location.origin + '/api/';
        console.log(url);

        return url;

        return url;
    }
    public static GetRealmBrokerUrl1(): string {
        let url = '';
        debugger;
        if (is.localhost()) {
            url = 'http://localhost:5002/v1/';
        } else {
            url = 'https://app.realmocean.com/api/'; // store eklendi.
        }


        return url;
    }
    public static GetRealmBrokerStoreUrl1(): string {
        let url = '';
        debugger;
        if (is.localhost()) {
            url = 'http://localhost:5002/v1/';
        } else {
            url = 'https://app.realmocean.com/store/'; // store eklendi.
        }


        return url;
    }
}

export class RealmBrokerClient {

 

    public static async GetMainStoreInfos(): Promise<any[]> {
        return new Promise((resolve, reject) => {


            HttpClient.Post(ConfigService.GetRealmBrokerUrl1() + 'GetMainStoreInfos')
                .then(response => {
                    resolve(response.data);
                });
        });
    }
}



export class RealmOceanDesktopService implements IDesktopService {
    private appsInfo: any;

    public LoadApp(appName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const app: any = this.appsInfo.Applications.filter(_app => {
                return _app.name === appName;
            })[0];

            if (app != null) {
                if (app.encoded) {
                    ModuleLoader.LoadBundledModuleWithDecode(app.url, app.name).then((_app: any) => {
                        if (_app != null) {
                            resolve(_app);
                        } else {

                        }
                    });
                } else {
                    ModuleLoader.LoadBundledModule(app.url, app.name).then((_app: any) => {
                        if (_app != null) {
                            resolve(_app)
                        } else {

                        }
                    });
                }
            } else {
                reject('app bulunamadı.');
            }
        });

    }
    private root: string = 'C:\\Apps';
    public GetUserApps(env: string, user: string): Promise<any> {
        return new Promise((resolve, reject) => {

            RealmBrokerClient.GetMainStoreInfos().then(apps => {
                console.log(apps)
                apps = apps.map((app) => {
                    return {
                        application: true,
                        encoded: true,
                        icon: app.app_icon,
                        name: app.app_name,
                        text: app.app_display_name,
                        url: ConfigService.GetRealmBrokerStoreUrl1() + `app/file/${app.organization_id}/${app.app_id}/1/latest`
                    }
                })
                this.appsInfo = {
                    Applications : [...apps]
                }
                debugger;
                resolve(this.appsInfo.Applications);
            })

        });
    }

    public InstallApp(env: string, user: string, app: IAppStoreItem): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(null);

            
        });

    }

}