import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  base_url='https://analyticssteps.com/backend/api/';
  media_url='https://analyticssteps.com';
  ws_url = "wss://analyticssteps.com/read-percentage/"

  // ws_url = "ws://192.168.1.21:8000/read-percentage/"
  // base_url='http://192.168.1.21:8000/backend/api/';
  // media_url='http://192.168.1.21:8000/';

  // base_url='http://192.168.1.28:8005/backend/api/';
  // media_url='http://192.168.1.28:8005';

  // base_url='http://13.235.204.31/backend/api/';
  // media_url='http://13.235.204.31';
  version = "v1"
  constructor(public _http:HttpClient) { }


  httpOption = {
    headers: new HttpHeaders({

  // "Access-Control-Allow-Origin": "*",
// "Access-Control-Allow-Headers": "Content-Type",

// 'Access-Control-Allow-Methods' :'GET, POST, OPTIONS',
      // 'Content-Type': 'application/json'
    })
  }
  httpOption_file = {
    headers: new HttpHeaders({
         'enctype':'multipart/form-data',
         'Charset':'utf-8',
    })
  }

  // httpOption_token = {
  //   headers: new HttpHeaders({
  //        'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJuYW1lIjoic2FkYXNkYXNkIGFzZGFzZHl0YXNkYXNkcyIsInRva2VuX3R5cGUiOiJhY2Nlc3MiLCJpc19hY3RpdmUiOjEsImdsb2JhbF9sb2dpbl90b2tlbiI6dHJ1ZSwiZW1haWwiOiJuaXJhai5rdW1hckBjb2RlZmxvd3RlY2guY29tIiwianRpIjoiMmM5MTRjM2JjZDBkNDA2OTk4MTg2NjlmZjg0ZDBkNDAiLCJleHAiOjE1Njk3MzUxNTN9.j7tOnJnQQHZU707FzXdTPYH1rnhvEgka5sUmEJFKsWc',

  //   })
  // }


  getFeatured_blog(){
    return this._http.get(this.getVerion_url() +'/featured-blog/', this.httpOption);
  }
  getNews(){
      return this._http.get(this.getVerion_url() + '/news/', this.httpOption)
  }

  getTestimonial(){
    return this._http.get(this.getVerion_url() + '/testimonials/', this.httpOption)
  }

login(data){
  return this._http.post(this.getVerion_url()+'/auth/login/', data,this.httpOption)
}
register(data){
  return this._http.post(this.getVerion_url()+'/auth/registration/', data,this.httpOption)
}





/*------  blog -------- */
blog_feature(count){
  return this._http.get(this.getVerion_url() + '/featured-blog/?limit=' + count, this.httpOption)
}
blog_latest(count){
   return this._http.get(this.getVerion_url() + '/latest-blog/?limit='+ count, this.httpOption)
}
blog_popular(count){
   return this._http.get(this.getVerion_url() + '/popular-blog/?limit='+count, this.httpOption)
}
blog_cat(){
  return this._http.get(this.getVerion_url() + '/blog-categories/', this.httpOption)
}

blog_cat_slug(url){
  return this._http.get(this.getVerion_url() + '/blog-category-detail/'+url, this.httpOption)
}
blog_user_profile(username){
  return this._http.get(this.getVerion_url() + '/user-blog-profile/'+username, this.httpOption)
}
blog_request(data){
  return this._http.post(this.getVerion_url()+'/blog-request/',data, this.httpOption_file)
}
blog_detail(url){
  return this._http.post(this.getVerion_url() + '/blog-detail/',url, this.httpOption)
}
blog_detail_seo(url){
  return this._http.post(this.getVerion_url() + '/social-blog/',url, this.httpOption)
}

blog_comment(data){
  return this._http.post(this.getVerion_url()+'/comment-create/',data, this.httpOption)
}
blog_comment_list(url){
  //return this._http.post(this.getVerion_url() + '/blog-comments/'+url+'/', this.httpOption)
  return this._http.post(this.getVerion_url() + '/blog-comments/', url ,this.httpOption)
}
blog_like(data){
  return this._http.post(this.getVerion_url()+'/blog-like/',data, this.httpOption)
}
comment_like(data){
  return this._http.post(this.getVerion_url()+'/comment-like/',data, this.httpOption)
}
blog_search(data){
  return this._http.get(this.getVerion_url() + '/blog-search/?search='+data, this.httpOption)
}

blogReadUpdate(slug){
  return this._http.get(this.getVerion_url() + '/update-read/'+slug, this.httpOption)
}
/*------ End blog -------- */

get_news(){
  return this._http.get(this.getVerion_url() + '/news/', this.httpOption)
}

/**Career starts here */
getJobs(){
  return this._http.get(this.getVerion_url() + '/job-openings/', this.httpOption)
}
careerForm(data){
  return this._http.post(this.getVerion_url() + '/career-form/', data, this.httpOption_file)
}
/** Career Ends here */

/** Blog profile */
getAuthorprofile(username){
  return this._http.get(this.getVerion_url() + '/user-blog-profile/' + username, this.httpOption)
}

/**End of Blog profile */

/**Set reading Percentage of Blog */
userReadBlog(){
  return this._http.get(this.getVerion_url() + '/user-read-blog/',  this.httpOption)
}

/**End reading Percentage of Blog */

/**Update profile */
updateProfile(data){
 // console.log(data)
 return this._http.post(this.getVerion_url() + '/auth/update-profile/', data, this.httpOption_file)
}

updateProfilePic(data){
  return this._http.post(this.getVerion_url() + '/auth/update-profile-pic/', data, this.httpOption_file)
}
/**End of update profile */

/**News Letter Subscription */
newsLetterSubscribe(data){
  return this._http.post(this.getVerion_url() + '/newsletter-subscription-create/', data, this.httpOption)
}

/**News Letter Subscription */

getVerion_url(){
  return this.base_url + this.version;
}

getMedia_url(){
  return this.media_url;
}
}
