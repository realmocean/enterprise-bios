import { RPADesktop } from './RPADesktop';
import { FS } from '@tuval/core';
import { React, Teact, BrowserRouter, ControlTypes } from '@tuval/forms';
import {  DesktopController } from './CRMDesktop';
import { instance as container } from '@tuval/core';
import { RealmOceanDesktopService } from './DesktopService';



FS.syncfs(true, () => {

   
    /* const desktop = new RPADesktop();
    desktop.Start(); */
    debugger;
    const controller = new DesktopController();
    React.render(<BrowserRouter>{controller.Render()}</BrowserRouter>, window.document.body);
})
