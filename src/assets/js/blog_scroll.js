

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
var log=getCookie('login')
var token=getCookie('token')
var blog_slug=getCookie('blog_slug')
var percent=getCookie('per')
//console.log(percent)
function webScroll(){
if(log==='true'){
//alert(true)
var lastScrollTop = 0;
var isScroll = false;
$(window).scroll(function(event){

  if(document.getElementById('dom_height')){
 
    var offset = $(this).scrollTop();
    var height_of_dom=document.getElementById('dom_height').clientHeight
    var scrollValue=[];
    scrollValue.push(offset)
    var value_inPercent='';
    value_inPercent =scrollValue/height_of_dom * (100)
    //console.log(height_of_dom)
    
    
 
   
    if (offset > lastScrollTop){
   
       if(Math.round(value_inPercent)<=100 && Math.round(value_inPercent)>percent && isScroll===false){
        // alert(percent)
         isScroll = true;
         var xhr = new XMLHttpRequest();
                  // xhr.open('POST', 'http://13.235.204.31/backend/api/v1/user-read-blog-create/', true);
                  //  xhr.open('POST', 'http://192.168.1.28:8005/backend/api/v1/user-read-blog-create/', true)
                xhr.open('POST', 'https://analyticssteps.com/backend/api/v1/user-read-blog-create/', true);
                 // xhr.onload = function () {
                 //   // Request finished. Do processing here.
                 // };
                 xhr.setRequestHeader('Content-Type', 'application/json');
                 xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                 let f_value={
                   blog_slug:blog_slug, 
                   percent_read :Math.round(value_inPercent)
                  }
                   xhr.send(JSON.stringify(f_value));
                 isScroll = false
               
       }
     
     
       
    } else {
       // upscroll code
     // console.log('down')
    }
    lastScrollTop = offset;
    return 
  }
  // else{
  
  // return
  // } // end else 


 
} );/* end scroll*/ 




// else{
//  // alert('false')
}
}

webScroll()