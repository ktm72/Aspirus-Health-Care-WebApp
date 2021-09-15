import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => 
                (localStorage.getItem("patientAuthToken") || localStorage.getItem("doctorAuthToken") )?(
                    <Component {...props} />
                ) : (
                    <Redirect to="/patient/signin" />
                )
            }
        />
    );
};

export default PrivateRoute;