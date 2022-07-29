import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link, useLocation } from "react-router-dom";
import ToolSchedule from '../page/ToolSchedule';
const TestRouter = () => {

    return (
        <Router basename="/demo">
            <div>
                <span><Link to={'/one'}>One</Link></span>
                <span><Link to={'/two'}>Two</Link></span>
            </div>
            <Route exact path='/one' >
                <ToolSchedule task='' isOpen onClose={() => { }}></ToolSchedule>
            </Route>
            <Route exact path='/two' >
                <div>Demo Two</div>
            </Route>
        </Router>
    )
}

export default TestRouter;