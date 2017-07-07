import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, Events} from 'ionic-angular';
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

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private auth: AuthProvider, private events: Events) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            {title: 'Home', component: HomePage, pageName: 'HomePage', iconName: 'ios-home'},
            {title: 'Sign Out', component: '', pageName: '', iconName: 'ios-log-out-outline'}
        ];

        //check auth
        this.auth.isAuthenticated().then((result) => {
            this.rootPage = HomePage;
            this.resetMenu();

        }, (error) => {
            this.rootPage = LoginPage;
        });

        this.events.subscribe('user:signin', () => {
            this.resetMenu();
        })
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
                    this.rootPage = LoginPage;
                });
            }else {
                this.nav.setRoot(page.pageName);
            }
        }else {
            this.nav.setRoot(page.component);
        }
    }

    private resetMenu() {
        this.auth.getUser().then((user) => {
            if (user['level'] == 7) {
                this.pages = [
                    {title: 'Home', component: HomePage, pageName: 'HomePage', iconName: 'ios-home'},
                    {title: 'Building List', component: '', pageName: 'BuildingListPage', iconName: 'ios-reorder'},
                    {title: 'Maintenance', component: '', pageName: 'MaintenanceViewPage', iconName: 'ios-thunderstorm'},
                    {title: 'Sign Out', component: '', pageName: '', iconName: 'ios-log-out-outline'}
                ];
            }else if (user['level'] == 4) {
                if (user['can_maintenance']) {
                    this.pages = [
                        {title: 'Home', component: HomePage, pageName: 'HomePage', iconName: 'ios-home'},
                        {title: 'Maintenance', component: '', pageName: 'MaintenanceViewPage', iconName: 'ios-thunderstorm'},
                        {title: 'Sign Out', component: '', pageName: '', iconName: 'ios-log-out-outline'}
                    ];
                }
            }else if (user['level'] == 3.2) {
                this.pages = [
                    {title: 'Home', component: HomePage, pageName: 'HomePage', iconName: 'ios-home'},
                    {title: 'Maintenance', component: '', pageName: 'MaintenanceViewPage', iconName: 'ios-thunderstorm'},
                    {title: 'Sign Out', component: '', pageName: '', iconName: 'ios-log-out-outline'}
                ];
            }
        })
    }
}
