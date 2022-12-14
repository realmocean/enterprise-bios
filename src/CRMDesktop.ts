import { foreach, HttpClient, ModuleLoader } from "@tuval/core";
import { ApplicationModes, cLeading, Color, ControlTypes, cTop, cTopLeading, DomHandler, DynamicView, ForEach, HDivider, HStack, Icon, IDesktopService, LocalDesktopService, Spacer, State, TApplication, TaskManager, Text, TextField, UIButton, UIController, UIDesktop, UIImage, UIScene, UISidebar, VStack } from "@tuval/forms";
import { instance as container, TLoader, FS, EventBus, is } from '@tuval/core';
import { RealmOceanDesktopService } from "./DesktopService";
import { RealmOceanAppStoreService } from "./RealmoceanAppStoreService";
import { accountImage, applicationsElement, boxElement, helpElement, invitePeopleElement, LeftSidemenu, myFavoritesElement, myProducts, myTaskElement, notifyElement, searchElement, svgElement } from "./Views/LeftSideMenu";
import { MainLogo } from "./Resources/MainLogo";
import { AppCenterControllerDialog } from "./Controllers/AppCenterController";
import { HomeView } from "./Controllers/Views/HomeView";

declare var __Tuval_Config__;
declare var gaEvent;
declare var WebFont;

container.register(ControlTypes.IDesktopService, { useValue: new RealmOceanDesktopService() });
container.register(ControlTypes.IAppStoreService, { useValue: new RealmOceanAppStoreService() });

