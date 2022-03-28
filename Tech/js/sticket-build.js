
import {wolstore} from '../../js/lstore.js';

import {
  prsdomcntrct,
  HasContract,
  GETcntrctprice,
  GETcntrctpl,
  GETmemhead
} from './vg-membership.js';

import {
  fbdom,
  GETregpl,
  GETbookprice
} from './flbook.js';


export var wodom = {
    cont: '',
    info: {
        num: 'wo-info-num',
        name: 'wo-info-customer',
        address: 'wo-info-address'
    }
}

var prsdom = {
    cont: 'wo-presentation-cont',
    head: 'wo-presentaiton-header',
    button:{
      open:'button-open-presentation'
    },
    contract: prsdomcntrct, //from vg-membership.js
    systems: 'wo-present-systems',
    system: {
        cont: 'wo-present-system',
        id: 'wo-present-system-id',
        repairs: 'wo-present-system-repairs',
        specials:{
          diagnostic:'wo-present-repair-diagnostic'
        },
        repair: {
            unapproved:'wo-present-repair-unapproved',
            cont: 'wo-present-repair',
            num: 'present-repair-num',
            desc: 'present-repair-desc',
            invst: 'present-repair-price',
            savings: 'present-repair-savings',
            appr: 'present-repair-appr'
        }
    },
    invest: {
        savings: 'wo-present-savings-today',
        regprice: 'wo-present-regprice-today',
        memprice: 'wo-present-memprice-today',
        conmonth: 'wo-present-contract-monthly'
    }
}

var sysdom = { //System DOM
    cont:'wo-setup-cont',
    input: {
        tagid: "wo-setup-sys-tagid"
    },
    buttons:{
      approver:{
        toggle:'vg-checkbox',
        approved:'vg-checkbox-checked'
      },
      delete:'vg-deleter'
    },

    list: {
        cont: 'wo-sys-list',
        system: {
            cont: 'wo-sys',
            button: 'wo-sys-button',
            tagid: 'wo-sys-tagid',
            area: 'wo-sys-area',
            repairs: 'wo-sys-repairs',
            repair: {
                cont: 'wo-sys-repair',
                id: 'wo-sys-repair-id',
                desc: 'wo-sys-repair-desc',
            }
        },
        selected: 'wo-sys-selected'
    }
};

var CLEARSysSelect = () => {
    let replist = document.getElementsByClassName(sysdom.list.selected);
    for (let x = 0; x < replist.length; x++) {
        $(replist[x].getElementsByClassName(sysdom.list.system.repairs)[0]).hide();
        console.log(replist[x])
        replist[x].classList.remove(sysdom.list.selected);
    }
}

var ADDsystem = (system = { id: '' }) => {
    if (system.id != '') {
        let syslist = document.getElementById(sysdom.list.cont);

        let sys = syslist.appendChild(document.createElement('div'));

        CLEARSysSelect();

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
                ADDrepair(sys.repairs[reps]);
            }
        }
        //button to show/hide repairs
        sys.children[0].addEventListener('click', (ele) => {

            CLEARSysSelect();
            ele.target.parentNode.classList.add(sysdom.list.selected);
            let replist = ele.target.parentNode.getElementsByClassName(sysdom.list.system.repairs)[0];

            //need to check attribut display
            if ($(replist).is(':visible')) { $(replist).hide(); }
            else { $(replist).show(); }
        });

    }

}

/*  Add repair
    PASS:{
        task,
        desc
    }
*/
export var ADDrepair = (row = {}) => {
    let rlist = document.getElementsByClassName(sysdom.list.selected)[0].getElementsByClassName(sysdom.list.system.repairs)[0];
    let r = rlist.appendChild(document.createElement('div'));
    r.classList.add(sysdom.list.system.repair.cont);
    r.appendChild(document.createElement('div')).classList.add('vg-checkbox');
    r.children[r.children.length-1].addEventListener('click',(ele)=>{
      if(ele.target.classList.contains('vg-checkbox-checked')){
        ele.target.classList.remove('vg-checkbox-checked');
      }else{ele.target.classList.add('vg-checkbox-checked')}
    });
    r.appendChild(document.createElement('div')).innerText = row.task != undefined ? row.task : '' //inrow.children[0].innerText;
    r.children[r.children.length - 1].classList.add(sysdom.list.system.repair.id);
    r.appendChild(document.createElement('div')).innerText = row.desc != undefined ? row.desc : '' //inrow.target.parentNode.children[1].innerText;
    r.children[r.children.length - 1].classList.add(sysdom.list.system.repair.desc);

    r.appendChild(document.createElement('img')).src = '../images/icons/trash.png';
    r.children[r.children.length-1].classList.add(sysdom.buttons.delete);
    r.children[r.children.length-1].addEventListener('dblclick',(ele)=>{
      ele.target.parentNode.parentNode.removeChild(ele.target.parentNode);
    });

}

