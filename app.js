const express = require('express');
const ErrorHandler = require('./errorhandling');
// const ExpressError = require('./errorhandling')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let numArray;
let notNum;

function checkQueryStr(numsStr){
    if(!numsStr) throw new ErrorHandler('nums are required', 400);

    notNum = numsStr.split(',').filter(a => isNaN(a)).toString();
    numArray = numsStr.split(',').map(a=>a*1);
    if(numArray.includes(NaN)) throw new ErrorHandler(`${notNum} is not Number`, 400);

}

function mean(arr){
    return arr.reduce((a,b)=>{return a+b})/arr.length
}

function median(arr){
    let SortedArr=arr.sort((a,b)=>{return a-b})
    let midpoint
        if (SortedArr.length % 2 != 0){
            midpoint = SortedArr[Math.floor(SortedArr.length/2)]
        } else{
            midpoint = (SortedArr[SortedArr.length/2-1]+SortedArr[SortedArr.length/2])/2
        }
    return midpoint
}


function mode(arr){
    let obj={};
    arr.forEach(a=>{
        if(obj[a] === undefined){
            return obj[a] = 1;
        } else {
            return obj[a] += 1;
        }
    })
        
    let keys =Object.keys(obj)
    let values =Object.values(obj);

    let max =Math.max(...values);
    return keys.filter(a=>{
        return obj[a] == max
    })

};



app.get('/mean', (req, res, next)=>{
    try{
        const {nums} =req.query;
        checkQueryStr(nums);
       
        let average = mean(numArray)

        return res.json({
            response: {
                operation: "mean",
                value: average
        }})
    } catch(e){
        next(e);
    }
})

app.get('/median', (req, res, next)=>{
    try{
        const {nums} =req.query;
        checkQueryStr(nums);
        let midpoint = median(numArray);
       
        return res.json({
            response: {
                operation: "median",
                value: midpoint
        }})
    } catch(e){
        next(e);
    }

})


app.get('/mode', (req, res, next)=>{
    try{
        const {nums} =req.query;
        checkQueryStr(nums);
        let mostFreNum = mode(numArray);
        
        return res.json({
            response: {
                operation: "mode",
                value: mostFreNum
        }})
    } catch(e){
        next(e);
    }
})

// error handler
app.use((error, req, res, next)=>{
    let status = error.status;
    let msg = error.msg;
    return res.status(status).json({
        error: {msg, status}
    });
})


app.listen(3000, function(){
    console.log('App on port 3000');
})


module.exports = {mean, median, mode}