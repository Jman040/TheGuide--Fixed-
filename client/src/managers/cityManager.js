export const _apiUrl = "/api/cities";

export const getCities = () => {
    return fetch(_apiUrl).then((res) => res.json());
};

export const getCityDetails = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};

export const createCity = (City) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(City),
    }).then((res) => res.json());
};

export const deleteCity = (City) => {
    return fetch(`${_apiUrl}/${City.Id}`, {
        method: "DELETE",
    });
};