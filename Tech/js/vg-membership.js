


var conprice = {
    CLASSIC: {
        pl: 'CLA',
        month: 24,
        add: {
            sys: 21,
            comp: 12,
            stdflt: 5,
            humpad: 5,
            spcflt: 12,
            timesave: -4
        }
    },
    PREMIUM: {
        pl: 'PRE',
        month: 33,
        add: {
            sys: 29,
            comp: 12,
            stdflt: 0,
            humpad: 0,
            spcflt: 7,
            timesave: -4
        }
    },
    ULTIMATE: {
        pl: 'ULT',
        month: 44,
        add: {
            sys: 37,
            comp: 12,
            stdflt: 0,
            humpad: 0,
            spcflt: 7,
            timesave: -4
        }
    }
}

export var prsdomcntrct = {
    cont: 'wo-present-contract-cont',
    form: {
        cont: 'present-contract-opts',

        desc: 'present-contract-opt-desc',
        quantity: 'present-contract-opt-quantity',
        appr: 'present-contract-opt-appr',
        name: 'present-contract-name',
        month: 'present-contract-monthly',

        inputs: {
            sys: 'present-contract-addsys',
            comp: 'present-contract-addcomp',
            stdflt: 'present-contract-addstdflt',
            spcflt: 'present-contract-addspcflt',
            humpad: 'present-contract-addhumpad',
            timesave: 'present-contract-addtimesave'
        }
    }
}
//Pass the name from the contract FORM
//Either uses that OR the associated pl
export var GETmemhead = (pname)=>{
  switch(pname){
    case 'CLASSIC': return 'CLASSIC'
    case 'PREMIUM': return 'PREMIUM'
    case 'ULTIMATE': return 'ULTIMATE'
    case '':
      switch(document.getElementById(fbdom.search.pl).value){
        case 'CLA':return 'CLASSIC'
        case 'PRE':return 'PREMIUM'
        case 'ULT':return 'ULTIMATE'
      }
  }
}

export var HasContract = (pl) => {
    if (pl == 'CLA' || pl == 'PRE' || pl == 'ULT'){
      return true;
    }
    return false;
}

//  CONTRACT FORM   ////////////////////////
var SETcntrctform = () => {
    let conname = document.getElementById(prsdomcntrct.form.name).value;
    if (conname != '' && conprice[conname] != undefined) {
        document.getElementById(prsdomcntrct.form.month).innerText = conprice[conname].month;
        for (let p in prsdomcntrct.form.inputs) {
            document.getElementById(prsdomcntrct.form.inputs[p]).innerText = conprice[conname].add[p];
        }
    }
}

//returns the contract price from form, multiplied by pmnts (pmnts=12 == annual payment)
export var GETcntrctprice = (pmnts = 1) => {
    let conname = document.getElementById(prsdomcntrct.form.name).value;
    let price = 0;
    if (conname != '' && conprice[conname] != undefined) {
        price = Number(document.getElementById(prsdomcntrct.form.month).innerText);
        for (let i in prsdomcntrct.form.inputs) {
            let opt = document.getElementById(prsdomcntrct.form.inputs[i]).parentNode;
            if (opt.getElementsByClassName(prsdomcntrct.form.appr)[0].checked) {
                price += Number(document.getElementById(prsdomcntrct.form.inputs[i]).innerText) * (opt.getElementsByClassName(prsdomcntrct.form.quantity)[0].value != '' ? opt.getElementsByClassName(prsdomcntrct.form.quantity)[0].value : 0);
            }
        }
    }
    return price;
}

export var GETcntrctpl = (pname)=>{

  switch(pname){ //first try and use the contract form
    case 'CLASSIC':
      return 'CLA'
    case 'PREMIUM':
      return 'PRE'
    case 'ULTIMATE':
      return 'ULT'
    case '':
      switch(document.getElementById(fbdom.search.pl).value){
        case 'CLA':return 'CLA'
        case 'PRE':return 'PRE'
        case 'ULT':return 'ULT'
      }
  }
  return ''
  }


export var SETUPmembers = ()=>{

  document.getElementById(prsdomcntrct.form.name).value = "PREMIUM";
  document.getElementById(prsdomcntrct.cont).addEventListener('change', (ele) => {
      SETcntrctform();
      GETcntrctprice();
  });

}
