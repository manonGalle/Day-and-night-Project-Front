import { SET_SPOT, CONNECT, REVERSE_CHECK_NIGHT, REVERSE_CHECK_DAY, SET_CURRENT_SPOT, ADD_SPOT, SET_CATEGORIES, ADD_LIKE, ADD_DISLIKE, REVERSE_MODE, DISCONNECT } from "../actions/actions";

const initialState = {
    logged: false,
    connectedUsername: '',
    userID:'',
    role:'',
    validatedSpots: [],
    checkNight: true,
    checkDay: true,
    currentSpot: {},
    jwt: null,
    coord_x: '',
    coord_y: '',
    categories: [],
    darkMode: false,
} 

function reducer(state = initialState, action={}) {
    switch (action.type) {
        case CONNECT:
            return {
                ...state,
                logged:true,
                connectedUsername: action.username,
                userID: action.userID,
                jwt: action.jwt,
                role: action.role,
            };
        case DISCONNECT:
            return {
                ...state,
                logged: false,
                jwt: null,
            }
        
        case SET_SPOT:
            return {
                ...state,
                validatedSpots: action.spots,
            };

        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.categories,
            }

        case REVERSE_CHECK_NIGHT:
            return {
                ...state,
                checkNight: !state.checkNight,
            }

        case REVERSE_CHECK_DAY:
            return {
                ...state,
                checkDay: !state.checkDay,
            }

        case SET_CURRENT_SPOT:
            return {
                ...state,
                currentSpot: action.spot,
            }
        
        case ADD_SPOT:
            return {
                ...state,
                coord_x: action.lng,
                coord_y: action.lat,
            }

        case ADD_LIKE:
            return {
                ...state,
                currentSpot : {
                    ...state.currentSpot,
                    likes: action.likes
                }
            }
        case ADD_DISLIKE:
            return {
                ...state,

                currentSpot : {
                    ...state.currentSpot,
                    dislikes: action.dislikes
                }
            }

        case REVERSE_MODE:
            return {
                ...state,
                darkMode: !state.darkMode,
            }
        default:
            return state;
    }
}


export default reducer;