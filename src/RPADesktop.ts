import { Desktop, DesktopIcon, TForm, IDesktopService, ControlTypes, Dialog, TApplication, LocalDesktopService, TaskManager, ApplicationModes, Button } from '@tuval/forms';
import { foreach, instance as container, TLoader, FS, EventBus, ModuleLoader, is } from '@tuval/core';

import { LoginController } from './LoginController';
import { RealmBrokerClient } from './LoginBrokerClient';

// import { TrackJS } from "trackjs";

declare var __Tuval_Config__;
//declare var TrackJS;

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
}

export class StateService {

    private static stateBag: any = {};

    public static SetStateVariable(key: string, value: any) {
        this.stateBag[key] = value;
    }

    public static GetStateVariable(key: string): any {
        return this.stateBag[key];
    }

    public static GetAndDeleteStateVariable(key: string): any {
        const value = this.stateBag[key];
        delete this.stateBag[key];
        return value;
    }


    public static SetSessionId(value: string): void {
        this.SetStateVariable('session_id', value);
    }

    public static GetSessionId(): string {
        return this.GetStateVariable('session_id');
    }
}

container.register('IConfigService', { useValue: ConfigService });
container.register('IStateService', { useValue: StateService });



class AAA extends Dialog {
    public RealmName: string;
    public LoginLogo: string;
    public RealmInfo: any;
    public CloseMe() {
        this.Hide();
        this.ShowDialogAsyncResolve('');
    }
}
export class RPADesktop extends Desktop {
    public InitDesktop(): void {

        debugger;

        ModuleLoader.LoadBundledModuleWithDecode('http://localhost:5050/static/applications/ModuleSample-Test.module', 'ModuleSample-Test').then((module: any) => {
            const a = new module();
            //a.hello();
        });

        RealmBrokerClient.GetRealmInfos('fgfgd').then(info => {


            /* install({ token: 'YOUR_APPLICATION_TOKEN' }) */

            //console.log(info);
            const realmName = info['REALM_NAME'];
            const realmLogo = info['LOGIN_LOGO'];
            const a = new AAA();
            a.RealmInfo = info;
            a.RealmName = realmName;
            a.LoginLogo = realmLogo;
            a.Width = 900;
            a.Height = 574;

            const controller = new LoginController();
            controller.BindModel(a);
            a.Controls.Add(controller);
            // a.Controls.Add(button);
            a.ShowDialogAsync().then(aaa => {
                /* this.SiteMode = true;
                     const form = new TForm();
                    form.Width = 600;
                    form.Height = 600;
                    form.Text = 'sdfsd';

                    this.Controls.Add(form);
                    form.Show();

                   return; */
                /*  ModuleLoader.LoadBundledModuleWithDecode('./lib/tuval$components$navigations.lib','tuval$components$navigations', true).then(()=>{*/
                const desk = container.resolve<IDesktopService>(ControlTypes.IDesktopService);
                debugger;
                if (__Tuval_Config__.startup.app != null) {
                    TApplication.ApplicationMode = ApplicationModes.Portal;
                    const lds = new LocalDesktopService();
                    desk.GetUserApps('BPMGenesis', 'stan').then(apps => {
                        desk.LoadApp(__Tuval_Config__.startup.app).then(appinfo => {
                            setTimeout(function () {
                                return TaskManager.Start(appinfo).then(function (app) {
                                    /*  gaEvent('Application', 'Start', _this.AppInfo.text);
                                     window.ga('send', 'pageview', _this.AppInfo.text); */
                                });
                            }, 10);
                        });
                    });

                } else {
                    desk.GetUserApps('BPMGenesis', 'stan').then(apps => {
                        foreach(apps, (app: any) => {
                            if (app.service) {
                                ModuleLoader.LoadBundledModuleWithDecode(app.url, app.name).then((_app: any) => {
                                    if (_app != null) {
                                        foreach(_app.services, (service: any) => {
                                            service.Start();
                                        });

                                        if (_app.application) {
                                            const appIcon = new DesktopIcon();
                                            appIcon.SetManifest(app, _app.application);
                                            this.Icons.Add(appIcon);
                                        }

                                    } else {
                                    }
                                });

                            } else {
                                const appIcon = new DesktopIcon();
                                appIcon.SetManifest(app);
                                this.Icons.Add(appIcon);
                            }
                        });
                        //});

                        EventBus.Default.on("tuval.desktop.installapp", (e) => {
                            if (e.app.service) {
                                ModuleLoader.LoadBundledModuleWithDecode(e.app.url, e.app.name).then((app: any) => {
                                    if (app != null) {
                                        foreach(app.services, (service: any) => {
                                            service.Start();
                                        });
                                    } else {
                                    }
                                });
                                if (e.app.application) {
                                    const appIcon = new DesktopIcon();
                                    appIcon.SetManifest(e.app);
                                    this.Icons.Add(appIcon);
                                }
                            } else {
                                const appIcon = new DesktopIcon();
                                appIcon.SetManifest(e.app);
                                this.Icons.Add(appIcon);
                            }
                        });
                    });
                }
            });
        })
    }
    public InitComponents() {
      

    }
}