DomHandler.addCssToDocument(`
:root {
    --motion-productive-short: 70ms;
    --motion-productive-medium: 100ms;
    --motion-productive-long: 150ms;
    --motion-expressive-short: 250ms;
    --motion-expressive-long: 400ms;
    --motion-timing-enter: cubic-bezier(0, 0, 0.35, 1);
    --motion-timing-exit: cubic-bezier(0.4, 0, 1, 1);
    --motion-timing-transition: cubic-bezier(0.4, 0, 0.2, 1);
    --motion-timing-emphasize: cubic-bezier(0, 0, 0.2, 1.4);
    --expand-animation-timing: var(--motion-timing-enter);
    --spacing-xs: 4px;
    --spacing-small: 8px;
    --spacing-medium: 16px;
    --spacing-large: 24px;
    --spacing-xl: 32px;
    --spacing-xxl: 48px;
    --spacing-xxxl: 64px;
    --border-width: 1px;
    --border-style: solid;
    --border-radius-small: 4px;
    --border-radius-medium: 8px;
    --border-radius-big: 16px;
    --disabled-component-opacity: 0.38;
    --font-family: Manrope, Roboto, Rubik, Noto Kufi Arabic, Noto Sans JP, sans-serif;
    --title-font-family: Poppins, Roboto, Rubik, Noto Kufi Arabic, Noto Sans JP, sans-serif;
    --h1-font-family: var(--title-font-family);
    --font-smoothing-webkit: antialiased;
    --font-smoothing-moz: grayscale;
    --font-weight-very-light: 200;
    --font-weight-light: 300;
    --font-weight-normal: 400;
    --font-weight-bold: 500;
    --font-size-10: 14px;
    --font-size-20: 14px;
    --font-size-30: 16px;
    --font-size-40: 18px;
    --font-size-50: 24px;
    --font-size-60: 30px;
    --font-line-height-10: 18px;
    --font-line-height-20: 24px;
    --font-line-height-30: 24px;
    --font-line-height-40: 24px;
    --font-line-height-50: 32px;
    --font-line-height-60: 42px;
    --font-size-h1: var(--font-size-60);
    --font-size-h2: var(--font-size-50);
    --font-size-h3: var(--font-size-50);
    --font-size-h4: var(--font-size-40);
    --font-size-h5: var(--font-size-30);
    --font-size-general-label: var(--font-size-20);
    --font-size-paragraph: var(--font-size-30);
    --font-size-subtext: var(--font-size-10);
    --font-line-height-h1: var(--font-line-height-60);
    --font-line-height-h2: var(--font-line-height-50);
    --font-line-height-h3: var(--font-line-height-50);
    --font-line-height-h4: var(--font-line-height-40);
    --font-line-height-h5: var(--font-line-height-30);
    --font-line-height-general-label: var(--font-line-height-20);
    --font-line-height-paragraph: var(--font-line-height-30);
    --font-line-height-subtext: var(--font-line-height-10);
    --font-h1: var(--font-weight-bold) var(--font-size-h1)/var(--font-line-height-h1) var(--h1-font-family);
    --font-h2: var(--font-weight-bold) var(--font-size-h2)/var(--font-line-height-h2) var(--title-font-family);
    --font-h3: var(--font-weight-light) var(--font-size-h3)/var(--font-line-height-h3) var(--title-font-family);
    --font-h4: var(--font-weight-bold) var(--font-size-h4)/var(--font-line-height-h4) var(--title-font-family);
    --font-h5: var(--font-weight-bold) var(--font-size-h5)/var(--font-line-height-h5) var(--font-family);
    --font-general-label: var(--font-weight-normal) var(--font-size-general-label)/var(--font-line-height-general-label) var(--font-family);
    --font-paragraph: var(--font-weight-normal) var(--font-size-paragraph)/var(--font-line-height-paragraph) var(--font-family);
    --font-subtext: var(--font-weight-normal) var(--font-size-subtext)/var(--font-line-height-subtext) var(--font-family)
}

.default-app-theme,
.light-app-theme,
:root {
    --color-highlight_blue: #cce5ff;
    --color-basic_blue: #0073ea;
    --color-dark_blue: #0060b9;
    --color-bazooka: #f65f7c;
    --color-snow_white: #ffffff;
    --color-riverstone_gray: #f6f7fb;
    --color-ui_grey: #dcdfec;
    --color-wolf_gray: #c3c6d4;
    --color-asphalt: #676879;
    --color-mud_black: #323338;
    --color-black: #000000;
    --color-success: #258750;
    --color-success-hover: #007038;
    --color-success-highlight: #bbdbc9;
    --color-error: #d83a52;
    --color-error-hover: #b63546;
    --color-error-highlight: #f4c3cb;
    --color-link_color: #1f76c2;
    --color-surface: #292f4c;
    --primary-color: #0073ea;
    --primary-hover-color: #0060b9;
    --primary-selected-color: #cce5ff;
    --primary-text-color: #323338;
    --text-color-on-primary: #ffffff;
    --text-color-on-inverted: #ffffff;
    --secondary-text-color: #676879;
    --placeholder-color: #676879;
    --icon-color: #676879;
    --link-color: #1f76c2;
    --primary-background-color: #ffffff;
    --primary-background-hover-color: #dcdfec;
    --secondary-background-color: #ffffff;
    --grey-background-color: #f6f7fb;
    --allgrey-background-color: #f6f7fb;
    --inverted-color-background: #323338;
    --disabled-background-color: #ecedf5;
    --disabled-text-color: rgba(50, 51, 56, var(--disabled-component-opacity));
    --positive-color: #258750;
    --positive-color-hover: #007038;
    --positive-color-selected: #bbdbc9;
    --negative-color: #d83a52;
    --negative-color-hover: #b63546;
    --negative-color-selected: #f4c3cb;
    --private-color: #f65f7c;
    --shareable-color: #a25ddc;
    --ui-border-color: #c3c6d4;
    --layout-border-color: #d0d4e4;
    --box-shadow-xs: 0px 4px 6px -4px rgba(0, 0, 0, 0.1);
    --box-shadow-small: 0px 4px 8px rgba(0, 0, 0, 0.2);
    --box-shadow-medium: 0px 6px 20px rgba(0, 0, 0, 0.2);
    --box-shadow-large: 0px 15px 50px rgba(0, 0, 0, 0.3);
    --color-grass_green: #037f4c;
    --color-grass_green-hover: #116846;
    --color-grass_green-selected: #81bfa5;
    --color-done-green: #00c875;
    --color-done-green-hover: #0f9b63;
    --color-done-green-selected: #80e3ba;
    --color-done-green-selected-with-opacity: rgba(128, 227, 186, 0.6);
    --color-bright-green: #9cd326;
    --color-bright-green-hover: #7ca32b;
    --color-bright-green-selected: #cde992;
    --color-saladish: #cab641;
    --color-saladish-hover: #9d8f3e;
    --color-saladish-selected: #e4daa0;
    --color-egg_yolk: #ffcb00;
    --color-egg_yolk-hover: #c29e11;
    --color-egg_yolk-selected: #ffe580;
    --color-egg_yolk-rgb: 255, 213, 51;
    --color-working_orange: #fdab3d;
    --color-working_orange-hover: #c0873c;
    --color-working_orange-selected: #fed59e;
    --color-dark-orange: #ff642e;
    --color-dark-orange-hover: #c25531;
    --color-dark-orange-selected: #ffb196;
    --color-peach: #ffadad;
    --color-peach-hover: #c2888a;
    --color-peach-selected: #ffd6d6;
    --color-sunset: #ff7575;
    --color-sunset-hover: #c26163;
    --color-sunset-selected: #ffbaba;
    --color-sunset-selected-with-opacity: rgba(255, 186, 186, 0.6);
    --color-stuck-red: #e2445c;
    --color-stuck-red-hover: #ad3f51;
    --color-stuck-red-selected: #f0a1ad;
    --color-dark-red: #bb3354;
    --color-dark-red-hover: #92334c;
    --color-dark-red-selected: #dd99a9;
    --color-sofia_pink: #ff158a;
    --color-sofia_pink-hover: #c21e71;
    --color-sofia_pink-selected: #ff8ac4;
    --color-lipstick: #ff5ac4;
    --color-lipstick-hover: #c24e9a;
    --color-lipstick-selected: #fface1;
    --color-bubble: #faa1f1;
    --color-bubble-hover: #be80ba;
    --color-bubble-selected: #fcd0f8;
    --color-purple: #a25ddc;
    --color-purple-hover: #8050ab;
    --color-purple-selected: #d0aeed;
    --color-dark_purple: #784bd1;
    --color-dark_purple-hover: #6344a3;
    --color-dark_purple-selected: #bba5e8;
    --color-berry: #7e3b8a;
    --color-berry-hover: #673971;
    --color-berry-selected: #be9dc4;
    --color-dark_indigo: #401694;
    --color-dark_indigo-hover: #3c1f78;
    --color-dark_indigo-selected: #a08bc9;
    --color-indigo: #5559df;
    --color-indigo-hover: #4b4ead;
    --color-indigo-selected: #aaacef;
    --color-navy: #225091;
    --color-navy-hover: #274776;
    --color-navy-selected: #90a7c8;
    --color-bright-blue: #579bfc;
    --color-bright-blue-hover: #4c7cc1;
    --color-bright-blue-selected: #abcdfd;
    --color-dark-blue: #0086c0;
    --color-dark-blue-hover: #0f6d97;
    --color-dark-blue-selected: #80c2df;
    --color-aquamarine: #4eccc6;
    --color-aquamarine-hover: #469e9b;
    --color-aquamarine-selected: #a6e5e2;
    --color-chili-blue: #66ccff;
    --color-chili-blue-hover: #569ec3;
    --color-chili-blue-selected: #b2e5ff;
    --color-river: #68a1bd;
    --color-river-hover: #588095;
    --color-river-selected: #b3d0de;
    --color-winter: #9aadbd;
    --color-winter-hover: #7b8895;
    --color-winter-selected: #ccd6de;
    --color-explosive: #c4c4c4;
    --color-explosive-hover: #98999a;
    --color-explosive-selected: #e1e1e1;
    --color-american_gray: #808080;
    --color-american_gray-hover: #69696a;
    --color-american_gray-selected: #bfbfbf;
    --color-blackish: #333333;
    --color-blackish-hover: #222222;
    --color-blackish-selected: #999999;
    --color-brown: #7f5347;
    --color-brown-hover: #684943;
    --color-brown-selected: #bfa9a3;
    --color-orchid: #D974B0;
    --color-orchid-hover: #AE5D8D;
    --color-orchid-selected: #ECBAD7;
    --color-tan: #AD967A;
    --color-tan-hover: #8A7862;
    --color-tan-selected: #D6CABC;
    --color-sky: #A1E3F6;
    --color-sky-hover: #81B6C5;
    --color-sky-selected: #D0F1FA;
    --color-coffee: #BD816E;
    --color-coffee-hover: #976758;
    --color-coffee-selected: #DEC0B7;
    --color-royal: #2B76E5;
    --color-royal-hover: #225EB7;
    --color-royal-selected: #95BBF2;
    --color-teal: #175A63;
    --color-teal-hover: #12484F;
    --color-teal-selected: #8BACB1;
    --color-lavender: #BDA8F9;
    --color-lavender-hover: #9786C7;
    --color-lavender-selected: #DED4FC;
    --color-steel: #A9BEE8;
    --color-steel-hover: #8798BA;
    --color-steel-selected: #D4DFF4;
    --color-lilac: #9D99B9;
    --color-lilac-hover: #7E7A94;
    --color-lilac-selected: #CECCDC;
    --color-pecan: #563E3E;
    --color-pecan-hover: #453232;
    --color-pecan-selected: #AB9F9F;
    --color-dark_marble: #f1f1f1;
    --color-marble: #f7f7f7;
    --color-gainsboro: #e1e1e1;
    --color-extra_light_gray: #edeef0;
    --color-glitter: #d9f0ff;
    --color-ultra_light_gray: #ebebeb;
    --color-very_light_gray: #a1a1a1;
    --color-jaco_gray: #9699a6;
    --color-storm_gray: #6b6d77;
    --color-trolley-grey: #808080;
    --color-basic_light_blue: #c7e6fa;
    --color-light_blue: #61caf7;
    --color-turquoise: #66ccff;
    --color-aqua: #00d1d1;
    --color-live_blue: #009aff;
    --color-jeans: #597bfc;
    --color-burned_eggplant: #181d37;
    --color-light-pink: #ff5ac4;
    --color-dark-pink: #ff158a;
    --color-dark_red: #bb3354;
    --color-yellow: #ffcb00;
    --color-mustered: #cab641;
    --color-orange: #fdab3d;
    --color-lime-green: #9cd326;
    --color-jade: #03c875;
    --color-green-haze: #00a359;
    --color-grass-green: #037f4c;
    --color-amethyst: #a25ddc;
    --color-dark-purple: #784bd1;
    --color-blue_links: #0086c0;
    --color-blue-links: #0086c0;
    --color-private: #f65f7c;
    --color-public: #009aff;
    --color-board_views_grey: #6e6f8f;
    --color-board_views_grey_hover: #b2b3d0;
    --color-board_views_blue: #1c1f3b;
    --color-board_views_blue_secondary: #363a52;
    --color-border_light_gray: #f5f6f8;
    --color-brand-blue: #00a9ff;
    --color-brand-charcoal: #2b2c5c;
    --color-brand-gold: #ffcc00;
    --color-brand-green: #11dd80;
    --color-brand-iris: #595ad4;
    --color-brand-light-blue: #00cff4;
    --color-brand-malachite: #00cd6f;
    --color-brand-purple: #a358d0;
    --color-brand-red: #f74875;
    --color-deadline_upcoming_indication: #5d6387;
    --color-default_group_color: #579bfc;
    --color-form_btn_hover: #0083d9;
    --color-form_purple: #575c96;
    --color-highlight: #dff0ff;
    --color-green_shadow: #00c875;
    --color-green-shadow: #00c875;
    --color-red_shadow: #e2445c;
    --color-red-shadow: #e2445c;
    --color-pulse_bg: #f0f0f0;
    --color-pulse_text_color: #333333;
    --color-placholder_gray: #d8d8d8;
    --color-placeholder_light_gray: #efefef;
    --color-excel-green: #207245;
    --color-media-blue: #2ea2e9;
    --color-pdf-red: #bb0706;
    --color-ppt-orange: #d64e2a;
    --color-word-blue: #2a5699;
    --color-zip-orange: #e4901c;
    --color-like_red: #fb275d;
    --color-scrollbar_gray: #b2b2b2;
    --color-timeline_grid_blue: #454662;
    --color-timeline_blue: #1c1f3b;
    --color-highlight_blue-rgb: 204, 229, 255;
    --color-snow_white-with-opacity: rgba(255, 255, 255, 0.4);
    --color-wolf_gray-with-opacity: rgba(195, 198, 212, 0.1);
    --color-asphalt-with-opacity: rgba(103, 104, 121, 0.1);
    --primary-on-secondary-color: #0073ea;
    --primary-hover-on-secondary-color: #0060b9;
    --primary-selected-color-rgb: 204, 229, 255;
    --primary-selected-on-secondary-color: #cce5ff;
    --primary-text-on-secondary-color: #323338;
    --text-color-on-primary-with-opacity: rgba(255, 255, 255, 0.4);
    --secondary-text-on-secondary-color: #676879;
    --placeholder-color-with-opacity: rgba(103, 104, 121, 0.1);
    --placeholder-on-secondary-color: #676879;
    --icon-on-secondary-color: #676879;
    --link-on-secondary-color: #1f76c2;
    --label-background-color: #cce5ff;
    --label-background-on-secondary-color: #cce5ff;
    --primary-background-color-rgb: 255, 255, 255;
    --primary-background-hover-on-secondary-color: #dcdfec;
    --modal-background-color: #ffffff;
    --secondary-background-color-rgb: 255, 255, 255;
    --disabled-background-on-secondary-color: #ecedf5;
    --disabled-text-on-secondary-color: rgba(50, 51, 56, var(--disabled-component-opacity));
    --ui-border-on-secondary-color: #c3c6d4;
    --layout-border-on-secondary-color: #d0d4e4;
    --dark-background-color: #f6f7fb;
    --dark-background-on-secondary-color: #f6f7fb;
    --dialog-background-color: #ffffff;
    --box-shadow-mediun: 0px 6px 20px rgba(0, 0, 0, 0.2)
}

.dark-app-theme {
    --primary-color: #0073ea;
    --primary-on-secondary-color: #0073ea;
    --primary-hover-color: #0060b9;
    --primary-selected-color: #133774;
    --primary-text-color: #d5d8df;
    --text-color-on-primary: #ffffff;
    --text-color-on-inverted: #323338;
    --secondary-text-color: #9699a6;
    --placeholder-color: #c3c6d4;
    --icon-color: #c3c6d4;
    --link-color: #69a7ef;
    --primary-background-color: #181b34;
    --primary-background-hover-color: #4b4e69;
    --secondary-background-color: #30324e;
    --grey-background-color: #181b34;
    --allgrey-background-color: #30324e;
    --inverted-color-background: #ffffff;
    --disabled-text-color: rgba(213, 216, 223, var(--disabled-component-opacity));
    --disabled-background-color: #3c3f59;
    --positive-color: #258750;
    --positive-color-hover: #007038;
    --positive-color-selected: #26503e;
    --negative-color: #d83a52;
    --negative-color-hover: #b63546;
    --negative-color-selected: #642830;
    --private-color: #f65f7c;
    --shareable-color: #a25ddc;
    --ui-border-color: #797e93;
    --layout-border-color: #4b4e69;
    --box-shadow-xs: 0px 4px 6px -4px rgba(9, 11, 25, 0.5);
    --box-shadow-small: 0px 4px 8px rgba(9, 11, 25, 0.5);
    --box-shadow-medium: 0px 6px 20px rgba(9, 11, 25, 0.5);
    --box-shadow-large: 0px 15px 50px rgba(9, 11, 25, 0.5);
    --color-grass_green: #359970;
    --color-grass_green-hover: #116846;
    --color-grass_green-selected: #0f4f43;
    --color-done-green: #33d391;
    --color-done-green-hover: #0f9b63;
    --color-done-green-selected: #0e7358;
    --color-done-green-selected-with-opacity: rgba(14, 115, 88, 0.6);
    --color-bright-green: #b0dc51;
    --color-bright-green-hover: #7ca32b;
    --color-bright-green-selected: #5c7930;
    --color-saladish: #d5c567;
    --color-saladish-hover: #9d8f3e;
    --color-saladish-selected: #736a3e;
    --color-egg_yolk: #ffd533;
    --color-egg_yolk-hover: #c29e11;
    --color-egg_yolk-selected: #8D751E;
    --color-egg_yolk-rgb: 255, 213, 51;
    --color-working_orange: #fdbc64;
    --color-working_orange-hover: #c0873c;
    --color-working_orange-selected: #8c653c;
    --color-dark-orange: #ff7b4d;
    --color-dark-orange-hover: #c25531;
    --color-dark-orange-selected: #8d4134;
    --color-peach: #ffbdbd;
    --color-peach-hover: #c2888a;
    --color-peach-selected: #8d6674;
    --color-sunset: #ff9191;
    --color-sunset-hover: #c26163;
    --color-sunset-selected: #8d4a58;
    --color-sunset-selected-with-opacity: rgba(141, 74, 88, 0.6);
    --color-stuck-red: #e8697d;
    --color-stuck-red-hover: #ad3f51;
    --color-stuck-red-selected: #7f314b;
    --color-dark-red: #c95c76;
    --color-dark-red-hover: #92334c;
    --color-dark-red-selected: #6b2947;
    --color-sofia_pink: #ff44a1;
    --color-sofia_pink-hover: #c21e71;
    --color-sofia_pink-selected: #8d1a62;
    --color-lipstick: #ff7bd0;
    --color-lipstick-hover: #c24e9a;
    --color-lipstick-selected: #8d3c7f;
    --color-bubble: #fbb4f4;
    --color-bubble-hover: #be80ba;
    --color-bubble-selected: #8b6096;
    --color-purple: #b57de3;
    --color-purple-hover: #8050ab;
    --color-purple-selected: #5f3e8b;
    --color-dark_purple: #936fda;
    --color-dark_purple-hover: #6344a3;
    --color-dark_purple-selected: #4a3586;
    --color-berry: #6645a9;
    --color-berry-hover: #673971;
    --color-berry-selected: #4d2d62;
    --color-dark_indigo: #401694;
    --color-dark_indigo-hover: #3c1f78;
    --color-dark_indigo-selected: #2e1b67;
    --color-indigo: #777ae5;
    --color-indigo-hover: #4b4ead;
    --color-indigo-selected: #383c8d;
    --color-navy: #4e73a7;
    --color-navy-hover: #274776;
    --color-navy-selected: #1f3866;
    --color-bright-blue: #79affd;
    --color-bright-blue-hover: #4c7cc1;
    --color-bright-blue-selected: #395d9b;
    --color-dark-blue: #339ecd;
    --color-dark-blue-hover: #0f6d97;
    --color-dark-blue-selected: #0e527e;
    --color-aquamarine: #71d6d1;
    --color-aquamarine-hover: #469e9b;
    --color-aquamarine-selected: #357580;
    --color-chili-blue: #85d6ff;
    --color-chili-blue-hover: #569ec3;
    --color-chili-blue-selected: #41759d;
    --color-river: #86b4ca;
    --color-river-hover: #588095;
    --color-river-selected: #42607c;
    --color-winter: #aebdca;
    --color-winter-hover: #7b8895;
    --color-winter-selected: #5b667c;
    --color-explosive: #d0d0d0;
    --color-explosive-hover: #98999a;
    --color-explosive-selected: #70717f;
    --color-american_gray: #999999;
    --color-american_gray-hover: #69696a;
    --color-american_gray-selected: #4e505e;
    --color-blackish: #5c5c5c;
    --color-blackish-hover: #222222;
    --color-blackish-selected: #272937;
    --color-brown: #99756c;
    --color-brown-hover: #684943;
    --color-brown-selected: #4d3941;
    --color-orchid: #E190C0;
    --color-orchid-hover: #B4739A;
    --color-orchid-selected: #B4739A;
    --color-tan: #BDAB95;
    --color-tan-hover: #978977;
    --color-tan-selected: #716863;
    --color-sky: #B4E9F8;
    --color-sky-hover: #90BAC6;
    --color-sky-selected: #6C8A9A;
    --color-coffee: #CA9A8B;
    --color-coffee-hover: #A27B6F;
    --color-coffee-selected: #795E5D;
    --color-royal: #5591EA;
    --color-royal-hover: #4474BB;
    --color-royal-selected: #375993;
    --color-teal: #457B82;
    --color-teal-hover: #376268;
    --color-teal-selected: #2E4D58;
    --color-lavender: #CAB9FA;
    --color-lavender-hover: #A294C8;
    --color-lavender-selected: #85597B;
    --color-steel: #BACBED;
    --color-steel-hover: #95A2BE;
    --color-steel-selected: #707A95;
    --color-lilac: #B1ADC7;
    --color-lilac-hover: #8E8A9F;
    --color-lilac-selected: #6B697F;
    --color-pecan: #786565;
    --color-pecan-hover: #605151;
    --color-pecan-selected: #4A4148;
    --primary-on-secondary-color: #0073ea;
    --primary-hover-on-secondary-color: #0060b9;
    --primary-selected-color-rgb: 19, 55, 116;
    --primary-selected-on-secondary-color: #133774;
    --primary-text-on-secondary-color: #d5d8df;
    --primary-background-color-rgb: 24, 27, 52;
    --primary-background-hover-on-secondary-color: #4b4e69;
    --secondary-background-color-rgb: 48, 50, 78;
    --secondary-text-on-secondary-color: #9699a6;
    --link-on-secondary-color: #69a7ef;
    --modal-background-color: #181b34;
    --dark-background-color: #393b53;
    --dark-background-on-secondary-color: #4b4e69;
    --dialog-background-color: #30324e;
    --label-background-color: #404b69;
    --label-background-on-secondary-color: #404b69;
    --icon-on-secondary-color: #c3c6d4;
    --placeholder-color-with-opacity: rgba(195, 198, 212, 0.1);
    --placeholder-on-secondary-color: #c3c6d4;
    --ui-border-on-secondary-color: #797e93;
    --layout-border-on-secondary-color: #4b4e69;
    --disabled-background-on-secondary-color: #3c3f59;
    --disabled-text-on-secondary-color: rgba(213, 216, 223, var(--disabled-component-opacity));
    --box-shadow-mediun: 0px 6px 20px rgba(0, 0, 0, 0.2)
}

.black-app-theme {
    --primary-color: #0073ea;
    --primary-on-secondary-color: #0073ea;
    --primary-hover-color: #0060b9;
    --primary-selected-color: #133774;
    --primary-text-color: #eeeeee;
    --text-color-on-primary: #ffffff;
    --text-color-on-inverted: #111111;
    --secondary-text-color: #aaaaaa;
    --placeholder-color: #aaaaaa;
    --icon-color: #aaaaaa;
    --link-color: #69a7ef;
    --primary-background-color: #111111;
    --primary-background-hover-color: #636363;
    --secondary-background-color: #2c2c2c;
    --grey-background-color: #111111;
    --allgrey-background-color: #2c2c2c;
    --inverted-color-background: #eeeeee;
    --disabled-text-color: rgba(238, 238, 238, var(--disabled-component-opacity));
    --disabled-background-color: #3a3a3a;
    --positive-color: #258750;
    --positive-color-hover: #007038;
    --positive-color-selected: #26503e;
    --negative-color: #d83a52;
    --negative-color-hover: #b63546;
    --negative-color-selected: #642830;
    --private-color: #f65f7c;
    --shareable-color: #a25ddc;
    --ui-border-color: #8d8d8d;
    --layout-border-color: #636363;
    --box-shadow-xs: 0px 4px 6px -4px #000000;
    --box-shadow-small: 0px 4px 8px #000000;
    --box-shadow-medium: 0px 6px 20px #000000;
    --box-shadow-large: 0px 15px 50px #000000;
    --color-grass_green: #359970;
    --color-grass_green-hover: #116846;
    --color-grass_green-selected: #0a482e;
    --color-done-green: #33d391;
    --color-done-green-hover: #0f9b63;
    --color-done-green-selected: #096c43;
    --color-done-green-selected-with-opacity: rgba(9, 108, 67, 0.6);
    --color-bright-green: #b0dc51;
    --color-bright-green-hover: #7ca32b;
    --color-bright-green-selected: #56721b;
    --color-saladish: #d5c567;
    --color-saladish-hover: #9d8f3e;
    --color-saladish-selected: #6d6329;
    --color-egg_yolk: #ffd533;
    --color-egg_yolk-hover: #c29e11;
    --color-egg_yolk-selected: #886e09;
    --color-egg_yolk-rgb: 255, 213, 51;
    --color-working_orange: #fdbc64;
    --color-working_orange-hover: #c0873c;
    --color-working_orange-selected: #875e27;
    --color-dark-orange: #ff7b4d;
    --color-dark-orange-hover: #c25531;
    --color-dark-orange-selected: #883a1f;
    --color-peach: #ffbdbd;
    --color-peach-hover: #c2888a;
    --color-peach-selected: #885f5f;
    --color-sunset: #ff9191;
    --color-sunset-hover: #c26163;
    --color-sunset-selected: #884343;
    --color-sunset-selected-with-opacity: rgba(136, 67, 67, 0.6);
    --color-stuck-red: #e8697d;
    --color-stuck-red-hover: #ad3f51;
    --color-stuck-red-selected: #792a36;
    --color-dark-red: #c95c76;
    --color-dark-red-hover: #92334c;
    --color-dark-red-selected: #662232;
    --color-sofia_pink: #ff44a1;
    --color-sofia_pink-hover: #c21e71;
    --color-sofia_pink-selected: #88134d;
    --color-lipstick: #ff7bd0;
    --color-lipstick-hover: #c24e9a;
    --color-lipstick-selected: #88356a;
    --color-bubble: #fbb4f4;
    --color-bubble-hover: #be80ba;
    --color-bubble-selected: #855981;
    --color-purple: #b57de3;
    --color-purple-hover: #8050ab;
    --color-purple-selected: #593776;
    --color-dark_purple: #936fda;
    --color-dark_purple-hover: #6344a3;
    --color-dark_purple-selected: #442e71;
    --color-berry: #9862a1;
    --color-berry-hover: #673971;
    --color-berry-selected: #47264d;
    --color-dark_indigo: #6645a9;
    --color-dark_indigo-hover: #3c1f78;
    --color-dark_indigo-selected: #291452;
    --color-indigo: #777ae5;
    --color-indigo-hover: #4b4ead;
    --color-indigo-selected: #333578;
    --color-navy: #4e73a7;
    --color-navy-hover: #274776;
    --color-navy-selected: #193151;
    --color-bright-blue: #79affd;
    --color-bright-blue-hover: #4c7cc1;
    --color-bright-blue-selected: #345686;
    --color-dark-blue: #339ecd;
    --color-dark-blue-hover: #0f6d97;
    --color-dark-blue-selected: #094b69;
    --color-aquamarine: #71d6d1;
    --color-aquamarine-hover: #469e9b;
    --color-aquamarine-selected: #2f6e6b;
    --color-chili-blue: #85d6ff;
    --color-chili-blue-hover: #569ec3;
    --color-chili-blue-selected: #3b6e88;
    --color-river: #86b4ca;
    --color-river-hover: #588095;
    --color-river-selected: #3c5967;
    --color-winter: #aebdca;
    --color-winter-hover: #7b8895;
    --color-winter-selected: #555f67;
    --color-explosive: #d0d0d0;
    --color-explosive-hover: #98999a;
    --color-explosive-selected: #6a6a6a;
    --color-american_gray: #999999;
    --color-american_gray-hover: #69696a;
    --color-american_gray-selected: #494949;
    --color-blackish: #5c5c5c;
    --color-blackish-hover: #222222;
    --color-blackish-selected: #111111;
    --color-brown: #99756c;
    --color-brown-hover: #684943;
    --color-brown-selected: #48322c;
    --color-orchid: #e190c0;
    --color-orchid-hover: #b4739a;
    --color-orchid-selected: #7e516c;
    --color-tan: #bdab95;
    --color-tan-hover: #978977;
    --color-tan-selected: #6a6053;
    --color-sky: #b4e9f8;
    --color-sky-hover: #90bac6;
    --color-sky-selected: #65828b;
    --color-coffee: #ca9a8b;
    --color-coffee-hover: #a27b6f;
    --color-coffee-selected: #71564e;
    --color-royal: #5591ea;
    --color-royal-hover: #4474bb;
    --color-royal-selected: #305183;
    --color-teal: #457b82;
    --color-teal-hover: #376268;
    --color-teal-selected: #274549;
    --color-lavender: #cab9fa;
    --color-lavender-hover: #a294c8;
    --color-lavender-selected: #71688c;
    --color-steel: #bacbed;
    --color-steel-hover: #95a2be;
    --color-steel-selected: #687185;
    --color-lilac: #687185;
    --color-lilac-hover: #8e8a9f;
    --color-lilac-selected: #63616f;
    --color-pecan: #786565;
    --color-pecan-hover: #605151;
    --color-pecan-selected: #433939;
    --primary-on-secondary-color: #0073ea;
    --primary-hover-on-secondary-color: #0060b9;
    --primary-selected-color-rgb: 19, 55, 116;
    --primary-selected-on-secondary-color: #133774;
    --primary-text-on-secondary-color: #eeeeee;
    --primary-background-color-rgb: 17, 17, 17;
    --primary-background-hover-on-secondary-color: #636363;
    --secondary-background-color-rgb: 44, 44, 44;
    --secondary-text-on-secondary-color: #9699a6;
    --link-on-secondary-color: #69a7ef;
    --modal-background-color: #181b34;
    --dark-background-color: #2c2c2c;
    --dark-background-on-secondary-color: #4b4e69;
    --dialog-background-color: #2c2c2c;
    --label-background-color: #404b69;
    --label-background-on-secondary-color: #404b69;
    --icon-on-secondary-color: #aaaaaa;
    --placeholder-color-with-opacity: rgba(170, 170, 170, 0.1);
    --placeholder-on-secondary-color: #aaaaaa;
    --ui-border-on-secondary-color: #8d8d8d;
    --layout-border-on-secondary-color: #636363;
    --disabled-background-on-secondary-color: #3a3a3a;
    --disabled-text-on-secondary-color: rgba(238, 238, 238, var(--disabled-component-opacity));
    --box-shadow-mediun: 0px 6px 20px rgba(0, 0, 0, 0.2)
}

.hacker_theme-app-theme {
    --primary-color: #fe78c6;
    --primary-hover-color: #fe5ab9;
    --primary-selected-color: #9f4077;
    --primary-text-color: #d5d8df;
    --text-color-on-inverted: #323338;
    --secondary-text-color: #9699a6;
    --placeholder-color: #c3c6d4;
    --icon-color: #c3c6d4;
    --link-color: #bd93f9;
    --primary-background-color: #282a36;
    --primary-background-hover-color: #4b4e69;
    --secondary-background-color: #30324e;
    --grey-background-color: #282a36;
    --allgrey-background-color: #282a36;
    --inverted-color-background: #ffffff;
    --disabled-text-color: rgba(238, 238, 238, var(--disabled-component-opacity));
    --disabled-background-color: #3a3a3a;
    --positive-color: #50fa7b;
    --positive-color-hover: #007038;
    --positive-color-selected: #26503e;
    --negative-color: #ff5555;
    --negative-color-hover: #b63546;
    --negative-color-selected: #642830;
    --private-color: #f65f7c;
    --shareable-color: #a25ddc;
    --ui-border-color: #797e93;
    --layout-border-color: #414458;
    --box-shadow-xs: 0px 4px 6px -4px #000000;
    --box-shadow-small: 0px 4px 8px #000000;
    --box-shadow-medium: 0px 6px 20px #000000;
    --box-shadow-large: 0px 15px 50px #000000;
    --color-grass_green: #359970;
    --color-grass_green-hover: #116846;
    --color-grass_green-selected: #0a482e;
    --color-done-green: #33d391;
    --color-done-green-hover: #0f9b63;
    --color-done-green-selected: #096c43;
    --color-done-green-selected-with-opacity: rgba(9, 108, 67, 0.6);
    --color-bright-green: #b0dc51;
    --color-bright-green-hover: #7ca32b;
    --color-bright-green-selected: #56721b;
    --color-saladish: #d5c567;
    --color-saladish-hover: #9d8f3e;
    --color-saladish-selected: #6d6329;
    --color-egg_yolk: #ffd533;
    --color-egg_yolk-hover: #c29e11;
    --color-egg_yolk-selected: #886e09;
    --color-egg_yolk-rgb: 255, 213, 51;
    --color-working_orange: #fdbc64;
    --color-working_orange-hover: #c0873c;
    --color-working_orange-selected: #875e27;
    --color-dark-orange: #ff7b4d;
    --color-dark-orange-hover: #c25531;
    --color-dark-orange-selected: #883a1f;
    --color-peach: #ffbdbd;
    --color-peach-hover: #c2888a;
    --color-peach-selected: #885f5f;
    --color-sunset: #ff9191;
    --color-sunset-hover: #c26163;
    --color-sunset-selected: #884343;
    --color-sunset-selected-with-opacity: rgba(136, 67, 67, 0.6);
    --color-stuck-red: #e8697d;
    --color-stuck-red-hover: #ad3f51;
    --color-stuck-red-selected: #792a36;
    --color-dark-red: #c95c76;
    --color-dark-red-hover: #92334c;
    --color-dark-red-selected: #662232;
    --color-sofia_pink: #ff44a1;
    --color-sofia_pink-hover: #c21e71;
    --color-sofia_pink-selected: #88134d;
    --color-lipstick: #ff7bd0;
    --color-lipstick-hover: #c24e9a;
    --color-lipstick-selected: #88356a;
    --color-bubble: #fbb4f4;
    --color-bubble-hover: #be80ba;
    --color-bubble-selected: #855981;
    --color-purple: #b57de3;
    --color-purple-hover: #8050ab;
    --color-purple-selected: #593776;
    --color-dark_purple: #936fda;
    --color-dark_purple-hover: #6344a3;
    --color-dark_purple-selected: #442e71;
    --color-berry: #9862a1;
    --color-berry-hover: #673971;
    --color-berry-selected: #47264d;
    --color-dark_indigo: #6645a9;
    --color-dark_indigo-hover: #3c1f78;
    --color-dark_indigo-selected: #291452;
    --color-indigo: #777ae5;
    --color-indigo-hover: #4b4ead;
    --color-indigo-selected: #333578;
    --color-navy: #4e73a7;
    --color-navy-hover: #274776;
    --color-navy-selected: #193151;
    --color-bright-blue: #79affd;
    --color-bright-blue-hover: #4c7cc1;
    --color-bright-blue-selected: #345686;
    --color-dark-blue: #339ecd;
    --color-dark-blue-hover: #0f6d97;
    --color-dark-blue-selected: #094b69;
    --color-aquamarine: #71d6d1;
    --color-aquamarine-hover: #469e9b;
    --color-aquamarine-selected: #2f6e6b;
    --color-chili-blue: #85d6ff;
    --color-chili-blue-hover: #569ec3;
    --color-chili-blue-selected: #3b6e88;
    --color-river: #86b4ca;
    --color-river-hover: #588095;
    --color-river-selected: #3c5967;
    --color-winter: #aebdca;
    --color-winter-hover: #7b8895;
    --color-winter-selected: #555f67;
    --color-explosive: #d0d0d0;
    --color-explosive-hover: #98999a;
    --color-explosive-selected: #6a6a6a;
    --color-american_gray: #999999;
    --color-american_gray-hover: #69696a;
    --color-american_gray-selected: #494949;
    --color-blackish: #5c5c5c;
    --color-blackish-hover: #222222;
    --color-blackish-selected: #111111;
    --color-brown: #99756c;
    --color-brown-hover: #684943;
    --color-brown-selected: #48322c;
    --color-orchid: #e190c0;
    --color-orchid-hover: #b4739a;
    --color-orchid-selected: #7e516c;
    --color-tan: #bdab95;
    --color-tan-hover: #978977;
    --color-tan-selected: #6a6053;
    --color-sky: #b4e9f8;
    --color-sky-hover: #90bac6;
    --color-sky-selected: #65828b;
    --color-coffee: #ca9a8b;
    --color-coffee-hover: #a27b6f;
    --color-coffee-selected: #71564e;
    --color-royal: #5591ea;
    --color-royal-hover: #4474bb;
    --color-royal-selected: #305183;
    --color-teal: #457b82;
    --color-teal-hover: #376268;
    --color-teal-selected: #274549;
    --color-lavender: #cab9fa;
    --color-lavender-hover: #a294c8;
    --color-lavender-selected: #71688c;
    --color-steel: #bacbed;
    --color-steel-hover: #95a2be;
    --color-steel-selected: #687185;
    --color-lilac: #687185;
    --color-lilac-hover: #8e8a9f;
    --color-lilac-selected: #63616f;
    --color-pecan: #786565;
    --color-pecan-hover: #605151;
    --color-pecan-selected: #433939;
    --color-success: #50fa7b;
    --color-error: #ff5555;
    --primary-on-secondary-color: #fe78c6;
    --primary-hover-on-secondary-color: #fe5ab9;
    --primary-selected-color-rgb: 159, 64, 119;
    --primary-selected-on-secondary-color: #9f4077;
    --primary-text-on-secondary-color: #d5d8df;
    --primary-background-color-rgb: 40, 42, 54;
    --primary-background-hover-on-secondary-color: #4b4e69;
    --secondary-background-color-rgb: 48, 50, 78;
    --secondary-text-on-secondary-color: #9699a6;
    --link-on-secondary-color: #bd93f9;
    --modal-background-color: #282a36;
    --dark-background-color: #303241;
    --dark-background-on-secondary-color: #595959;
    --dialog-background-color: #30324e;
    --label-background-color: #404b69;
    --label-background-on-secondary-color: #404b69;
    --icon-on-secondary-color: #c3c6d4;
    --placeholder-color-with-opacity: rgba(195, 198, 212, 0.1);
    --placeholder-on-secondary-color: #c3c6d4;
    --ui-border-on-secondary-color: #797e93;
    --layout-border-on-secondary-color: #414458;
    --disabled-background-on-secondary-color: #3a3a3a;
    --disabled-text-on-secondary-color: rgba(238, 238, 238, var(--disabled-component-opacity));
    --box-shadow-mediun: 0px 6px 20px rgba(0, 0, 0, 0.2)
}


:root,
.light-app-theme,
.default-app-theme {
    --react-modal-background: rgba(41, 47, 76, 0.7);
    --application-background-color: var(--color-snow_white);
    --application-border-color: #e6e9ef;
    --text-color-on-card: #323338;
    --main-nav-background-color: #292f4c;
    --pulse-background-color: #f5f6f8;
    --pulse-background-color-rgb: 245, 246, 248;
    --pulse-background-color-opacity: #f5f6f880;
    --pulse-text-color: #666;
    --pulse-hover-background-color: #e6e9ef;
    --pulse-selected-background-color: #e5f4ff;
    --pulse-floating-background-color: 253, 253, 250;
    --pulse-highlight-background-color: #cce9ff;
    --surfce-color: #292f4c;
    --surface-border-color: #4b4e69;
    --card-background-color: var(--primary-background-color);
    --card-hover-background-color: white;
    --card-selected-background-color: #d9f0ff;
    --card-selected-text-color: #0073ea;
    --automations-hover-background-color: #f5f6f8;
    --automations-label-background-color: #f5f6f8;
    --automations-border-color: #e6e9ef;
    --automations-account-usage-background-color: white;
    --automations-account-usage-dropdown-border-color: #d9d9d9;
    --automations-account-usage-progressbar-background-color: #e6e9ef;
    --apps-svg-icon-invert: invert(0);
    --apps-code-color: #5559df;
    --apps-feature-preview-color: #e5f4ff;
    --apps-tabs-border-color: #1c1f3b;
    --card-border-color: #e6e9ef;
    --avatar-border-color: var(--color-snow_white);
    --modal-bottom-color: #f7f7f7;
    --modal-free-indication-color: var(--primary-selected-color);
    --notification-unread-highlight-color: #d2eaff;
    --apps-marketplace-highlight-color: #f5f6f8;
    --redactor-context-background-color: #323338;
    --redactor-context-link-color: #fff;
    --ajax-spinner-gif-path: url(https://cdn.monday.com/images/ajax_spinner.gif);
    --scrollbar-color: var(--color-wolf_gray);
    --monday-loader-gif-path: url(https://cdn.monday.com/images/loader/loader.gif);
    --hint-background-color: #ccf4e3;
    --transparent-overlay: rgba(41, 47, 76, 0.5) !important;
    --timeline-row-hover: rgba(210, 210, 210, 0.3);
    --timeline-value-remains: #333333;
    --topbar-bg-color: #eceff8
}

.dark-app-theme {
    --react-modal-background: rgba(41, 47, 76, 0.7);
    --application-background-color: #1c1f3b;
    --application-border-color: #4b4e69;
    --pulse-background-color: #33354b;
    --pulse-background-color-rgb: 51, 53, 75;
    --pulse-background-color-opacity: #33354b80;
    --pulse-text-color: var(--color-wolf_gray);
    --pulse-hover-background-color: #3F4259;
    --pulse-selected-background-color: #59627b;
    --pulse-floating-background-color: 42, 45, 69;
    --pulse-highlight-background-color: #59627b;
    --surfce-color: #292f4c;
    --surface-border-color: #4b4e69;
    --card-background-color: var(--secondary-background-color);
    --card-hover-background-color: #4b4e69;
    --card-selected-background-color: #5a5c74;
    --card-selected-text-color: var(--color-snow_white);
    --card-border-color: #5a5c74;
    --automations-hover-background-color: #525672;
    --automations-label-background-color: #525672;
    --automations-border-color: #5a5c74;
    --automations-account-usage-background-color: #1c1f3b;
    --automations-account-usage-dropdown-border-color: #9699a6;
    --automations-account-usage-progressbar-background-color: #4B4E69;
    --apps-svg-icon-invert: invert(1);
    --apps-code-color: #fff;
    --apps-feature-preview-color: #292f4c;
    --apps-tabs-border-color: #393b52;
    --text-color-on-card: var(--color-snow_white);
    --avatar-border-color: var(--color-snow_white);
    --modal-bottom-color: var(--surfce-color);
    --modal-free-indication-color: var(--primary-selected-color);
    --notification-unread-highlight-color: #59627b;
    --apps-marketplace-highlight-color: #292f4c;
    --redactor-context-background-color: #393b53;
    --redactor-context-link-color: #fff;
    --ajax-spinner-gif-path: url(https://cdn.monday.com/images/ajax_spinner_dark.gif);
    --scrollbar-color: var(--color-wolf_gray);
    --monday-loader-gif-path: url(https://cdn.monday.com/images/loader/dark_loader.gif);
    --hint-background-color: #258750;
    --transparent-overlay: rgba(41, 47, 76, 0.5) !important
}

.dark-app-theme.adobe-app-theme {
    --primary-background-color: #535353;
    --primary-background-color-rgb: 83, 83, 83;
    --secondary-background-color: #535353;
    --pulse-background-color: #353535;
    --pulse-background-color-rgb: 53, 53, 53;
    --card-background-color: #353535;
    --menu-background-color: #353535;
    --pulse-background-color: #353535;
    --comments-background-color: #353535;
    --pulse-selected-background-color: #3f3f3f;
    --pulse-hover-background-color: #3f3f3f;
    --layout-border-color: #3f3f3f;
    --disabled-background-color: #3f3f3f;
    --primary-background-hover-color: #3f3f3f;
    --ui-border-color: #585858
}

.black-app-theme {
    --react-modal-background: rgba(53, 53, 55, 0.7);
    --application-background-color: #111111;
    --application-border-color: var(--layout-border-color);
    --pulse-background-color: #272729;
    --pulse-background-color-rgb: 39, 39, 41;
    --pulse-background-color-opacity: #27272980;
    --pulse-text-color: var(--color-snow_white);
    --pulse-hover-background-color: #393a40;
    --pulse-selected-background-color: #393a40;
    --pulse-floating-background-color: 17, 17, 17;
    --pulse-highlight-background-color: #393a40;
    --surfce-color: #212121;
    --surface-border-color: var(--layout-border-color);
    --transparent-overlay: rgba(34, 34, 34, 0.5) !important;
    --card-background-color: var(--secondary-background-color);
    --card-hover-background-color: #4c4d56;
    --card-selected-background-color: var(--primary-selected-color);
    --card-selected-text-color: var(--primary-text-color);
    --card-border-color: #5a5c74;
    --automations-hover-background-color: #525672;
    --automations-label-background-color: #525672;
    --automations-border-color: #5a5c74;
    --automations-account-usage-background-color: #1c1f3b;
    --automations-account-usage-dropdown-border-color: #9699a6;
    --automations-account-usage-progressbar-background-color: #4B4E69;
    --apps-svg-icon-invert: invert(1);
    --apps-code-color: #fff;
    --apps-feature-preview-color: #292f4c;
    --apps-tabs-border-color: #393b52;
    --text-color-on-card: var(--color-snow_white);
    --avatar-border-color: var(--color-snow_white);
    --modal-bottom-color: var(--surfce-color);
    --modal-free-indication-color: var(--primary-selected-color);
    --notification-unread-highlight-color: #59627b;
    --apps-marketplace-highlight-color: #292f4c;
    --redactor-context-background-color: #393b53;
    --redactor-context-link-color: #fff;
    --ajax-spinner-gif-path: url(https://cdn.monday.com/images/ajax_spinner_dark.gif);
    --scrollbar-color: var(--color-wolf_gray);
    --monday-loader-gif-path: url(https://cdn.monday.com/images/loader/darth_loader.gif)
}

.black-app-theme.adobe-app-theme {
    --primary-background-color: #535353;
    --primary-background-color-rgb: 83, 83, 83;
    --secondary-background-color: #535353;
    --pulse-background-color: #353535;
    --pulse-background-color-rgb: 53, 53, 53;
    --card-background-color: #353535;
    --menu-background-color: #353535;
    --pulse-background-color: #353535;
    --comments-background-color: #353535;
    --pulse-selected-background-color: #3f3f3f;
    --pulse-hover-background-color: #3f3f3f;
    --layout-border-color: #3f3f3f;
    --disabled-background-color: #3f3f3f;
    --primary-background-hover-color: #3f3f3f;
    --ui-border-color: #585858
}

.hacker_theme-app-theme {
    --react-modal-background: rgba(53, 53, 55, 0.7);
    --application-background-color: var(--primary-background-color);
    --application-border-color: var(--layout-border-color);
    --pulse-background-color: #21222c;
    --pulse-background-color-rgb: 33, 34, 44;
    --pulse-background-color-opacity: #21222c80;
    --pulse-text-color: var(--color-snow_white);
    --pulse-hover-background-color: #393a40;
    --pulse-selected-background-color: #393a40;
    --pulse-floating-background-color: var(--primary-background-color-rgb);
    --pulse-highlight-background-color: #393a40;
    --surfce-color: #1c1e26;
    --surface-border-color: var(--layout-border-color);
    --transparent-overlay: rgba(34, 34, 34, 0.5) !important;
    --card-background-color: var(--secondary-background-color);
    --card-hover-background-color: #4c4d56;
    --card-selected-background-color: var(--primary-selected-color);
    --card-selected-text-color: var(--primary-text-color);
    --card-border-color: #5a5c74;
    --automations-hover-background-color: #525672;
    --automations-label-background-color: #525672;
    --automations-border-color: #5a5c74;
    --automations-account-usage-background-color: #1c1f3b;
    --automations-account-usage-dropdown-border-color: #9699a6;
    --automations-account-usage-progressbar-background-color: #4B4E69;
    --apps-svg-icon-invert: invert(1);
    --apps-code-color: #fff;
    --apps-feature-preview-color: #292f4c;
    --apps-tabs-border-color: #393b52;
    --text-color-on-card: var(--color-snow_white);
    --avatar-border-color: var(--color-snow_white);
    --modal-bottom-color: var(--surfce-color);
    --modal-free-indication-color: var(--primary-selected-color);
    --notification-unread-highlight-color: #59627b;
    --apps-marketplace-highlight-color: #292f4c;
    --redactor-context-background-color: #393b53;
    --redactor-context-link-color: #fff;
    --ajax-spinner-gif-path: url(https://cdn.monday.com/images/ajax_spinner_dark.gif);
    --scrollbar-color: var(--color-wolf_gray);
    --monday-loader-gif-path: url(https://cdn.monday.com/images/loader/loader_transparent.gif)
}


:root {
    --motion-productive-short: 70ms;
    --motion-productive-medium: 100ms;
    --motion-productive-long: 150ms;
    --motion-expressive-short: 250ms;
    --motion-expressive-long: 400ms;
    --motion-timing-enter: cubic-bezier(0, 0, 0.35, 1);
    --motion-timing-exit: cubic-bezier(0.4, 0, 1, 1);
    --motion-timing-transition: cubic-bezier(0.4, 0, 0.2, 1);
    --motion-timing-emphasize: cubic-bezier(0, 0, 0.2, 1.4);
    --expand-animation-timing: var(--motion-timing-enter);
    --spacing-xs: 4px;
    --spacing-small: 8px;
    --spacing-medium: 16px;
    --spacing-large: 24px;
    --spacing-xl: 32px;
    --spacing-xxl: 48px;
    --spacing-xxxl: 64px;
    --border-width: 1px;
    --border-style: solid;
    --border-radius-small: 4px;
    --border-radius-medium: 8px;
    --border-radius-big: 16px;
    --disabled-component-opacity: 0.38;
    --font-family: Manrope, Roboto, Rubik, Noto Kufi Arabic, Noto Sans JP, sans-serif;
    --title-font-family: Poppins, Roboto, Rubik, Noto Kufi Arabic, Noto Sans JP, sans-serif;
    --h1-font-family: var(--title-font-family);
    --font-smoothing-webkit: antialiased;
    --font-smoothing-moz: grayscale;
    --font-weight-very-light: 200;
    --font-weight-light: 300;
    --font-weight-normal: 400;
    --font-weight-bold: 500;
    --font-size-10: 14px;
    --font-size-20: 14px;
    --font-size-30: 16px;
    --font-size-40: 18px;
    --font-size-50: 24px;
    --font-size-60: 30px;
    --font-line-height-10: 18px;
    --font-line-height-20: 24px;
    --font-line-height-30: 24px;
    --font-line-height-40: 24px;
    --font-line-height-50: 32px;
    --font-line-height-60: 42px;
    --font-size-h1: var(--font-size-60);
    --font-size-h2: var(--font-size-50);
    --font-size-h3: var(--font-size-50);
    --font-size-h4: var(--font-size-40);
    --font-size-h5: var(--font-size-30);
    --font-size-general-label: var(--font-size-20);
    --font-size-paragraph: var(--font-size-30);
    --font-size-subtext: var(--font-size-10);
    --font-line-height-h1: var(--font-line-height-60);
    --font-line-height-h2: var(--font-line-height-50);
    --font-line-height-h3: var(--font-line-height-50);
    --font-line-height-h4: var(--font-line-height-40);
    --font-line-height-h5: var(--font-line-height-30);
    --font-line-height-general-label: var(--font-line-height-20);
    --font-line-height-paragraph: var(--font-line-height-30);
    --font-line-height-subtext: var(--font-line-height-10);
    --font-h1: var(--font-weight-bold) var(--font-size-h1)/var(--font-line-height-h1) var(--h1-font-family);
    --font-h2: var(--font-weight-bold) var(--font-size-h2)/var(--font-line-height-h2) var(--title-font-family);
    --font-h3: var(--font-weight-light) var(--font-size-h3)/var(--font-line-height-h3) var(--title-font-family);
    --font-h4: var(--font-weight-bold) var(--font-size-h4)/var(--font-line-height-h4) var(--title-font-family);
    --font-h5: var(--font-weight-bold) var(--font-size-h5)/var(--font-line-height-h5) var(--font-family);
    --font-general-label: var(--font-weight-normal) var(--font-size-general-label)/var(--font-line-height-general-label) var(--font-family);
    --font-paragraph: var(--font-weight-normal) var(--font-size-paragraph)/var(--font-line-height-paragraph) var(--font-family);
    --font-subtext: var(--font-weight-normal) var(--font-size-subtext)/var(--font-line-height-subtext) var(--font-family)
}

.default-app-theme,
.light-app-theme,
:root {
    --color-highlight_blue: #cce5ff;
    --color-basic_blue: #0073ea;
    --color-dark_blue: #0060b9;
    --color-bazooka: #f65f7c;
    --color-snow_white: #ffffff;
    --color-riverstone_gray: #f6f7fb;
    --color-ui_grey: #dcdfec;
    --color-wolf_gray: #c3c6d4;
    --color-asphalt: #676879;
    --color-mud_black: #323338;
    --color-black: #000000;
    --color-success: #258750;
    --color-success-hover: #007038;
    --color-success-highlight: #bbdbc9;
    --color-error: #d83a52;
    --color-error-hover: #b63546;
    --color-error-highlight: #f4c3cb;
    --color-link_color: #1f76c2;
    --color-surface: #292f4c;
    --primary-color: #0073ea;
    --primary-hover-color: #0060b9;
    --primary-selected-color: #cce5ff;
    --primary-text-color: #323338;
    --text-color-on-primary: #ffffff;
    --text-color-on-inverted: #ffffff;
    --secondary-text-color: #676879;
    --placeholder-color: #676879;
    --icon-color: #676879;
    --link-color: #1f76c2;
    --primary-background-color: #ffffff;
    --primary-background-hover-color: #dcdfec;
    --secondary-background-color: #ffffff;
    --grey-background-color: #f6f7fb;
    --allgrey-background-color: #f6f7fb;
    --inverted-color-background: #323338;
    --disabled-background-color: #ecedf5;
    --disabled-text-color: rgba(50, 51, 56, var(--disabled-component-opacity));
    --positive-color: #258750;
    --positive-color-hover: #007038;
    --positive-color-selected: #bbdbc9;
    --negative-color: #d83a52;
    --negative-color-hover: #b63546;
    --negative-color-selected: #f4c3cb;
    --private-color: #f65f7c;
    --shareable-color: #a25ddc;
    --ui-border-color: #c3c6d4;
    --layout-border-color: #d0d4e4;
    --box-shadow-xs: 0px 4px 6px -4px rgba(0, 0, 0, 0.1);
    --box-shadow-small: 0px 4px 8px rgba(0, 0, 0, 0.2);
    --box-shadow-medium: 0px 6px 20px rgba(0, 0, 0, 0.2);
    --box-shadow-large: 0px 15px 50px rgba(0, 0, 0, 0.3);
    --color-grass_green: #037f4c;
    --color-grass_green-hover: #116846;
    --color-grass_green-selected: #81bfa5;
    --color-done-green: #00c875;
    --color-done-green-hover: #0f9b63;
    --color-done-green-selected: #80e3ba;
    --color-done-green-selected-with-opacity: rgba(128, 227, 186, 0.6);
    --color-bright-green: #9cd326;
    --color-bright-green-hover: #7ca32b;
    --color-bright-green-selected: #cde992;
    --color-saladish: #cab641;
    --color-saladish-hover: #9d8f3e;
    --color-saladish-selected: #e4daa0;
    --color-egg_yolk: #ffcb00;
    --color-egg_yolk-hover: #c29e11;
    --color-egg_yolk-selected: #ffe580;
    --color-egg_yolk-rgb: 255, 213, 51;
    --color-working_orange: #fdab3d;
    --color-working_orange-hover: #c0873c;
    --color-working_orange-selected: #fed59e;
    --color-dark-orange: #ff642e;
    --color-dark-orange-hover: #c25531;
    --color-dark-orange-selected: #ffb196;
    --color-peach: #ffadad;
    --color-peach-hover: #c2888a;
    --color-peach-selected: #ffd6d6;
    --color-sunset: #ff7575;
    --color-sunset-hover: #c26163;
    --color-sunset-selected: #ffbaba;
    --color-sunset-selected-with-opacity: rgba(255, 186, 186, 0.6);
    --color-stuck-red: #e2445c;
    --color-stuck-red-hover: #ad3f51;
    --color-stuck-red-selected: #f0a1ad;
    --color-dark-red: #bb3354;
    --color-dark-red-hover: #92334c;
    --color-dark-red-selected: #dd99a9;
    --color-sofia_pink: #ff158a;
    --color-sofia_pink-hover: #c21e71;
    --color-sofia_pink-selected: #ff8ac4;
    --color-lipstick: #ff5ac4;
    --color-lipstick-hover: #c24e9a;
    --color-lipstick-selected: #fface1;
    --color-bubble: #faa1f1;
    --color-bubble-hover: #be80ba;
    --color-bubble-selected: #fcd0f8;
    --color-purple: #a25ddc;
    --color-purple-hover: #8050ab;
    --color-purple-selected: #d0aeed;
    --color-dark_purple: #784bd1;
    --color-dark_purple-hover: #6344a3;
    --color-dark_purple-selected: #bba5e8;
    --color-berry: #7e3b8a;
    --color-berry-hover: #673971;
    --color-berry-selected: #be9dc4;
    --color-dark_indigo: #401694;
    --color-dark_indigo-hover: #3c1f78;
    --color-dark_indigo-selected: #a08bc9;
    --color-indigo: #5559df;
    --color-indigo-hover: #4b4ead;
    --color-indigo-selected: #aaacef;
    --color-navy: #225091;
    --color-navy-hover: #274776;
    --color-navy-selected: #90a7c8;
    --color-bright-blue: #579bfc;
    --color-bright-blue-hover: #4c7cc1;
    --color-bright-blue-selected: #abcdfd;
    --color-dark-blue: #0086c0;
    --color-dark-blue-hover: #0f6d97;
    --color-dark-blue-selected: #80c2df;
    --color-aquamarine: #4eccc6;
    --color-aquamarine-hover: #469e9b;
    --color-aquamarine-selected: #a6e5e2;
    --color-chili-blue: #66ccff;
    --color-chili-blue-hover: #569ec3;
    --color-chili-blue-selected: #b2e5ff;
    --color-river: #68a1bd;
    --color-river-hover: #588095;
    --color-river-selected: #b3d0de;
    --color-winter: #9aadbd;
    --color-winter-hover: #7b8895;
    --color-winter-selected: #ccd6de;
    --color-explosive: #c4c4c4;
    --color-explosive-hover: #98999a;
    --color-explosive-selected: #e1e1e1;
    --color-american_gray: #808080;
    --color-american_gray-hover: #69696a;
    --color-american_gray-selected: #bfbfbf;
    --color-blackish: #333333;
    --color-blackish-hover: #222222;
    --color-blackish-selected: #999999;
    --color-brown: #7f5347;
    --color-brown-hover: #684943;
    --color-brown-selected: #bfa9a3;
    --color-orchid: #D974B0;
    --color-orchid-hover: #AE5D8D;
    --color-orchid-selected: #ECBAD7;
    --color-tan: #AD967A;
    --color-tan-hover: #8A7862;
    --color-tan-selected: #D6CABC;
    --color-sky: #A1E3F6;
    --color-sky-hover: #81B6C5;
    --color-sky-selected: #D0F1FA;
    --color-coffee: #BD816E;
    --color-coffee-hover: #976758;
    --color-coffee-selected: #DEC0B7;
    --color-royal: #2B76E5;
    --color-royal-hover: #225EB7;
    --color-royal-selected: #95BBF2;
    --color-teal: #175A63;
    --color-teal-hover: #12484F;
    --color-teal-selected: #8BACB1;
    --color-lavender: #BDA8F9;
    --color-lavender-hover: #9786C7;
    --color-lavender-selected: #DED4FC;
    --color-steel: #A9BEE8;
    --color-steel-hover: #8798BA;
    --color-steel-selected: #D4DFF4;
    --color-lilac: #9D99B9;
    --color-lilac-hover: #7E7A94;
    --color-lilac-selected: #CECCDC;
    --color-pecan: #563E3E;
    --color-pecan-hover: #453232;
    --color-pecan-selected: #AB9F9F;
    --color-dark_marble: #f1f1f1;
    --color-marble: #f7f7f7;
    --color-gainsboro: #e1e1e1;
    --color-extra_light_gray: #edeef0;
    --color-glitter: #d9f0ff;
    --color-ultra_light_gray: #ebebeb;
    --color-very_light_gray: #a1a1a1;
    --color-jaco_gray: #9699a6;
    --color-storm_gray: #6b6d77;
    --color-trolley-grey: #808080;
    --color-basic_light_blue: #c7e6fa;
    --color-light_blue: #61caf7;
    --color-turquoise: #66ccff;
    --color-aqua: #00d1d1;
    --color-live_blue: #009aff;
    --color-jeans: #597bfc;
    --color-burned_eggplant: #181d37;
    --color-light-pink: #ff5ac4;
    --color-dark-pink: #ff158a;
    --color-dark_red: #bb3354;
    --color-yellow: #ffcb00;
    --color-mustered: #cab641;
    --color-orange: #fdab3d;
    --color-lime-green: #9cd326;
    --color-jade: #03c875;
    --color-green-haze: #00a359;
    --color-grass-green: #037f4c;
    --color-amethyst: #a25ddc;
    --color-dark-purple: #784bd1;
    --color-blue_links: #0086c0;
    --color-blue-links: #0086c0;
    --color-private: #f65f7c;
    --color-public: #009aff;
    --color-board_views_grey: #6e6f8f;
    --color-board_views_grey_hover: #b2b3d0;
    --color-board_views_blue: #1c1f3b;
    --color-board_views_blue_secondary: #363a52;
    --color-border_light_gray: #f5f6f8;
    --color-brand-blue: #00a9ff;
    --color-brand-charcoal: #2b2c5c;
    --color-brand-gold: #ffcc00;
    --color-brand-green: #11dd80;
    --color-brand-iris: #595ad4;
    --color-brand-light-blue: #00cff4;
    --color-brand-malachite: #00cd6f;
    --color-brand-purple: #a358d0;
    --color-brand-red: #f74875;
    --color-deadline_upcoming_indication: #5d6387;
    --color-default_group_color: #579bfc;
    --color-form_btn_hover: #0083d9;
    --color-form_purple: #575c96;
    --color-highlight: #dff0ff;
    --color-green_shadow: #00c875;
    --color-green-shadow: #00c875;
    --color-red_shadow: #e2445c;
    --color-red-shadow: #e2445c;
    --color-pulse_bg: #f0f0f0;
    --color-pulse_text_color: #333333;
    --color-placholder_gray: #d8d8d8;
    --color-placeholder_light_gray: #efefef;
    --color-excel-green: #207245;
    --color-media-blue: #2ea2e9;
    --color-pdf-red: #bb0706;
    --color-ppt-orange: #d64e2a;
    --color-word-blue: #2a5699;
    --color-zip-orange: #e4901c;
    --color-like_red: #fb275d;
    --color-scrollbar_gray: #b2b2b2;
    --color-timeline_grid_blue: #454662;
    --color-timeline_blue: #1c1f3b;
    --color-highlight_blue-rgb: 204, 229, 255;
    --color-snow_white-with-opacity: rgba(255, 255, 255, 0.4);
    --color-wolf_gray-with-opacity: rgba(195, 198, 212, 0.1);
    --color-asphalt-with-opacity: rgba(103, 104, 121, 0.1);
    --primary-on-secondary-color: #0073ea;
    --primary-hover-on-secondary-color: #0060b9;
    --primary-selected-color-rgb: 204, 229, 255;
    --primary-selected-on-secondary-color: #cce5ff;
    --primary-text-on-secondary-color: #323338;
    --text-color-on-primary-with-opacity: rgba(255, 255, 255, 0.4);
    --secondary-text-on-secondary-color: #676879;
    --placeholder-color-with-opacity: rgba(103, 104, 121, 0.1);
    --placeholder-on-secondary-color: #676879;
    --icon-on-secondary-color: #676879;
    --link-on-secondary-color: #1f76c2;
    --label-background-color: #cce5ff;
    --label-background-on-secondary-color: #cce5ff;
    --primary-background-color-rgb: 255, 255, 255;
    --primary-background-hover-on-secondary-color: #dcdfec;
    --modal-background-color: #ffffff;
    --secondary-background-color-rgb: 255, 255, 255;
    --disabled-background-on-secondary-color: #ecedf5;
    --disabled-text-on-secondary-color: rgba(50, 51, 56, var(--disabled-component-opacity));
    --ui-border-on-secondary-color: #c3c6d4;
    --layout-border-on-secondary-color: #d0d4e4;
    --dark-background-color: #f6f7fb;
    --dark-background-on-secondary-color: #f6f7fb;
    --dialog-background-color: #ffffff;
    --box-shadow-mediun: 0px 6px 20px rgba(0, 0, 0, 0.2)
}

.dark-app-theme {
    --primary-color: #0073ea;
    --primary-on-secondary-color: #0073ea;
    --primary-hover-color: #0060b9;
    --primary-selected-color: #133774;
    --primary-text-color: #d5d8df;
    --text-color-on-primary: #ffffff;
    --text-color-on-inverted: #323338;
    --secondary-text-color: #9699a6;
    --placeholder-color: #c3c6d4;
    --icon-color: #c3c6d4;
    --link-color: #69a7ef;
    --primary-background-color: #181b34;
    --primary-background-hover-color: #4b4e69;
    --secondary-background-color: #30324e;
    --grey-background-color: #181b34;
    --allgrey-background-color: #30324e;
    --inverted-color-background: #ffffff;
    --disabled-text-color: rgba(213, 216, 223, var(--disabled-component-opacity));
    --disabled-background-color: #3c3f59;
    --positive-color: #258750;
    --positive-color-hover: #007038;
    --positive-color-selected: #26503e;
    --negative-color: #d83a52;
    --negative-color-hover: #b63546;
    --negative-color-selected: #642830;
    --private-color: #f65f7c;
    --shareable-color: #a25ddc;
    --ui-border-color: #797e93;
    --layout-border-color: #4b4e69;
    --box-shadow-xs: 0px 4px 6px -4px rgba(9, 11, 25, 0.5);
    --box-shadow-small: 0px 4px 8px rgba(9, 11, 25, 0.5);
    --box-shadow-medium: 0px 6px 20px rgba(9, 11, 25, 0.5);
    --box-shadow-large: 0px 15px 50px rgba(9, 11, 25, 0.5);
    --color-grass_green: #359970;
    --color-grass_green-hover: #116846;
    --color-grass_green-selected: #0f4f43;
    --color-done-green: #33d391;
    --color-done-green-hover: #0f9b63;
    --color-done-green-selected: #0e7358;
    --color-done-green-selected-with-opacity: rgba(14, 115, 88, 0.6);
    --color-bright-green: #b0dc51;
    --color-bright-green-hover: #7ca32b;
    --color-bright-green-selected: #5c7930;
    --color-saladish: #d5c567;
    --color-saladish-hover: #9d8f3e;
    --color-saladish-selected: #736a3e;
    --color-egg_yolk: #ffd533;
    --color-egg_yolk-hover: #c29e11;
    --color-egg_yolk-selected: #8D751E;
    --color-egg_yolk-rgb: 255, 213, 51;
    --color-working_orange: #fdbc64;
    --color-working_orange-hover: #c0873c;
    --color-working_orange-selected: #8c653c;
    --color-dark-orange: #ff7b4d;
    --color-dark-orange-hover: #c25531;
    --color-dark-orange-selected: #8d4134;
    --color-peach: #ffbdbd;
    --color-peach-hover: #c2888a;
    --color-peach-selected: #8d6674;
    --color-sunset: #ff9191;
    --color-sunset-hover: #c26163;
    --color-sunset-selected: #8d4a58;
    --color-sunset-selected-with-opacity: rgba(141, 74, 88, 0.6);
    --color-stuck-red: #e8697d;
    --color-stuck-red-hover: #ad3f51;
    --color-stuck-red-selected: #7f314b;
    --color-dark-red: #c95c76;
    --color-dark-red-hover: #92334c;
    --color-dark-red-selected: #6b2947;
    --color-sofia_pink: #ff44a1;
    --color-sofia_pink-hover: #c21e71;
    --color-sofia_pink-selected: #8d1a62;
    --color-lipstick: #ff7bd0;
    --color-lipstick-hover: #c24e9a;
    --color-lipstick-selected: #8d3c7f;
    --color-bubble: #fbb4f4;
    --color-bubble-hover: #be80ba;
    --color-bubble-selected: #8b6096;
    --color-purple: #b57de3;
    --color-purple-hover: #8050ab;
    --color-purple-selected: #5f3e8b;
    --color-dark_purple: #936fda;
    --color-dark_purple-hover: #6344a3;
    --color-dark_purple-selected: #4a3586;
    --color-berry: #6645a9;
    --color-berry-hover: #673971;
    --color-berry-selected: #4d2d62;
    --color-dark_indigo: #401694;
    --color-dark_indigo-hover: #3c1f78;
    --color-dark_indigo-selected: #2e1b67;
    --color-indigo: #777ae5;
    --color-indigo-hover: #4b4ead;
    --color-indigo-selected: #383c8d;
    --color-navy: #4e73a7;
    --color-navy-hover: #274776;
    --color-navy-selected: #1f3866;
    --color-bright-blue: #79affd;
    --color-bright-blue-hover: #4c7cc1;
    --color-bright-blue-selected: #395d9b;
    --color-dark-blue: #339ecd;
    --color-dark-blue-hover: #0f6d97;
    --color-dark-blue-selected: #0e527e;
    --color-aquamarine: #71d6d1;
    --color-aquamarine-hover: #469e9b;
    --color-aquamarine-selected: #357580;
    --color-chili-blue: #85d6ff;
    --color-chili-blue-hover: #569ec3;
    --color-chili-blue-selected: #41759d;
    --color-river: #86b4ca;
    --color-river-hover: #588095;
    --color-river-selected: #42607c;
    --color-winter: #aebdca;
    --color-winter-hover: #7b8895;
    --color-winter-selected: #5b667c;
    --color-explosive: #d0d0d0;
    --color-explosive-hover: #98999a;
    --color-explosive-selected: #70717f;
    --color-american_gray: #999999;
    --color-american_gray-hover: #69696a;
    --color-american_gray-selected: #4e505e;
    --color-blackish: #5c5c5c;
    --color-blackish-hover: #222222;
    --color-blackish-selected: #272937;
    --color-brown: #99756c;
    --color-brown-hover: #684943;
    --color-brown-selected: #4d3941;
    --color-orchid: #E190C0;
    --color-orchid-hover: #B4739A;
    --color-orchid-selected: #B4739A;
    --color-tan: #BDAB95;
    --color-tan-hover: #978977;
    --color-tan-selected: #716863;
    --color-sky: #B4E9F8;
    --color-sky-hover: #90BAC6;
    --color-sky-selected: #6C8A9A;
    --color-coffee: #CA9A8B;
    --color-coffee-hover: #A27B6F;
    --color-coffee-selected: #795E5D;
    --color-royal: #5591EA;
    --color-royal-hover: #4474BB;
    --color-royal-selected: #375993;
    --color-teal: #457B82;
    --color-teal-hover: #376268;
    --color-teal-selected: #2E4D58;
    --color-lavender: #CAB9FA;
    --color-lavender-hover: #A294C8;
    --color-lavender-selected: #85597B;
    --color-steel: #BACBED;
    --color-steel-hover: #95A2BE;
    --color-steel-selected: #707A95;
    --color-lilac: #B1ADC7;
    --color-lilac-hover: #8E8A9F;
    --color-lilac-selected: #6B697F;
    --color-pecan: #786565;
    --color-pecan-hover: #605151;
    --color-pecan-selected: #4A4148;
    --primary-on-secondary-color: #0073ea;
    --primary-hover-on-secondary-color: #0060b9;
    --primary-selected-color-rgb: 19, 55, 116;
    --primary-selected-on-secondary-color: #133774;
    --primary-text-on-secondary-color: #d5d8df;
    --primary-background-color-rgb: 24, 27, 52;
    --primary-background-hover-on-secondary-color: #4b4e69;
    --secondary-background-color-rgb: 48, 50, 78;
    --secondary-text-on-secondary-color: #9699a6;
    --link-on-secondary-color: #69a7ef;
    --modal-background-color: #181b34;
    --dark-background-color: #393b53;
    --dark-background-on-secondary-color: #4b4e69;
    --dialog-background-color: #30324e;
    --label-background-color: #404b69;
    --label-background-on-secondary-color: #404b69;
    --icon-on-secondary-color: #c3c6d4;
    --placeholder-color-with-opacity: rgba(195, 198, 212, 0.1);
    --placeholder-on-secondary-color: #c3c6d4;
    --ui-border-on-secondary-color: #797e93;
    --layout-border-on-secondary-color: #4b4e69;
    --disabled-background-on-secondary-color: #3c3f59;
    --disabled-text-on-secondary-color: rgba(213, 216, 223, var(--disabled-component-opacity));
    --box-shadow-mediun: 0px 6px 20px rgba(0, 0, 0, 0.2)
}

.black-app-theme {
    --primary-color: #0073ea;
    --primary-on-secondary-color: #0073ea;
    --primary-hover-color: #0060b9;
    --primary-selected-color: #133774;
    --primary-text-color: #eeeeee;
    --text-color-on-primary: #ffffff;
    --text-color-on-inverted: #111111;
    --secondary-text-color: #aaaaaa;
    --placeholder-color: #aaaaaa;
    --icon-color: #aaaaaa;
    --link-color: #69a7ef;
    --primary-background-color: #111111;
    --primary-background-hover-color: #636363;
    --secondary-background-color: #2c2c2c;
    --grey-background-color: #111111;
    --allgrey-background-color: #2c2c2c;
    --inverted-color-background: #eeeeee;
    --disabled-text-color: rgba(238, 238, 238, var(--disabled-component-opacity));
    --disabled-background-color: #3a3a3a;
    --positive-color: #258750;
    --positive-color-hover: #007038;
    --positive-color-selected: #26503e;
    --negative-color: #d83a52;
    --negative-color-hover: #b63546;
    --negative-color-selected: #642830;
    --private-color: #f65f7c;
    --shareable-color: #a25ddc;
    --ui-border-color: #8d8d8d;
    --layout-border-color: #636363;
    --box-shadow-xs: 0px 4px 6px -4px #000000;
    --box-shadow-small: 0px 4px 8px #000000;
    --box-shadow-medium: 0px 6px 20px #000000;
    --box-shadow-large: 0px 15px 50px #000000;
    --color-grass_green: #359970;
    --color-grass_green-hover: #116846;
    --color-grass_green-selected: #0a482e;
    --color-done-green: #33d391;
    --color-done-green-hover: #0f9b63;
    --color-done-green-selected: #096c43;
    --color-done-green-selected-with-opacity: rgba(9, 108, 67, 0.6);
    --color-bright-green: #b0dc51;
    --color-bright-green-hover: #7ca32b;
    --color-bright-green-selected: #56721b;
    --color-saladish: #d5c567;
    --color-saladish-hover: #9d8f3e;
    --color-saladish-selected: #6d6329;
    --color-egg_yolk: #ffd533;
    --color-egg_yolk-hover: #c29e11;
    --color-egg_yolk-selected: #886e09;
    --color-egg_yolk-rgb: 255, 213, 51;
    --color-working_orange: #fdbc64;
    --color-working_orange-hover: #c0873c;
    --color-working_orange-selected: #875e27;
    --color-dark-orange: #ff7b4d;
    --color-dark-orange-hover: #c25531;
    --color-dark-orange-selected: #883a1f;
    --color-peach: #ffbdbd;
    --color-peach-hover: #c2888a;
    --color-peach-selected: #885f5f;
    --color-sunset: #ff9191;
    --color-sunset-hover: #c26163;
    --color-sunset-selected: #884343;
    --color-sunset-selected-with-opacity: rgba(136, 67, 67, 0.6);
    --color-stuck-red: #e8697d;
    --color-stuck-red-hover: #ad3f51;
    --color-stuck-red-selected: #792a36;
    --color-dark-red: #c95c76;
    --color-dark-red-hover: #92334c;
    --color-dark-red-selected: #662232;
    --color-sofia_pink: #ff44a1;
    --color-sofia_pink-hover: #c21e71;
    --color-sofia_pink-selected: #88134d;
    --color-lipstick: #ff7bd0;
    --color-lipstick-hover: #c24e9a;
    --color-lipstick-selected: #88356a;
    --color-bubble: #fbb4f4;
    --color-bubble-hover: #be80ba;
    --color-bubble-selected: #855981;
    --color-purple: #b57de3;
    --color-purple-hover: #8050ab;
    --color-purple-selected: #593776;
    --color-dark_purple: #936fda;
    --color-dark_purple-hover: #6344a3;
    --color-dark_purple-selected: #442e71;
    --color-berry: #9862a1;
    --color-berry-hover: #673971;
    --color-berry-selected: #47264d;
    --color-dark_indigo: #6645a9;
    --color-dark_indigo-hover: #3c1f78;
    --color-dark_indigo-selected: #291452;
    --color-indigo: #777ae5;
    --color-indigo-hover: #4b4ead;
    --color-indigo-selected: #333578;
    --color-navy: #4e73a7;
    --color-navy-hover: #274776;
    --color-navy-selected: #193151;
    --color-bright-blue: #79affd;
    --color-bright-blue-hover: #4c7cc1;
    --color-bright-blue-selected: #345686;
    --color-dark-blue: #339ecd;
    --color-dark-blue-hover: #0f6d97;
    --color-dark-blue-selected: #094b69;
    --color-aquamarine: #71d6d1;
    --color-aquamarine-hover: #469e9b;
    --color-aquamarine-selected: #2f6e6b;
    --color-chili-blue: #85d6ff;
    --color-chili-blue-hover: #569ec3;
    --color-chili-blue-selected: #3b6e88;
    --color-river: #86b4ca;
    --color-river-hover: #588095;
    --color-river-selected: #3c5967;
    --color-winter: #aebdca;
    --color-winter-hover: #7b8895;
    --color-winter-selected: #555f67;
    --color-explosive: #d0d0d0;
    --color-explosive-hover: #98999a;
    --color-explosive-selected: #6a6a6a;
    --color-american_gray: #999999;
    --color-american_gray-hover: #69696a;
    --color-american_gray-selected: #494949;
    --color-blackish: #5c5c5c;
    --color-blackish-hover: #222222;
    --color-blackish-selected: #111111;
    --color-brown: #99756c;
    --color-brown-hover: #684943;
    --color-brown-selected: #48322c;
    --color-orchid: #e190c0;
    --color-orchid-hover: #b4739a;
    --color-orchid-selected: #7e516c;
    --color-tan: #bdab95;
    --color-tan-hover: #978977;
    --color-tan-selected: #6a6053;
    --color-sky: #b4e9f8;
    --color-sky-hover: #90bac6;
    --color-sky-selected: #65828b;
    --color-coffee: #ca9a8b;
    --color-coffee-hover: #a27b6f;
    --color-coffee-selected: #71564e;
    --color-royal: #5591ea;
    --color-royal-hover: #4474bb;
    --color-royal-selected: #305183;
    --color-teal: #457b82;
    --color-teal-hover: #376268;
    --color-teal-selected: #274549;
    --color-lavender: #cab9fa;
    --color-lavender-hover: #a294c8;
    --color-lavender-selected: #71688c;
    --color-steel: #bacbed;
    --color-steel-hover: #95a2be;
    --color-steel-selected: #687185;
    --color-lilac: #687185;
    --color-lilac-hover: #8e8a9f;
    --color-lilac-selected: #63616f;
    --color-pecan: #786565;
    --color-pecan-hover: #605151;
    --color-pecan-selected: #433939;
    --primary-on-secondary-color: #0073ea;
    --primary-hover-on-secondary-color: #0060b9;
    --primary-selected-color-rgb: 19, 55, 116;
    --primary-selected-on-secondary-color: #133774;
    --primary-text-on-secondary-color: #eeeeee;
    --primary-background-color-rgb: 17, 17, 17;
    --primary-background-hover-on-secondary-color: #636363;
    --secondary-background-color-rgb: 44, 44, 44;
    --secondary-text-on-secondary-color: #9699a6;
    --link-on-secondary-color: #69a7ef;
    --modal-background-color: #181b34;
    --dark-background-color: #2c2c2c;
    --dark-background-on-secondary-color: #4b4e69;
    --dialog-background-color: #2c2c2c;
    --label-background-color: #404b69;
    --label-background-on-secondary-color: #404b69;
    --icon-on-secondary-color: #aaaaaa;
    --placeholder-color-with-opacity: rgba(170, 170, 170, 0.1);
    --placeholder-on-secondary-color: #aaaaaa;
    --ui-border-on-secondary-color: #8d8d8d;
    --layout-border-on-secondary-color: #636363;
    --disabled-background-on-secondary-color: #3a3a3a;
    --disabled-text-on-secondary-color: rgba(238, 238, 238, var(--disabled-component-opacity));
    --box-shadow-mediun: 0px 6px 20px rgba(0, 0, 0, 0.2)
}

.hacker_theme-app-theme {
    --primary-color: #fe78c6;
    --primary-hover-color: #fe5ab9;
    --primary-selected-color: #9f4077;
    --primary-text-color: #d5d8df;
    --text-color-on-inverted: #323338;
    --secondary-text-color: #9699a6;
    --placeholder-color: #c3c6d4;
    --icon-color: #c3c6d4;
    --link-color: #bd93f9;
    --primary-background-color: #282a36;
    --primary-background-hover-color: #4b4e69;
    --secondary-background-color: #30324e;
    --grey-background-color: #282a36;
    --allgrey-background-color: #282a36;
    --inverted-color-background: #ffffff;
    --disabled-text-color: rgba(238, 238, 238, var(--disabled-component-opacity));
    --disabled-background-color: #3a3a3a;
    --positive-color: #50fa7b;
    --positive-color-hover: #007038;
    --positive-color-selected: #26503e;
    --negative-color: #ff5555;
    --negative-color-hover: #b63546;
    --negative-color-selected: #642830;
    --private-color: #f65f7c;
    --shareable-color: #a25ddc;
    --ui-border-color: #797e93;
    --layout-border-color: #414458;
    --box-shadow-xs: 0px 4px 6px -4px #000000;
    --box-shadow-small: 0px 4px 8px #000000;
    --box-shadow-medium: 0px 6px 20px #000000;
    --box-shadow-large: 0px 15px 50px #000000;
    --color-grass_green: #359970;
    --color-grass_green-hover: #116846;
    --color-grass_green-selected: #0a482e;
    --color-done-green: #33d391;
    --color-done-green-hover: #0f9b63;
    --color-done-green-selected: #096c43;
    --color-done-green-selected-with-opacity: rgba(9, 108, 67, 0.6);
    --color-bright-green: #b0dc51;
    --color-bright-green-hover: #7ca32b;
    --color-bright-green-selected: #56721b;
    --color-saladish: #d5c567;
    --color-saladish-hover: #9d8f3e;
    --color-saladish-selected: #6d6329;
    --color-egg_yolk: #ffd533;
    --color-egg_yolk-hover: #c29e11;
    --color-egg_yolk-selected: #886e09;
    --color-egg_yolk-rgb: 255, 213, 51;
    --color-working_orange: #fdbc64;
    --color-working_orange-hover: #c0873c;
    --color-working_orange-selected: #875e27;
    --color-dark-orange: #ff7b4d;
    --color-dark-orange-hover: #c25531;
    --color-dark-orange-selected: #883a1f;
    --color-peach: #ffbdbd;
    --color-peach-hover: #c2888a;
    --color-peach-selected: #885f5f;
    --color-sunset: #ff9191;
    --color-sunset-hover: #c26163;
    --color-sunset-selected: #884343;
    --color-sunset-selected-with-opacity: rgba(136, 67, 67, 0.6);
    --color-stuck-red: #e8697d;
    --color-stuck-red-hover: #ad3f51;
    --color-stuck-red-selected: #792a36;
    --color-dark-red: #c95c76;
    --color-dark-red-hover: #92334c;
    --color-dark-red-selected: #662232;
    --color-sofia_pink: #ff44a1;
    --color-sofia_pink-hover: #c21e71;
    --color-sofia_pink-selected: #88134d;
    --color-lipstick: #ff7bd0;
    --color-lipstick-hover: #c24e9a;
    --color-lipstick-selected: #88356a;
    --color-bubble: #fbb4f4;
    --color-bubble-hover: #be80ba;
    --color-bubble-selected: #855981;
    --color-purple: #b57de3;
    --color-purple-hover: #8050ab;
    --color-purple-selected: #593776;
    --color-dark_purple: #936fda;
    --color-dark_purple-hover: #6344a3;
    --color-dark_purple-selected: #442e71;
    --color-berry: #9862a1;
    --color-berry-hover: #673971;
    --color-berry-selected: #47264d;
    --color-dark_indigo: #6645a9;
    --color-dark_indigo-hover: #3c1f78;
    --color-dark_indigo-selected: #291452;
    --color-indigo: #777ae5;
    --color-indigo-hover: #4b4ead;
    --color-indigo-selected: #333578;
    --color-navy: #4e73a7;
    --color-navy-hover: #274776;
    --color-navy-selected: #193151;
    --color-bright-blue: #79affd;
    --color-bright-blue-hover: #4c7cc1;
    --color-bright-blue-selected: #345686;
    --color-dark-blue: #339ecd;
    --color-dark-blue-hover: #0f6d97;
    --color-dark-blue-selected: #094b69;
    --color-aquamarine: #71d6d1;
    --color-aquamarine-hover: #469e9b;
    --color-aquamarine-selected: #2f6e6b;
    --color-chili-blue: #85d6ff;
    --color-chili-blue-hover: #569ec3;
    --color-chili-blue-selected: #3b6e88;
    --color-river: #86b4ca;
    --color-river-hover: #588095;
    --color-river-selected: #3c5967;
    --color-winter: #aebdca;
    --color-winter-hover: #7b8895;
    --color-winter-selected: #555f67;
    --color-explosive: #d0d0d0;
    --color-explosive-hover: #98999a;
    --color-explosive-selected: #6a6a6a;
    --color-american_gray: #999999;
    --color-american_gray-hover: #69696a;
    --color-american_gray-selected: #494949;
    --color-blackish: #5c5c5c;
    --color-blackish-hover: #222222;
    --color-blackish-selected: #111111;
    --color-brown: #99756c;
    --color-brown-hover: #684943;
    --color-brown-selected: #48322c;
    --color-orchid: #e190c0;
    --color-orchid-hover: #b4739a;
    --color-orchid-selected: #7e516c;
    --color-tan: #bdab95;
    --color-tan-hover: #978977;
    --color-tan-selected: #6a6053;
    --color-sky: #b4e9f8;
    --color-sky-hover: #90bac6;
    --color-sky-selected: #65828b;
    --color-coffee: #ca9a8b;
    --color-coffee-hover: #a27b6f;
    --color-coffee-selected: #71564e;
    --color-royal: #5591ea;
    --color-royal-hover: #4474bb;
    --color-royal-selected: #305183;
    --color-teal: #457b82;
    --color-teal-hover: #376268;
    --color-teal-selected: #274549;
    --color-lavender: #cab9fa;
    --color-lavender-hover: #a294c8;
    --color-lavender-selected: #71688c;
    --color-steel: #bacbed;
    --color-steel-hover: #95a2be;
    --color-steel-selected: #687185;
    --color-lilac: #687185;
    --color-lilac-hover: #8e8a9f;
    --color-lilac-selected: #63616f;
    --color-pecan: #786565;
    --color-pecan-hover: #605151;
    --color-pecan-selected: #433939;
    --color-success: #50fa7b;
    --color-error: #ff5555;
    --primary-on-secondary-color: #fe78c6;
    --primary-hover-on-secondary-color: #fe5ab9;
    --primary-selected-color-rgb: 159, 64, 119;
    --primary-selected-on-secondary-color: #9f4077;
    --primary-text-on-secondary-color: #d5d8df;
    --primary-background-color-rgb: 40, 42, 54;
    --primary-background-hover-on-secondary-color: #4b4e69;
    --secondary-background-color-rgb: 48, 50, 78;
    --secondary-text-on-secondary-color: #9699a6;
    --link-on-secondary-color: #bd93f9;
    --modal-background-color: #282a36;
    --dark-background-color: #303241;
    --dark-background-on-secondary-color: #595959;
    --dialog-background-color: #30324e;
    --label-background-color: #404b69;
    --label-background-on-secondary-color: #404b69;
    --icon-on-secondary-color: #c3c6d4;
    --placeholder-color-with-opacity: rgba(195, 198, 212, 0.1);
    --placeholder-on-secondary-color: #c3c6d4;
    --ui-border-on-secondary-color: #797e93;
    --layout-border-on-secondary-color: #414458;
    --disabled-background-on-secondary-color: #3a3a3a;
    --disabled-text-on-secondary-color: rgba(238, 238, 238, var(--disabled-component-opacity));
    --box-shadow-mediun: 0px 6px 20px rgba(0, 0, 0, 0.2)
}



:root {
    --motion-productive-short: 70ms;
    --motion-productive-medium: 100ms;
    --motion-productive-long: 150ms;
    --motion-expressive-short: 250ms;
    --motion-expressive-long: 400ms;
    --motion-timing-enter: cubic-bezier(0, 0, 0.35, 1);
    --motion-timing-exit: cubic-bezier(0.4, 0, 1, 1);
    --motion-timing-transition: cubic-bezier(0.4, 0, 0.2, 1);
    --motion-timing-emphasize: cubic-bezier(0, 0, 0.2, 1.4);
    --expand-animation-timing: var(--motion-timing-enter);
    --spacing-xs: 4px;
    --spacing-small: 8px;
    --spacing-medium: 16px;
    --spacing-large: 24px;
    --spacing-xl: 32px;
    --spacing-xxl: 48px;
    --spacing-xxxl: 64px;
    --border-width: 1px;
    --border-style: solid;
    --border-radius-small: 4px;
    --border-radius-medium: 8px;
    --border-radius-big: 16px;
    --disabled-component-opacity: 0.38;
    --font-family: Manrope, Roboto, Rubik, Noto Kufi Arabic, Noto Sans JP, sans-serif;
    --title-font-family: Poppins, Roboto, Rubik, Noto Kufi Arabic, Noto Sans JP, sans-serif;
    --h1-font-family: var(--title-font-family);
    --font-smoothing-webkit: antialiased;
    --font-smoothing-moz: grayscale;
    --font-weight-very-light: 200;
    --font-weight-light: 300;
    --font-weight-normal: 400;
    --font-weight-bold: 500;
    --font-size-10: 14px;
    --font-size-20: 14px;
    --font-size-30: 16px;
    --font-size-40: 18px;
    --font-size-50: 24px;
    --font-size-60: 30px;
    --font-line-height-10: 18px;
    --font-line-height-20: 24px;
    --font-line-height-30: 24px;
    --font-line-height-40: 24px;
    --font-line-height-50: 32px;
    --font-line-height-60: 42px;
    --font-size-h1: var(--font-size-60);
    --font-size-h2: var(--font-size-50);
    --font-size-h3: var(--font-size-50);
    --font-size-h4: var(--font-size-40);
    --font-size-h5: var(--font-size-30);
    --font-size-general-label: var(--font-size-20);
    --font-size-paragraph: var(--font-size-30);
    --font-size-subtext: var(--font-size-10);
    --font-line-height-h1: var(--font-line-height-60);
    --font-line-height-h2: var(--font-line-height-50);
    --font-line-height-h3: var(--font-line-height-50);
    --font-line-height-h4: var(--font-line-height-40);
    --font-line-height-h5: var(--font-line-height-30);
    --font-line-height-general-label: var(--font-line-height-20);
    --font-line-height-paragraph: var(--font-line-height-30);
    --font-line-height-subtext: var(--font-line-height-10);
    --font-h1: var(--font-weight-bold) var(--font-size-h1)/var(--font-line-height-h1) var(--h1-font-family);
    --font-h2: var(--font-weight-bold) var(--font-size-h2)/var(--font-line-height-h2) var(--title-font-family);
    --font-h3: var(--font-weight-light) var(--font-size-h3)/var(--font-line-height-h3) var(--title-font-family);
    --font-h4: var(--font-weight-bold) var(--font-size-h4)/var(--font-line-height-h4) var(--title-font-family);
    --font-h5: var(--font-weight-bold) var(--font-size-h5)/var(--font-line-height-h5) var(--font-family);
    --font-general-label: var(--font-weight-normal) var(--font-size-general-label)/var(--font-line-height-general-label) var(--font-family);
    --font-paragraph: var(--font-weight-normal) var(--font-size-paragraph)/var(--font-line-height-paragraph) var(--font-family);
    --font-subtext: var(--font-weight-normal) var(--font-size-subtext)/var(--font-line-height-subtext) var(--font-family)
}

.default-app-theme,
.light-app-theme,
:root {
    --color-highlight_blue: #cce5ff;
    --color-basic_blue: #0073ea;
    --color-dark_blue: #0060b9;
    --color-bazooka: #f65f7c;
    --color-snow_white: #ffffff;
    --color-riverstone_gray: #f6f7fb;
    --color-ui_grey: #dcdfec;
    --color-wolf_gray: #c3c6d4;
    --color-asphalt: #676879;
    --color-mud_black: #323338;
    --color-black: #000000;
    --color-success: #258750;
    --color-success-hover: #007038;
    --color-success-highlight: #bbdbc9;
    --color-error: #d83a52;
    --color-error-hover: #b63546;
    --color-error-highlight: #f4c3cb;
    --color-link_color: #1f76c2;
    --color-surface: #292f4c;
    --primary-color: #0073ea;
    --primary-hover-color: #0060b9;
    --primary-selected-color: #cce5ff;
    --primary-text-color: #323338;
    --text-color-on-primary: #ffffff;
    --text-color-on-inverted: #ffffff;
    --secondary-text-color: #676879;
    --placeholder-color: #676879;
    --icon-color: #676879;
    --link-color: #1f76c2;
    --primary-background-color: #ffffff;
    --primary-background-hover-color: #dcdfec;
    --secondary-background-color: #ffffff;
    --grey-background-color: #f6f7fb;
    --allgrey-background-color: #f6f7fb;
    --inverted-color-background: #323338;
    --disabled-background-color: #ecedf5;
    --disabled-text-color: rgba(50, 51, 56, var(--disabled-component-opacity));
    --positive-color: #258750;
    --positive-color-hover: #007038;
    --positive-color-selected: #bbdbc9;
    --negative-color: #d83a52;
    --negative-color-hover: #b63546;
    --negative-color-selected: #f4c3cb;
    --private-color: #f65f7c;
    --shareable-color: #a25ddc;
    --ui-border-color: #c3c6d4;
    --layout-border-color: #d0d4e4;
    --box-shadow-xs: 0px 4px 6px -4px rgba(0, 0, 0, 0.1);
    --box-shadow-small: 0px 4px 8px rgba(0, 0, 0, 0.2);
    --box-shadow-medium: 0px 6px 20px rgba(0, 0, 0, 0.2);
    --box-shadow-large: 0px 15px 50px rgba(0, 0, 0, 0.3);
    --color-grass_green: #037f4c;
    --color-grass_green-hover: #116846;
    --color-grass_green-selected: #81bfa5;
    --color-done-green: #00c875;
    --color-done-green-hover: #0f9b63;
    --color-done-green-selected: #80e3ba;
    --color-done-green-selected-with-opacity: rgba(128, 227, 186, 0.6);
    --color-bright-green: #9cd326;
    --color-bright-green-hover: #7ca32b;
    --color-bright-green-selected: #cde992;
    --color-saladish: #cab641;
    --color-saladish-hover: #9d8f3e;
    --color-saladish-selected: #e4daa0;
    --color-egg_yolk: #ffcb00;
    --color-egg_yolk-hover: #c29e11;
    --color-egg_yolk-selected: #ffe580;
    --color-egg_yolk-rgb: 255, 213, 51;
    --color-working_orange: #fdab3d;
    --color-working_orange-hover: #c0873c;
    --color-working_orange-selected: #fed59e;
    --color-dark-orange: #ff642e;
    --color-dark-orange-hover: #c25531;
    --color-dark-orange-selected: #ffb196;
    --color-peach: #ffadad;
    --color-peach-hover: #c2888a;
    --color-peach-selected: #ffd6d6;
    --color-sunset: #ff7575;
    --color-sunset-hover: #c26163;
    --color-sunset-selected: #ffbaba;
    --color-sunset-selected-with-opacity: rgba(255, 186, 186, 0.6);
    --color-stuck-red: #e2445c;
    --color-stuck-red-hover: #ad3f51;
    --color-stuck-red-selected: #f0a1ad;
    --color-dark-red: #bb3354;
    --color-dark-red-hover: #92334c;
    --color-dark-red-selected: #dd99a9;
    --color-sofia_pink: #ff158a;
    --color-sofia_pink-hover: #c21e71;
    --color-sofia_pink-selected: #ff8ac4;
    --color-lipstick: #ff5ac4;
    --color-lipstick-hover: #c24e9a;
    --color-lipstick-selected: #fface1;
    --color-bubble: #faa1f1;
    --color-bubble-hover: #be80ba;
    --color-bubble-selected: #fcd0f8;
    --color-purple: #a25ddc;
    --color-purple-hover: #8050ab;
    --color-purple-selected: #d0aeed;
    --color-dark_purple: #784bd1;
    --color-dark_purple-hover: #6344a3;
    --color-dark_purple-selected: #bba5e8;
    --color-berry: #7e3b8a;
    --color-berry-hover: #673971;
    --color-berry-selected: #be9dc4;
    --color-dark_indigo: #401694;
    --color-dark_indigo-hover: #3c1f78;
    --color-dark_indigo-selected: #a08bc9;
    --color-indigo: #5559df;
    --color-indigo-hover: #4b4ead;
    --color-indigo-selected: #aaacef;
    --color-navy: #225091;
    --color-navy-hover: #274776;
    --color-navy-selected: #90a7c8;
    --color-bright-blue: #579bfc;
    --color-bright-blue-hover: #4c7cc1;
    --color-bright-blue-selected: #abcdfd;
    --color-dark-blue: #0086c0;
    --color-dark-blue-hover: #0f6d97;
    --color-dark-blue-selected: #80c2df;
    --color-aquamarine: #4eccc6;
    --color-aquamarine-hover: #469e9b;
    --color-aquamarine-selected: #a6e5e2;
    --color-chili-blue: #66ccff;
    --color-chili-blue-hover: #569ec3;
    --color-chili-blue-selected: #b2e5ff;
    --color-river: #68a1bd;
    --color-river-hover: #588095;
    --color-river-selected: #b3d0de;
    --color-winter: #9aadbd;
    --color-winter-hover: #7b8895;
    --color-winter-selected: #ccd6de;
    --color-explosive: #c4c4c4;
    --color-explosive-hover: #98999a;
    --color-explosive-selected: #e1e1e1;
    --color-american_gray: #808080;
    --color-american_gray-hover: #69696a;
    --color-american_gray-selected: #bfbfbf;
    --color-blackish: #333333;
    --color-blackish-hover: #222222;
    --color-blackish-selected: #999999;
    --color-brown: #7f5347;
    --color-brown-hover: #684943;
    --color-brown-selected: #bfa9a3;
    --color-orchid: #D974B0;
    --color-orchid-hover: #AE5D8D;
    --color-orchid-selected: #ECBAD7;
    --color-tan: #AD967A;
    --color-tan-hover: #8A7862;
    --color-tan-selected: #D6CABC;
    --color-sky: #A1E3F6;
    --color-sky-hover: #81B6C5;
    --color-sky-selected: #D0F1FA;
    --color-coffee: #BD816E;
    --color-coffee-hover: #976758;
    --color-coffee-selected: #DEC0B7;
    --color-royal: #2B76E5;
    --color-royal-hover: #225EB7;
    --color-royal-selected: #95BBF2;
    --color-teal: #175A63;
    --color-teal-hover: #12484F;
    --color-teal-selected: #8BACB1;
    --color-lavender: #BDA8F9;
    --color-lavender-hover: #9786C7;
    --color-lavender-selected: #DED4FC;
    --color-steel: #A9BEE8;
    --color-steel-hover: #8798BA;
    --color-steel-selected: #D4DFF4;
    --color-lilac: #9D99B9;
    --color-lilac-hover: #7E7A94;
    --color-lilac-selected: #CECCDC;
    --color-pecan: #563E3E;
    --color-pecan-hover: #453232;
    --color-pecan-selected: #AB9F9F;
    --color-dark_marble: #f1f1f1;
    --color-marble: #f7f7f7;
    --color-gainsboro: #e1e1e1;
    --color-extra_light_gray: #edeef0;
    --color-glitter: #d9f0ff;
    --color-ultra_light_gray: #ebebeb;
    --color-very_light_gray: #a1a1a1;
    --color-jaco_gray: #9699a6;
    --color-storm_gray: #6b6d77;
    --color-trolley-grey: #808080;
    --color-basic_light_blue: #c7e6fa;
    --color-light_blue: #61caf7;
    --color-turquoise: #66ccff;
    --color-aqua: #00d1d1;
    --color-live_blue: #009aff;
    --color-jeans: #597bfc;
    --color-burned_eggplant: #181d37;
    --color-light-pink: #ff5ac4;
    --color-dark-pink: #ff158a;
    --color-dark_red: #bb3354;
    --color-yellow: #ffcb00;
    --color-mustered: #cab641;
    --color-orange: #fdab3d;
    --color-lime-green: #9cd326;
    --color-jade: #03c875;
    --color-green-haze: #00a359;
    --color-grass-green: #037f4c;
    --color-amethyst: #a25ddc;
    --color-dark-purple: #784bd1;
    --color-blue_links: #0086c0;
    --color-blue-links: #0086c0;
    --color-private: #f65f7c;
    --color-public: #009aff;
    --color-board_views_grey: #6e6f8f;
    --color-board_views_grey_hover: #b2b3d0;
    --color-board_views_blue: #1c1f3b;
    --color-board_views_blue_secondary: #363a52;
    --color-border_light_gray: #f5f6f8;
    --color-brand-blue: #00a9ff;
    --color-brand-charcoal: #2b2c5c;
    --color-brand-gold: #ffcc00;
    --color-brand-green: #11dd80;
    --color-brand-iris: #595ad4;
    --color-brand-light-blue: #00cff4;
    --color-brand-malachite: #00cd6f;
    --color-brand-purple: #a358d0;
    --color-brand-red: #f74875;
    --color-deadline_upcoming_indication: #5d6387;
    --color-default_group_color: #579bfc;
    --color-form_btn_hover: #0083d9;
    --color-form_purple: #575c96;
    --color-highlight: #dff0ff;
    --color-green_shadow: #00c875;
    --color-green-shadow: #00c875;
    --color-red_shadow: #e2445c;
    --color-red-shadow: #e2445c;
    --color-pulse_bg: #f0f0f0;
    --color-pulse_text_color: #333333;
    --color-placholder_gray: #d8d8d8;
    --color-placeholder_light_gray: #efefef;
    --color-excel-green: #207245;
    --color-media-blue: #2ea2e9;
    --color-pdf-red: #bb0706;
    --color-ppt-orange: #d64e2a;
    --color-word-blue: #2a5699;
    --color-zip-orange: #e4901c;
    --color-like_red: #fb275d;
    --color-scrollbar_gray: #b2b2b2;
    --color-timeline_grid_blue: #454662;
    --color-timeline_blue: #1c1f3b;
    --color-highlight_blue-rgb: 204, 229, 255;
    --color-snow_white-with-opacity: rgba(255, 255, 255, 0.4);
    --color-wolf_gray-with-opacity: rgba(195, 198, 212, 0.1);
    --color-asphalt-with-opacity: rgba(103, 104, 121, 0.1);
    --primary-on-secondary-color: #0073ea;
    --primary-hover-on-secondary-color: #0060b9;
    --primary-selected-color-rgb: 204, 229, 255;
    --primary-selected-on-secondary-color: #cce5ff;
    --primary-text-on-secondary-color: #323338;
    --text-color-on-primary-with-opacity: rgba(255, 255, 255, 0.4);
    --secondary-text-on-secondary-color: #676879;
    --placeholder-color-with-opacity: rgba(103, 104, 121, 0.1);
    --placeholder-on-secondary-color: #676879;
    --icon-on-secondary-color: #676879;
    --link-on-secondary-color: #1f76c2;
    --label-background-color: #cce5ff;
    --label-background-on-secondary-color: #cce5ff;
    --primary-background-color-rgb: 255, 255, 255;
    --primary-background-hover-on-secondary-color: #dcdfec;
    --modal-background-color: #ffffff;
    --secondary-background-color-rgb: 255, 255, 255;
    --disabled-background-on-secondary-color: #ecedf5;
    --disabled-text-on-secondary-color: rgba(50, 51, 56, var(--disabled-component-opacity));
    --ui-border-on-secondary-color: #c3c6d4;
    --layout-border-on-secondary-color: #d0d4e4;
    --dark-background-color: #f6f7fb;
    --dark-background-on-secondary-color: #f6f7fb;
    --dialog-background-color: #ffffff;
    --box-shadow-mediun: 0px 6px 20px rgba(0, 0, 0, 0.2)
}

.dark-app-theme {
    --primary-color: #0073ea;
    --primary-on-secondary-color: #0073ea;
    --primary-hover-color: #0060b9;
    --primary-selected-color: #133774;
    --primary-text-color: #d5d8df;
    --text-color-on-primary: #ffffff;
    --text-color-on-inverted: #323338;
    --secondary-text-color: #9699a6;
    --placeholder-color: #c3c6d4;
    --icon-color: #c3c6d4;
    --link-color: #69a7ef;
    --primary-background-color: #181b34;
    --primary-background-hover-color: #4b4e69;
    --secondary-background-color: #30324e;
    --grey-background-color: #181b34;
    --allgrey-background-color: #30324e;
    --inverted-color-background: #ffffff;
    --disabled-text-color: rgba(213, 216, 223, var(--disabled-component-opacity));
    --disabled-background-color: #3c3f59;
    --positive-color: #258750;
    --positive-color-hover: #007038;
    --positive-color-selected: #26503e;
    --negative-color: #d83a52;
    --negative-color-hover: #b63546;
    --negative-color-selected: #642830;
    --private-color: #f65f7c;
    --shareable-color: #a25ddc;
    --ui-border-color: #797e93;
    --layout-border-color: #4b4e69;
    --box-shadow-xs: 0px 4px 6px -4px rgba(9, 11, 25, 0.5);
    --box-shadow-small: 0px 4px 8px rgba(9, 11, 25, 0.5);
    --box-shadow-medium: 0px 6px 20px rgba(9, 11, 25, 0.5);
    --box-shadow-large: 0px 15px 50px rgba(9, 11, 25, 0.5);
    --color-grass_green: #359970;
    --color-grass_green-hover: #116846;
    --color-grass_green-selected: #0f4f43;
    --color-done-green: #33d391;
    --color-done-green-hover: #0f9b63;
    --color-done-green-selected: #0e7358;
    --color-done-green-selected-with-opacity: rgba(14, 115, 88, 0.6);
    --color-bright-green: #b0dc51;
    --color-bright-green-hover: #7ca32b;
    --color-bright-green-selected: #5c7930;
    --color-saladish: #d5c567;
    --color-saladish-hover: #9d8f3e;
    --color-saladish-selected: #736a3e;
    --color-egg_yolk: #ffd533;
    --color-egg_yolk-hover: #c29e11;
    --color-egg_yolk-selected: #8D751E;
    --color-egg_yolk-rgb: 255, 213, 51;
    --color-working_orange: #fdbc64;
    --color-working_orange-hover: #c0873c;
    --color-working_orange-selected: #8c653c;
    --color-dark-orange: #ff7b4d;
    --color-dark-orange-hover: #c25531;
    --color-dark-orange-selected: #8d4134;
    --color-peach: #ffbdbd;
    --color-peach-hover: #c2888a;
    --color-peach-selected: #8d6674;
    --color-sunset: #ff9191;
    --color-sunset-hover: #c26163;
    --color-sunset-selected: #8d4a58;
    --color-sunset-selected-with-opacity: rgba(141, 74, 88, 0.6);
    --color-stuck-red: #e8697d;
    --color-stuck-red-hover: #ad3f51;
    --color-stuck-red-selected: #7f314b;
    --color-dark-red: #c95c76;
    --color-dark-red-hover: #92334c;
    --color-dark-red-selected: #6b2947;
    --color-sofia_pink: #ff44a1;
    --color-sofia_pink-hover: #c21e71;
    --color-sofia_pink-selected: #8d1a62;
    --color-lipstick: #ff7bd0;
    --color-lipstick-hover: #c24e9a;
    --color-lipstick-selected: #8d3c7f;
    --color-bubble: #fbb4f4;
    --color-bubble-hover: #be80ba;
    --color-bubble-selected: #8b6096;
    --color-purple: #b57de3;
    --color-purple-hover: #8050ab;
    --color-purple-selected: #5f3e8b;
    --color-dark_purple: #936fda;
    --color-dark_purple-hover: #6344a3;
    --color-dark_purple-selected: #4a3586;
    --color-berry: #6645a9;
    --color-berry-hover: #673971;
    --color-berry-selected: #4d2d62;
    --color-dark_indigo: #401694;
    --color-dark_indigo-hover: #3c1f78;
    --color-dark_indigo-selected: #2e1b67;
    --color-indigo: #777ae5;
    --color-indigo-hover: #4b4ead;
    --color-indigo-selected: #383c8d;
    --color-navy: #4e73a7;
    --color-navy-hover: #274776;
    --color-navy-selected: #1f3866;
    --color-bright-blue: #79affd;
    --color-bright-blue-hover: #4c7cc1;
    --color-bright-blue-selected: #395d9b;
    --color-dark-blue: #339ecd;
    --color-dark-blue-hover: #0f6d97;
    --color-dark-blue-selected: #0e527e;
    --color-aquamarine: #71d6d1;
    --color-aquamarine-hover: #469e9b;
    --color-aquamarine-selected: #357580;
    --color-chili-blue: #85d6ff;
    --color-chili-blue-hover: #569ec3;
    --color-chili-blue-selected: #41759d;
    --color-river: #86b4ca;
    --color-river-hover: #588095;
    --color-river-selected: #42607c;
    --color-winter: #aebdca;
    --color-winter-hover: #7b8895;
    --color-winter-selected: #5b667c;
    --color-explosive: #d0d0d0;
    --color-explosive-hover: #98999a;
    --color-explosive-selected: #70717f;
    --color-american_gray: #999999;
    --color-american_gray-hover: #69696a;
    --color-american_gray-selected: #4e505e;
    --color-blackish: #5c5c5c;
    --color-blackish-hover: #222222;
    --color-blackish-selected: #272937;
    --color-brown: #99756c;
    --color-brown-hover: #684943;
    --color-brown-selected: #4d3941;
    --color-orchid: #E190C0;
    --color-orchid-hover: #B4739A;
    --color-orchid-selected: #B4739A;
    --color-tan: #BDAB95;
    --color-tan-hover: #978977;
    --color-tan-selected: #716863;
    --color-sky: #B4E9F8;
    --color-sky-hover: #90BAC6;
    --color-sky-selected: #6C8A9A;
    --color-coffee: #CA9A8B;
    --color-coffee-hover: #A27B6F;
    --color-coffee-selected: #795E5D;
    --color-royal: #5591EA;
    --color-royal-hover: #4474BB;
    --color-royal-selected: #375993;
    --color-teal: #457B82;
    --color-teal-hover: #376268;
    --color-teal-selected: #2E4D58;
    --color-lavender: #CAB9FA;
    --color-lavender-hover: #A294C8;
    --color-lavender-selected: #85597B;
    --color-steel: #BACBED;
    --color-steel-hover: #95A2BE;
    --color-steel-selected: #707A95;
    --color-lilac: #B1ADC7;
    --color-lilac-hover: #8E8A9F;
    --color-lilac-selected: #6B697F;
    --color-pecan: #786565;
    --color-pecan-hover: #605151;
    --color-pecan-selected: #4A4148;
    --primary-on-secondary-color: #0073ea;
    --primary-hover-on-secondary-color: #0060b9;
    --primary-selected-color-rgb: 19, 55, 116;
    --primary-selected-on-secondary-color: #133774;
    --primary-text-on-secondary-color: #d5d8df;
    --primary-background-color-rgb: 24, 27, 52;
    --primary-background-hover-on-secondary-color: #4b4e69;
    --secondary-background-color-rgb: 48, 50, 78;
    --secondary-text-on-secondary-color: #9699a6;
    --link-on-secondary-color: #69a7ef;
    --modal-background-color: #181b34;
    --dark-background-color: #393b53;
    --dark-background-on-secondary-color: #4b4e69;
    --dialog-background-color: #30324e;
    --label-background-color: #404b69;
    --label-background-on-secondary-color: #404b69;
    --icon-on-secondary-color: #c3c6d4;
    --placeholder-color-with-opacity: rgba(195, 198, 212, 0.1);
    --placeholder-on-secondary-color: #c3c6d4;
    --ui-border-on-secondary-color: #797e93;
    --layout-border-on-secondary-color: #4b4e69;
    --disabled-background-on-secondary-color: #3c3f59;
    --disabled-text-on-secondary-color: rgba(213, 216, 223, var(--disabled-component-opacity));
    --box-shadow-mediun: 0px 6px 20px rgba(0, 0, 0, 0.2)
}

.black-app-theme {
    --primary-color: #0073ea;
    --primary-on-secondary-color: #0073ea;
    --primary-hover-color: #0060b9;
    --primary-selected-color: #133774;
    --primary-text-color: #eeeeee;
    --text-color-on-primary: #ffffff;
    --text-color-on-inverted: #111111;
    --secondary-text-color: #aaaaaa;
    --placeholder-color: #aaaaaa;
    --icon-color: #aaaaaa;
    --link-color: #69a7ef;
    --primary-background-color: #111111;
    --primary-background-hover-color: #636363;
    --secondary-background-color: #2c2c2c;
    --grey-background-color: #111111;
    --allgrey-background-color: #2c2c2c;
    --inverted-color-background: #eeeeee;
    --disabled-text-color: rgba(238, 238, 238, var(--disabled-component-opacity));
    --disabled-background-color: #3a3a3a;
    --positive-color: #258750;
    --positive-color-hover: #007038;
    --positive-color-selected: #26503e;
    --negative-color: #d83a52;
    --negative-color-hover: #b63546;
    --negative-color-selected: #642830;
    --private-color: #f65f7c;
    --shareable-color: #a25ddc;
    --ui-border-color: #8d8d8d;
    --layout-border-color: #636363;
    --box-shadow-xs: 0px 4px 6px -4px #000000;
    --box-shadow-small: 0px 4px 8px #000000;
    --box-shadow-medium: 0px 6px 20px #000000;
    --box-shadow-large: 0px 15px 50px #000000;
    --color-grass_green: #359970;
    --color-grass_green-hover: #116846;
    --color-grass_green-selected: #0a482e;
    --color-done-green: #33d391;
    --color-done-green-hover: #0f9b63;
    --color-done-green-selected: #096c43;
    --color-done-green-selected-with-opacity: rgba(9, 108, 67, 0.6);
    --color-bright-green: #b0dc51;
    --color-bright-green-hover: #7ca32b;
    --color-bright-green-selected: #56721b;
    --color-saladish: #d5c567;
    --color-saladish-hover: #9d8f3e;
    --color-saladish-selected: #6d6329;
    --color-egg_yolk: #ffd533;
    --color-egg_yolk-hover: #c29e11;
    --color-egg_yolk-selected: #886e09;
    --color-egg_yolk-rgb: 255, 213, 51;
    --color-working_orange: #fdbc64;
    --color-working_orange-hover: #c0873c;
    --color-working_orange-selected: #875e27;
    --color-dark-orange: #ff7b4d;
    --color-dark-orange-hover: #c25531;
    --color-dark-orange-selected: #883a1f;
    --color-peach: #ffbdbd;
    --color-peach-hover: #c2888a;
    --color-peach-selected: #885f5f;
    --color-sunset: #ff9191;
    --color-sunset-hover: #c26163;
    --color-sunset-selected: #884343;
    --color-sunset-selected-with-opacity: rgba(136, 67, 67, 0.6);
    --color-stuck-red: #e8697d;
    --color-stuck-red-hover: #ad3f51;
    --color-stuck-red-selected: #792a36;
    --color-dark-red: #c95c76;
    --color-dark-red-hover: #92334c;
    --color-dark-red-selected: #662232;
    --color-sofia_pink: #ff44a1;
    --color-sofia_pink-hover: #c21e71;
    --color-sofia_pink-selected: #88134d;
    --color-lipstick: #ff7bd0;
    --color-lipstick-hover: #c24e9a;
    --color-lipstick-selected: #88356a;
    --color-bubble: #fbb4f4;
    --color-bubble-hover: #be80ba;
    --color-bubble-selected: #855981;
    --color-purple: #b57de3;
    --color-purple-hover: #8050ab;
    --color-purple-selected: #593776;
    --color-dark_purple: #936fda;
    --color-dark_purple-hover: #6344a3;
    --color-dark_purple-selected: #442e71;
    --color-berry: #9862a1;
    --color-berry-hover: #673971;
    --color-berry-selected: #47264d;
    --color-dark_indigo: #6645a9;
    --color-dark_indigo-hover: #3c1f78;
    --color-dark_indigo-selected: #291452;
    --color-indigo: #777ae5;
    --color-indigo-hover: #4b4ead;
    --color-indigo-selected: #333578;
    --color-navy: #4e73a7;
    --color-navy-hover: #274776;
    --color-navy-selected: #193151;
    --color-bright-blue: #79affd;
    --color-bright-blue-hover: #4c7cc1;
    --color-bright-blue-selected: #345686;
    --color-dark-blue: #339ecd;
    --color-dark-blue-hover: #0f6d97;
    --color-dark-blue-selected: #094b69;
    --color-aquamarine: #71d6d1;
    --color-aquamarine-hover: #469e9b;
    --color-aquamarine-selected: #2f6e6b;
    --color-chili-blue: #85d6ff;
    --color-chili-blue-hover: #569ec3;
    --color-chili-blue-selected: #3b6e88;
    --color-river: #86b4ca;
    --color-river-hover: #588095;
    --color-river-selected: #3c5967;
    --color-winter: #aebdca;
    --color-winter-hover: #7b8895;
    --color-winter-selected: #555f67;
    --color-explosive: #d0d0d0;
    --color-explosive-hover: #98999a;
    --color-explosive-selected: #6a6a6a;
    --color-american_gray: #999999;
    --color-american_gray-hover: #69696a;
    --color-american_gray-selected: #494949;
    --color-blackish: #5c5c5c;
    --color-blackish-hover: #222222;
    --color-blackish-selected: #111111;
    --color-brown: #99756c;
    --color-brown-hover: #684943;
    --color-brown-selected: #48322c;
    --color-orchid: #e190c0;
    --color-orchid-hover: #b4739a;
    --color-orchid-selected: #7e516c;
    --color-tan: #bdab95;
    --color-tan-hover: #978977;
    --color-tan-selected: #6a6053;
    --color-sky: #b4e9f8;
    --color-sky-hover: #90bac6;
    --color-sky-selected: #65828b;
    --color-coffee: #ca9a8b;
    --color-coffee-hover: #a27b6f;
    --color-coffee-selected: #71564e;
    --color-royal: #5591ea;
    --color-royal-hover: #4474bb;
    --color-royal-selected: #305183;
    --color-teal: #457b82;
    --color-teal-hover: #376268;
    --color-teal-selected: #274549;
    --color-lavender: #cab9fa;
    --color-lavender-hover: #a294c8;
    --color-lavender-selected: #71688c;
    --color-steel: #bacbed;
    --color-steel-hover: #95a2be;
    --color-steel-selected: #687185;
    --color-lilac: #687185;
    --color-lilac-hover: #8e8a9f;
    --color-lilac-selected: #63616f;
    --color-pecan: #786565;
    --color-pecan-hover: #605151;
    --color-pecan-selected: #433939;
    --primary-on-secondary-color: #0073ea;
    --primary-hover-on-secondary-color: #0060b9;
    --primary-selected-color-rgb: 19, 55, 116;
    --primary-selected-on-secondary-color: #133774;
    --primary-text-on-secondary-color: #eeeeee;
    --primary-background-color-rgb: 17, 17, 17;
    --primary-background-hover-on-secondary-color: #636363;
    --secondary-background-color-rgb: 44, 44, 44;
    --secondary-text-on-secondary-color: #9699a6;
    --link-on-secondary-color: #69a7ef;
    --modal-background-color: #181b34;
    --dark-background-color: #2c2c2c;
    --dark-background-on-secondary-color: #4b4e69;
    --dialog-background-color: #2c2c2c;
    --label-background-color: #404b69;
    --label-background-on-secondary-color: #404b69;
    --icon-on-secondary-color: #aaaaaa;
    --placeholder-color-with-opacity: rgba(170, 170, 170, 0.1);
    --placeholder-on-secondary-color: #aaaaaa;
    --ui-border-on-secondary-color: #8d8d8d;
    --layout-border-on-secondary-color: #636363;
    --disabled-background-on-secondary-color: #3a3a3a;
    --disabled-text-on-secondary-color: rgba(238, 238, 238, var(--disabled-component-opacity));
    --box-shadow-mediun: 0px 6px 20px rgba(0, 0, 0, 0.2)
}

.hacker_theme-app-theme {
    --primary-color: #fe78c6;
    --primary-hover-color: #fe5ab9;
    --primary-selected-color: #9f4077;
    --primary-text-color: #d5d8df;
    --text-color-on-inverted: #323338;
    --secondary-text-color: #9699a6;
    --placeholder-color: #c3c6d4;
    --icon-color: #c3c6d4;
    --link-color: #bd93f9;
    --primary-background-color: #282a36;
    --primary-background-hover-color: #4b4e69;
    --secondary-background-color: #30324e;
    --grey-background-color: #282a36;
    --allgrey-background-color: #282a36;
    --inverted-color-background: #ffffff;
    --disabled-text-color: rgba(238, 238, 238, var(--disabled-component-opacity));
    --disabled-background-color: #3a3a3a;
    --positive-color: #50fa7b;
    --positive-color-hover: #007038;
    --positive-color-selected: #26503e;
    --negative-color: #ff5555;
    --negative-color-hover: #b63546;
    --negative-color-selected: #642830;
    --private-color: #f65f7c;
    --shareable-color: #a25ddc;
    --ui-border-color: #797e93;
    --layout-border-color: #414458;
    --box-shadow-xs: 0px 4px 6px -4px #000000;
    --box-shadow-small: 0px 4px 8px #000000;
    --box-shadow-medium: 0px 6px 20px #000000;
    --box-shadow-large: 0px 15px 50px #000000;
    --color-grass_green: #359970;
    --color-grass_green-hover: #116846;
    --color-grass_green-selected: #0a482e;
    --color-done-green: #33d391;
    --color-done-green-hover: #0f9b63;
    --color-done-green-selected: #096c43;
    --color-done-green-selected-with-opacity: rgba(9, 108, 67, 0.6);
    --color-bright-green: #b0dc51;
    --color-bright-green-hover: #7ca32b;
    --color-bright-green-selected: #56721b;
    --color-saladish: #d5c567;
    --color-saladish-hover: #9d8f3e;
    --color-saladish-selected: #6d6329;
    --color-egg_yolk: #ffd533;
    --color-egg_yolk-hover: #c29e11;
    --color-egg_yolk-selected: #886e09;
    --color-egg_yolk-rgb: 255, 213, 51;
    --color-working_orange: #fdbc64;
    --color-working_orange-hover: #c0873c;
    --color-working_orange-selected: #875e27;
    --color-dark-orange: #ff7b4d;
    --color-dark-orange-hover: #c25531;
    --color-dark-orange-selected: #883a1f;
    --color-peach: #ffbdbd;
    --color-peach-hover: #c2888a;
    --color-peach-selected: #885f5f;
    --color-sunset: #ff9191;
    --color-sunset-hover: #c26163;
    --color-sunset-selected: #884343;
    --color-sunset-selected-with-opacity: rgba(136, 67, 67, 0.6);
    --color-stuck-red: #e8697d;
    --color-stuck-red-hover: #ad3f51;
    --color-stuck-red-selected: #792a36;
    --color-dark-red: #c95c76;
    --color-dark-red-hover: #92334c;
    --color-dark-red-selected: #662232;
    --color-sofia_pink: #ff44a1;
    --color-sofia_pink-hover: #c21e71;
    --color-sofia_pink-selected: #88134d;
    --color-lipstick: #ff7bd0;
    --color-lipstick-hover: #c24e9a;
    --color-lipstick-selected: #88356a;
    --color-bubble: #fbb4f4;
    --color-bubble-hover: #be80ba;
    --color-bubble-selected: #855981;
    --color-purple: #b57de3;
    --color-purple-hover: #8050ab;
    --color-purple-selected: #593776;
    --color-dark_purple: #936fda;
    --color-dark_purple-hover: #6344a3;
    --color-dark_purple-selected: #442e71;
    --color-berry: #9862a1;
    --color-berry-hover: #673971;
    --color-berry-selected: #47264d;
    --color-dark_indigo: #6645a9;
    --color-dark_indigo-hover: #3c1f78;
    --color-dark_indigo-selected: #291452;
    --color-indigo: #777ae5;
    --color-indigo-hover: #4b4ead;
    --color-indigo-selected: #333578;
    --color-navy: #4e73a7;
    --color-navy-hover: #274776;
    --color-navy-selected: #193151;
    --color-bright-blue: #79affd;
    --color-bright-blue-hover: #4c7cc1;
    --color-bright-blue-selected: #345686;
    --color-dark-blue: #339ecd;
    --color-dark-blue-hover: #0f6d97;
    --color-dark-blue-selected: #094b69;
    --color-aquamarine: #71d6d1;
    --color-aquamarine-hover: #469e9b;
    --color-aquamarine-selected: #2f6e6b;
    --color-chili-blue: #85d6ff;
    --color-chili-blue-hover: #569ec3;
    --color-chili-blue-selected: #3b6e88;
    --color-river: #86b4ca;
    --color-river-hover: #588095;
    --color-river-selected: #3c5967;
    --color-winter: #aebdca;
    --color-winter-hover: #7b8895;
    --color-winter-selected: #555f67;
    --color-explosive: #d0d0d0;
    --color-explosive-hover: #98999a;
    --color-explosive-selected: #6a6a6a;
    --color-american_gray: #999999;
    --color-american_gray-hover: #69696a;
    --color-american_gray-selected: #494949;
    --color-blackish: #5c5c5c;
    --color-blackish-hover: #222222;
    --color-blackish-selected: #111111;
    --color-brown: #99756c;
    --color-brown-hover: #684943;
    --color-brown-selected: #48322c;
    --color-orchid: #e190c0;
    --color-orchid-hover: #b4739a;
    --color-orchid-selected: #7e516c;
    --color-tan: #bdab95;
    --color-tan-hover: #978977;
    --color-tan-selected: #6a6053;
    --color-sky: #b4e9f8;
    --color-sky-hover: #90bac6;
    --color-sky-selected: #65828b;
    --color-coffee: #ca9a8b;
    --color-coffee-hover: #a27b6f;
    --color-coffee-selected: #71564e;
    --color-royal: #5591ea;
    --color-royal-hover: #4474bb;
    --color-royal-selected: #305183;
    --color-teal: #457b82;
    --color-teal-hover: #376268;
    --color-teal-selected: #274549;
    --color-lavender: #cab9fa;
    --color-lavender-hover: #a294c8;
    --color-lavender-selected: #71688c;
    --color-steel: #bacbed;
    --color-steel-hover: #95a2be;
    --color-steel-selected: #687185;
    --color-lilac: #687185;
    --color-lilac-hover: #8e8a9f;
    --color-lilac-selected: #63616f;
    --color-pecan: #786565;
    --color-pecan-hover: #605151;
    --color-pecan-selected: #433939;
    --color-success: #50fa7b;
    --color-error: #ff5555;
    --primary-on-secondary-color: #fe78c6;
    --primary-hover-on-secondary-color: #fe5ab9;
    --primary-selected-color-rgb: 159, 64, 119;
    --primary-selected-on-secondary-color: #9f4077;
    --primary-text-on-secondary-color: #d5d8df;
    --primary-background-color-rgb: 40, 42, 54;
    --primary-background-hover-on-secondary-color: #4b4e69;
    --secondary-background-color-rgb: 48, 50, 78;
    --secondary-text-on-secondary-color: #9699a6;
    --link-on-secondary-color: #bd93f9;
    --modal-background-color: #282a36;
    --dark-background-color: #303241;
    --dark-background-on-secondary-color: #595959;
    --dialog-background-color: #30324e;
    --label-background-color: #404b69;
    --label-background-on-secondary-color: #404b69;
    --icon-on-secondary-color: #c3c6d4;
    --placeholder-color-with-opacity: rgba(195, 198, 212, 0.1);
    --placeholder-on-secondary-color: #c3c6d4;
    --ui-border-on-secondary-color: #797e93;
    --layout-border-on-secondary-color: #414458;
    --disabled-background-on-secondary-color: #3a3a3a;
    --disabled-text-on-secondary-color: rgba(238, 238, 238, var(--disabled-component-opacity));
    --box-shadow-mediun: 0px 6px 20px rgba(0, 0, 0, 0.2)
}

.icon_component {
    position: relative
}

.icon_component:before {
    text-decoration: none !important
}

.icon_component--no-focus-style:focus {
    outline: none
}

.icon_component--clickable {
    cursor: pointer
}

:root {
    --motion-productive-short: 70ms;
    --motion-productive-medium: 100ms;
    --motion-productive-long: 150ms;
    --motion-expressive-short: 250ms;
    --motion-expressive-long: 400ms;
    --motion-timing-enter: cubic-bezier(0, 0, 0.35, 1);
    --motion-timing-exit: cubic-bezier(0.4, 0, 1, 1);
    --motion-timing-transition: cubic-bezier(0.4, 0, 0.2, 1);
    --motion-timing-emphasize: cubic-bezier(0, 0, 0.2, 1.4);
    --expand-animation-timing: var(--motion-timing-enter);
    --spacing-xs: 4px;
    --spacing-small: 8px;
    --spacing-medium: 16px;
    --spacing-large: 24px;
    --spacing-xl: 32px;
    --spacing-xxl: 48px;
    --spacing-xxxl: 64px;
    --border-width: 1px;
    --border-style: solid;
    --border-radius-small: 4px;
    --border-radius-medium: 8px;
    --border-radius-big: 16px;
    --disabled-component-opacity: 0.38;
    --font-family: Manrope, Roboto, Rubik, Noto Kufi Arabic, Noto Sans JP, sans-serif;
    --title-font-family: Poppins, Roboto, Rubik, Noto Kufi Arabic, Noto Sans JP, sans-serif;
    --h1-font-family: var(--title-font-family);
    --font-smoothing-webkit: antialiased;
    --font-smoothing-moz: grayscale;
    --font-weight-very-light: 200;
    --font-weight-light: 300;
    --font-weight-normal: 400;
    --font-weight-bold: 500;
    --font-size-10: 14px;
    --font-size-20: 14px;
    --font-size-30: 16px;
    --font-size-40: 18px;
    --font-size-50: 24px;
    --font-size-60: 30px;
    --font-line-height-10: 18px;
    --font-line-height-20: 24px;
    --font-line-height-30: 24px;
    --font-line-height-40: 24px;
    --font-line-height-50: 32px;
    --font-line-height-60: 42px;
    --font-size-h1: var(--font-size-60);
    --font-size-h2: var(--font-size-50);
    --font-size-h3: var(--font-size-50);
    --font-size-h4: var(--font-size-40);
    --font-size-h5: var(--font-size-30);
    --font-size-general-label: var(--font-size-20);
    --font-size-paragraph: var(--font-size-30);
    --font-size-subtext: var(--font-size-10);
    --font-line-height-h1: var(--font-line-height-60);
    --font-line-height-h2: var(--font-line-height-50);
    --font-line-height-h3: var(--font-line-height-50);
    --font-line-height-h4: var(--font-line-height-40);
    --font-line-height-h5: var(--font-line-height-30);
    --font-line-height-general-label: var(--font-line-height-20);
    --font-line-height-paragraph: var(--font-line-height-30);
    --font-line-height-subtext: var(--font-line-height-10);
    --font-h1: var(--font-weight-bold) var(--font-size-h1)/var(--font-line-height-h1) var(--h1-font-family);
    --font-h2: var(--font-weight-bold) var(--font-size-h2)/var(--font-line-height-h2) var(--title-font-family);
    --font-h3: var(--font-weight-light) var(--font-size-h3)/var(--font-line-height-h3) var(--title-font-family);
    --font-h4: var(--font-weight-bold) var(--font-size-h4)/var(--font-line-height-h4) var(--title-font-family);
    --font-h5: var(--font-weight-bold) var(--font-size-h5)/var(--font-line-height-h5) var(--font-family);
    --font-general-label: var(--font-weight-normal) var(--font-size-general-label)/var(--font-line-height-general-label) var(--font-family);
    --font-paragraph: var(--font-weight-normal) var(--font-size-paragraph)/var(--font-line-height-paragraph) var(--font-family);
    --font-subtext: var(--font-weight-normal) var(--font-size-subtext)/var(--font-line-height-subtext) var(--font-family)
}

.default-app-theme,
.light-app-theme,
:root {
    --color-highlight_blue: #cce5ff;
    --color-basic_blue: #0073ea;
    --color-dark_blue: #0060b9;
    --color-bazooka: #f65f7c;
    --color-snow_white: #ffffff;
    --color-riverstone_gray: #f6f7fb;
    --color-ui_grey: #dcdfec;
    --color-wolf_gray: #c3c6d4;
    --color-asphalt: #676879;
    --color-mud_black: #323338;
    --color-black: #000000;
    --color-success: #258750;
    --color-success-hover: #007038;
    --color-success-highlight: #bbdbc9;
    --color-error: #d83a52;
    --color-error-hover: #b63546;
    --color-error-highlight: #f4c3cb;
    --color-link_color: #1f76c2;
    --color-surface: #292f4c;
    --primary-color: #0073ea;
    --primary-hover-color: #0060b9;
    --primary-selected-color: #cce5ff;
    --primary-text-color: #323338;
    --text-color-on-primary: #ffffff;
    --text-color-on-inverted: #ffffff;
    --secondary-text-color: #676879;
    --placeholder-color: #676879;
    --icon-color: #676879;
    --link-color: #1f76c2;
    --primary-background-color: #ffffff;
    --primary-background-hover-color: #dcdfec;
    --secondary-background-color: #ffffff;
    --grey-background-color: #f6f7fb;
    --allgrey-background-color: #f6f7fb;
    --inverted-color-background: #323338;
    --disabled-background-color: #ecedf5;
    --disabled-text-color: rgba(50, 51, 56, var(--disabled-component-opacity));
    --positive-color: #258750;
    --positive-color-hover: #007038;
    --positive-color-selected: #bbdbc9;
    --negative-color: #d83a52;
    --negative-color-hover: #b63546;
    --negative-color-selected: #f4c3cb;
    --private-color: #f65f7c;
    --shareable-color: #a25ddc;
    --ui-border-color: #c3c6d4;
    --layout-border-color: #d0d4e4;
    --box-shadow-xs: 0px 4px 6px -4px rgba(0, 0, 0, 0.1);
    --box-shadow-small: 0px 4px 8px rgba(0, 0, 0, 0.2);
    --box-shadow-medium: 0px 6px 20px rgba(0, 0, 0, 0.2);
    --box-shadow-large: 0px 15px 50px rgba(0, 0, 0, 0.3);
    --color-grass_green: #037f4c;
    --color-grass_green-hover: #116846;
    --color-grass_green-selected: #81bfa5;
    --color-done-green: #00c875;
    --color-done-green-hover: #0f9b63;
    --color-done-green-selected: #80e3ba;
    --color-done-green-selected-with-opacity: rgba(128, 227, 186, 0.6);
    --color-bright-green: #9cd326;
    --color-bright-green-hover: #7ca32b;
    --color-bright-green-selected: #cde992;
    --color-saladish: #cab641;
    --color-saladish-hover: #9d8f3e;
    --color-saladish-selected: #e4daa0;
    --color-egg_yolk: #ffcb00;
    --color-egg_yolk-hover: #c29e11;
    --color-egg_yolk-selected: #ffe580;
    --color-egg_yolk-rgb: 255, 213, 51;
    --color-working_orange: #fdab3d;
    --color-working_orange-hover: #c0873c;
    --color-working_orange-selected: #fed59e;
    --color-dark-orange: #ff642e;
    --color-dark-orange-hover: #c25531;
    --color-dark-orange-selected: #ffb196;
    --color-peach: #ffadad;
    --color-peach-hover: #c2888a;
    --color-peach-selected: #ffd6d6;
    --color-sunset: #ff7575;
    --color-sunset-hover: #c26163;
    --color-sunset-selected: #ffbaba;
    --color-sunset-selected-with-opacity: rgba(255, 186, 186, 0.6);
    --color-stuck-red: #e2445c;
    --color-stuck-red-hover: #ad3f51;
    --color-stuck-red-selected: #f0a1ad;
    --color-dark-red: #bb3354;
    --color-dark-red-hover: #92334c;
    --color-dark-red-selected: #dd99a9;
    --color-sofia_pink: #ff158a;
    --color-sofia_pink-hover: #c21e71;
    --color-sofia_pink-selected: #ff8ac4;
    --color-lipstick: #ff5ac4;
    --color-lipstick-hover: #c24e9a;
    --color-lipstick-selected: #fface1;
    --color-bubble: #faa1f1;
    --color-bubble-hover: #be80ba;
    --color-bubble-selected: #fcd0f8;
    --color-purple: #a25ddc;
    --color-purple-hover: #8050ab;
    --color-purple-selected: #d0aeed;
    --color-dark_purple: #784bd1;
    --color-dark_purple-hover: #6344a3;
    --color-dark_purple-selected: #bba5e8;
    --color-berry: #7e3b8a;
    --color-berry-hover: #673971;
    --color-berry-selected: #be9dc4;
    --color-dark_indigo: #401694;
    --color-dark_indigo-hover: #3c1f78;
    --color-dark_indigo-selected: #a08bc9;
    --color-indigo: #5559df;
    --color-indigo-hover: #4b4ead;
    --color-indigo-selected: #aaacef;
    --color-navy: #225091;
    --color-navy-hover: #274776;
    --color-navy-selected: #90a7c8;
    --color-bright-blue: #579bfc;
    --color-bright-blue-hover: #4c7cc1;
    --color-bright-blue-selected: #abcdfd;
    --color-dark-blue: #0086c0;
    --color-dark-blue-hover: #0f6d97;
    --color-dark-blue-selected: #80c2df;
    --color-aquamarine: #4eccc6;
    --color-aquamarine-hover: #469e9b;
    --color-aquamarine-selected: #a6e5e2;
    --color-chili-blue: #66ccff;
    --color-chili-blue-hover: #569ec3;
    --color-chili-blue-selected: #b2e5ff;
    --color-river: #68a1bd;
    --color-river-hover: #588095;
    --color-river-selected: #b3d0de;
    --color-winter: #9aadbd;
    --color-winter-hover: #7b8895;
    --color-winter-selected: #ccd6de;
    --color-explosive: #c4c4c4;
    --color-explosive-hover: #98999a;
    --color-explosive-selected: #e1e1e1;
    --color-american_gray: #808080;
    --color-american_gray-hover: #69696a;
    --color-american_gray-selected: #bfbfbf;
    --color-blackish: #333333;
    --color-blackish-hover: #222222;
    --color-blackish-selected: #999999;
    --color-brown: #7f5347;
    --color-brown-hover: #684943;
    --color-brown-selected: #bfa9a3;
    --color-orchid: #D974B0;
    --color-orchid-hover: #AE5D8D;
    --color-orchid-selected: #ECBAD7;
    --color-tan: #AD967A;
    --color-tan-hover: #8A7862;
    --color-tan-selected: #D6CABC;
    --color-sky: #A1E3F6;
    --color-sky-hover: #81B6C5;
    --color-sky-selected: #D0F1FA;
    --color-coffee: #BD816E;
    --color-coffee-hover: #976758;
    --color-coffee-selected: #DEC0B7;
    --color-royal: #2B76E5;
    --color-royal-hover: #225EB7;
    --color-royal-selected: #95BBF2;
    --color-teal: #175A63;
    --color-teal-hover: #12484F;
    --color-teal-selected: #8BACB1;
    --color-lavender: #BDA8F9;
    --color-lavender-hover: #9786C7;
    --color-lavender-selected: #DED4FC;
    --color-steel: #A9BEE8;
    --color-steel-hover: #8798BA;
    --color-steel-selected: #D4DFF4;
    --color-lilac: #9D99B9;
    --color-lilac-hover: #7E7A94;
    --color-lilac-selected: #CECCDC;
    --color-pecan: #563E3E;
    --color-pecan-hover: #453232;
    --color-pecan-selected: #AB9F9F;
    --color-dark_marble: #f1f1f1;
    --color-marble: #f7f7f7;
    --color-gainsboro: #e1e1e1;
    --color-extra_light_gray: #edeef0;
    --color-glitter: #d9f0ff;
    --color-ultra_light_gray: #ebebeb;
    --color-very_light_gray: #a1a1a1;
    --color-jaco_gray: #9699a6;
    --color-storm_gray: #6b6d77;
    --color-trolley-grey: #808080;
    --color-basic_light_blue: #c7e6fa;
    --color-light_blue: #61caf7;
    --color-turquoise: #66ccff;
    --color-aqua: #00d1d1;
    --color-live_blue: #009aff;
    --color-jeans: #597bfc;
    --color-burned_eggplant: #181d37;
    --color-light-pink: #ff5ac4;
    --color-dark-pink: #ff158a;
    --color-dark_red: #bb3354;
    --color-yellow: #ffcb00;
    --color-mustered: #cab641;
    --color-orange: #fdab3d;
    --color-lime-green: #9cd326;
    --color-jade: #03c875;
    --color-green-haze: #00a359;
    --color-grass-green: #037f4c;
    --color-amethyst: #a25ddc;
    --color-dark-purple: #784bd1;
    --color-blue_links: #0086c0;
    --color-blue-links: #0086c0;
    --color-private: #f65f7c;
    --color-public: #009aff;
    --color-board_views_grey: #6e6f8f;
    --color-board_views_grey_hover: #b2b3d0;
    --color-board_views_blue: #1c1f3b;
    --color-board_views_blue_secondary: #363a52;
    --color-border_light_gray: #f5f6f8;
    --color-brand-blue: #00a9ff;
    --color-brand-charcoal: #2b2c5c;
    --color-brand-gold: #ffcc00;
    --color-brand-green: #11dd80;
    --color-brand-iris: #595ad4;
    --color-brand-light-blue: #00cff4;
    --color-brand-malachite: #00cd6f;
    --color-brand-purple: #a358d0;
    --color-brand-red: #f74875;
    --color-deadline_upcoming_indication: #5d6387;
    --color-default_group_color: #579bfc;
    --color-form_btn_hover: #0083d9;
    --color-form_purple: #575c96;
    --color-highlight: #dff0ff;
    --color-green_shadow: #00c875;
    --color-green-shadow: #00c875;
    --color-red_shadow: #e2445c;
    --color-red-shadow: #e2445c;
    --color-pulse_bg: #f0f0f0;
    --color-pulse_text_color: #333333;
    --color-placholder_gray: #d8d8d8;
    --color-placeholder_light_gray: #efefef;
    --color-excel-green: #207245;
    --color-media-blue: #2ea2e9;
    --color-pdf-red: #bb0706;
    --color-ppt-orange: #d64e2a;
    --color-word-blue: #2a5699;
    --color-zip-orange: #e4901c;
    --color-like_red: #fb275d;
    --color-scrollbar_gray: #b2b2b2;
    --color-timeline_grid_blue: #454662;
    --color-timeline_blue: #1c1f3b;
    --color-highlight_blue-rgb: 204, 229, 255;
    --color-snow_white-with-opacity: rgba(255, 255, 255, 0.4);
    --color-wolf_gray-with-opacity: rgba(195, 198, 212, 0.1);
    --color-asphalt-with-opacity: rgba(103, 104, 121, 0.1);
    --primary-on-secondary-color: #0073ea;
    --primary-hover-on-secondary-color: #0060b9;
    --primary-selected-color-rgb: 204, 229, 255;
    --primary-selected-on-secondary-color: #cce5ff;
    --primary-text-on-secondary-color: #323338;
    --text-color-on-primary-with-opacity: rgba(255, 255, 255, 0.4);
    --secondary-text-on-secondary-color: #676879;
    --placeholder-color-with-opacity: rgba(103, 104, 121, 0.1);
    --placeholder-on-secondary-color: #676879;
    --icon-on-secondary-color: #676879;
    --link-on-secondary-color: #1f76c2;
    --label-background-color: #cce5ff;
    --label-background-on-secondary-color: #cce5ff;
    --primary-background-color-rgb: 255, 255, 255;
    --primary-background-hover-on-secondary-color: #dcdfec;
    --modal-background-color: #ffffff;
    --secondary-background-color-rgb: 255, 255, 255;
    --disabled-background-on-secondary-color: #ecedf5;
    --disabled-text-on-secondary-color: rgba(50, 51, 56, var(--disabled-component-opacity));
    --ui-border-on-secondary-color: #c3c6d4;
    --layout-border-on-secondary-color: #d0d4e4;
    --dark-background-color: #f6f7fb;
    --dark-background-on-secondary-color: #f6f7fb;
    --dialog-background-color: #ffffff;
    --box-shadow-mediun: 0px 6px 20px rgba(0, 0, 0, 0.2)
}

.dark-app-theme {
    --primary-color: #0073ea;
    --primary-on-secondary-color: #0073ea;
    --primary-hover-color: #0060b9;
    --primary-selected-color: #133774;
    --primary-text-color: #d5d8df;
    --text-color-on-primary: #ffffff;
    --text-color-on-inverted: #323338;
    --secondary-text-color: #9699a6;
    --placeholder-color: #c3c6d4;
    --icon-color: #c3c6d4;
    --link-color: #69a7ef;
    --primary-background-color: #181b34;
    --primary-background-hover-color: #4b4e69;
    --secondary-background-color: #30324e;
    --grey-background-color: #181b34;
    --allgrey-background-color: #30324e;
    --inverted-color-background: #ffffff;
    --disabled-text-color: rgba(213, 216, 223, var(--disabled-component-opacity));
    --disabled-background-color: #3c3f59;
    --positive-color: #258750;
    --positive-color-hover: #007038;
    --positive-color-selected: #26503e;
    --negative-color: #d83a52;
    --negative-color-hover: #b63546;
    --negative-color-selected: #642830;
    --private-color: #f65f7c;
    --shareable-color: #a25ddc;
    --ui-border-color: #797e93;
    --layout-border-color: #4b4e69;
    --box-shadow-xs: 0px 4px 6px -4px rgba(9, 11, 25, 0.5);
    --box-shadow-small: 0px 4px 8px rgba(9, 11, 25, 0.5);
    --box-shadow-medium: 0px 6px 20px rgba(9, 11, 25, 0.5);
    --box-shadow-large: 0px 15px 50px rgba(9, 11, 25, 0.5);
    --color-grass_green: #359970;
    --color-grass_green-hover: #116846;
    --color-grass_green-selected: #0f4f43;
    --color-done-green: #33d391;
    --color-done-green-hover: #0f9b63;
    --color-done-green-selected: #0e7358;
    --color-done-green-selected-with-opacity: rgba(14, 115, 88, 0.6);
    --color-bright-green: #b0dc51;
    --color-bright-green-hover: #7ca32b;
    --color-bright-green-selected: #5c7930;
    --color-saladish: #d5c567;
    --color-saladish-hover: #9d8f3e;
    --color-saladish-selected: #736a3e;
    --color-egg_yolk: #ffd533;
    --color-egg_yolk-hover: #c29e11;
    --color-egg_yolk-selected: #8D751E;
    --color-egg_yolk-rgb: 255, 213, 51;
    --color-working_orange: #fdbc64;
    --color-working_orange-hover: #c0873c;
    --color-working_orange-selected: #8c653c;
    --color-dark-orange: #ff7b4d;
    --color-dark-orange-hover: #c25531;
    --color-dark-orange-selected: #8d4134;
    --color-peach: #ffbdbd;
    --color-peach-hover: #c2888a;
    --color-peach-selected: #8d6674;
    --color-sunset: #ff9191;
    --color-sunset-hover: #c26163;
    --color-sunset-selected: #8d4a58;
    --color-sunset-selected-with-opacity: rgba(141, 74, 88, 0.6);
    --color-stuck-red: #e8697d;
    --color-stuck-red-hover: #ad3f51;
    --color-stuck-red-selected: #7f314b;
    --color-dark-red: #c95c76;
    --color-dark-red-hover: #92334c;
    --color-dark-red-selected: #6b2947;
    --color-sofia_pink: #ff44a1;
    --color-sofia_pink-hover: #c21e71;
    --color-sofia_pink-selected: #8d1a62;
    --color-lipstick: #ff7bd0;
    --color-lipstick-hover: #c24e9a;
    --color-lipstick-selected: #8d3c7f;
    --color-bubble: #fbb4f4;
    --color-bubble-hover: #be80ba;
    --color-bubble-selected: #8b6096;
    --color-purple: #b57de3;
    --color-purple-hover: #8050ab;
    --color-purple-selected: #5f3e8b;
    --color-dark_purple: #936fda;
    --color-dark_purple-hover: #6344a3;
    --color-dark_purple-selected: #4a3586;
    --color-berry: #6645a9;
    --color-berry-hover: #673971;
    --color-berry-selected: #4d2d62;
    --color-dark_indigo: #401694;
    --color-dark_indigo-hover: #3c1f78;
    --color-dark_indigo-selected: #2e1b67;
    --color-indigo: #777ae5;
    --color-indigo-hover: #4b4ead;
    --color-indigo-selected: #383c8d;
    --color-navy: #4e73a7;
    --color-navy-hover: #274776;
    --color-navy-selected: #1f3866;
    --color-bright-blue: #79affd;
    --color-bright-blue-hover: #4c7cc1;
    --color-bright-blue-selected: #395d9b;
    --color-dark-blue: #339ecd;
    --color-dark-blue-hover: #0f6d97;
    --color-dark-blue-selected: #0e527e;
    --color-aquamarine: #71d6d1;
    --color-aquamarine-hover: #469e9b;
    --color-aquamarine-selected: #357580;
    --color-chili-blue: #85d6ff;
    --color-chili-blue-hover: #569ec3;
    --color-chili-blue-selected: #41759d;
    --color-river: #86b4ca;
    --color-river-hover: #588095;
    --color-river-selected: #42607c;
    --color-winter: #aebdca;
    --color-winter-hover: #7b8895;
    --color-winter-selected: #5b667c;
    --color-explosive: #d0d0d0;
    --color-explosive-hover: #98999a;
    --color-explosive-selected: #70717f;
    --color-american_gray: #999999;
    --color-american_gray-hover: #69696a;
    --color-american_gray-selected: #4e505e;
    --color-blackish: #5c5c5c;
    --color-blackish-hover: #222222;
    --color-blackish-selected: #272937;
    --color-brown: #99756c;
    --color-brown-hover: #684943;
    --color-brown-selected: #4d3941;
    --color-orchid: #E190C0;
    --color-orchid-hover: #B4739A;
    --color-orchid-selected: #B4739A;
    --color-tan: #BDAB95;
    --color-tan-hover: #978977;
    --color-tan-selected: #716863;
    --color-sky: #B4E9F8;
    --color-sky-hover: #90BAC6;
    --color-sky-selected: #6C8A9A;
    --color-coffee: #CA9A8B;
    --color-coffee-hover: #A27B6F;
    --color-coffee-selected: #795E5D;
    --color-royal: #5591EA;
    --color-royal-hover: #4474BB;
    --color-royal-selected: #375993;
    --color-teal: #457B82;
    --color-teal-hover: #376268;
    --color-teal-selected: #2E4D58;
    --color-lavender: #CAB9FA;
    --color-lavender-hover: #A294C8;
    --color-lavender-selected: #85597B;
    --color-steel: #BACBED;
    --color-steel-hover: #95A2BE;
    --color-steel-selected: #707A95;
    --color-lilac: #B1ADC7;
    --color-lilac-hover: #8E8A9F;
    --color-lilac-selected: #6B697F;
    --color-pecan: #786565;
    --color-pecan-hover: #605151;
    --color-pecan-selected: #4A4148;
    --primary-on-secondary-color: #0073ea;
    --primary-hover-on-secondary-color: #0060b9;
    --primary-selected-color-rgb: 19, 55, 116;
    --primary-selected-on-secondary-color: #133774;
    --primary-text-on-secondary-color: #d5d8df;
    --primary-background-color-rgb: 24, 27, 52;
    --primary-background-hover-on-secondary-color: #4b4e69;
    --secondary-background-color-rgb: 48, 50, 78;
    --secondary-text-on-secondary-color: #9699a6;
    --link-on-secondary-color: #69a7ef;
    --modal-background-color: #181b34;
    --dark-background-color: #393b53;
    --dark-background-on-secondary-color: #4b4e69;
    --dialog-background-color: #30324e;
    --label-background-color: #404b69;
    --label-background-on-secondary-color: #404b69;
    --icon-on-secondary-color: #c3c6d4;
    --placeholder-color-with-opacity: rgba(195, 198, 212, 0.1);
    --placeholder-on-secondary-color: #c3c6d4;
    --ui-border-on-secondary-color: #797e93;
    --layout-border-on-secondary-color: #4b4e69;
    --disabled-background-on-secondary-color: #3c3f59;
    --disabled-text-on-secondary-color: rgba(213, 216, 223, var(--disabled-component-opacity));
    --box-shadow-mediun: 0px 6px 20px rgba(0, 0, 0, 0.2)
}

.black-app-theme {
    --primary-color: #0073ea;
    --primary-on-secondary-color: #0073ea;
    --primary-hover-color: #0060b9;
    --primary-selected-color: #133774;
    --primary-text-color: #eeeeee;
    --text-color-on-primary: #ffffff;
    --text-color-on-inverted: #111111;
    --secondary-text-color: #aaaaaa;
    --placeholder-color: #aaaaaa;
    --icon-color: #aaaaaa;
    --link-color: #69a7ef;
    --primary-background-color: #111111;
    --primary-background-hover-color: #636363;
    --secondary-background-color: #2c2c2c;
    --grey-background-color: #111111;
    --allgrey-background-color: #2c2c2c;
    --inverted-color-background: #eeeeee;
    --disabled-text-color: rgba(238, 238, 238, var(--disabled-component-opacity));
    --disabled-background-color: #3a3a3a;
    --positive-color: #258750;
    --positive-color-hover: #007038;
    --positive-color-selected: #26503e;
    --negative-color: #d83a52;
    --negative-color-hover: #b63546;
    --negative-color-selected: #642830;
    --private-color: #f65f7c;
    --shareable-color: #a25ddc;
    --ui-border-color: #8d8d8d;
    --layout-border-color: #636363;
    --box-shadow-xs: 0px 4px 6px -4px #000000;
    --box-shadow-small: 0px 4px 8px #000000;
    --box-shadow-medium: 0px 6px 20px #000000;
    --box-shadow-large: 0px 15px 50px #000000;
    --color-grass_green: #359970;
    --color-grass_green-hover: #116846;
    --color-grass_green-selected: #0a482e;
    --color-done-green: #33d391;
    --color-done-green-hover: #0f9b63;
    --color-done-green-selected: #096c43;
    --color-done-green-selected-with-opacity: rgba(9, 108, 67, 0.6);
    --color-bright-green: #b0dc51;
    --color-bright-green-hover: #7ca32b;
    --color-bright-green-selected: #56721b;
    --color-saladish: #d5c567;
    --color-saladish-hover: #9d8f3e;
    --color-saladish-selected: #6d6329;
    --color-egg_yolk: #ffd533;
    --color-egg_yolk-hover: #c29e11;
    --color-egg_yolk-selected: #886e09;
    --color-egg_yolk-rgb: 255, 213, 51;
    --color-working_orange: #fdbc64;
    --color-working_orange-hover: #c0873c;
    --color-working_orange-selected: #875e27;
    --color-dark-orange: #ff7b4d;
    --color-dark-orange-hover: #c25531;
    --color-dark-orange-selected: #883a1f;
    --color-peach: #ffbdbd;
    --color-peach-hover: #c2888a;
    --color-peach-selected: #885f5f;
    --color-sunset: #ff9191;
    --color-sunset-hover: #c26163;
    --color-sunset-selected: #884343;
    --color-sunset-selected-with-opacity: rgba(136, 67, 67, 0.6);
    --color-stuck-red: #e8697d;
    --color-stuck-red-hover: #ad3f51;
    --color-stuck-red-selected: #792a36;
    --color-dark-red: #c95c76;
    --color-dark-red-hover: #92334c;
    --color-dark-red-selected: #662232;
    --color-sofia_pink: #ff44a1;
    --color-sofia_pink-hover: #c21e71;
    --color-sofia_pink-selected: #88134d;
    --color-lipstick: #ff7bd0;
    --color-lipstick-hover: #c24e9a;
    --color-lipstick-selected: #88356a;
    --color-bubble: #fbb4f4;
    --color-bubble-hover: #be80ba;
    --color-bubble-selected: #855981;
    --color-purple: #b57de3;
    --color-purple-hover: #8050ab;
    --color-purple-selected: #593776;
    --color-dark_purple: #936fda;
    --color-dark_purple-hover: #6344a3;
    --color-dark_purple-selected: #442e71;
    --color-berry: #9862a1;
    --color-berry-hover: #673971;
    --color-berry-selected: #47264d;
    --color-dark_indigo: #6645a9;
    --color-dark_indigo-hover: #3c1f78;
    --color-dark_indigo-selected: #291452;
    --color-indigo: #777ae5;
    --color-indigo-hover: #4b4ead;
    --color-indigo-selected: #333578;
    --color-navy: #4e73a7;
    --color-navy-hover: #274776;
    --color-navy-selected: #193151;
    --color-bright-blue: #79affd;
    --color-bright-blue-hover: #4c7cc1;
    --color-bright-blue-selected: #345686;
    --color-dark-blue: #339ecd;
    --color-dark-blue-hover: #0f6d97;
    --color-dark-blue-selected: #094b69;
    --color-aquamarine: #71d6d1;
    --color-aquamarine-hover: #469e9b;
    --color-aquamarine-selected: #2f6e6b;
    --color-chili-blue: #85d6ff;
    --color-chili-blue-hover: #569ec3;
    --color-chili-blue-selected: #3b6e88;
    --color-river: #86b4ca;
    --color-river-hover: #588095;
    --color-river-selected: #3c5967;
    --color-winter: #aebdca;
    --color-winter-hover: #7b8895;
    --color-winter-selected: #555f67;
    --color-explosive: #d0d0d0;
    --color-explosive-hover: #98999a;
    --color-explosive-selected: #6a6a6a;
    --color-american_gray: #999999;
    --color-american_gray-hover: #69696a;
    --color-american_gray-selected: #494949;
    --color-blackish: #5c5c5c;
    --color-blackish-hover: #222222;
    --color-blackish-selected: #111111;
    --color-brown: #99756c;
    --color-brown-hover: #684943;
    --color-brown-selected: #48322c;
    --color-orchid: #e190c0;
    --color-orchid-hover: #b4739a;
    --color-orchid-selected: #7e516c;
    --color-tan: #bdab95;
    --color-tan-hover: #978977;
    --color-tan-selected: #6a6053;
    --color-sky: #b4e9f8;
    --color-sky-hover: #90bac6;
    --color-sky-selected: #65828b;
    --color-coffee: #ca9a8b;
    --color-coffee-hover: #a27b6f;
    --color-coffee-selected: #71564e;
    --color-royal: #5591ea;
    --color-royal-hover: #4474bb;
    --color-royal-selected: #305183;
    --color-teal: #457b82;
    --color-teal-hover: #376268;
    --color-teal-selected: #274549;
    --color-lavender: #cab9fa;
    --color-lavender-hover: #a294c8;
    --color-lavender-selected: #71688c;
    --color-steel: #bacbed;
    --color-steel-hover: #95a2be;
    --color-steel-selected: #687185;
    --color-lilac: #687185;
    --color-lilac-hover: #8e8a9f;
    --color-lilac-selected: #63616f;
    --color-pecan: #786565;
    --color-pecan-hover: #605151;
    --color-pecan-selected: #433939;
    --primary-on-secondary-color: #0073ea;
    --primary-hover-on-secondary-color: #0060b9;
    --primary-selected-color-rgb: 19, 55, 116;
    --primary-selected-on-secondary-color: #133774;
    --primary-text-on-secondary-color: #eeeeee;
    --primary-background-color-rgb: 17, 17, 17;
    --primary-background-hover-on-secondary-color: #636363;
    --secondary-background-color-rgb: 44, 44, 44;
    --secondary-text-on-secondary-color: #9699a6;
    --link-on-secondary-color: #69a7ef;
    --modal-background-color: #181b34;
    --dark-background-color: #2c2c2c;
    --dark-background-on-secondary-color: #4b4e69;
    --dialog-background-color: #2c2c2c;
    --label-background-color: #404b69;
    --label-background-on-secondary-color: #404b69;
    --icon-on-secondary-color: #aaaaaa;
    --placeholder-color-with-opacity: rgba(170, 170, 170, 0.1);
    --placeholder-on-secondary-color: #aaaaaa;
    --ui-border-on-secondary-color: #8d8d8d;
    --layout-border-on-secondary-color: #636363;
    --disabled-background-on-secondary-color: #3a3a3a;
    --disabled-text-on-secondary-color: rgba(238, 238, 238, var(--disabled-component-opacity));
    --box-shadow-mediun: 0px 6px 20px rgba(0, 0, 0, 0.2)
}

.hacker_theme-app-theme {
    --primary-color: #fe78c6;
    --primary-hover-color: #fe5ab9;
    --primary-selected-color: #9f4077;
    --primary-text-color: #d5d8df;
    --text-color-on-inverted: #323338;
    --secondary-text-color: #9699a6;
    --placeholder-color: #c3c6d4;
    --icon-color: #c3c6d4;
    --link-color: #bd93f9;
    --primary-background-color: #282a36;
    --primary-background-hover-color: #4b4e69;
    --secondary-background-color: #30324e;
    --grey-background-color: #282a36;
    --allgrey-background-color: #282a36;
    --inverted-color-background: #ffffff;
    --disabled-text-color: rgba(238, 238, 238, var(--disabled-component-opacity));
    --disabled-background-color: #3a3a3a;
    --positive-color: #50fa7b;
    --positive-color-hover: #007038;
    --positive-color-selected: #26503e;
    --negative-color: #ff5555;
    --negative-color-hover: #b63546;
    --negative-color-selected: #642830;
    --private-color: #f65f7c;
    --shareable-color: #a25ddc;
    --ui-border-color: #797e93;
    --layout-border-color: #414458;
    --box-shadow-xs: 0px 4px 6px -4px #000000;
    --box-shadow-small: 0px 4px 8px #000000;
    --box-shadow-medium: 0px 6px 20px #000000;
    --box-shadow-large: 0px 15px 50px #000000;
    --color-grass_green: #359970;
    --color-grass_green-hover: #116846;
    --color-grass_green-selected: #0a482e;
    --color-done-green: #33d391;
    --color-done-green-hover: #0f9b63;
    --color-done-green-selected: #096c43;
    --color-done-green-selected-with-opacity: rgba(9, 108, 67, 0.6);
    --color-bright-green: #b0dc51;
    --color-bright-green-hover: #7ca32b;
    --color-bright-green-selected: #56721b;
    --color-saladish: #d5c567;
    --color-saladish-hover: #9d8f3e;
    --color-saladish-selected: #6d6329;
    --color-egg_yolk: #ffd533;
    --color-egg_yolk-hover: #c29e11;
    --color-egg_yolk-selected: #886e09;
    --color-egg_yolk-rgb: 255, 213, 51;
    --color-working_orange: #fdbc64;
    --color-working_orange-hover: #c0873c;
    --color-working_orange-selected: #875e27;
    --color-dark-orange: #ff7b4d;
    --color-dark-orange-hover: #c25531;
    --color-dark-orange-selected: #883a1f;
    --color-peach: #ffbdbd;
    --color-peach-hover: #c2888a;
    --color-peach-selected: #885f5f;
    --color-sunset: #ff9191;
    --color-sunset-hover: #c26163;
    --color-sunset-selected: #884343;
    --color-sunset-selected-with-opacity: rgba(136, 67, 67, 0.6);
    --color-stuck-red: #e8697d;
    --color-stuck-red-hover: #ad3f51;
    --color-stuck-red-selected: #792a36;
    --color-dark-red: #c95c76;
    --color-dark-red-hover: #92334c;
    --color-dark-red-selected: #662232;
    --color-sofia_pink: #ff44a1;
    --color-sofia_pink-hover: #c21e71;
    --color-sofia_pink-selected: #88134d;
    --color-lipstick: #ff7bd0;
    --color-lipstick-hover: #c24e9a;
    --color-lipstick-selected: #88356a;
    --color-bubble: #fbb4f4;
    --color-bubble-hover: #be80ba;
    --color-bubble-selected: #855981;
    --color-purple: #b57de3;
    --color-purple-hover: #8050ab;
    --color-purple-selected: #593776;
    --color-dark_purple: #936fda;
    --color-dark_purple-hover: #6344a3;
    --color-dark_purple-selected: #442e71;
    --color-berry: #9862a1;
    --color-berry-hover: #673971;
    --color-berry-selected: #47264d;
    --color-dark_indigo: #6645a9;
    --color-dark_indigo-hover: #3c1f78;
    --color-dark_indigo-selected: #291452;
    --color-indigo: #777ae5;
    --color-indigo-hover: #4b4ead;
    --color-indigo-selected: #333578;
    --color-navy: #4e73a7;
    --color-navy-hover: #274776;
    --color-navy-selected: #193151;
    --color-bright-blue: #79affd;
    --color-bright-blue-hover: #4c7cc1;
    --color-bright-blue-selected: #345686;
    --color-dark-blue: #339ecd;
    --color-dark-blue-hover: #0f6d97;
    --color-dark-blue-selected: #094b69;
    --color-aquamarine: #71d6d1;
    --color-aquamarine-hover: #469e9b;
    --color-aquamarine-selected: #2f6e6b;
    --color-chili-blue: #85d6ff;
    --color-chili-blue-hover: #569ec3;
    --color-chili-blue-selected: #3b6e88;
    --color-river: #86b4ca;
    --color-river-hover: #588095;
    --color-river-selected: #3c5967;
    --color-winter: #aebdca;
    --color-winter-hover: #7b8895;
    --color-winter-selected: #555f67;
    --color-explosive: #d0d0d0;
    --color-explosive-hover: #98999a;
    --color-explosive-selected: #6a6a6a;
    --color-american_gray: #999999;
    --color-american_gray-hover: #69696a;
    --color-american_gray-selected: #494949;
    --color-blackish: #5c5c5c;
    --color-blackish-hover: #222222;
    --color-blackish-selected: #111111;
    --color-brown: #99756c;
    --color-brown-hover: #684943;
    --color-brown-selected: #48322c;
    --color-orchid: #e190c0;
    --color-orchid-hover: #b4739a;
    --color-orchid-selected: #7e516c;
    --color-tan: #bdab95;
    --color-tan-hover: #978977;
    --color-tan-selected: #6a6053;
    --color-sky: #b4e9f8;
    --color-sky-hover: #90bac6;
    --color-sky-selected: #65828b;
    --color-coffee: #ca9a8b;
    --color-coffee-hover: #a27b6f;
    --color-coffee-selected: #71564e;
    --color-royal: #5591ea;
    --color-royal-hover: #4474bb;
    --color-royal-selected: #305183;
    --color-teal: #457b82;
    --color-teal-hover: #376268;
    --color-teal-selected: #274549;
    --color-lavender: #cab9fa;
    --color-lavender-hover: #a294c8;
    --color-lavender-selected: #71688c;
    --color-steel: #bacbed;
    --color-steel-hover: #95a2be;
    --color-steel-selected: #687185;
    --color-lilac: #687185;
    --color-lilac-hover: #8e8a9f;
    --color-lilac-selected: #63616f;
    --color-pecan: #786565;
    --color-pecan-hover: #605151;
    --color-pecan-selected: #433939;
    --color-success: #50fa7b;
    --color-error: #ff5555;
    --primary-on-secondary-color: #fe78c6;
    --primary-hover-on-secondary-color: #fe5ab9;
    --primary-selected-color-rgb: 159, 64, 119;
    --primary-selected-on-secondary-color: #9f4077;
    --primary-text-on-secondary-color: #d5d8df;
    --primary-background-color-rgb: 40, 42, 54;
    --primary-background-hover-on-secondary-color: #4b4e69;
    --secondary-background-color-rgb: 48, 50, 78;
    --secondary-text-on-secondary-color: #9699a6;
    --link-on-secondary-color: #bd93f9;
    --modal-background-color: #282a36;
    --dark-background-color: #303241;
    --dark-background-on-secondary-color: #595959;
    --dialog-background-color: #30324e;
    --label-background-color: #404b69;
    --label-background-on-secondary-color: #404b69;
    --icon-on-secondary-color: #c3c6d4;
    --placeholder-color-with-opacity: rgba(195, 198, 212, 0.1);
    --placeholder-on-secondary-color: #c3c6d4;
    --ui-border-on-secondary-color: #797e93;
    --layout-border-on-secondary-color: #414458;
    --disabled-background-on-secondary-color: #3a3a3a;
    --disabled-text-on-secondary-color: rgba(238, 238, 238, var(--disabled-component-opacity));
    --box-shadow-mediun: 0px 6px 20px rgba(0, 0, 0, 0.2)
}
    .p-dialog:not(.p-dialog-top-maximized) {
        width: calc(100% - 70px) !important;
        min-height: calc(100%) !important;
        border-radius: 0px !important;
        left: 66px !important;
        filter: none !important;
        box-shadow: none !important;
    }

    .p-dialog.p-dialog-top-maximized {
       z-index: 1000000 !important;
    }

    .x-tool-minimize {
        display: none !important;
    }
    .x-tool-maximize {
        display: none !important;
    }

    .p-sidebar-left .p-sidebar {
        width: 660px;
        left: 66px;
    }

    .p-sidebar {
        background:rgb(51, 51, 51);
    }
`)

