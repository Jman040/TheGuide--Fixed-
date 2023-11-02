const _apiUrl = "/api/CityActivity";

export const getMatchingCityActivity = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};