//gets the system info
var GETSysList = () => {
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
                        num: rlist.children[y].getElementsByClassName(sysdom.list.system.repair.id)[0].innerText,
                        desc: rlist.children[y].getElementsByClassName(sysdom.list.system.repair.desc)[0].innerText,
                        value: GETbookprice(rlist.children[y].getElementsByClassName(sysdom.list.system.repair.id)[0].innerText, document.getElementById(fbdom.search.pl).value),
                        appr: rlist.children[y].getElementsByClassName('vg-checkbox')[0].classList.contains('vg-checkbox-checked') ? true:false
                    });
                }
                return obj;
            })());
    }
    return arr
}


//gets the wo info from dom
//accepts a work order
var GETwo = (cwo) => {
    let memlevel = document.getElementById(prsdom.contract.form.name).value;
    let nwo = {
        num: document.getElementById(wodom.info.num).value,
        name: document.getElementById(wodom.info.name).value,
        address: document.getElementById(wodom.info.address).value,
        book: {
            name: document.getElementById(fbdom.search.book).value,
            pl: document.getElementById(fbdom.search.pl).value
        },
        reg: GETregpl(document.getElementById(fbdom.search.pl).value),
        cntrct: GETcntrctpl(document.getElementById(prsdom.contract.form.name).value),
        hascntrct: HasContract(document.getElementById(fbdom.search.pl).value), //NEED to account for contract upgrade

        build:{
          regprice:0,
          memprice:0,
          savings:0,
          memmonth:GETcntrctprice(12) //can change '12' to match the payment schedule
        },
        // presentation!!
        systems: GETSysList()
    }
    return nwo
}

/*  Set the presentation with a current wo
*/
var SETpresent = (cwo) => {
    if (cwo.systems != null) {
        let slist = document.getElementById(prsdom.systems);

        let rprice=0; //temp for reg book price
        let mprice=0; //temp for mem book price
        slist.innerHTML = '';

        //handle the DIAGNOSTIC
        if(document.getElementById(fbdom.special.diagnostic).checked){
          let diagrow = document.getElementById(prsdom.system.specials.diagnostic);
          $(diagrow).show();

          rprice = GETbookprice('DIAG',cwo.reg);
          diagrow.children[1].innerText = rprice;
          mprice = cwo.hascntrct ?  GETbookprice('DIAG',cwo.cntrct) : GETbookprice('DIAG',cwo.reg);
          diagrow.children[2].innerText = mprice;
          diagrow.children[3].innerText = rprice - mprice;

        }else{$(document.getElementById(prsdom.system.specials.diagnostic)).hide();}

        for (let x = 0; x < cwo.systems.length; x++) {
            let s = slist.appendChild(document.createElement('div'));
            s.classList.add(prsdom.system.cont);
            s.appendChild(document.createElement('div')).innerText = cwo.systems[x].id;
            let rlist = s.appendChild(document.createElement('div'));
            rlist.classList.add(prsdom.system.repairs);

            for (let y = 0; y < cwo.systems[x].repairs.length; y++) {
                rprice = 0;
                mprice = 0;
                //tell what column repcost goes to

                //find the memebership cost (if any)

                //fill the difference
                let r = rlist.appendChild(document.createElement('div'));

                r.classList.add(prsdom.system.repair.cont);
                r.appendChild(document.createElement('div')).innerText = cwo.systems[x].repairs[y].desc;
                rprice = GETbookprice(cwo.systems[x].repairs[y].num,cwo.reg);
                r.appendChild(document.createElement('div')).innerText =  rprice;
                cwo.build.regprice += rprice;
                mprice = GETbookprice(cwo.systems[x].repairs[y].num,cwo.cntrct);
                r.appendChild(document.createElement('div')).innerText = mprice;
                cwo.build.memprice += mprice;
                r.appendChild(document.createElement('div')).innerText = rprice - mprice;
                cwo.build.savings += rprice - mprice;

                if(!cwo.systems[x].repairs[y].appr){
                  r.classList.add(prsdom.system.repair.unapproved);
                }
                r.appendChild(document.createElement('div')).innerText = cwo.systems[x].repairs[y].appr ? 'YES':'NO';
            }
        }
        document.getElementById('wo-present-membership').innerText = GETmemhead(document.getElementById(prsdom.contract.form.name).value);
        document.getElementById(prsdom.invest.regprice).innerText = cwo.build.regprice;
        document.getElementById(prsdom.invest.memprice).innerText = cwo.build.memprice;
        document.getElementById(prsdom.invest.savings).innerText = cwo.build.savings;
        document.getElementById(prsdom.invest.conmonth).innerText = GETcntrctprice();
    }
}

/* Saves the wo to local storage

*/
var SAVEwo = (cwo)=>{
  var wolist = JSON.parse(localStore.getItem(wolstore.techwo));
  console.log(wolist);
  if(cwo){

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

      //Document CHANGE
  document.addEventListener('change', (ele) => {
      curwo = GETwo(curwo);
      console.log(curwo);
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
