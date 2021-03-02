import React from "react";

import { Router, Switch, Route, withRouter } from "react-router-dom";
import history from "./history";
import api from "./api";

// Our components

// The header
import Menu from "./Menu/Menu.js";
import HamburgerMenu from "./Menu/HamburgerMenu.js";
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
import CardLoader from "./CardLoader";

function App() {
    const [page, setPage] = useState(window.location.href);
    const [user, setUser] = useState({
        isLoggedIn: null,
        profile: null,
    });
    const [size, setSize] = useState(window.innerWidth);

    useEffect(() => {
        const getUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const response = await api.get("/api/current_user/");
                    setUser({
                        isLoggedIn: true,
                        profile: response.data,
                    });
                }
            } catch (err) {
                // If JWT is invalid, remove it from localstorage and refresh page
                if(err.response.status === 401) {
                    localStorage.removeItem("token");
                    history.go(0);
                }
            }
        };
        getUser();
        window.addEventListener("resize", () => {
            setSize(window.innerWidth);
        });
    }, []);

    // Passed to children components to change user
    const changeUser = (data) => {
        setUser(data);
    };

    const ChangeListener = ({ history }) => {
        useEffect(() => {
            const unlisten = history.listen(() => {
                setPage(window.location.href);
            });

            return unlisten;
        }, []);

        return <div></div>;
    };

    const Changer = withRouter(ChangeListener);
    function Cardlink(props) {
        return history.location.pathname.includes("/card")
            ? null
            : props.children;
        //<Cardlink page={page}></Cardlink>
    }
    return (
        <Router history={history}>
            <>
                <Cardlink page={page}>
                    <Changer />
                </Cardlink>
                <Cardlink>
                    {size >= 935 ? (
                        <Menu page={page} user={user} changeUser={changeUser} />
                    ) : (
                        <HamburgerMenu
                            page={page}
                            user={user}
                            changeUser={changeUser}
                        />
                    )}
                </Cardlink>
                <Cardlink>
                    <Header />
                </Cardlink>

                <div className="content">
                    <Switch>
                        {
                            // We might want to abstract the routes/header thing
                            // https://reactrouter.com/web/example/route-config
                            // ^^ Menu can take routes as props
                        }
                        <Route
                            path="/"
                            exact
                            render={() => (
                                <Home user={user} changeUser={changeUser} />
                            )}
                        ></Route>
                        <Route
                            path="/gallery"
                            exact
                            render={() => <Gallery user={user} changeUser={changeUser} />}
                        ></Route>
                        <Route path="/about" exact component={About}></Route>
                        <Route
                            path="/create"
                            exact
                            render={() => <Create user={user} />}
                        ></Route>
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
                        <Route
                            path="/card/undefined"
                            exact
                            component={Error404}
                        />
                        <Route path="/card/:id" component={CardLoader}></Route>
                        <Route component={Error404} />
                    </Switch>
                </div>

                <Cardlink>
                    <Footer />
                </Cardlink>
            </>
        </Router>
    );
}

export default App;
