import { Router, Switch, Route, withRouter } from "react-router-dom";
import history from "./history";

// Our components

// The header
import Menu from "./Menu/Menu.js";
import Header from "./Header/Header.js";

// Content
import Gallery from "./Gallery/Gallery.js";
import Home from "./Home/Home.js";
import Uploads from "./Uploads/Uploads.js";
import About from "./About/About.js";

// The footer
import Footer from "./Footer/Footer.js";

//UseState
import { useState, useEffect } from "react";

function App() {
    const [page, setPage] = useState(window.location.href);
    const ChangeListener = ({ history }) => {
        useEffect(
            () =>
                history.listen(() => {
                    setPage(window.location.href);
                }),
            []
        );
        return <div />;
    };

    const Changer = withRouter(ChangeListener);
    return (
        <Router history={history}>
            <>
                <Changer />
                <Menu page={page} />
                <Header />

                <div className="content">
                    <Switch>
                        {
                            // We might want to abstract the routes/header thing
                            // https://reactrouter.com/web/example/route-config
                            // ^^ Menu can take routes as props
                        }
                        <Route path="/" exact component={Home}></Route>
                        <Route
                            path="/gallery"
                            exact
                            component={Gallery}
                        ></Route>
                        <Route
                            path="/uploads"
                            exact
                            component={Uploads}
                        ></Route>
                        <Route path="/about" exact component={About}></Route>
                    </Switch>
                </div>

                <Footer />
            </>
        </Router>
    );
}

export default App;
