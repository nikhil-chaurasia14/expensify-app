const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: 'Nikhil',
            age: 24
        });
        // reject('Something went wrong!');
    }, 5000);
});

console.log('before');

promise.then((data) => {
    console.log('then:', data)
}).catch((error) => {
    console.log('error:', error)
});

console.log('after');
