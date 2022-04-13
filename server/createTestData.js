function randomDate (num) {
    return `20${(Math.random()*22).toFixed(0).padStart(2,'0')}/${(Math.random()*11+1).toFixed(0)}/${(Math.random()*28+1).toFixed(0)}`;
}

function createTask (id, cmp) {
    const start = randomDate();
    let end = randomDate()
    let complete = randomDate()

    if(!cmp && Math.random()*10 < 5) {
        cmp = true
    }


    while(end < start) {
        end = randomDate();
    }

    while(complete < start) {
        complete = randomDate();
    }

    return {
        taskId: id,
        planDateStart: start,
        planDateEnd: end,
        actlCompleteDate: cmp? null : complete,
        isActlEdieable: 'true',
        isPlanEditable: 'true',
        keyStaget: 'PHK',
        remark: cmp? 'HI I am reamark , this is delay' : null
    }

}

function create (i) {

    return {
        toolInfo: {
            bookNo: 'BookNo' + i,
            IocPhase: 'IocPhase' + i,
            deptName: 'deptName' + i,
            facCd: 'PDAPK' + i,
            typeName: 'typeName' + i,
            sectionName: 'sectionName' + i,
            verdor: 'vendor' + i,
            scope: 'scope' + i,
            function: 'function' + i,
            model: 'model' + i,
            wisCd: 'wisCd' + i,
            catglist: 'catglist' + i,
            locId: 'locId' + i,
            templateCatg: 'templateCatg' + i
        },
        isComplete: {
            'PHK': 'N'
        },
        taskList: [
            createTask('0001', true),
            createTask('0002', true),
            createTask('1000'),
            createTask('1001'),
            createTask('1002'),

        ]
    }
}


module.exports = function () {
    const len = 100;
    const res = [];

    for(let i = 0; i < len; i++) {
        res.push(create(i));
    }

    return res;
}

