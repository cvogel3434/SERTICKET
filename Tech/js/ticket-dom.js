export var dashdom = {
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

export var wodom = {
    cont: '',
    info: {
        num: 'wo-info-num',
        name: 'wo-info-customer',
        address: 'wo-info-address'
    }
}

export var cntrctform = {
    cont: 'wo-present-contract-cont',
    form: {
        cont: 'present-contract-opts',
        memappr: 'wo-contract-appr',
        desc: 'present-contract-opt-desc',
        quantity: 'present-contract-opt-quantity',
        appr: 'present-contract-opt-appr',
        name: 'present-contract-name',
        month: 'present-contract-monthly',

        inputs: {
            sys: 'present-contract-addsys',
            comp: 'present-contract-addcomp',
            stdfltr: 'present-contract-addstdflt',
            spcfltr: 'present-contract-addspcflt',
            humpad: 'present-contract-addhumpad',
            timesave: 'present-contract-addtimesave'
        }
    }
}

export var prsdom = {
    cont: 'wo-presentation-cont',
    head: 'wo-presentaiton-header',
    button:{
      open:'button-open-presentation'
    },
    contract: cntrctform, //from vg-membership.js
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

export var sysdom = { //System DOM
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

export var fbdom = { //Flate Rate DOM
    cont: 'wo-setup-repair',
    special:{
      diagnostic:'flatrate-repair-diagnostic',
      cleancheck:'flatrate-repair-cleancheck'
    },
    search: {
        book: 'wo-repair-search-book',
        value: 'wo-repair-search-value',
        pl: 'wo-repair-search-pl',
        fltr: 'wo-repair-search-column'
    },
    table: {
        cont: 'flatrate-search-table',
        row: {
            cont: '',
            task: 'flatrate-taskid',
            desc: 'flatrate-desc',
            value: 'flatrate-value'
        }
    },
    lists: {
        pls: 'flatrate-book-pl-list'
    }
}
