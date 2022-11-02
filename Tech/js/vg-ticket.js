

import {wolstore} from '../../js/lstore.js';
import{dashdom,wodom} from './ticket-dom.js';
import {ServiceWO} from './sticket-build.js';
import {SETupdownside} from '../../js/vg-util-updownside.js';
import {DropNote} from '../../js/vg-poppers.js';


var curwo = new ServiceWO(JSON.parse(localStorage.getItem(wolstore.currentwo))); //set the current WO to null

var LOADwolist = ()=>{
  let wolist = JSON.parse(localStorage.getItem(wolstore.techwo));
  let dlist = document.getElementById(dashdom.list.cont);
  dlist.innerHTML = '';
  if(wolist){
    for(let x=0;x<wolist.length;x++){
      let item = document.createElement('div');
      item.classList.add(dashdom.list.item.cont);
      item.addEventListener('click',(ele)=>{
        let wlist = JSON.parse(localStorage.getItem(wolstore.techwo));
        for(let y=0;y<wlist.length;y++){
          if(wlist[y].num == ele.target.parentNode.getElementsByClassName(dashdom.list.item.num)[0].innerText){
            curwo.LOADwo(wlist[y]);
            DropNote('tr',`WO # - ${wlist[y].num} Loaded..`,'green');
          }
        }
      });

      item.appendChild(document.createElement('div')).innerText = wolist[x].num;
      item.children[item.children.length-1].classList.add(dashdom.list.item.num);

      item.appendChild(document.createElement('div')).innerText = wolist[x].name;
      item.children[item.children.length-1].classList.add(dashdom.list.item.name);

      item.appendChild(document.createElement('div')).innerText = wolist[x].address;
      item.children[item.children.length-1].classList.add(dashdom.list.item.address);

      dlist.appendChild(item);
    }
  }
}
var DELETEwo = (wonum=null)=>{
  if(wonum){
    let wolist = JSON.parse(localStorage.getItem(wolstore.techwo));
    let nwolist = [];
    for(let x=0;x<wolist.length;x++){
      if(wolist[x].num!=wonum){
        nwolist.push(wolist[x]);
      }
    }
    localStorage.setItem(wolstore.techwo,JSON.stringify(nwolist));
    LOADwolist();
  }
}
//WO Number CHANGE
document.getElementById(wodom.info.num).addEventListener('change', (ele) => { //WO number input change
    if (ele.target.value != '') {
        document.getElementsByTagName('title')[0].innerText = ele.target.value;
        $(document.getElementById('wo-setup-sys')).show();
        $(document.getElementById('wo-setup-repair')).show();
        curwo.SAVEwo();
        LOADwolist();
    }
});

//PRINT Button
document.getElementById('wo-save').addEventListener('click', (ele) => {
    window.print();
});
document.getElementById(dashdom.buttons.editToggle).addEventListener('click',(ele)=>{
  var dcont = document.getElementById(dashdom.cont);
  if($(dcont).is(':Visible')){
    $(dcont).hide();
  }else{$(dcont).show();}
});


document.getElementById(wodom.action.save).addEventListener('click',(ele)=>{
  curwo.SAVEwo();
  LOADwolist();
  console.log('WO saved...',curwo.wo);
  DropNote('tr','WO Saved!','green');
});
document.getElementById(wodom.action.close).addEventListener('click',(ele)=>{
  curwo.SAVEwo();
  curwo.LOADwo();
  DropNote('tr','WO Saved!','green');
  DropNote('tr','WO Closed..','yellow');
});
document.getElementById(wodom.action.delete).addEventListener('click',(ele)=>{
  DELETEwo(curwo.wo.num);
  curwo.LOADwo();
  DropNote('tr','WO Deleted..','red');
});

SETupdownside(true,true,false,false);
//SETUPbuild(curwo);
//SETUPfbblock();
//SETUPmembers();

LOADwolist();
//LOADwo(JSON.parse(localStorage.getItem(wolstore.currentwo)));
