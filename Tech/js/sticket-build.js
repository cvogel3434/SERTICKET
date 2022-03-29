
import {wolstore} from '../../js/lstore.js';
import {vudom} from'../../js/vg-util-updownside.js'
import {RewardsMembership} from './vg-membership.js';
import {FlatRateBook} from './flbook.js';
import {sysdom,prsdom,wodom,fbdom,dashdom} from './ticket-dom.js';

export var srvwo = (wo)=>{
  if(!wo){
    wo = {
      num:'',
      name:'',
      address:'',
      book:{
        name:''
      }
    }
  }
}
export class ServiceWO extends FlatRateBook{
  constructor(wo){
    if(!wo){
      wo = {
        num:'',
        name:'',
        address:'',
        book:{
          name:'Res Book',
          pl:'STA',
        },
        reg:'STA',
        cntrct:'PREMIUM',
        hascntrct:false,
        build:{
          regprice:0,
          memprice:0,
          savings:0,
          memonth:0,
        },
        systems:[]
      }
    }
    super(wo.book.name,wo.book.pl);
    this.wo = wo;
    this.rewardform = new RewardsMembership();

    document.getElementById(sysdom.input.tagid).addEventListener('change', (ele) => {//Add new system
        this.ADDsystem({
            id: ele.target.value
        });
        ele.target.value = '';
    });

    document.addEventListener('change', (ele) => {  //Document CHANGE
        this.wo = this.GETwo();
        console.log(this.wo);
        this.SAVEwo();
        //update in wo list / or add
        this.SETpresent();
    });

    document.getElementById(prsdom.button.open).addEventListener('click',(ele)=>{ // button to open the presentation
        if($(document.getElementById(sysdom.cont)).is(':visible')){
          $(document.getElementById(sysdom.cont)).hide();
        }else{$(document.getElementById(sysdom.cont)).show()}
        this.wo = GETwo();
        console.log(this.wo);
        this.SETpresent();
    });

    document.getElementById(fbdom.search.pl).addEventListener('change', (ele) => {
        let cname = document.getElementById(prsdom.contract.form.name);

        if(rewardform.ISmember(ele.target.value)){
          cname.value ='';
        }else{
          if(cname.value == ''){cname.value = 'PREMIUM';} //reintialize the contract
        }

        this.getSearchList(ele);
    });

    this.LOADwo(this.wo);
  }

  CLEARSysSelect = () => {
      let replist = document.getElementsByClassName(sysdom.list.selected);
      for (let x = 0; x < replist.length; x++) {
          $(replist[x].getElementsByClassName(sysdom.list.system.repairs)[0]).hide();
          console.log(replist[x])
          replist[x].classList.remove(sysdom.list.selected);
      }
  }

  ADDsystem = (system = { id: '' }) => {//Add System to Build
      if (system.id != '') {
          let syslist = document.getElementById(sysdom.list.cont);

          let sys = syslist.appendChild(document.createElement('div'));

          this.CLEARSysSelect();

          sys.classList.add(sysdom.list.system.cont);
          sys.classList.add(sysdom.list.selected);

          sys.appendChild(document.createElement('div')); //button to toggle repair list
          sys.children[sys.children.length - 1].classList.add(sysdom.list.system.button);
          sys.children[sys.children.length - 1].innerText = '>'


          sys.appendChild(document.createElement('input')).value = system.id; //tag id input
          sys.children[sys.children.length - 1].classList.add(sysdom.list.system.tagid);

          sys.appendChild(document.createElement('img')).src = '../images/icons/trash.png';
          sys.children[sys.children.length-1].classList.add(sysdom.buttons.delete);
          sys.children[sys.children.length-1].addEventListener('dblclick',(ele)=>{
            ele.target.parentNode.parentNode.removeChild(ele.target.parentNode);
          });

          //Input Repairs
          sys.appendChild(document.createElement('div'));
          sys.children[sys.children.length - 1].classList.add(sysdom.list.system.repairs); //sys repair list

          if (sys.repairs != undefined) {
              for (let reps = 0; reps < sys.repairs.length; reps++) {
                  this.ADDrepair(sys.repairs[reps]);
              }
          }
          //button to show/hide repairs
          sys.children[0].addEventListener('click', (ele) => {

              this.CLEARSysSelect();
              ele.target.parentNode.classList.add(sysdom.list.selected);
              let replist = ele.target.parentNode.getElementsByClassName(sysdom.list.system.repairs)[0];

              //need to check attribut display
              if ($(replist).is(':visible')) { $(replist).hide(); }
              else { $(replist).show(); }
          });

      }
  }

