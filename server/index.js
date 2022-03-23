const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const cors = require('cors');

const app = express()
app
    .use(cors())
    .use(bodyParser.urlencoded({
        limit: "4mb",
        extended: false
    }))
    .use(bodyParser.json({
        limit: "4mb"
    }))
// .use("/api", routes)

const myschedule = [{
    toolInfo: {
        bookNo: 'bookNo_1',
        IocPhase: 'IocPhase_1',
        deptName: 'deptName_1',
        facCd: 'PDAPK1',
        typeName: 'typeName_1',
        sectionName: 'sectionName_1',
        verdor: 'vendor_1',
        scope: 'scope_1',
        function: 'function_1',
        model: 'model_1',
        wisCd: 'wisCd_1',
        catglist: 'catglist_1',
        locId: 'locId_1',
        templateCatg: 'templateCatg_1'
    },
    isComplete: {
        'PHK': 'N'
    },
    taskList: [
        {
            taskId: '0001',
            planDateStart: '2011/7/1',
            planDateEnd: '2018/9/2',
            actlCompleteDate: null,
            isActlEdieable: 'true',
            isPlanEditable: 'true',
            keyStaget: 'PHK'
        },
        {
            taskId: '0002',
            planDateStart: '2017/5/20',
            planDateEnd: '2021/7/8',
            actlCompleteDate: null,
            isActlEdieable: 'true',
            isPlanEditable: 'false',
            keyStaget: 'T1'
        },
        {
        taskId: 1000,
        planDateStart: '2020/1/11',
        planDateEnd: '2021/1/27',
        actlCompleteDate: '2021/2/2',
        isActlEdieable: 'true',
        isPlanEditable: 'true',
        keyStaget: 'PHK'
    }, {
        taskId: 1001,
        planDateStart: '2020/1/28',
        planDateEnd: '2021/1/30',
        actlCompleteDate: '2021/2/2',
        isActlEdieable: 'true',
        isPlanEditable: 'true',
        keyStaget: 'T1'
    }, {
        taskId: 1002,
        planDateStart: '2020/1/3',
        planDateEnd: '2021/1/18',
        actlCompleteDate: '2021/2/2',
        isActlEdieable: 'true',
        isPlanEditable: 'true',
        keyStaget: 'PHK'
    }]
}, {
    toolInfo: {
        bookNo: 'bookNo_2',
        IocPhase: 'IocPhase_2',
        deptName: 'deptName_2',
        facCd: 'PDAPK2',
        typeName: 'typeName_2',
        sectionName: 'sectionName_2',
        verdor: 'vendor_2',
        scope: 'scope_2',
        function: 'function_2',
        model: 'model_2',
        wisCd: 'wisCd_2',
        catglist: 'catglist_2',
        locId: 'locId_2',
        templateCatg: 'templateCatg_2'
    },
    isComplete: {
        'PHK': 'N'
    },
    taskList: [
        {
            taskId: '0001',
            planDateStart: '2011/7/1',
            planDateEnd: '2018/9/2',
            actlCompleteDate: null,
            isActlEdieable: 'true',
            isPlanEditable: 'true',
            keyStaget: 'PHK'
        },
        {
            taskId: '0002',
            planDateStart: '2017/5/20',
            planDateEnd: '2021/7/8',
            actlCompleteDate: null,
            isActlEdieable: 'true',
            isPlanEditable: 'false',
            keyStaget: 'T1'
        },
        {
        taskId: 1000,
        planDateStart: '2020/1/1',
        planDateEnd: '2021/1/2',
        actlCompleteDate: '2021/2/2',
        isActlEdieable: 'true',
        isPlanEditable: 'true',
        keyStaget: 'PHK'
    }, {
        taskId: 1001,
        planDateStart: '2020/1/1',
        planDateEnd: '2021/1/2',
        actlCompleteDate: '2021/2/2',
        isActlEdieable: 'true',
        isPlanEditable: 'true',
        keyStaget: 'T1'
    }, {
        taskId: 1002,
        planDateStart: '2020/1/1',
        planDateEnd: '2021/1/2',
        actlCompleteDate: '2021/2/2',
        isActlEdieable: 'true',
        isPlanEditable: 'true',
        keyStaget: 'PHK'
    }]
}, {
    toolInfo: {
        bookNo: 'bookNo_3',
        IocPhase: 'IocPhase_3',
        deptName: 'deptName_3',
        facCd: 'PDAPK3',
        typeName: 'typeName_3',
        sectionName: 'sectionName_3',
        verdor: 'vendor_3',
        scope: 'scope_3',
        function: 'function_3',
        model: 'model_3',
        wisCd: 'wisCd_3',
        catglist: 'catglist_3',
        locId: 'locId_3',
        templateCatg: 'templateCatg_3'
    },
    isComplete: {
        'PHK': 'N'
    },
    taskList: [
        {
            taskId: '0001',
            planDateStart: '2011/7/1',
            planDateEnd: '2018/9/2',
            actlCompleteDate: null,
            isActlEdieable: 'true',
            isPlanEditable: 'true',
            keyStaget: 'PHK'
        },
        {
            taskId: '0002',
            planDateStart: '2017/5/20',
            planDateEnd: '2021/7/8',
            actlCompleteDate: null,
            isActlEdieable: 'true',
            isPlanEditable: 'false',
            keyStaget: 'T1'
        },
        {
            taskId: '1000',
            planDateStart: '2020/1/1',
            planDateEnd: '2021/1/2',
            actlCompleteDate: '2021/2/2',
            isActlEdieable: 'true',
            isPlanEditable: 'true',
            keyStaget: 'PHK'
        }, {
            taskId: '1001',
            planDateStart: '2020/1/1',
            planDateEnd: '2021/1/2',
            actlCompleteDate: '2021/2/2',
            isActlEdieable: 'true',
            isPlanEditable: 'true',
            keyStaget: 'T1'
        }, {
            taskId: '1002',
            planDateStart: '2020/1/1',
            planDateEnd: '2021/1/2',
            actlCompleteDate: '2021/2/2',
            isActlEdieable: 'true',
            isPlanEditable: 'true',
            keyStaget: 'PHK'
        }]
}]

app.post("/myschedule/main", function (req, res) {
    res.json(myschedule)
})

const port = process.env.PORT || 8000;
app.listen(port, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})

