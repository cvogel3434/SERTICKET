/*  VIDEO Group


*/

var viddom = {
  screen:'video-screen',
  gallery:{
    list:'video-gallery-buttons',
    button:'video-button',
    selected:'video-button-selected'
  }
}

var vidgroup = {
  'What to Expect':{
    src:'https://living-service-ticket.s3.us-east-2.amazonaws.com/Pre+Service+Call.mp4'
  },
  'Rewards Membership':{
    src:'https://living-service-ticket.s3.us-east-2.amazonaws.com/Rewards+Membership.mp4'
  },
  'Service Warranty':{
    src:'https://living-service-ticket.s3.us-east-2.amazonaws.com/Service+Warranty.mp4'
  },
  'Repair or Replace? No Remorse.':{
    src:'https://living-service-ticket.s3.us-east-2.amazonaws.com/Repair+or+Replace%2C+No+Remporse+Program.mp4'
  },
  'Upgrading Your Air':{
    src:'https://living-service-ticket.s3.us-east-2.amazonaws.com/Pre+Comfort+Consultation.mp4'
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
  RESETgallerybuttons();
  for(let v in vidgroup){
    if(ele.target.innerText == v){
      document.getElementById(viddom.screen).src = vidgroup[v].src;
      ele.target.classList.add(viddom.gallery.selected);
      return null;
    }
  }
}
var RESETgallerybuttons = ()=>{
  let gallery = document.getElementsByClassName(viddom.gallery.button);
  for(let x=0;x<gallery.length;x++){
    if(gallery[x].classList.contains(viddom.gallery.selected)){
      console.log(33);
      gallery[x].classList.remove(viddom.gallery.selected);
      return null;
    }
  }
}

//Setup gallery
document.getElementById(viddom.screen).src = vidgroup['What to Expect'].src;

SETvideogallery();
