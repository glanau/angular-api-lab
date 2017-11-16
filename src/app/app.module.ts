import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AuthGuard} from './_guard/index';
import {AuthInterceptor} from './auth/auth.interceptor';
import {AuthService} from './auth/auth.service';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {PostComponent} from './post/post.component';
import {PostRepository} from './post/post-repository.service';
import {AuthComponent} from './auth/auth.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PostComponent,
        AuthComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        AuthGuard,
        AuthService,
        PostRepository
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
