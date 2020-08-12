const db = firebase.firestore();

db.collection('rabbits').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data());
    })
})

console.log('just some text');