const getTypedView = (type: string) => {
    if (type === 'divider') {
        return HDivider().height(1).marginBottom('12px').background('#676879');
    } else if (type === 'spacer') {
        return Spacer()
    }
}

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

RealmBrokerClient.Login('admin', 'admin')
    .then(sessionId => {
        StateService.SetSessionId(sessionId);
    })

const desktopService = container.resolve<IDesktopService>(ControlTypes.IDesktopService);
class AppInfo {

    private Loading: boolean;
    private ApplicationType: any;

    constructor(public controller: UIController, public app: any, info: any) {

    }

    public StartApplication() {
        debugger;
        if (!this.Loading) {
            this.controller.IsLoading = this.Loading = true;
            if (this.ApplicationType != null) {
                setTimeout(() =>
                    TaskManager.Start(this.ApplicationType).then(app => {
                        this.controller.IsLoading = this.Loading = false;
                        gaEvent('Application', 'Start', this.app.text);
                        (window as any).ga('send', 'pageview', this.app.text);
                    }), 10);
            } else {
                const deskService = container.resolve<IDesktopService>(ControlTypes.IDesktopService);;
                deskService.LoadApp(this.app.name).then(appType => {
                    if (appType.application) {
                        setTimeout(() =>
                            TaskManager.Start(appType.application).then(app => {
                                this.controller.IsLoading = this.Loading = false;

                                //doing cache
                                const caching = false;
                                if (caching) {
                                    this.ApplicationType = appType.application;
                                } else {
                                    delete (ModuleLoader as any).librariesHeaders[this.app.name];
                                    delete (ModuleLoader as any).librariesUrls[this.app.name];
                                }

                                gaEvent('Application', 'Start', this.app.text);
                                (window as any).ga('send', 'pageview', this.app.text);
                            }), 10);

                    } else {
                        setTimeout(() =>
                            TaskManager.Start(appType).then(app => {
                                this.controller.IsLoading = this.Loading = false;

                                //doing cache
                                const caching = false;
                                if (caching) {
                                    this.ApplicationType = appType;
                                } else {
                                    delete (ModuleLoader as any).librariesHeaders[this.app.name];
                                    delete (ModuleLoader as any).librariesUrls[this.app.name];
                                }

                                gaEvent('Application', 'Start', this.app.text);
                                (window as any).ga('send', 'pageview', this.app.text);
                            }), 10);
                    }
                });
            }
        }
    }
}

