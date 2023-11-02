const _apiUrl = "/api/activities";


export const getActivities = () => {
    return fetch(_apiUrl).then((res) => res.json());
};
export const getActivityByCity = (cityId) => {
    return fetch(`/api/activities/${cityId}`).then((res) => res.json());
};