import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ListGroup,
    ListGroupItem,
    Table,
    Button,
} from "reactstrap";

import { getCityDetails } from "../../managers/cityManager";
import { getSeasons } from "../../managers/seasonManager";
import { addNewUserProfileCity, getMyCities } from "../../managers/userProfileCityManager";

export const CityDetails = ({ loggedInUser }) => {
    const { id } = useParams();
    const [detailedCity, setDetailedCity] = useState(null);
    const [selectedSeasonId, setSelectedSeasonId] = useState(null);
    const [seasons, setSeasons] = useState([]);
    const [myUserProfileCities, setMyUserProfileCities] = useState([]);

    const navigate = useNavigate();
    const fetchMyCities = () => {
        getMyCities(loggedInUser.id)
            .then((data) => {
                setMyUserProfileCities(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };
    const fetchData = () => {
        getCityDetails(id) // Pass the city ID to getCityDetails
            .then((data) => {
                setDetailedCity(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };
    const fetchSeasons = () => {
        getSeasons() // Pass the city ID to getCityDetails
            .then((data) => {
                setSeasons(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };
    const handleAddCity = (city) => {
        if (selectedSeasonId == null) {
            console.log("Please Select Season")
            return
        }

        const newRelationship = {
            UserProfileId: loggedInUser.id,
            SeasonId: selectedSeasonId,
            CityId: detailedCity.id,
        }
        addNewUserProfileCity(newRelationship)

    };
    const buttonToShow = () => {
        if (myUserProfileCities.some((upc) => upc.cityId === detailedCity.id)) {
            return (
                <Button> Remove from My City</Button>
            )
        }
        else {
            <Button
                color="primary"
                onClick={() => {
                    handleAddCity();
                }}
            >
                Add To My Cities
            </Button>
        }
    };

    useEffect(() => {
        fetchData();
        fetchSeasons();
        fetchMyCities();

    }, [id]); // Include 'id' as a dependency to trigger re-fetch when it changes

    if (!detailedCity) {
        return null; // Return null when detailedCity is not available
    }

    return (
        <>
            <h1>City Details: {detailedCity.name}</h1>
            <div>
                <div className="city-country">{detailedCity.country}</div>
                <div className="city-average-price">{detailedCity.averagePrice}</div>
                <div className="city-activity">{
                    detailedCity.cityActivities.map((ca) => {
                        return (
                            <p>
                                {ca.activity.title}

                                "${ca.activity.price}"
                            </p>
                        )
                    })
                }</div>
                <select onChange={(e) => { setSelectedSeasonId(parseInt(e.target.value)) }}>
                    <option selected disabled>
                        Select Season
                    </option>
                    {seasons.map((season) => {
                        return (
                            <option value={season.id}>
                                {season.name}
                            </option>
                        )
                    })}
                </select>
                {buttonToShow()}

            </div>

        </>
    );
};
