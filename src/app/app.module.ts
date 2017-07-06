import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AuthProvider} from '../providers/auth/auth';
import {HttpModule} from '@angular/http';
import {IonicStorageModule} from '@ionic/storage';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {CommonProvider} from '../providers/common/common';
import { BuildingProvider } from '../providers/building/building';

export const firebaseConfig = {
    apiKey: "AIzaSyBBzf4gxU2tEkE7S7myNCrxXxtOgQX2XWs",
    authDomain: "wtcb-9eee6.firebaseapp.com",
    databaseURL: "https://wtcb-9eee6.firebaseio.com",
    projectId: "wtcb-9eee6",
    storageBucket: "wtcb-9eee6.appspot.com",
    messagingSenderId: "554352493400"
};

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        LoginPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        HttpModule,
        IonicStorageModule.forRoot(),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        LoginPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AuthProvider,
        CommonProvider,
    BuildingProvider
    ]
})
export class AppModule {
}
