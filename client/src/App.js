import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import {AuthContext} from './context/AuthContext';
import {useRoutes} from './routes';
import {useAuth} from './hooks/auth.hook';
import {Navbar} from './components/Navbar';
import {Loader} from './components/Loader';

import 'materialize-css';
import './index.css';


function App() {
    const {login, logout, token, userId, ready} = useAuth();
    const isAuthenticated = Boolean(token);
    const routes = useRoutes(isAuthenticated);

    if (!ready) {
        return <Loader/>;
    }

    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                token,
                userId,
                isAuthenticated,
            }}
        >
            <Router>
                {isAuthenticated && <Navbar/>}
                <div className="container">
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
