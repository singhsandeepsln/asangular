import { Component, OnInit, HostListener, Inject, AfterViewInit, OnDestroy } from '@angular/core';
import { MainServiceService } from 'src/app/service/main-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { empty } from 'rxjs';
import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { DOCUMENT, } from '@angular/common';
import { WINDOW } from "../../service/window.service";
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie';
import { AuthLoginService } from 'src/app/service/auth.service';
import { HeaderService } from 'src/app/service/header.service';
import { ToastrService } from 'ngx-toastr';
import { ScrollEvent } from 'ngx-scroll-event';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { all } from 'q';
import { WebSocketSubject } from 'rxjs/webSocket';
import { tokenName } from '@angular/compiler';
declare var $:any;

export class Message {
  constructor(
    public command: string,
    public blog_id: string,
    public percent_read: string,
    public token = ""
  ) { }
}

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css', '../../../assets/css/blog.css']
})
export class BlogDetailComponent implements OnInit, OnDestroy {
  blog_Data: any = [];
  media_url;

  tranding_blog_data: any = [];
  latest_blog_data: any = [];
  author_detail_data: any = [];
  author_detail_prof_data: any = [];
  offset = 0;
  offset_value_div: any;
  height_of_dom: any;
  scrollValue = [];
  scrolledValue: any;
  value_inPercent: any;
  percent_roundOf = 0;
  percentage_read: any;
  cur_per_read:any;
  blog_comnt_count: number;


  comment_data: any = [];
  Blog_Comment_Form: FormGroup;
  myHtml: string = '';
  // appendedHtml: string = '<div><b>this appended html</b></div>';
  public show: boolean = false;
  showBtn = -1;
  click_id;
  public browserRefresh: boolean;
  loader_post_cmnt: boolean = false;
  /*------ login */
  private modalRef: NgbModalRef;
  loader: boolean = true;
  loginForm: FormGroup;
  registerForm: FormGroup;
  get_comment;
  blog_like_count: number = 0;
  blog_like_unlike;
  user_prof_pic;
  isLogged: boolean;
  loader_register: boolean = false;
  private socket$: WebSocketSubject<Message>;
  blog_id:any;

  title = 'Analytics Steps | Blog Details';
  constructor(private toastr: ToastrService, private header_service: HeaderService, private title_ser: Title, private _meta: Meta, private _main: MainServiceService, private fb: FormBuilder, private _route: ActivatedRoute, @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window, private cookie: CookieService, private modalService: NgbModal, private auth_Serv: AuthLoginService, private router: Router) {
    let check: any = this.cookie.get('login')
    this.isLogged = check
    this.media_url = this._main.media_url;

    // user profile subjetc
    this.header_service.social_pop_up_close.subscribe(data => {
      //   console.log(data)
      this.modalRef.close();
      let check_user: any = this.cookie.get('login')
      this.isLogged = check_user
    })


  }

  @HostListener("window:scroll")

  onWindowScroll() {

    var lastScrollTop = this.document.body.scrollTop;
    this.offset = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    this.offset_value_div = this.document.getElementById('reading_percent').offsetTop;
    // console.log(this.offset_value_div)
    //console.log(this.offset);
    this.height_of_dom = this.document.getElementById('dom_height').clientHeight;
    this.scrollValue.push(this.offset)
    //console.log(this.scrollValue)
    this.scrolledValue = this.scrollValue.length - 1
    //console.log(this.scrolledValue)
    // console.log(this.scrollValue[this.scrolledValue])

    this.value_inPercent = this.scrollValue[this.scrolledValue] / this.height_of_dom * (100)
    //console.log(Math.round(this.value_inPercent) + '%')
    this.percent_roundOf = Math.round(this.value_inPercent)

  }

