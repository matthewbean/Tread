import { SET_SETTINGS } from '../types'
// eslint-disable-next-line
export default (state, action) =>{
    switch(action.type){
        case SET_SETTINGS:
            return (action.payload)
        default:
            return state
    }
}