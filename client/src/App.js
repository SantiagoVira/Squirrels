import { Router, Switch, Route, withRouter } from "react-router-dom";
import history from "./history";
import api from "./api";

// Our components

// The header
import Menu from "./Menu/Menu.js";
import Header from "./Header/Header.js";

// Content
import Gallery from "./Gallery/Gallery.js";
import Home from "./Home/Home.js";
import About from "./About/About.js";
import Create from "./Create/Create.js";
import Login from "./Auth/Login.js";
import Register from "./Auth/Register.js";

// The footer
import Footer from "./Footer/Footer.js";

//404
import Error404 from "./404/404.js";

//UseState
import { useState, useEffect } from "react";

function App() {
    const [page, setPage] = useState(window.location.href);
    const [user, setUser] = useState({ isLoggedIn: false, username: "" });

    // useEffect(async () => {
    //     const token = localStorage.getItem("token");
    //     if(token) {
    //         const response = await api.get("/users/", {
    //             headers: {
    //                 Authorization: `JWT ${token}`
    //             }
    //         })
    //         console.log(response.data)
    //         //setUser({isLoggedIn: true, username: response.data})
    //     };
    // }, []);

    const changeUser = (isLoggedIn, username) => {
        setUser({ isLoggedIn: isLoggedIn, username: username });
    };

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
                <Menu page={page} user={user} changeUser={changeUser} />
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
                        <Route path="/about" exact component={About}></Route>
                        <Route path="/create" exact component={Create}></Route>
                        <Route
                            path="/login"
                            exact
                            render={() => <Login changeUser={changeUser} />}
                        ></Route>
                        <Route
                            path="/register"
                            exact
                            render={() => <Register changeUser={changeUser} />}
                        ></Route>
                        <Route component={Error404} />
                    </Switch>
                </div>

                <Footer />
            </>
        </Router>
    );
}

export default App;
