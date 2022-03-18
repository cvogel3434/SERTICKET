


    var fltbook = {
        comm: [

        ],
        res: [
        ]
    }


    var fltrs = (book, flts = {}) => {
        var finds = [];
        var bad;
        if (book) {
            for (let x = 0; x < book.length; x++) {
                bad = false;
                for (let f in flts) {
                    if (book[x][f] && !book[x][f].includes(flts[f].toUpperCase()) || book[x][f] == '') {
                        bad = true;
                        break;
                    }
                }
                if (!bad) {
                    finds.push(book[x]);
                }
            }
        }
        return finds;
    }

    var switchBook = (ele) => {
        switch (ele.target.value) {
            case 'Res Book': {
                curbook = fltbook.res; break;
            }
            case 'Comm Book': {
                curbook = fltbook.comm; break;
            }
            case '': {
                curbook = null; break;
            }
            default: {
                ele.target.value = '';
            }
        }
        setPriceLevel();
    }

    var setPriceLevel = () => {
        let dlist = document.getElementById(fbdom.lists.pls);
        let opt;
        dlist.innerHTML = '';
        if (curbook) {
            for (let f in curbook[0]) {
                if (f.includes('pl')) {
                    opt = document.createElement('option');
                    opt.innerText = curbook[0][f];
                    dlist.appendChild(opt);
                }
            }
        }
    }

    var specialrep = {
      'CLNCHK':{
        'STA':149,
        'AHR':149,
        'CLA':0,
        'PRE':0,
        'ULT':0
      },
      'DIAG':{
        'STA':119,
        'AHR':149,
        'CLA':119,
        'PRE':59.5,
        'ULT':0
      }

    }
    var GETbookprice = (tnum, tpl) => {
        let pl = 'pl';
        let count = '';
        let cnum = 1;

        if (curbook) {
            for (let x = 0; x < curbook.length; x++) {
                if (curbook[x].num == tnum ){

                    while (curbook[x][pl + count] != undefined) {
                        if (curbook[x][pl + count] == tpl) {
                            return curbook[x]['sp' + count];
                        }
                        count = '_' + cnum++;
                    }
                }
            }
        }
        for(let s in specialrep){
          if(s ==tnum){return specialrep[tnum][tpl]}
        }

        return 0;
    }
    var loadFBFound = (finds, pl) => {
        let fbstable = document.getElementById(fbdom.table.cont);
        let row;
        let data;
        let val;
        let foundpl = false;
        fbstable.innerHTML = '';
        for (let x = 0; x < finds.length; x++) {
            row = document.createElement('tr');
            row.addEventListener('click', (ele) => {
                ADDrepair({
                    task: ele.target.parentNode.children[0].innerText,
                    desc: ele.target.parentNode.children[1].innerText
                });
            });
            for (let f in finds[x]) {
                val = '';
                if (f == 'desc' || f == 'num') {
                    val = finds[x][f];
                }
                else if (finds[x][f] == pl) {
                    foundpl = true;
                    if (f.includes('_')) {
                        val = finds[x]['sp_' + f.split('_')[1]];
                    } else { val = finds[x].sp }
                }
                if (val != '') {
                    data = document.createElement('td')

                    data.innerText = val;
                    row.appendChild(data);
                }
            }
            if (!foundpl) { alert('Select Price Level'); return false }

            fbstable.appendChild(row);
        }
    }

    var getSearchList = (ele) => {
            let sval = document.getElementById(fbdom.search.value).value;
            let plval = document.getElementById(fbdom.search.pl).value;
            switch (document.getElementById(fbdom.search.fltr).value) {
                case 'Task Description': {
                    loadFBFound(fltrs(curbook, { desc: sval }), plval);
                    break;
                }
                case 'Task Code': {
                    loadFBFound(fltrs(curbook, { desc: sval }), plval);
                    break;
                }
            }
        }