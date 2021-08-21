import { SELECT_BOOK,
    LOAD_CHAPTER,
    CLEAR_BIBLE_DATA,
    LOAD_FEED,
    LOAD_COMMENTS, 
    SELECT_CHAPTER,
    LOADING_TRUE,
    LOADING_FALSE,
    SET_LOGGEDIN,
    LOAD_USER_COMMENTS,
    SET_USER,
    SET_FOLLOWS,
    REMOVE_VIP,
    ADD_VIP
    } from '../types'
    


// eslint-disable-next-line
export default(state, action)=>{
    switch(action.type){
        case SELECT_BOOK:
            return({
                ...state,
                currentBook: action.payload
            })
            case SELECT_CHAPTER:
                return({
                    ...state,
                    currentChapter: action.payload
                })
        case LOAD_CHAPTER:
            return({
                ...state,
                BibleData: action.payload,
                loading: false
            })
        case CLEAR_BIBLE_DATA:
            return({
                ...state,
                currentBook: null,
                BibleData: null
            })
        case LOAD_FEED:
            return({
                ...state,
                feed: action.payload,
                loading: false
            })
        case LOAD_COMMENTS: 
            return({
                ...state,
                comments: action.payload
            })
        case LOAD_USER_COMMENTS:
            return({
                ...state,
                userComments: action.payload
            })
        case LOADING_FALSE:
            return({
                ...state,
                loading: false
            })
        case LOADING_TRUE:
            return({
                ...state,
                loading: true
            })
        case SET_LOGGEDIN:
            return({
                ...state,
                loggedIn: action.payload
            })
        case SET_USER:
            return({
                ...state,
                user: action.payload
            })
        case SET_FOLLOWS:
            return({
                ...state,
                follows: action.payload
            })    
        case REMOVE_VIP:
            return({
                ...state,
                VIP: state.VIP.filter((item)=>item.UUID !== action.payload)
            })
        case ADD_VIP:
            return({
                ...state,
                VIP: [...state.VIP, action.payload]
            })

        
        default:
            return state;
    }
}