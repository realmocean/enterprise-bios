import { Dialog, Spinner, State, UIController, UIScene, Text, HStack, cTrailing, VStack, UIImage, cLeading, cTopLeading, RenderingTypes, ScrollView, cVertical, Spacer, Icon, IconLibrary, cTop, TextField, IAppStoreService, Context, IAppStoreItem, Color, ControlTypes, FastText, ForEach, HDivider, IDesktopService, UIButton, ZStack, TextAlignment } from "@tuval/forms";

import { foreach, instance as container, EventBus } from '@tuval/core';
import { searchBox } from "./Views/SearchBox";
import { CategoryListView } from "./Views/CategortyView";

const appsCategoryModel = [
    {
        name: 'Discover',
        icon: '\\e838'
    },
    {
        name: 'All',
        icon: '\\e5c3'
    },
    {
        name: 'Multimedia',
        icon: '\\e02c'
    },
    {
        name: 'Bussiness',
        icon: '\\eb3f'
    },
    {
        name: 'Utilities',
        icon: '\\d1d8'
    },
    {
        name: 'Security',
        icon: '\\e32a'
    },
    {
        name: 'Productivity',
        icon: '\\eb9b'
    },
    {
        name: 'Development',
        icon: '\\f1b7'
    }

]

export class AppCenterControllerDialog extends Dialog {
    private controller: AppCenterController;

    public override InitComponents() {
        this.Text = 'Install Broker';
        this.Width = 1500;
        this.Height = 950;


        this.controller = new AppCenterController();
        //(this.createNewProjectDialogController as any).BindRouterParams({ dialog: this });
        this.Controls.Add(this.controller);

    }

    public BindRouterParams(obj) {
        (this.controller as any).BindRouterParams({ dialog: this, ...obj });
    }


    public override OnShown(): void {
        //this.createNewProjectDialogController.LoadProjects();
    }


    public OnOKClick(value: any) {
        this.ShowDialogAsyncResolve(value);
        this.Hide();
    }

    public OnCancel() {
        this.Hide();
    }

    public static Show(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const npd = new AppCenterControllerDialog();

            npd.BindRouterParams({})
            npd.ShowDialogAsync().then(() => {
                resolve(null);
            })
        });
    }

}

export class AppCenterController extends UIController {

    private dialog: AppCenterControllerDialog;

    @State()
    private selectedCat: string;

    @State()
    private appStoreService: IAppStoreService;

    @State()
    private selectedApps: any[];



    @Context()
    private OnCategorySelected(selectedCatName: string) {
        this.selectedCat = selectedCatName;
        this.LoadApps(selectedCatName);
    }

    protected override BindRouterParams({ dialog, broker_id }) {
        debugger;
        this.dialog = dialog;

    }

    private OnInstallApp(app: IAppStoreItem) {
        const desk = container.resolve<IDesktopService>(ControlTypes.IDesktopService);
        setTimeout(() => {
            desk.InstallApp('BPMGenesis', 'stan', app).then(e => {
                EventBus.Default.fire('tuval.desktop.toast', { severity: 'info', summary: 'App Installed', detail: app.name, life: 3000 });
                EventBus.Default.fire('tuval.desktop.installapp', { app: e });

                // gaEvent('Application', 'Install', app.name);
            });
        }, 1000);
    }
    protected InitController() {
        this.appStoreService = container.resolve<IAppStoreService>(ControlTypes.IAppStoreService);
        this.selectedCat = 'All';
        this.LoadApps('All');
    }

    private LoadApps(category: string): void {
        this.appStoreService.GetApps('', category).then((apps: any) => {
            foreach(apps, (app: any) => {
                this.selectedApps = apps;
                /*   const item = new CardViewItem();
                  item.Title = app.name;
                  item.TopTitle = app.vendor;
                  item.SubTitle = app.category;
                  item.Image = app.icon;
                  const button = new Button();
                  button.Text = 'Install';
                  button.Clicked.add(() => {
                      button.Text = 'Installing...';
                      const desk = container.resolve<IDesktopService>(ControlTypes.IDesktopService);
                      setTimeout(() => {
                          desk.InstallApp('BPMGenesis', 'stan', app).then(e => {
                              EventBus.Default.fire('tuval.desktop.toast', { severity: 'info', summary: 'App Installed', detail: app.name, life: 3000 });
                              EventBus.Default.fire('tuval.desktop.installapp', { app: e });
                              button.Text = 'Open';
                              gaEvent('Application','Install',app.name);
                          });
                      }, 1000); */
            });
        });

        /*  const a = new GetAppsRequest();
         a.HandshakeId = 5;
         a.Send().then(apps => {

         }); */
    }

    public LoadView() {
        return UIScene(
            VStack(
                HStack(
                    HStack({ alignment: cLeading })(
                        Text('apps').fontSize(20).fontWeight('800'),
                        Text('marketplace').fontSize(20).fontWeight('300')
                    ).height(60).padding(),

                    searchBox(),


                ).height(),
                HDivider().height(1).background('#dcdfec'),
                HStack({ alignment: cTopLeading })(
                    CategoryListView(appsCategoryModel) as any,
                    VStack({ alignment: cTopLeading })(
                        ZStack(
                            HStack({alignment:cTrailing})(
                            UIImage('/static/assets/apps_feature.png').height(260)
                            ).height(),
                            VStack({ alignment: cLeading, spacing: 5 })(
                                Text('Work OS platformunuz sinirsizdir.').fontWeight('500').fontSize(30).fontFamily(" Manrope,Roboto,Rubik,Noto Kufi Arabic,Noto Sans JP,sans-serif"),
                                Text('Islerinizi arzu ettiginiz sekilde ozellestirmek icin guclu uygulamalari ve entegrasyonlari kesfedin.').fontWeight('500')
                                .fontSize(18).fontWeight('300').fontFamily(" Manrope,Roboto,Rubik,Noto Kufi Arabic,Noto Sans JP,sans-serif")
                                .multilineTextAlignment(TextAlignment.leading),
                                )
                                
                                .padding()
                                .maxWidth('50%')

                                .background('transparent').height(260).onMouseDown((e) => this.form.StartFormDrag(e))
                        ).maxHeight("260px").minHeight("260px").background('rgb(247,248,250)').marginBottom('20px').cornerRadius(8),
                        ScrollView({ axes: cVertical })(
                            HStack({ alignment: cTopLeading, spacing: 20 })(
                                ...ForEach(this.selectedApps)(appInfo =>
                                    HStack({ alignment: cTopLeading, spacing: 10 })(
                                        UIImage(appInfo.icon).width(58).height(58),
                                        VStack({ alignment: cLeading, spacing: 5 })(
                                            FastText(appInfo.name).fontWeight('500'),
                                            FastText(appInfo.category).foregroundColor('#949494').fontSize('12px'),
                                            FastText(appInfo.vendor).foregroundColor('#CDCDCD').fontSize('10px'),
                                            UIButton(
                                                FastText('GET')
                                            ).backgroundColor('#F1F2F6').cornerRadius(20).width(50).height(20).foregroundColor('#0090F9').fontWeight('600').fontSize('10px')
                                                .action(() => this.OnInstallApp(appInfo)),
                                            HDivider().height(5)
                                        ).borderBottom('solid 1px #EBEBEB'),
                                    ).width(250).minWidth('250px').maxWidth('250px').height('').padding(10)

                                )
                            ).wrap('wrap')
                        ).background(Color.white).visible(this.selectedCat !== 'Discover')

                    )
                )
            )
        )
    }
}