import { UIController, UIView, Dialog } from '@tuval/forms';
import {
    HStack, UIImage, VStack, Text, UIButton, TextField,
    Icon, IconLibrary, Color, SecureField, State, AutoComplete
} from "@tuval/forms";
import { RealmBrokerClient } from './LoginBrokerClient';
import { imageUrl, wellcomeImage } from './LoginView';
import { StateService } from './RPADesktop';
import { is } from '@tuval/core';
declare var gtag;

export class LoginController extends UIController {

    private dialog: any;

    @State()
    private errorText: string;

    private userName: string;
    private password: string;

    private Login() {
        RealmBrokerClient.Login(this.userName, this.password)
            .then(sessionId => {
                StateService.SetSessionId(sessionId);

                gtag('event', 'Login', {
                    event_category: 'User Management',
                    event_action: 'success',
                    event_label: this.userName // Name of your form.
                });

                RealmBrokerClient.GetSessionInfo().then((info: any) => {

                    // }
                });



                this.dialog.CloseMe();
            })
            .catch(error => {
                alert(error)
                this.errorText = error;
            })
    }

    public BindModel(dialog: Dialog) {
        this.dialog = dialog;
    }
    public LoadView(): UIView {
        return (
            VStack(
                HStack(
                    VStack({ spacing: 30 })(
                        HStack(
                            UIImage(this.dialog.LoginLogo).width(130)
                        ).height().width().padding(10).cornerRadius(10)
                            .background(this.dialog.RealmInfo['LOGIN_BG'] ?? Color.white),
                        Text(this.dialog.RealmName)
                            .fontSize(25).fontWeight('bold').foregroundColor('black'),
                        UIButton(
                            HStack(
                                Text('Log in with Google')
                            )
                        )
                            .width('80%').height(40)
                            .shadow('rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;'),
                        VStack({ spacing: 20 })(
                            TextField()
                                .paddingLeft('10px')
                                .paddingRight('10px')
                                .placeholder('Enter User Name')
                                .fontSize(15)
                                .border({ default: '1px solid rgb(135, 148, 176)', hover: '1px solid  rgb(0, 97, 235)' })
                                .cornerRadius(8)
                                .foregroundColor('rgb(3, 27, 78)')
                                .height(40)
                                .width('80%')
                                .transition('all .25s cubic-bezier(.645,.045,.355,1)')
                                .tabIndex(0)
                                .autofocus(true)
                                .onTextChange(text => this.userName = text),
                            SecureField()
                                .paddingLeft('10px')
                                .paddingRight('10px')
                                .placeholder('Enter Password')
                                .fontSize(15)
                                .border({ default: '1px solid rgb(135, 148, 176)', hover: '1px solid  rgb(0, 97, 235)' })
                                .cornerRadius(8)
                                .foregroundColor('rgb(3, 27, 78)')
                                .height(40)
                                .width('80%')
                                .transition('all .25s cubic-bezier(.645,.045,.355,1)')
                                .tabIndex(1)
                                .onKeyDown((event) => event.keyCode === 13 ? this.Login() : void 0)
                                .onTextChange(text => this.password = text),
                        ).height(),
                        UIButton(
                            HStack(
                                Text('Login').width('100%'),
                                Icon(IconLibrary.ArrowRightAlt).size(20).width().paddingRight('10px')
                            )
                                .onClick(() => this.Login())
                                .tabIndex(2)
                        )
                            .background({ default: 'rgb(0, 97, 235)', hover: 'rgb(51, 135, 255)' })
                            .foregroundColor(Color.white)
                            .cornerRadius(10)
                            .transition('all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) 0s')
                            .width('80%')
                            .height(48)
                            .fontSize(16)
                            .fontWeight('600')
                            .onKeyDown((event) => event.keyCode === 13 ? this.Login() : void 0)
                        ,
                        Text(this.errorText).foregroundColor(Color.red)

                    ).width(350).minWidth('350px').background(Color.white),
                    VStack(
                        UIImage(imageUrl).left('-30px').position('absolute')
                    ).background('rgb(228,241,254)')

                ),

            ).background(Color.white).cornerRadius(12).overflow('hidden')
        )
    }
}