  scroll_get(el: HTMLElement) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }


  ngOnDestroy() {
    if (this.modalRef) {
      this.modalRef.close()
    }

    this.cookie.remove('per')

  }

  ngOnInit() {

     this.cookie.put('per', '0')

  //  this._meta.updateTag({property: 'og:image', content:this.media_url +this._route.snapshot.params['id']+'.jpg'});


    //console.log(check_usr)
   //this.isLogged=this.cookie.get('login')
  let check_usr:any=this.cookie.get('login')
    this.isLogged=check_usr;

   // set tittle in top header
  this._route.params.subscribe(val=>{

  // let  anotherString = someString.replace(/-/g, ' ');
      // each word caps
      // const toTitleCase = (phrase) => {

      //     return phrase
      //     .replace(/-/g, ' ')
      //       .toLowerCase()
      //       .split(' ')
      //       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      //       .join(' ');
      //   };
      //   let  page_title =toTitleCase(this._route.snapshot.params['id']); ;

   // this.title_ser.setTitle( page_title + ' | Analytics Steps ');

    this._meta.updateTag({property: 'og:url', content: 'https://analyticssteps.com/blogs/'+this._route.snapshot.params['id']});
    

        //  ------- twitter start -------------------   -----

    this._meta.updateTag({property: 'twitter:card', content: 'summary'});
    this._meta.updateTag({property: 'twitter:site', content: 'AnalyticsSteps'});
    this._meta.updateTag({property: 'twitter:creator', content: 'AnalyticsSteps'});
    this._meta.updateTag({property: 'twitter:site', content: 'AnalyticsSteps'});

  
    this._meta.updateTag({property: 'twitter:domain', content: 'https://analyticssteps.com'});

    this.blog_like_count=0
    this.cookie.put('blog_slug',this._route.snapshot.params['id'])
    let blog_ul={blog_slug:this._route.snapshot.params['id']}
    this._main.blog_detail_seo(blog_ul)
    .subscribe(data=>{
  //    console.log(data)
      let res:any=data;
      this.title_ser.setTitle(res.data.meta_title);

      this._meta.updateTag({property: 'og:title', content: res.data.meta_title });
      this._meta.updateTag({property: 'twitter:title', content: res.data.meta_title });

      this._meta.updateTag({property: 'og:description', content: res.data.meta_description });
      this._meta.updateTag({property: 'twitter:description', content: res.data.meta_description });

      this._meta.updateTag({property: 'og:image', content:this.media_url+res.data.thumbnail});
      this._meta.updateTag({property: 'twitter:image', content:this.media_url+res.data.thumbnail});

    //  this._meta.updateTag({property: 'og:image', content:this.media_url +res.data.thumbnail});
      this._meta.updateTag({property: 'keywords', content:res.data.meta_keywords});

    },(err=>{
      if(err.status==500){ this.router.navigateByUrl('/404');}
      console.log('not next api hit')
      return;
    }));


 // login form
 this.loginForm=this.fb.group({
  username:['',[Validators.required]],
  password:['',[Validators.required]]
})

// regsiter form
this.registerForm=this.fb.group({
  name :['',[Validators.required]],
  username :['',[Validators.required]],
  email :['',[Validators.required]],
  mobile:['',[Validators.required]],
  password :['',[Validators.required]],
  confirm_password :['',[Validators.required]],
});
// e nd form

//  comment form
    this.Blog_Comment_Form=this.fb.group({
      comment:['',[Validators.required]]
    })

    this.blog_comment()
  // console.log(val)
  //let blog_ul={blog_slug:this._route.snapshot.params['id']}
    this._main.blog_detail(blog_ul)
    .subscribe(data=>{
      let res:any=data;
    // console.log(res)
      this.blog_Data=res.data;
      this.blog_like_count=this.blog_Data.total_likes;
      this.blog_like_unlike=this.blog_Data.is_liked;
      this.blog_comnt_count=this.blog_Data.total_comment;
      if(res.status==200){
        this.loader=false;
        // this.title_ser.setTitle(this.blog_Data.meta_title)
        // this._meta.addTag({property: 'og:image', content:this.media_url +this.blog_Data.thumbnail});

      }
     // console.log(this.blog_Data)
      this.author_detail_data=res.data.author_detail;
      this.author_detail_prof_data=res.data.author_detail.profile;
     this.percentage_read=res.percentage_read;

     if (this.percentage_read == null){
       this.percentage_read = 0
     }
     this.cookie.put('per', this.percentage_read)
     const token = this.cookie.get('token')
     this.blog_id = this.blog_Data.id;
     if(token!=undefined){
       this.connect_to_ws(token)
     }
    //  console.log(res.percentage_read)
    //  console.log(this.comment_data)
    },(err=>{
      //console.log(err)
      if(err.status==500){ this.router.navigateByUrl('/404');}
      this.loader=true;
    }))// blog details end

//  console.log(this.cookie.get('login'))
   if(this.cookie.get('login')=='true'){

    //  console.log('log')
    // this._main.blogReadUpdate(this._route.snapshot.params['id'])
    //   .subscribe(
    //   (data)=>{/*console.log(data)*/}
    //   )

      this.usser_detail();
   }  // end user chcek login or not login here



  })




    // Trending blog
    this._main.blog_popular('10')
      .subscribe(data => {
        // console.log(data);
        let res: any = data;
        this.tranding_blog_data = res.data;
      })


      this._main.blog_latest('6')
      .subscribe(data => {
        // console.log(data);
        let res: any = data;
        this.latest_blog_data = res.data;
      })



  } // ng onit end

  checkSignUp(isLogged) {
    this.toastr.clear();
    if (isLogged === 'false') {
      this.router.navigate(['/register'])
    }
    else if (isLogged === 'true') {
      //alert('true')
      this.toastr.success('You are already logged in')

    }
  }

  // public loadScript(url: string) {
  //   let body = <HTMLDivElement>document.body;
  //   let script = document.createElement('script');
  //   script.innerHTML = '';
  //   script.src = '../../../assets/js/blog_scroll.js';
  //   script.async = false;
  //   script.defer = true;
  //   document.getElementById('xx').appendChild(script);
  //   //body.appendChild(script);
  // }


  blog_comment() {
    //  console.log(this._route.snapshot.params['id']);
    let slug_url = { slug: this._route.snapshot.params['id'] }
    this._main.blog_comment_list(slug_url)
      .subscribe(data => {
        //  console.log(data);
        let res: any = data;
        this.comment_data = res.data;

        return this.blog_comnt_count = res.total_comment;
      })
  }
  usser_detail() {
    this.auth_Serv.user_detail()
      .subscribe(data => {
        // console.log(data)
        let res: any = data;
        this.user_prof_pic = res.data.profile_pic
      })
  }
  blogs_like(customContent) {
    //this._route.snapshot.params['id']

    let check_login: any = this.cookie.get('login');
    if (check_login == 'false') {
      this.modalRef = this.modalService.open(customContent, { size: 'lg', backdrop: 'static' });
    }
    else {

      let blog_slug = { blog_slug: this._route.snapshot.params['id'] }
      this._main.blog_like(blog_slug)
        .subscribe(data => {
          //   console.log(data);
          let res: any = data;
          this.blog_like_count = res.likes //return
          if (res.message == 'Liked') { return this.blog_like_unlike = true; }
          if (res.message == 'Unliked') { return this.blog_like_unlike = false }
        })
    }

  } // end like blog

  // start crausel slider
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    margin: 18,
    navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 2 },
      940: { items: 3 }
    },
    nav: true
  } // end slider

  comment_submit(customContent) {

    // console.log('dsaa');
    let check_login: any = this.cookie.get('login');
    // console.log(check_login);
    if (check_login == 'false') {
      this.modalRef = this.modalService.open(customContent, { size: 'lg', backdrop: 'static' });
    }
    else {
      this.loader_post_cmnt = true;
      let form_comment_Data = this.Blog_Comment_Form.get('comment').value;
      // console.log(form_comment_Data);
      let total_value = { blog: this.blog_Data.id, parent: "", comment: form_comment_Data }

      this._main.blog_comment(total_value)
        .subscribe(data => {
          //   console.log(data);
          let res: any = data;
          if (res.status == 201) {
            //debugger
            this.loader_post_cmnt = false;
            //  this.toastr.success("Sucessfull Comment!");
            this.Blog_Comment_Form.reset();
            this.blog_comment();

          }// end

        }, (err) => {
          this.loader_post_cmnt = false;
        })
    }


  }// end submit
  /*-------------------  comment on click enter on click ----------------------------------------*/
  on_post_comment(customContent, event) {
    this.toastr.clear();
    // console.log('dsaa');
    let check_login: any = this.cookie.get('login');
    // console.log(check_login);
    if (check_login == 'false') {
      this.modalRef = this.modalService.open(customContent, { size: 'lg', backdrop: 'static' });
    }
    else {
      if (event.key == "Enter" && event.shiftKey) {
        //  console.log('shift or enter ');
        event.preventDefault();
        event.stopImmediatePropagation();
        var _val = event.target.value;
        event.target.value = _val + '\n';
      }


      if (event.key === "Enter" && !event.shiftKey) {

        let form_comment_Data = this.Blog_Comment_Form.get('comment').value;
        // console.log(form_comment_Data);
        if (form_comment_Data == "") {
          event.preventDefault();
          this.toastr.error('Comment field may not be blank.');
          return
        } else {
          let total_value = { blog: this.blog_Data.id, parent: "", comment: form_comment_Data }

          this._main.blog_comment(total_value)
            .subscribe(data => {
              //   console.log(data);
              let res: any = data;
              if (res.status == 201) {
                //  this.toastr.success("Sucessfull Comment!");
                this.Blog_Comment_Form.reset();
                this.blog_comment();

              }// end

            }, (err) => { this.toastr.error('Comment field cannot be blank!') }
            )
        }



      } // end enter on clcik

    }


  }// end submit



