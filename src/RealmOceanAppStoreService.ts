
import { File, Path, TLoader, FS, singleton, ModuleLoader, instance as container, foreach } from '@tuval/core';
import { IAppStoreItem, IAppStoreService } from '@tuval/forms';
import { RealmBrokerClient } from './DesktopService';


export class RealmOceanAppStoreService implements IAppStoreService {
    private apps: IAppStoreItem[];
    private root: string = 'C:\\Apps';
    public GetApps(env: string): Promise<IAppStoreItem[]>;
    public GetApps(env: string, category: string): Promise<IAppStoreItem[]>;
    public GetApps(...args: any[]): Promise<IAppStoreItem[]> {

        return new Promise((resolve, reject) => {
            RealmBrokerClient.GetMainStoreInfos().then((infos: any[]) => {
                const apps: any[] = infos.map(info => {
                    return {
                        id: info.app_id,
                        name: info.app_display_name,
                        service: false,
                        application: true,
                        category: 'General',
                        icon: info.app_icon,
                    }
                })
                
                resolve(apps);
            })
        });

    }
    private getApps(filePath: string): any {
        if (File.Exists(filePath)) {
            const fileData = File.ReadAllText(filePath);
            const apps = JSON.parse(fileData);

            try {
                const appStoreProviders = container.resolveAll('IAppStoreCategory');
                foreach(appStoreProviders, (item: any) => {
                    apps.apps.push(...item.items);
                });
            }
            catch {

            }
            return apps.apps;
        }
    }
}