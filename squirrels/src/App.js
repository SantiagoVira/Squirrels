import { Router, Switch, Route } from "react-router-dom";
import history from "./history";

// Our components

// The header
import Menu from "./Menu/Menu.js";
import Header from "./Header/Header.js";

// Content
import Gallery from "./Gallery/Gallery.js";
import Home from "./Home/Home.js";
import Uploads from "./Uploads/Uploads.js";

// The footer
import Footer from "./Footer/Footer.js";

function App() {
    return (
        <Router history={history}>
            <>
                <Menu />
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
                    </Switch>
                </div>

                <Footer />
            </>
        </Router>
    );
}

export default App;
