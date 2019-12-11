import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS,  } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './include/header/header.component';
import { HomeComponent } from './home/home.component';
import {NgbModule, NgbToastModule} from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './include/footer/footer.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { MainServiceService } from './service/main-service.service';
import { FeaturedblogComponent } from './featuredblog/featuredblog.component';
import { NewsComponent } from './news/news.component';
import { ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { AuthLoginService } from './service/auth.service';
import { TestimonialComponent } from './testimonial/testimonial.component';

import { CookieModule } from 'ngx-cookie';
import { BlogHomeComponent } from './blog/blog-home/blog-home.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { BlogWriteComponent } from './blog/blog-write/blog-write.component';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

import { CategoryPageComponent } from './category-page/category-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { CareerComponent } from './career/career.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AuthorComponent } from './author/author.component';
import { CreateprofileComponent } from './userprofile/createprofile/createprofile.component';
import { UserProfileComponent } from './userprofile/user-profile/user-profile.component';
import {WINDOW_PROVIDERS} from "./service/window.service";
import { LoaderSmallComponent } from './include/loader-small/loader-small.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { TermsUseComponent } from './terms-use/terms-use.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { PasswordChangeComponent } from './user/password-change/password-change.component';
import { PasswordForgetComponent } from './user/password-forget/password-forget.component';
import { PasswordResetComponent } from './user/password-reset/password-reset.component';
import { ProfileComponent } from './userprofile/profile/profile.component';
import { SocialComponent } from './user/social/social.component';
import { LoginPopupComponent } from './user/login-popup/login-popup.component';
import { Error404Component } from './error/error404/error404.component';
import { Error500Component } from './error/error500/error500.component';
import { Error403Component } from './error/error403/error403.component';
import { ScrollEventModule } from 'ngx-scroll-event';




let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("185382870222-p1jilu2lciv65654vjt4tg7s53lu2287.apps.googleusercontent.com")
  }
]);

export function provideConfig() {
  return config;
}




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    FeaturedblogComponent,
    NewsComponent,
    TestimonialComponent,
    NewsComponent,
    BlogHomeComponent,
    NewsPageComponent,
    BlogWriteComponent,
    CategoryPageComponent,
    BlogDetailComponent,
    CareerComponent,
    AuthorComponent,
    CreateprofileComponent,
    UserProfileComponent,
    LoaderSmallComponent,
    AboutPageComponent,
    TermsUseComponent,
    PrivacyPolicyComponent,
    PasswordChangeComponent,
    PasswordForgetComponent,
    PasswordResetComponent,
    ProfileComponent,
    LoginPopupComponent,
    SocialComponent,
    Error404Component,
    Error500Component,
    Error403Component,

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    CarouselModule ,
    CookieModule.forRoot(),
    SocialLoginModule,
    NgxPaginationModule,
    ScrollEventModule,
    ToastrModule.forRoot({timeOut: 5000}),

  ],

  providers: [
    MainServiceService,AuthLoginService,AuthGuard,WINDOW_PROVIDERS,
    {provide:HTTP_INTERCEPTORS, useClass:TokenInterceptorService, multi:true},
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
