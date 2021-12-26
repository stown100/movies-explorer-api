import React from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import ProtectedRoute from './componenst/ProtectedRoute/ProtectedRoute'
import './App.css';
import Main from './componenst/Main/Main';
import ErrorHandler from './componenst/ErrorHandler/ErrorHandler';
import Register from './componenst/Register/Register';
import Login from './componenst/Login/Login';
import Movies from './componenst/Movies/Movies';
import SavedMovies from './componenst/SavedMovies/SavedMovies';
import Profile from './componenst/Profile/Profile';
import * as Auth from './utils/Auth';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  const history = useHistory();

  const onRegister = ({ name, email, password }) => {
    return Auth.register(name, email, password)
    .then((res) => {
      console.log('123')
      if (!res || res.statusCode === 400) throw new Error('Что-то пошло не так')
      return res;
    })
  };

  const onLogin = ({ email, password }) => {
    return Auth.login(email, password)
      .then((res) => {
        if (!res.token) throw new Error('Неправильные имя пользователя или пароль');
        else {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
        }
      })
  }

  React.useEffect(() => {
    if (loggedIn) history.push('/movies');
  }, [loggedIn]);

  // Выйти из акаунта
  const onSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/');
  };

  return (
    <div className="App">
      <div className="page">
        <Switch>

          <ProtectedRoute exact loggedIn={loggedIn} path="/">
            <Main />
          </ProtectedRoute>

          <Route path="/movies">
            <Movies />
          </Route>

          <Route path="/saved-movies">
            <SavedMovies />
          </Route>

          <Route path="/profile">
            <Profile onSignOut={onSignOut}/>
          </Route>

          <Route path="/error">
            <ErrorHandler />
          </Route>

          <Route path="/signup">
            <Register onRegister={onRegister}/>
          </Route>

          <Route path="/signin">
            <Login onLogin={onLogin} />
          </Route>

        </Switch>
        {/* {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />} */}
      </div>
    </div>
  );
}

export default App;
