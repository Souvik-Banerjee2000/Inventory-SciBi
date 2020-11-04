export const ChartReducer = (state,action) =>{
    switch (action.type) {
        case action.type:
            if(action.type==="ExpBucket")
                console.log(action.value);
            state[`${action.type}`] = action.value;
            return state;
        default:
            return state;
    }
}