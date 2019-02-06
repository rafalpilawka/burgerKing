const obj={
    name: 'a',
    surname: 'b',
    adres: 'c',
    price: '33'
}

const arr = [1,2,3,4,5];
console.log(obj);



// let keys = Object.values(obj)
// const fruits = {
//     apple: 28,
//     orange: 17,
//     pear: 54,
//   }
  
//   const values = Object.values(fruits)
//   console.log(values) // [28, 17, 54]

// values.forEach ((i)=>{
//    console.log(i)
// });
// console.log('Object.values(obj): ',keys);

// console.log('obj[1]: ', obj.name);

// entries= Object.entries(obj).map(i=>(console.log(i)));

looper=(injection)=>{
    Object.entries(injection).map(i=>(console.log(i)))
};

looper(obj);


const number = 1200 ; 
console.log(number);