  GETsystems = () => {//Get systems from display
      let syslist = document.getElementById(sysdom.list.cont);
      let arr = [];
      for (let x = 0; x < syslist.children.length; x++) {
          arr.push(
              (() => {
                  let obj = {
                      id: syslist.children[x].getElementsByClassName(sysdom.list.system.tagid)[0].value,
                      repairs: []
                  };
                  let rlist = syslist.children[x].getElementsByClassName(sysdom.list.system.repairs)[0];
                  for (let y = 0; y < rlist.children.length; y++) { //add a repair
                      obj.repairs.push({
                          task: rlist.children[y].getElementsByClassName(sysdom.list.system.repair.id)[0].innerText,
                          desc: rlist.children[y].getElementsByClassName(sysdom.list.system.repair.desc)[0].innerText,
                          value: this.GETbookprice(rlist.children[y].getElementsByClassName(sysdom.list.system.repair.id)[0].innerText,
                                              document.getElementById(fbdom.search.pl).value),
                          appr: rlist.children[y].getElementsByClassName('vg-checkbox')[0].classList.contains('vg-checkbox-checked') ? true:false
                      });
                  }
                  return obj;
              })());
      }
      return arr
  }

  GETwo = () => {//Get WO from display
      let memlevel = document.getElementById(prsdom.contract.form.name).value;
      let nwo = {
          num: document.getElementById(wodom.info.num).value,
          name: document.getElementById(wodom.info.name).value,
          address: document.getElementById(wodom.info.address).value,
          book: {
              name: document.getElementById(fbdom.search.book).value,
              pl: document.getElementById(fbdom.search.pl).value
          },
          reg: this.GETregpl(document.getElementById(fbdom.search.pl).value),
          cntrct: this.rewardform.GETcntrctpl(document.getElementById(prsdom.contract.form.name).value),
          hascntrct: this.rewardform.ISmember(document.getElementById(fbdom.search.pl).value), //NEED to account for contract upgrade

          build:{
            regprice:0,
            memprice:0,
            savings:0,
            memmonth:this.rewardform.GETformprice(12) //can change '12' to match the payment schedule
          },
          // presentation!!
          systems: this.GETsystems()
      }
      return nwo
  }

  SAVEwo = ()=>{//Save Work Order to localStorage
    localStorage.setItem(wolstore.currentwo,JSON.stringify(this.wo));
    var wolist = JSON.parse(localStorage.getItem(wolstore.techwo));
    if(this.wo){
      if(wolist){
        for(let x=0;x<wolist.length;x++){
          if(this.wo.num == wolist[x].num){
            //update the wo
            wolist[x] = this.wo;
            localStorage.setItem(wolstore.techwo,JSON.stringify(wolist)); //update local storage
            return true;
          }
        }
        wolist.push(this.wo);
        localStorage.setItem(wolstore.techwo,JSON.stringify(wolist)); //update local storage
        return true;
      }else{ //wolist has not been initialized
        wolist = [];
        wolist.push(this.wo);
        localStorage.setItem(wolstore.techwo,JSON.stringify(wolist));
        return true;
      }
    }else{return false}
  }

  LOADwo = (wo)=>{
    if(wo){
      this.wo = wo;
      document.getElementById(wodom.info.num).value = this.wo.num;
      document.getElementById(wodom.info.name).value = this.wo.name;
      document.getElementById(wodom.info.address).value = this.wo.address;
      document.getElementById(sysdom.list.cont).innerHTML = '';
      for(let x=0;x<this.wo.systems.length;x++){
        this.ADDsystem({id:this.wo.systems[x].id});
        for(let y=0;y<this.wo.systems[x].repairs.length;y++){
          this.ADDrepair(this.wo.systems[x].repairs[y]);
        }
      }
      $(document.getElementById(vudom.top.cont)).hide();
      $(document.getElementsByClassName(vudom.top.info)[0]).hide();
      $(document.getElementById(dashdom.cont)).hide();
    }
  }

