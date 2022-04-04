
import {cntrctform,fbdom} from './ticket-dom.js';

export class RewardsMembership{
  constructor(form=null){
    this.pricing = {
        CLASSIC: {
            pl: 'CLA',
            month: 24,
            add: {
                sys: 21,
                comp: 12,
                stdfltr: 5,
                humpad: 5,
                spcfltr: 12,
                timesave: -4
            }
        },
        PREMIUM: {
            pl: 'PRE',
            month: 33,
            add: {
                sys: 29,
                comp: 12,
                stdfltr: 0,
                humpad: 0,
                spcfltr: 7,
                timesave: -4
            }
        },
        ULTIMATE: {
            pl: 'ULT',
            month: 44,
            add: {
                sys: 37,
                comp: 12,
                stdfltr: 0,
                humpad: 0,
                spcfltr: 7,
                timesave: -4
            }
        }
    }
    this.SETformob(form); //initialize form object
    this.SETcntrctform(); //initialize form display

    document.getElementById(cntrctform.cont).addEventListener('change', (ele) => {
        if(ele.target.id == cntrctform.form.name){this.SETcntrctform();}
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
  SETformob = (form = null)=>{

    this.form= (form !=undefined && form !=null) ? form: { //form to
      pl:'PREMIUM',
      add:{ //these should match that of the form dom element
        sys:0,
        comp:0,
        stdfltr:0,
        humpad:0,
        spcfltr:0,
        timesave:0
      }
    }
    return this.form;

  }
  LOADform = ()=>{
    document.getElementById(cntrctform.form.name).value = this.form.pl;
    if (this.form.pl != '' && this.pricing[this.form.pl] != undefined) {
        document.getElementById(cntrctform.form.month).innerText = this.pricing[this.form.pl].month;
        for (let p in cntrctform.form.inputs) {
            document.getElementById(cntrctform.form.inputs[p]).innerText = this.pricing[this.form.pl].add[p];
            document.getElementById(cntrctform.form.inputs[p]).parentNode.getElementsByClassName(cntrctform.form.quantity)[0].value = this.form.add[p];
        }
    }

  }
  SETcntrctform = () => {
      this.form.pl = document.getElementById(cntrctform.form.name).value;
      if (this.form.pl != '' && this.pricing[this.form.pl] != undefined) {
          document.getElementById(cntrctform.form.month).innerText = this.pricing[this.form.pl].month;
          for (let p in cntrctform.form.inputs) {
              document.getElementById(cntrctform.form.inputs[p]).innerText = this.pricing[this.form.pl].add[p];
              document.getElementById(cntrctform.form.inputs[p]).parentNode.getElementsByClassName(cntrctform.form.quantity)[0].value = this.form.add[p];
          }
      }
  }

  //returns the contract price from form, multiplied by pmnts (pmnts=12 == annual payment)
  GETformprice = (pmnts = 1) => { //get price from form
      this.form.pl = document.getElementById(cntrctform.form.name).value;
      let month = document.getElementById(cntrctform.form.month).parentNode;
      let conappr = document.getElementById(cntrctform.form.memappr);
      let price = 0;
      if(conappr.checked){ //if the memebership has been "checked-on"
        price = Number(document.getElementById(cntrctform.form.month).innerText);
      }
      for (let i in cntrctform.form.inputs) {
          let opt = document.getElementById(cntrctform.form.inputs[i]).parentNode;
          let optval = Number(document.getElementById(cntrctform.form.inputs[i]).innerText);
          this.form.add[i] = opt.getElementsByClassName(cntrctform.form.quantity)[0].value != '' && opt.getElementsByClassName(cntrctform.form.quantity)[0].value >=0 ? Number(opt.getElementsByClassName(cntrctform.form.quantity)[0].value) : 0;
          if(conappr.checked && this.form.add[i] != '' && this.form.add[i] > 0){
            price += optval * this.form.add[i]; //add to memebership price
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
