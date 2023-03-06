const counts = require('./app');

const array1 = [1,2,3,4,5,6,1,3,5,7];
const array2 = [1,2,3,4,5,6]

test('mean', ()=>{
    let average = counts.mean(array2)
    expect(average).toEqual(3.5);  
})

test('median', ()=>{
    let midpoint = counts.median([2,3,1,6,8,9,10])
    expect(midpoint).toEqual(6);  
    let midpoint2= counts.median([2,3,1,6,8,9,10,11])
    expect(midpoint2).toEqual(7);
})

test('mode', ()=>{
    let mostFreNum = counts.mode(array1)
    expect(mostFreNum).toEqual(['1','3','5']);  
    let mostFreNum2= counts.mode([2,3,1,6,8,2,2,3,4,9,10,11])
    expect(mostFreNum2).toEqual(['2']);
})

