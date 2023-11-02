import { deleteCity, getCities, getCityDetails } from "../../managers/cityManager";
import { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getMyCities } from "../../managers/userProfileCityManager";

export const MyCitiesList = ({ loggedInUser }) => {
    const [myUserProfileCities, setMyUserProfileCities] = useState([]);
    const navigate = useNavigate();

    const fetchData = () => {
        getMyCities(loggedInUser.id)
            .then((data) => {
                setMyUserProfileCities(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteCity = (cityToDelete) => {
        deleteCity(cityToDelete).then(() => {
            fetchData();
        });
    };

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Average Price Per Night</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(myUserProfileCities) ? (
                        myUserProfileCities.map((upc) => (
                            <tr key={upc.id}>
                                <td>{upc.city.name}</td>
                                <td>{upc.city.country}</td>
                                <td>${upc.city.averagePrice}</td>
                                <td>
                                    <Button
                                        color="primary"
                                        onClick={() => {
                                            navigate(`/cities/${upc.city.id}`);
                                        }}
                                    >
                                        Details
                                    </Button>
                                    <Button color="danger" onClick={() => handleDeleteCity(upc.city.id)}>
                                        Delete
                                    </Button>

                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">Loading...</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    );
};
