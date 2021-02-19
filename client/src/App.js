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
    //const [page, setPage] = useState(window.location.href);
    const [user, setUser] = useState({ isLoggedIn: null, username: "" });

    useEffect(() => {
        const getUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if(token) {
                    const response = await api.get("/api/current_user/")
                    setUser({isLoggedIn: true, username: response.data.username})
                }
            } catch (err) {}
        };
        getUser();
    }, []);

    // To change user in children components
    const changeUser = (data) => {
        setUser(data);
    };

    // const ChangeListener = ({ history }) => {
    //     useEffect(
    //         () =>
    //             history.listen(() => {
    //                 setPage(window.location.href);
    //             }),
    //         []
    //     );
    //     return <div />;
    // };

    // const Changer = withRouter(ChangeListener);
    function Cardlink(props) {
<<<<<<< HEAD
        return props.page.includes("/card") ? null : props.children;
=======
        return history.location.pathname.includes("/card")
            ? null
            : props.children;
>>>>>>> b6e17ae402e57ae4ec31942f2c14c15cc3dea805
        //<Cardlink page={page}></Cardlink>
    }
    return (
        <Router history={history}>
            <>
                {/*<Cardlink page={page}><Changer /></Cardlink>*/}
                <Cardlink>
                    <Menu
                        page={history.location.pathname}
                        user={user}
                        changeUser={changeUser}
                    />
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
