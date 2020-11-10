export const ChartReducer = (state,action) =>{
    switch (action.type) {
        case action.type:
            state[`${action.type}`] = action.value;
                if(action.type==="dates")
                    console.log(state);
            return state;
        default:
            return state;
    }
}