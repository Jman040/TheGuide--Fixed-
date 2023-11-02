export const getSeasons = () => {
    return fetch("/api/seasons").then((res) => res.json());
};
