import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import Driverpage from "./driver/Driverpage";
import Homepage from "../pages/Homepage";
import LoginUi from "../containers/LoginUi";
import Kendaraanpage from "./kendaraan/kendaraanPage";

export default function AppRouter(props) {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/" component={LoginUi} />
                    <Route exact path='/driver' component={Driverpage} />
                    <Route exact path='/kendaraan' component={Kendaraanpage} />
                </Switch>
            </Router>
        </>
    )
}