/*  VIDEO Group


*/

var viddom = {
  screen:'video-screen',
  gallery:{
    list:'video-gallery-buttons',
    button:'video-button'
  }
}

var vidgroup = {
  'Pre Comfort Consultation':{
    src:'https://service-test2.s3.us-east-2.amazonaws.com/Pre+Comfort+Consultation.mov'
  },
  'Pre Service Call':{
    src:'https://service-test2.s3.us-east-2.amazonaws.com/Pre+Service+Call.mov'
  },
  'Repair or Replace, No Remporse Program':{
    src:'https://service-test2.s3.us-east-2.amazonaws.com/Repair+or+Replace%2C+No+Remporse+Program.mov'
  },
  'Rewards Membership':{
    src:'https://service-test2.s3.us-east-2.amazonaws.com/Rewards+Membership.mov'
  },
  'Service Warranty':{
    src:'https://service-test2.s3.us-east-2.amazonaws.com/Service+Warranty.mov'
  }
}

var SETvideogallery = ()=>{
  let vgal = document.getElementById(viddom.gallery.list);

  for(let v in vidgroup){
    let vbutt = document.createElement('div');
    vbutt.classList.add(viddom.gallery.button);
    vbutt.addEventListener('dblclick',GETgalleryvideo);
    vbutt.innerText = v;
    vgal.appendChild(vbutt);
  }
}

var GETgalleryvideo = (ele)=>{
  for(let v in vidgroup){
    if(ele.target.innerText == v){
      document.getElementById(viddom.screen).src = vidgroup[v].src;
    }
  }
}


//Setup gallery

SETvideogallery();