export class DesktopController extends UIController {

    @State()
    private showSideBar: boolean;

    @State()
    private showSideBar1: boolean;

    @State()
    private manifests: any[];

    @State()
    private menu: any[];

    @State()
    private IsLoading: boolean;

    @State()
    private showHomeView: boolean;

    @State()
    private logo: string;

    protected InitController() {

        this.showHomeView = true;

        WebFont.load({
            google: {
                families: ['Manrope:400,500,600,700', 'sans serif']
            }
        });

        this.manifests = [];
        const desk = desktopService;
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
                                    this.manifests = [...this.manifests, new AppInfo(this, app, _app.application)]


                                }

                            } else {
                            }
                        });

                    } else {
                        this.manifests = [...this.manifests, new AppInfo(this, app, null)]
                    }
                });
                //});

                console.log(this.manifests)

                this.menu = [
                    {
                        name: 'Home',
                        view: () => (
                            UIImage(MainLogo).width(40).height(40).marginBottom('8px').paddingTop('10px')
                        ),
                        onClick: () => {
                            this.showHomeView = true;
                           
                        }
                    },
                    {
                        type: 'divider'
                    },
                    {
                        name: 'Workarea',
                        view: () => (
                            DynamicView(svgElement)

                        ),
                        onClick: () => {
                            this.showHomeView = false;
                            this.manifests.find(manifest => manifest.app.name === 'com.tuvalsoft.spreadsheet')?.StartApplication()
                        }
                    },
                    {
                        name: '1',
                        view: () => (
                            DynamicView(notifyElement)

                        )
                    },
                    {
                        name: '2',
                        view: () => (
                            DynamicView(boxElement)

                        )
                    },
                    {
                        name: '3',
                        view: () => (
                            DynamicView(myTaskElement)

                        )
                    },
                    {
                        name: '4',
                        view: () => (
                            DynamicView(myFavoritesElement)

                        )
                    },
                    {
                        name: '5',
                        type: 'spacer'
                    },
                    {
                        name: '6',
                        view: () => (
                            DynamicView(applicationsElement)

                        ),
                        onClick: () => AppCenterControllerDialog.Show()
                    },
                    {
                        name: '7',
                        view: () => (
                            DynamicView(invitePeopleElement)

                        )
                    },
                    {
                        name: '8',
                        view: () => (
                            DynamicView(searchElement)

                        )
                    },
                    {
                        name: '9',
                        view: () => (
                            DynamicView(helpElement)

                        )
                    },
                    {
                        type: 'divider'
                    },
                    {
                        name: '10',
                        view: () => (
                            DynamicView(myProducts)

                        ),
                        onClick: () => this.showSideBar = !this.showSideBar
                    },
                    {
                        name: '11',
                        view: () => (
                            UIImage(accountImage).width(44).height(44).imageBorder('2px solid white')

                        )
                    }
                ]

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
                            this.manifests = [...this.manifests, new AppInfo(this, e.app, null)]


                        }
                    } else {
                        this.manifests = [...this.manifests, new AppInfo(this, e.app, null)]
                    }
                });
            });
        }

        RealmBrokerClient.GetRealmInfos('fgfgd').then(info => {
            this.logo = info['LOGIN_LOGO'];
        })

        setTimeout(() => console.log(this.manifests), 1000)

    }

    private renderHomeView() {
        return (
            HomeView()
        )
    }
    private renderDesktop() {

    }
    public override LoadView() {
        return (
            HStack({ alignment: cTopLeading })(
                LeftSidemenu(this.menu ?? [])/* .onClick(()=> this.showSideBar = true) */,
                this.showHomeView ? this.renderHomeView() : null,
                    UIDesktop().width(0).height(0),

                UISidebar({ position: "left" })(
                    VStack({ alignment: cLeading, spacing: 10 })(
                        HStack(
                            TextField().placeholder('Search Apps...').fontSize(24).backgroundColor('rgb(51,51,51)').foregroundColor(Color.white),
                        )
                            .borderBottom('3px solid rgba(255,255,255,.3)').height(60).padding(5),

                        HStack({ alignment: cLeading, spacing: 10 })(
                            ...ForEach(this.manifests)((item: AppInfo) =>
                                VStack({ alignment: cTop })(
                                    HStack({ alignment: cLeading })(
                                        UIImage(item.app.icon).width(64).height(64)/* .filter('drop-shadow(3px 5px 4px rgb(0, 0, 0, 30%))')*/.cornerRadius(6),
                                        //Text(item.app.text).fontSize(14).whiteSpace('nowrap').foregroundColor(Color.white)
                                    )
                                        .margin(10)
                                        .background('rgba(255,255,255,.1)')
                                        .paddingLeft('10px')
                                        .cornerRadius(10)
                                        .transition('all .7s ease-in-out')
                                        .background({ hover: '#f5f5f5' })
                                        .height(80)
                                        .width(80)
                                        .overflow('hidden')
                                        .cursor('pointer')
                                        .onClick(() => {
                                            this.showSideBar = false;
                                            item.StartApplication()
                                        }),
                                    Text(item.app.text).fontSize(14).foregroundColor(Color.white)
                                ).height(150)
                                    .width(90)
                            )
                        ).wrap('wrap')
                    ).height()
                ).visible(this.showSideBar).onHide(() => this.showSideBar = false),
            ).background('#f6f7fb')
        )
    }
}