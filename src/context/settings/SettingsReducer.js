import { SET_SETTINGS } from '../types'

export default (state, action) =>{
    switch(action.type){
        case SET_SETTINGS:
            return (action.payload)
        default:
            return state
    }
}