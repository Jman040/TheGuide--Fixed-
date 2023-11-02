import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { CitiesList } from "./cities/CitiesList";
import { CityDetails } from "./cities/CityDetails";
import { MyCitiesList } from "./myCities/myCities";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
    return (
        <Routes>
            <Route path="/">
                <Route
                    element={
                        <AuthorizedRoute loggedInUser={loggedInUser}>

                        </AuthorizedRoute>
                    }
                />
                <Route
                    path="/cities/:id"
                    element={
                        <AuthorizedRoute loggedInUser={loggedInUser}>
                            <CityDetails loggedInUser={loggedInUser} />
                        </AuthorizedRoute>
                    }
                />
                {/* Below: 
        "The Route group create two routes for workorders. 
        The route marked index will match to workorders with no extra url segments. 
        The create route will match /workorders/create." */}
                <Route path="/cities">
                    <Route
                        index
                        element={
                            <AuthorizedRoute loggedInUser={loggedInUser}>
                                <CitiesList loggedInUser={loggedInUser} />
                            </AuthorizedRoute>
                        }
                    />
                </Route>
                <Route path="/myCities">
                    <Route
                        index
                        element={
                            <AuthorizedRoute loggedInUser={loggedInUser}>
                                <MyCitiesList loggedInUser={loggedInUser} />
                            </AuthorizedRoute>
                        }
                    />
                </Route>
                {/* <Route
                    path=""
                    element={
                        <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>

                        </AuthorizedRoute>
                    }
                /> */}
                <Route
                    path="login"
                    element={<Login setLoggedInUser={setLoggedInUser} />}
                />
                <Route
                    path="register"
                    element={<Register setLoggedInUser={setLoggedInUser} />}
                />
            </Route>
            <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Routes>
    );
}