/*-------------------  comment on click enter on click ----------------------------------------*/
click_comment(id, customContent){

  let check_login:any=this.cookie.get('login');
//  console.log(check_login);
  if(check_login=='false'){
    this.modalRef = this.modalService.open(customContent, { size: 'lg', backdrop: 'static' });
    return

  }
   if(this.showBtn==id){
      this.showBtn=9999999;
    }
  else{
    this.showBtn=id;
  }
} // click comment
// click_comment_child(id){
//   console.log(id);
//   this.showBtn=id;
// }
click_like(id, customContent){
 //  console.log(id);
  let check_login:any=this.cookie.get('login');
 // console.log(check_login);
  if(check_login=='false'){
    this.modalRef = this.modalService.open(customContent, { size: 'lg', backdrop: 'static' });
  }

  // else
  else{
    let cmnt_id={comment_id:id}
    this._main.comment_like(cmnt_id)
    .subscribe(data=>{
      let res:any=data;
    //  console.log(data);
      if(res.status==201){
      //  this.toastr.success("Sucessfull liked!");
        this.blog_comment();
      } // end if
    })  //  end
  }


  } // end like


  comment_btn_submit(id) {
    // console.log(id);

    let form_comment_Data = this.Blog_Comment_Form.get('comment').value;
    console.log(form_comment_Data);
    if (form_comment_Data == null) {
      // this.toastr.error("Please fill comment");
      this.toastr.error('Comment field may not be blank.');
      // Swal.fire({
      //   title: 'Please Fill Comment',
      //   type: 'error',
      // })
    }
    let total_value = { blog: this.blog_Data.id, parent: id, comment: form_comment_Data };
    //  console.log(total_value);

    this._main.blog_comment(total_value)
      .subscribe(data => {
        //  console.log(data);
        let res: any = data;
        if (res.status == 201) {
          this.Blog_Comment_Form.reset();
          this.blog_comment();
          //  this.toastr.success("Sucessfull Comment!");
        }// end

      })

  } // end

  // cancel comment on click hide form
  cancel_comment(id) {
    //  console.log(id);
    // this.show = !this.show+id;
    this.showBtn = id;
  }

  on_click_id(id) {
    //  console.log(id)
  }

  /*---------    */
  onKeydown(event, value: any, id) {
    this.toastr.clear();
    // console.log(event);
    if (event.key == "Enter" && event.shiftKey) {
      // console.log('shift or enter ');
      event.preventDefault();
      event.stopImmediatePropagation();
      var _val = event.target.value;
      event.target.value = _val + '\n';
    }

    if (event.key === "Enter" && !event.shiftKey) {
      //  console.log(event);

      //

      var containputiner: any = document.querySelector("#" + value);
      let text_Area_value = (containputiner).value
      // console.log(text_Area_value);

      // input fomr submit


      if (text_Area_value == '' || text_Area_value == null) {

        event.preventDefault();
        this.toastr.error('Reply field may not be blank.');
        // Swal.fire({
        //   title: 'Please Fill Comment',
        //   type: 'error',
        // })
        return
      }
      let total_value = { blog: this.blog_Data.id, parent: id, comment: text_Area_value };
      //  console.log(total_value);

      this._main.blog_comment(total_value)
        .subscribe(data => {
          //  console.log(data);
          let res: any = data;
          if (res.status == 201) {
            //this.toastr.success("Sucessfull Comment!");
            this.Blog_Comment_Form.reset();
            this.blog_comment();
            this.showBtn = id;
          }// end

        })
    }

  } //end enter after submit form
  printValue(value: any, id) {

    // console.log(id);
    var containputiner: any = document.querySelector("#" + value);
    let text_Area_value = (containputiner).value
    //  console.log(text_Area_value);

    // input fomr submit


    if (text_Area_value == '' || text_Area_value == null) {
      this.toastr.error("Please fill comment!");
      // Swal.fire({
      //   title: 'Please Fill Comment',
      //   type: 'error',
      // })
      return
    }
    let total_value = { blog: this.blog_Data.id, parent: id, comment: text_Area_value };
    // console.log(total_value);

    this._main.blog_comment(total_value)
      .subscribe(data => {
        //   console.log(data);
        let res: any = data;
        if (res.status == 201) {

          this.Blog_Comment_Form.reset();
          this.blog_comment();

        }// end

      })
  }


  // open(customContent) {
  /*                      ------------------  open pop up   ----------------- */
  // }
  onSubmit_login() {
    this.toastr.clear();
    this.cookie.remove('token');
    this.cookie.put('login', 'false');
    this.cookie.remove('username');
    // console.log(this.loginForm.value)
    let form_Data = this.loginForm.value
    this.auth_Serv.login(form_Data)
      .subscribe(data => {
        //  console.log(data);
        let res: any = data;

        // this.cookie.remove('token', )
        if (res.status == 200) {
          this.header_service.user_profile_pic.next(res.data.profile_pic)
          //   this.cookie.remove('token', )<p></p>
          this.toastr.success("Login successful!")
          // Swal.fire({
          //   title: "Login Successful!",
          //   type: 'success',
          // })
          this.cookie.put('token', res.token.access)
          this.cookie.put('login', 'true');
          this.cookie.put('username', res.data.username);
          //sessionStorage.setItem('token',res.token.refresh)
          //console.log('you Sucessfull Login');

          this.modalRef.close();
          return this.isLogged = true;
          // this.router.navigate(['/home']);
        }
      },
        (err) => {
          // console.log(err);
          this.cookie.remove('username');
          this.cookie.remove('token');
          this.cookie.put('login', 'false');
          this.toastr.error("Invalid username/password")
          // Swal.fire({
          //     title: "invalid username/password",
          //     type: 'error',
          // })
          // alert("invalid username/password")
        }
      )
  }


  // close popup and redirect page
  pop_forget_password() {
    this.modalRef.close();
    this.router.navigate(['/forget-password']);
  }
  pop_register(customContent) {
    this.modalRef.close();
    this.modalRef = this.modalService.open(customContent, { size: 'lg', backdrop: 'static' });
    //this.router.navigate(['/register']);

  }



  onSubmit_register(custom_register) {
    this.cookie.remove('token');
    this.cookie.put('login', 'false');
    this.cookie.remove('username');
    // console.log(this.registerForm.value)
    this.loader_register = true;
    let form_Data = this.registerForm.value
    this.auth_Serv.register(form_Data)
      .subscribe(data => {
        //  console.log(data);
        let res: any = data;
        if (res.status == 201) {
          this.loader_register = false;
          this.registerForm.reset();
          this.modalRef.close();
          this.toastr.success('Register successful!');
          // Swal.fire({
          //   title: "Register Success!",
          //   type: 'success',
          // })
          //  console.log('you sucessfull Register');
          setTimeout(() => {
            this.modalRef = this.modalService.open(custom_register, { size: 'lg', backdrop: 'static' });
          }, 100);
          //  this.modalRef = this.modalService.open(customContent, { size: 'lg', backdrop: 'static' });
          // this.router.navigate(['/login'])
        }
      }, (err) => {
        this.loader_register = false;
        this.toastr.error(err.error.message);
        // console.log(err.error.message)
        // Swal.fire({
        //     title: err.error.message,
        //     type: 'error',
        // })

      })
  }
  /*--------------- */


  /*-------------  social network on click condition ---------------  */

