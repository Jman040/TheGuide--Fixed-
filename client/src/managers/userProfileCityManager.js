export const _apiUrl = "/api/userProfileCities";

export const getMyCities = (userId) => {
    return fetch(`${_apiUrl}/${userId}`).then((res) => res.json())
};
export const addNewUserProfileCity = (userProfileCity) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userProfileCity),

    }).then((res) => res.json())
}
