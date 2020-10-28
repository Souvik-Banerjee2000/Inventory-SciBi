function calculateDistinctPID(data){
let distinctCount = {};
let distinctPID = new Set();
let distinctKeys = new Set();
//Inserting a key-value pair of(keys[iterator],0) in distinctCount objcet
data.forEach(element=>{
    if(!distinctKeys.has(element.EXPBucket)){
        distinctKeys.add(element.EXPBucket);
        distinctCount[element.EXPBucket] = 0;
    }
})

data.forEach(element => {
    if(!distinctPID.has(element.PID)){ //Checking for distinct PID
        distinctPID.add(element.PID);
        distinctCount[element.EXPBucket]+=1;//If distinct add increase the value by 1
    }
});
return distinctCount;
}
export {calculateDistinctPID};