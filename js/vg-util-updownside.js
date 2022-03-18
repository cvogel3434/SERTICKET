/* Utility elements that hide off screen */
var vudom = {
  toggler:'vg-utilcont-toggle',
  info:'vg-utilcont-info',
  top:{
    cont:'vg-utilcont-top',
    info:'vg-utilcont-top-info'
  },
  bottom:{
    cont:'vg-utilcont-bottom',
    info:'vg-utilcont-bottom-info'
  },
  right:{
    cont:'vg-utilcont-right',
    info:'vg-utilcont-right-info'
  },
  left:{
    cont:'vg-utilcont-left',
    info:'vg-utilcont-left-info'
  }
}

/*  Sets the needed side utilty elements

    PASS:
      - top,down,right,left = true or false on whether an edge is needed

    My want to also pass a relative container. These side utilities could
    be oriented inside a parent div???
*/
var SETupdownside = (top,bottom,right,left)=>{
  let edge;
  let edges = []; //to track all active edges

  for(let x=1;x<=4;x++){
    make = true; //whether or not to make the elements
    edge = null;
  //  try{
      switch (x) { //set the edges
        case 1 :
          if(top){
            edge=document.getElementById(vudom.top.cont);
            edges.push('top');
          }else{make=false}
          break;
        case 2 :
          if(bottom){
            edge=document.getElementById(vudom.bottom.cont);
            edges.push('bottom');
          }else{make=false}
          break;
        case 3 :
          if(right){
            edge=document.getElementById(vudom.right.cont);
            edges.push('right');
          }else{make=false}
          break;
        case 4:
          if(left){
            edge=document.getElementById(vudom.left.cont);
            edges.push('left');
          }else{make=false}
        }
  //  }catch{make=false}
    if(make){
      edge.getElementsByClassName(vudom.toggler)[0].addEventListener('click',TOGGLEutil); //set the show hide of utility contents

      edge.addEventListener('mouseleave',(ele)=>{ //hide edge if info is hidden
        if(!$(ele.target.getElementsByClassName(vudom.info)[0]).is(':visible')){
          $(ele.target).hide();
        }
      });
    }
  }

  document.addEventListener('mousemove',(ele)=>{
    for(let x=0;x<edges.length;x++){
      switch(edges[x]){
        case 'top':
          if(ele.clientY < 30){
            $(document.getElementById(vudom.top.cont)).show();
            return
          }
          break;
        case 'bottom':
          if(ele.clientY>window.innerHeight - 30){
            $(document.getElementById(vudom.bottom.cont)).show();
            return
          }
          break;
        case 'right':
          if(ele.clientX>window.innerWidth - 30){
            $(document.getElementById(vudom.right.cont)).show();
            return
          }
          break;
        case 'left':
          if(ele.clientX<30){
            $(document.getElementById(vudom.left.cont)).show();
            return
          }
      }
    }
  });
}

/*  Toggle an utility

    Uses the toggle button passed by event to get to the parentNode
    and the the the lastChild
*/
var TOGGLEutil = (ele)=>{
  cont = ele.target.parentNode;
  if($(cont.getElementsByClassName(vudom.info)[0]).is(':visible')){
    $(cont.getElementsByClassName(vudom.info)[0]).hide();
  }else{$(cont.getElementsByClassName(vudom.info)[0]).show();}
}

//hide/show toggle button
var TOGGLEr = (ele)=>{

}