  /*  Set the presentation with a current wo
  */
  SETpresent = () => {
      if (this.wo.systems != null) {
          let slist = document.getElementById(prsdom.systems);

          let rprice=0; //temp for reg book price
          let mprice=0; //temp for mem book price
          slist.innerHTML = '';

          //handle the DIAGNOSTIC
          if(document.getElementById(fbdom.special.diagnostic).checked){
            let diagrow = document.getElementById(prsdom.system.specials.diagnostic);
            $(diagrow).show();

            rprice = this.GETbookprice('DIAG',this.wo.reg);
            diagrow.children[1].innerText = rprice;
            mprice = this.wo.hascntrct ?  this.GETbookprice('DIAG',this.wo.cntrct) : this.GETbookprice('DIAG',this.wo.reg);
            diagrow.children[2].innerText = mprice;
            diagrow.children[3].innerText = rprice - mprice;

          }else{$(document.getElementById(prsdom.system.specials.diagnostic)).hide();}

          for (let x = 0; x < this.wo.systems.length; x++) {
              let s = slist.appendChild(document.createElement('div'));
              s.classList.add(prsdom.system.cont);
              s.appendChild(document.createElement('div')).innerText = this.wo.systems[x].id;
              let rlist = s.appendChild(document.createElement('div'));
              rlist.classList.add(prsdom.system.repairs);

              for (let y = 0; y < this.wo.systems[x].repairs.length; y++) {
                  rprice = 0;
                  mprice = 0;
                  //tell what column repcost goes to

                  //find the memebership cost (if any)

                  //fill the difference
                  let r = rlist.appendChild(document.createElement('div'));

                  r.classList.add(prsdom.system.repair.cont);
                  r.appendChild(document.createElement('div')).innerText = this.wo.systems[x].repairs[y].desc;
                  rprice = this.GETbookprice(this.wo.systems[x].repairs[y].num,this.wo.reg);
                  r.appendChild(document.createElement('div')).innerText =  rprice;
                  this.wo.build.regprice += rprice;
                  mprice = this.GETbookprice(this.wo.systems[x].repairs[y].num,this.wo.cntrct);
                  r.appendChild(document.createElement('div')).innerText = mprice;
                  this.wo.build.memprice += mprice;
                  r.appendChild(document.createElement('div')).innerText = rprice - mprice;
                  this.wo.build.savings += rprice - mprice;

                  if(!this.wo.systems[x].repairs[y].appr){
                    r.classList.add(prsdom.system.repair.unapproved);
                  }
                  r.appendChild(document.createElement('div')).innerText = this.wo.systems[x].repairs[y].appr ? 'YES':'NO';
              }
          }
          document.getElementById('wo-present-membership').innerText = this.rewardform.GETmemhead(document.getElementById(prsdom.contract.form.name).value);
          document.getElementById(prsdom.invest.regprice).innerText = this.wo.build.regprice;
          document.getElementById(prsdom.invest.memprice).innerText = this.wo.build.memprice;
          document.getElementById(prsdom.invest.savings).innerText = this.wo.build.savings;
          document.getElementById(prsdom.invest.conmonth).innerText = this.rewardform.GETformprice();
      }
  }

}

export var SETUPbuild = (curwo)=>{
  //Tag ID CHANGE, adds a system to the list
  document.getElementById(sysdom.input.tagid).addEventListener('change', (ele) => {
      ADDsystem({
          id: ele.target.value
      });
      ele.target.value = '';
  });


  document.addEventListener('change', (ele) => {  //Document CHANGE
      curwo = GETwo(curwo);
      console.log(curwo);
      localStorage.setItem(wolstore.currentwo,JSON.stringify(curwo));
      SAVEwo(curwo);
      //update in wo list / or add
      SETpresent(curwo);
  });

  document.getElementById(prsdom.button.open).addEventListener('click',(ele)=>{ // button to open the presentation
      if($(document.getElementById(sysdom.cont)).is(':visible')){
        $(document.getElementById(sysdom.cont)).hide();
      }else{$(document.getElementById(sysdom.cont)).show()}
      curwo = GETwo(curwo);
      console.log(curwo);
      SETpresent(curwo);
  });


}