helpWindow(event,pop_show,share_) {
 // console.log(this.isLogged)
  // console.log(event)
  // let check_login:any=this.cookie.get('login');

   //  console.log('login')
    //console.log(share_)

if(share_=='fabc'){window.open('https://www.facebook.com/sharer/sharer.php?u=https://www.analyticssteps.com/blogs/'+this.blog_Data.slug, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');}
if(share_=='tw'){ window.open('https://twitter.com/share?url=https://www.analyticssteps.com/blogs/'+ this.blog_Data.slug +'&amp;text='+ this.blog_Data.title+'&amp;hashtags=analyticssteps', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes'); }
if(share_=='lnkd'){ window.open('http://www.linkedin.com/sharing/share-offsite/?url=https://www.analyticssteps.com/blogs/'+this.blog_Data.slug, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes'); }

    // if(share_=='lnkd'){
    //   window.open('http://www.linkedin.com/shareArticle?mini=true&url=https://www.analyticssteps.com/blogs/'+this.blog_Data.slug+'&title=How%20to%20make%20custom%20linkedin%20share%20button&summary=some%20summary%20if%20you%20want&source=stackoverflow.com', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes'); }

  //   if(check_login=='true'){ }
  //   else{

  //   this.modalRef = this.modalService.open(pop_show, { size: 'lg', backdrop: 'static' });
  // }


  }
  //  fbs_click() {
  //   u=location.href;
  //   t=document.title;
  // window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),
  //           'sharer',
  //           'toolbar=0,status=0,width=626,height=436');

  //       return false;
  //   }

  public handleScroll(event: ScrollEvent) {
    const scrolltop = window.document.scrollingElement.scrollTop;
    const scrollHeight = window.document.getElementById('dom_height').clientHeight;
    // const allow_percentages = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]
    const percentage = Math.round((scrolltop* 100) / scrollHeight);
    if (percentage<=100 && percentage!=undefined) {
      const token = this.cookie.get('token')
      const index = ((percentage) / 5).toFixed()
      if (this.cur_per_read<percentage)
      {
        if(token!=undefined){
          this.send("send", percentage, token)
          this.cur_per_read = percentage;
        }

      }
      else{
        if(token!=undefined){
          this.send("update", percentage, token)
        }

      }
     // console.log(percentage)
    }

  }

  public connect_to_ws(token) {
    this.socket$ = new WebSocketSubject(this._main.ws_url);

    this.socket$.subscribe(
      (message) => this.manage_ws_response(message),
      (error) => this.handle_ws_error(error),
      () => console.warn('Completed!')
    );
    this.send("join", "0", token)
  }
  public send(command, percent_read, token): void {
    const message = new Message(command, this.blog_id, percent_read, token);
    this.socket$.next(message);
  }
  private manage_ws_response(message) {
//    console.log(message)
    if (message.msg_type == 4)
    {
      // console.log("socket join")
      const token = this.cookie.get('token')
      if(token != undefined)
      {
        if(message.token == token){
          if(message.blog_id == this.blog_id){
            // console.log("your blog")

            this.cur_per_read = message.percent_read
            // this.send("send", 40, token)
          }

        }
      }
    }
    if(message.msg_type == 0){
      const token = this.cookie.get('token')
      if(token != undefined){
        if(message.token == token){
          if(message.blog_id == this.blog_id){
            // console.log("percentage read value updated")
            // console.log(message.percent_read)
          }
        }
      }
    }
  }

  private handle_ws_error(error) {
    // disconnect when connection getting closed
    console.log(error)
    //TODO reconnection
    const token = this.cookie.get('token')
    if (token!=undefined){
      this.connect_to_ws(token)
    }
  }
}
