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
function distinctNameIdMapper(data){
    let distinctWhid = new Set();
    let distinctIdName = [];
    data.forEach(element=>{
        if(!distinctWhid.has(element.Whid)){
            let mapperObj = {};
            distinctWhid.add(element.Whid);
            mapperObj.Whname = element.Whname;
            mapperObj.Whid = element.Whid;
            distinctIdName.push(mapperObj);
        }
    })
    return distinctIdName;
}
function pivotDataById(bodyData,distinctIdData){
    let pivotDatas = [];
    let pivotData;
    distinctIdData.forEach(data =>{
        let Whid = data.Whid;
        bodyData.forEach(bData=>{
            if(bData.Whid===Whid){
                pivotData = {};
                pivotData.Menuid = bData.Menuid;
                pivotData.Categoryid = bData.Categoryid;
                pivotData.Productname = bData.Productname;
                pivotData.PID = bData.PID;
                pivotDatas.push(pivotData)
            }
        })
    
    })
    return pivotDatas;
}

export {calculateDistinctPID,distinctNameIdMapper,pivotDataById};