const db = firebase.firestore();

// getting data from db and add it to html

const getDocsDiv = document.getElementById('get-docs');
const deleteDocsDiv = document.getElementById('delete-docs'); // delete data

const renderDocuments = doc => {
    const pget = document.createElement('p');
    const pdelete = document.createElement('p'); // delete data
    const cross = document.createElement('span'); // delete data

    pget.setAttribute('data-id', doc.id);
    pget.setAttribute('class', 'root');
    pget.innerHTML = doc.data().name + ': ' + doc.data().abilities;

    pdelete.setAttribute('data-id', doc.id); // delete data
    pdelete.setAttribute('class', 'root'); // delete data
    pdelete.innerHTML = doc.data().name + ': ' + doc.data().abilities; // delete data

    cross.innerHTML = 'x'; // delete data
    cross.classList.add('cross'); // delete data

    pdelete.append(cross); // append the cross span to its parent p

    getDocsDiv.appendChild(pget);
    deleteDocsDiv.appendChild(pdelete); // delete data

    //deleting data
    cross.onclick = e => {
        e.stopPropagation();
        const id = e.target.parentElement.getAttribute('data-id');

        db.collection('rabbits').doc(id).delete();
    };
}

db.collection('rabbits').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderDocuments(doc);
    })
});


// saving data to db from the html form

const form = document.getElementById('data');
const feedback = document.getElementById('feedback');

form.onsubmit = e => {
    e.preventDefault();

    db.collection('rabbits').add({
        name: form.name.value,
        abilities: form.abilities.value
    });

    feedback.innerHTML = form.name.value + ' ' + form.abilities.value;

    form.name.value = '';
    form.abilities.value = '';
};


// query db

const queryDocsDiv = document.getElementById('queries');

const renderQueryDocs = doc => {
    const pquery = document.createElement('p');

    pquery.innerHTML = doc.data().name + ': ' + doc.data().abilities;
    pquery.classList.add('root');

    queryDocsDiv.appendChild(pquery);
}

db.collection('rabbits').where('name', '==', 'algernon').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderQueryDocs(doc);
    })
});


// order data

const orderDocsDiv = document.getElementById('order');

const renderOrderDocs = doc => {
    const porder = document.createElement('p');

    porder.innerHTML = doc.data().name + ': ' + doc.data().abilities;
    porder.classList.add('root');

    orderDocsDiv.appendChild(porder);
}

db.collection('rabbits').orderBy('name').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderOrderDocs(doc);
    })
});


// real-time data

const realtimeDocsDiv = document.getElementById('real-time');

const renderRealtimeDocs = doc => {
    const prealtime = document.createElement('p');

    prealtime.innerHTML = doc.data().name + ': ' + doc.data().abilities;
    prealtime.classList.add('root');
    prealtime.setAttribute('data-id', doc.id); // delete data

    const cross = document.createElement('span'); // delete data
    cross.innerHTML = 'x'; // delete data
    cross.classList.add('cross'); // delete data

    prealtime.append(cross); // append the cross span to its parent p

    realtimeDocsDiv.appendChild(prealtime);

    //deleting data
    cross.onclick = e => {
        e.stopPropagation();
        const id = e.target.parentElement.getAttribute('data-id');

        db.collection('rabbits').doc(id).delete();
    };
}

// real-time listener

db.collection('rabbits').orderBy('name').onSnapshot(snapshot => {
    const changes = snapshot.docChanges();

    // console.log(changes);

    changes.forEach(change => {
        if (change.type == 'added') {
            renderRealtimeDocs(change.doc);
        } else if (change.type == 'modified') {
            renderRealtimeDocs(change.doc);
        } else if (change.type == 'removed') {
            const pid = realtimeDocsDiv.querySelector('[data-id=' + change.doc.id + ']');
            realtimeDocsDiv.removeChild(pid);
        }
    })
});


// update data - change name's values

const chform = document.getElementById('ch-data');
const chfeedback = document.getElementById('ch-feedback');

chform.onsubmit = e => {
    e.preventDefault();

    const name = chform.name.value;

    db.collection('rabbits').where('name', '==', name).get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            const id = doc.id;

            db.collection('rabbits').doc(id).update({
                abilities: chform.abilities.value
            });

            chfeedback.innerHTML = chform.name.value + ' ' + chform.abilities.value;

            chform.name.value = '';
            chform.abilities.value = '';
        })
    });
};
