import { Redirect, Route } from "react-router-dom";

const PatientPrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => 
                localStorage.getItem("patientAuthToken") ?(
                    <Component {...props} />
                ) : (
                    <Redirect to="/patient/signin" />
                )
            }
        />
    );
};

export default PatientPrivateRoute;