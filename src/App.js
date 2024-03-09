import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import Edit from "./components/ui/edit";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:usersId/edit" component={Edit} />
                <Route path="/users/:usersId?" component={Users} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default App;
