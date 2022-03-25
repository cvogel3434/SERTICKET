
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

        sys.appendChild(document.createElement('img')).src = '../../images/icons/trash.png';
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
var ADDrepair = (row = {}) => {
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

    r.appendChild(document.createElement('img')).src = '../../images/icons/trash.png';
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

//get the correct regular price to use
var GETregpl = (pname)=>{
  if(pname == 'STA' || pname =='AHR'){
    return pname
  }else{return defpl}
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
          memmonth:GETcntrctprice(12)
        },
        // presentation!!
        systems: GETSysList()
    }

    if(cwo){

    }else{ //new wo / reset

    }
    return nwo
}
