const db = firebase.firestore();
const rabbits = document.getElementById('rabbits');
const form = document.getElementById('add-rabbits');

// getting and deleting data
const addContent = doc => {
    const div1 = document.createElement('div');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    const cross = document.createElement('p');

    div1.setAttribute('data-id', doc.id);
    div1.classList.add('rabbit');

    p1.innerHTML = doc.data().name;
    p2.innerHTML = doc.data().species;
    p3.innerHTML = doc.data().abilities;
    cross.innerHTML = 'x';

    cross.classList.add('cross');

    div1.appendChild(p1);
    div1.appendChild(p2);
    div1.appendChild(p3);
    div1.appendChild(cross);

    rabbits.appendChild(div1);

    // deleting data
    cross.addEventListener('click', e => {
        e.stopPropagation(); // not necessary

        const id = e.target.parentElement.getAttribute('data-id');
        db.collection('rabbits').doc(id).delete();
    });
};

// outdated and replaced by the real-time stuff
// db.collection('rabbits').where('species', '==', 'rabbit').orderBy('name').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         addContent(doc);
//     })
// });

db.collection('rabbits').orderBy('name').onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added'){
            addContent(change.doc);
        }
        else if (change.type == 'removed'){
            const changed = rabbits.querySelector('[data-id', change.doc.id);
            rabbits.removeChild(changed);
        }
    });
})

// posting data
form.addEventListener('submit', e => {
    e.preventDefault();
    db.collection('rabbits').add({
        name: form.name.value,
        species: form.species.value,
        abilities: form.abilities.value
    })
    form.name.value = '';
    form.species.value = '';
    form.abilities.value = '';
});

// updating data, properties

// db.collection('rabbits').doc('6d44QTUkZKEmbq8X1V6h').update({
//     species: 'cat'
// })

// set overrides the whole document

// db.collection('rabbits').doc('6d44QTUkZKEmbq8X1V6h').set({
//     name: 'kittens',
//     species: 'cat',
//     abilities: 'drinking, eating, sleeping'
// })