import { deleteCity, getCities, getCityDetails } from "../../managers/cityManager";
import { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const CitiesList = () => {
    const [city, setCity] = useState([]);
    const navigate = useNavigate();

    const fetchData = () => {
        getCities()
            .then((data) => {
                setCity(data);
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
                    {Array.isArray(city) ? (
                        city.map((c) => (
                            <tr key={c.id}>
                                <td>{c.name}</td>
                                <td>{c.country}</td>
                                <td>${c.averagePrice}</td>
                                <td>
                                    <Button
                                        color="primary"
                                        onClick={() => {
                                            navigate(`/cities/${c.id}`);
                                        }}
                                    >
                                        Details
                                    </Button>


                                    <Button
                                        color="primary"
                                        onClick={() => {
                                            navigate("/cities/create");
                                        }}
                                    >
                                        Create City
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
