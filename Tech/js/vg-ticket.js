


import {
  wodom,
  SETUPbuild
} from './sticket-build.js';

import {
  curbook,
  SETUPfbblock
} from './flbook.js';

import {
  SETUPmembers
} from './vg-membership.js';

import {
  SETupdownside
} from '../../js/vg-util-updownside.js';
var curwo = null; //set the current WO to null


//WO Number CHANGE
document.getElementById(wodom.info.num).addEventListener('change', (ele) => { //WO number input change

    if (ele.target.value != '') {
        document.getElementsByTagName('title')[0].innerText = ele.target.value;
        $(document.getElementById('wo-setup-sys')).show();
        $(document.getElementById('wo-setup-repair')).show();
    }
});

    //PRINT Button
    document.getElementById('wo-save').addEventListener('click', (ele) => {
        window.print();
    });


SETupdownside(true,true,true,false);
SETUPbuild(curwo);
SETUPfbblock();
