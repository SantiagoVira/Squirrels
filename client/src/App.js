import { Router, Switch, Route, withRouter, matchPath } from "react-router-dom";
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
import CardLoader from "./CardLoader";

function App() {
    const [page, setPage] = useState(window.location.href);
    const [user, setUser] = useState({ isLoggedIn: null, username: "" });

    useEffect(() => {
        const getUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if(token) {
                    const response = await api.get("/api/current_user/", {
                        headers: {
                            Authorization: `JWT ${token}`
                        }
                    })
                    setUser({isLoggedIn: true, username: response.data.user.username})
                } else {
                    setUser({isLoggedIn: false, username: ""})
                }
            } catch(err) {};
        };
        getUser();
    }, []);

    const changeUser = (data) => {
        setUser(data);
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
    function Cardlink(props) {
        console.log(props.page);
        return props.page.includes("/card") ? null : props.children;
        //<Cardlink page={page}></Cardlink>
    }
    return (
        <Router history={history}>
            <>
                <Cardlink page={page}>
                    <Changer />
                </Cardlink>
                <Cardlink page={page}>
                    <Menu page={page} user={user} changeUser={changeUser} />
                </Cardlink>
                <Cardlink page={page}>
                    <Header />
                </Cardlink>

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
                        <Route path="/card/:id" component={CardLoader}></Route>
                        <Route component={Error404} />
                    </Switch>
                </div>

                <Cardlink page={page}>
                    <Footer />
                </Cardlink>
            </>
        </Router>
    );
}

export default App;
