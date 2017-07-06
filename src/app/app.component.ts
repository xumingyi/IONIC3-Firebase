import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {AuthProvider} from '../providers/auth/auth';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;

    pages: Array<{ title: string, component: any, pageName: string, iconName: string }>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private auth: AuthProvider) {
        this.initializeApp();

        //check auth
        this.auth.isAuthenticated().then((result) => {
            this.rootPage = HomePage;
        }, (error) => {
            this.rootPage = LoginPage;
        });

        // used for an example of ngFor and navigation
        this.pages = [
            {title: 'Home', component: HomePage, pageName: 'HomePage', iconName: 'ios-home'},
            {title: 'Building List', component: '', pageName: 'BuildingListPage', iconName: 'ios-reorder'},
            {title: 'Sign Out', component: '', pageName: '', iconName: 'ios-log-out-outline'}
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        if (page.component == '') {
            if (page.pageName == '') {
                this.auth.logout().then(() => {
                    this.nav.setRoot('LoginPage');
                });
            }else {
                this.nav.setRoot(page.pageName);
            }
        }else {
            this.nav.setRoot(page.component);
        }
    }
}
