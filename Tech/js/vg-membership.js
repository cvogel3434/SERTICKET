
import {cntrctform,fbdom} from './ticket-dom.js';

export class RewardsMembership{
  constructor(){
    this.pricing = {
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

    document.getElementById(cntrctform.form.name).value = "PREMIUM"; //Default Contract
    document.getElementById(cntrctform.cont).addEventListener('change', (ele) => {
        this.SETcntrctform();
        this.GETformprice();
    });

  }

  //Pass the name from the contract FORM
  //Either uses that OR the associated pl
  GETmemhead = (pname)=>{
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

  GETcntrctpl = (pname)=>{
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

  SETcntrctform = () => {
      let conname = document.getElementById(cntrctform.form.name).value;
      if (conname != '' && this.pricing[conname] != undefined) {
          document.getElementById(cntrctform.form.month).innerText = this.pricing[conname].month;
          for (let p in cntrctform.form.inputs) {
              document.getElementById(cntrctform.form.inputs[p]).innerText = this.pricing[conname].add[p];
          }
      }
  }
  //returns the contract price from form, multiplied by pmnts (pmnts=12 == annual payment)
  GETformprice = (pmnts = 1) => { //get price from form
      let conname = document.getElementById(cntrctform.form.name).value;
      let price = 0;
      if (conname != '' && this.pricing[conname] != undefined) {
          price = Number(document.getElementById(cntrctform.form.month).innerText);
          for (let i in cntrctform.form.inputs) {
              let opt = document.getElementById(cntrctform.form.inputs[i]).parentNode;
              if (opt.getElementsByClassName(cntrctform.form.appr)[0].checked) {
                  price += Number(document.getElementById(cntrctform.form.inputs[i]).innerText) * (opt.getElementsByClassName(cntrctform.form.quantity)[0].value != '' ? opt.getElementsByClassName(cntrctform.form.quantity)[0].value : 0);
              }
          }
      }
      return price;
  }

  ISmember = (pl) => {//sees if the price level is a contract level
      if (pl == 'CLA' || pl == 'PRE' || pl == 'ULT'){
        return true;
      }
      return false;
  }

}

export var SETUPmembers = ()=>{

  document.getElementById(prsdomcntrct.form.name).value = "PREMIUM";
  document.getElementById(prsdomcntrct.cont).addEventListener('change', (ele) => {
      SETcntrctform();
      GETcntrctprice();
  });

}
