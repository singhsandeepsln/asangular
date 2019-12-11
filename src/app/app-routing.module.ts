import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { BlogHomeComponent } from './blog/blog-home/blog-home.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { BlogWriteComponent } from './blog/blog-write/blog-write.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { CareerComponent } from './career/career.component';
import { AuthorComponent } from './author/author.component';
//import { createComponent } from '@angular/compiler/src/core';
import { CreateprofileComponent } from './userprofile/createprofile/createprofile.component';
import { UserProfileComponent } from './userprofile/user-profile/user-profile.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ProfileComponent } from './userprofile/profile/profile.component';
import { TermsUseComponent } from './terms-use/terms-use.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { PasswordChangeComponent } from './user/password-change/password-change.component';
import { PasswordForgetComponent } from './user/password-forget/password-forget.component';
import { PasswordResetComponent } from './user/password-reset/password-reset.component';
import { SocialComponent } from './user/social/social.component';
import { AuthGuard } from './auth.guard';
import { Error404Component } from './error/error404/error404.component';
import { Error403Component } from './error/error403/error403.component';
import { Error500Component } from './error/error500/error500.component';


const routes: Routes = [
  {path:'home', component:HomeComponent},

  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'change-password', component:PasswordChangeComponent,canActivate:[AuthGuard]},
  {path:'forget-password', component:PasswordForgetComponent},
  {path:'reset-password', component:PasswordResetComponent},
  {path:'social-login',component:SocialComponent},
 

  {path:'news', component:NewsPageComponent},
  {path:'categories',component:CategoryPageComponent},
  {path:'about-us', component:AboutPageComponent},

  {path:'blogs', component:BlogHomeComponent},
  {path:'write-blog',component:BlogWriteComponent},
  {path:'blogs/:id',component:BlogDetailComponent},

  {path:'career', component:CareerComponent},
  {path:'author/:id', component:AuthorComponent, },
  {path:'create-profile', component:CreateprofileComponent,canActivate:[AuthGuard]},
  {path:'user-profile', component:UserProfileComponent,canActivate:[AuthGuard]},
  {path:'profile', component:ProfileComponent, canActivate:[AuthGuard]},

  {path:'terms-of-use', component:TermsUseComponent},
  {path:'privacy-policy', component:PrivacyPolicyComponent},

  {path: '404',  component: Error404Component},
  {path: '403',  component: Error403Component},
  {path: '500',  component: Error500Component},
  

  {path:'', component:HomeComponent, pathMatch:'full'},
  {path: '**', redirectTo:  '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
