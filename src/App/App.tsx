import View from "../View/View";
import "font-awesome/css/font-awesome.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

// v6
// import { Routes, Route, Link } from "react-router-dom";
// v5
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { getData } from "../FakeDoc/createSelection";
import testData from "../test.json";
import Calendar from "../Calendar/Calendar";
import React, { useState } from "react";
import { Provider } from "react-redux";
import createStore from "../Reducer";

import store from "../Reducer/index";
import Filter from "../Filter";
import Progress from "../Progress/Progress";
import Block from "../usePrompt/Demo";
const selected = {
    List: testData.list,
    Info: testData.info,
    Task: testData.task,
};

const filterData = getData();

const taskOption = testData.taskOption;

export const MyContext = React.createContext<{
    controlOpen: number | undefined;
    setControlOpen: (idx: any, open: any) => void;
    getControlOpen: (idx: any) => boolean;
}>({
    controlOpen: undefined,
    setControlOpen: (idx: any, open: any) => {},
    getControlOpen: (idx: any): boolean => {
        return false;
    },
});

function App() {
    // const [controlOpen,setControlOpen] = useState<{[idx:string]: boolean}>({})
    const [controlOpen, setControlOpen] = useState<number | undefined>(
        undefined
    );
    // 可以使用 useMemo
    // 從 task 中取得大節點資料
    const node = taskOption.filter((task) => {
        return task.dateSource === task.keyStage;
    });

    return (
        <Provider store={store}>
            <div className="App">
                {/* <span>
                    <Link to={"/"}>Root</Link>
                </span>
                <span>
                    <Link to={"/filter"}>Filter</Link>
                </span>
                <span>
                    <Link to={"/block"}>block</Link>
                </span> */}

                {/* <Routes>
                    <Route
                        path="/"
                        element={
                            <View
                                selected={selected}
                                node={node}
                                taskOptions={taskOption}
                            />
                        }
                    />
                    <Route
                        path="/filter"
                        element={
                            <Filter
                                data={getData()}
                                // value={[]}
                                filter={[
                                    { label: "Month", key: "month" },
                                    { label: "Year", key: "year" },
                                    { label: "Sales Rep", key: "salesRep" },
                                    { label: "Hand Set", key: "handset" },
                                ]}
                                select={[
                                    { label: "Sale", key: "sale" },
                                    { label: "Sale Date", key: "saleDate" },
                                ]}
                            />
                        }
                    />
                    <Route
                        path="/swiper"
                        element={
                            <Progress
                                cards={[
                                    { title: "PHK", value: 20, max: 60 },
                                    { title: "T1", value: 20, max: 60 },
                                    { title: "T2", value: 20, max: 60 },
                                ]}
                            />
                        }
                    />
                    <Route path="/block" element={<Block />} />
                </Routes> */}

                <Router>
                    <div>
                        <span>
                            <Link to={"/"}>Root</Link>
                        </span>
                        <span>
                            <Link to={"/filter"}>Filter</Link>
                        </span>
                        <span>
                            <Link to={"/block"}>block</Link>
                        </span>
                        <Switch>
                            <Route exact path="/">
                                <View
                                    selected={selected}
                                    node={node}
                                    taskOptions={taskOption}
                                />
                            </Route>
                            <Route exact path="/filter">
                                <Filter
                                    data={getData()}
                                    // value={[]}
                                    // filter={[
                                    //     { label: "Month", key: "month" },
                                    //     { label: "Year", key: "year" },
                                    //     { label: "Sales Rep", key: "salesRep" },
                                    //     { label: "Hand Set", key: "handset" },
                                    // ]}
                                    // select={[
                                    //     { label: "Sale", key: "sale" },
                                    //     { label: "Sale Date", key: "saleDate" },
                                    // ]}
                                />
                            </Route>
                            <Route exact path="/block">
                                <Block />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        </Provider>
    );
}

export default App;
