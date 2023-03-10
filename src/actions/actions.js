export const DISCONNECT = "DISCONNECT";
export const actionDisconnect = () => ({
    type: DISCONNECT,
});

export const CONNECT = "CONNECT";
export const actionConnect = (username, jwt, userID, role) => ({
    type: CONNECT,
    username: username,
    jwt:jwt,
    userID: userID,
    role: role,
});

export const REVERSE_CHECK_NIGHT = "REVERSE_CHECK_NIGHT";
export const actionReverseCheckNight = () => ({
    type: REVERSE_CHECK_NIGHT,
});

export const REVERSE_CHECK_DAY = "REVERSE_CHECK_DAY";
export const actionReverseCheckDay = () => ({
    type: REVERSE_CHECK_DAY,
});

export const SET_SPOT = "SET_SPOT";
export const actionSetSpots = (spotList) => ({
    type: SET_SPOT,
    spots: spotList,
});

export const SET_CATEGORIES = "SET_CATEGORIES";
export const actionSetCategories = (categoriesList) => ({
    type: SET_CATEGORIES,
    categories: categoriesList,
})

export const SET_CURRENT_SPOT = "SET_CURRENT_SPOT";
export const actionSetCurrentSpot = (selectedSpot) => ({
    type: SET_CURRENT_SPOT,
    spot: selectedSpot,
});

export const ADD_SPOT = "ADD_SPOT";
export const actionAddSpot = (lng, lat) => ({
    type: ADD_SPOT,
    lng: lng,
    lat: lat,
});

export const ADD_LIKE = "ADD_LIKE";
export const actionAddLike = (newLikesCount) => ({
    type: ADD_LIKE,
    likes: newLikesCount,
});

export const ADD_DISLIKE = "ADD_DISLIKE";
export const actionAddDislike = (newDislikesCount) => ({
    type: ADD_DISLIKE,
    dislikes: newDislikesCount,
});

export const REVERSE_MODE = "REVERSE_MODE";
export const actionReverseMode = () => ({
    type: REVERSE_MODE,
});

