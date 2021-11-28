import { Login } from './Pages/Login/login';
import { Register } from './Pages/Register/register';
import { Movies } from './Pages/Movies/movies';
import { InfoMovie } from './Pages/InfoMovie/infomovie';
import { Profile } from './Pages/Profile/profile';
import { Nav } from './Components/Nav/nav';
import css from './App.module.css';

// contexts
import { UserContextProvider } from "./Context/userContext";
import { MovieContextProvider } from "./Context/moviesContext";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
 

const App = () => {
    return (
        <UserContextProvider>
            <div className={css["App"]}>
                <Router>
                    <Nav/>
                    <MovieContextProvider>
                        <Switch>
                            <Route path="/movie/:title" component={InfoMovie}/>
                            <Route path="/movie" component={Movies}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/register" component={Register}/>
                            <Route path="/profile" component={Profile}/>
                        </Switch>
                    </MovieContextProvider>
                </Router>
            </div>
        </UserContextProvider>
    )
}

export default App;
