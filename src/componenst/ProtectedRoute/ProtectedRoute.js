import React from "react";
import { Route, Redirect } from "react-router-dom";

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту

const ProtectedRoute = ({ component: Component, ...rest  }) => {
  return (
    <Route {...rest} render={props => rest.loggedIn ? <Component {...props} {...rest} /> : <Redirect to="/signin" />} />
)}

export default ProtectedRoute;