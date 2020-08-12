const db = firebase.firestore();
const rabbits = document.getElementById('rabbits');
const form = document.getElementById('add-rabbits');

// getting data
const addContent = doc => {
    const div1 = document.createElement('div');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');

    div1.setAttribute('data-id', doc.id);
    div1.classList.add('rabbit');

    p1.innerHTML = doc.data().name;
    p2.innerHTML = doc.data().species;
    p3.innerHTML = doc.data().abilities;

    div1.appendChild(p1);
    div1.appendChild(p2);
    div1.appendChild(p3);

    rabbits.appendChild(div1);
};

db.collection('rabbits').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        addContent(doc);
    })
});

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

// TODO: firebase firestore #5