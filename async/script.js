//Synchronous
// function brewCoffee() {
//     console.log('Start brewing Coffee ☕')
//     const startTime = new Date().getTime()
//     while (new Date().getTime() < startTime + 1000)
//     console.log('Coffee is ready')
// }

// console.log('Ordering coffee')
// brewCoffee()
// console.log('Coffee received, doing other tasks.')

//ASynchronous
// function brewCoffee(callback) {
//         console.log('Start brewing Coffee ☕')
//         setTimeout(() => {
//             console.log('Coffee is ready☕')
//             callback()
//         },3000); //ชงกาแฟ 3 วินาทีแล้วค่อยเรียก callback
        
//     }
    
//     console.log('Ordering coffee☕')
//     brewCoffee(() => {
//         console.log('Coffee received, doing other tasks.')
//     })
//     console.log('Waiting for coffee, doing other tasks.')

//Asynchronous : async - await
function brewCoffee(callback) {
    return new Promise ((resolve) => {
        console.log('Start brewing Coffee ☕')
        setTimeout(() => {
            console.log('Coffee is ready☕')
            resolve();
        },3000); //ชงกาแฟ 3 วินาทีแล้วค่อยเรียก callback
    })
          
    }
    
    async function orderCoffee() {
        console.log('Ordering coffee☕');
    await brewCoffee()
        console.log('Coffee received, doing other tasks.')
    }
    orderCoffee();
    console.log('Waiting for coffee, doing other tasks.')
