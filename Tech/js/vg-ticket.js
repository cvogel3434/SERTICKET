

import {
  wolstore
} from '../../js/lstore.js';
import {
  wodom,
  sysdom,
  SETUPbuild,
  ADDsystem,
  ADDrepair
} from './sticket-build.js';

import {
  curbook,
  SETUPfbblock
} from './flbook.js';

import {
  SETUPmembers
} from './vg-membership.js';

import {
  vudom,
  SETupdownside
} from '../../js/vg-util-updownside.js';



var curwo = null; //set the current WO to null

var dashdom = {
  cont:'vg-wo-dash',
  buttons:{
    editToggle:'tech-wo-selector'
  },
  list:{
    cont:'vg-wo-list',
    item:{
      cont:'vg-wo-item',
      num:'vg-wo-item-num',
      name:'vg-wo-item-name',
      address:'vg-wo-item-address'
    }
  }
}


var LOADwo = (cwo)=>{
  if(cwo){
    document.getElementById(wodom.info.num).value = cwo.num;
    document.getElementById(wodom.info.name).value = cwo.name;
    document.getElementById(wodom.info.address).value = cwo.address;
    document.getElementById(sysdom.list.cont).innerHTML = '';
    for(let x=0;x<cwo.systems.length;x++){
      ADDsystem({id:cwo.systems[x].id});
      for(let y=0;y<cwo.systems[x].repairs.length;y++){
        ADDrepair(cwo.systems[x].repairs[y]);
      }
    }
    $(document.getElementById(vudom.top.cont)).hide();
    $(document.getElementsByClassName(vudom.top.info)[0]).hide();
    $(document.getElementById(dashdom.cont)).hide();
  }
}

var LOADwolist = ()=>{
  let wolist = JSON.parse(localStorage.getItem(wolstore.techwo));
  let dlist = document.getElementById(dashdom.list.cont);
  dlist.innerHTML = '';
  if(wolist){
    console.log(wolist);
    for(let x=0;x<wolist.length;x++){
      let item = document.createElement('div');
      item.classList.add(dashdom.list.item.cont);
      item.addEventListener('click',(ele)=>{
        let wlist = JSON.parse(localStorage.getItem(wolstore.techwo));
        for(let y=0;y<wlist.length;y++){
          if(wlist[y].num == ele.target.parentNode.getElementsByClassName(dashdom.list.item.num)[0].innerText){
            LOADwo(wlist[y]);
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
//WO Number CHANGE
document.getElementById(wodom.info.num).addEventListener('change', (ele) => { //WO number input change

    if (ele.target.value != '') {
        document.getElementsByTagName('title')[0].innerText = ele.target.value;
        $(document.getElementById('wo-setup-sys')).show();
        $(document.getElementById('wo-setup-repair')).show();
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

SETupdownside(true,true,true,false);
SETUPbuild(curwo);
SETUPfbblock();
SETUPmembers();

LOADwolist();
LOADwo(JSON.parse(localStorage.getItem(wolstore.currentwo)));
