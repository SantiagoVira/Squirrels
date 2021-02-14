import "./App.css";
import {Router, Switch, Route} from "react-router-dom";
import history from "./history";
import Menu from "./Menu";
import Landing from "./Landing";

function App() {
    return (
        <Router history={history}>
            <div className="App">
                <Menu />
                <Switch>
                    <Route path="/" exact component={Landing}></Route>
                    <Route path="/gallery" exact></Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
