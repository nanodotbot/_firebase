const auth = firebase.auth();


// signup

const signup = document.getElementById('signup');
const sfeedback =document.getElementById('s-feedback');

signup.addEventListener('submit', e => {
    e.preventDefault();

    const username = signup['s-username'].value;
    const password = signup['s-password'].value;

    auth.createUserWithEmailAndPassword(username, password).then( cred => {
        sfeedback.innerHTML = cred.user['email'] + ' created';
        signup.reset();
    });
});


// logout

const logout = document.getElementById('logout');
const loutfeedback = document.getElementById('l-out-feedback');

logout.onclick = e => {
    e.preventDefault();

    auth.signOut().then( () => {
        loutfeedback.innerHTML = 'logged out successfully';
    });
};


// login

const login = document.getElementById('login');
const linfeedback = document.getElementById('l-in-feedback');

login.addEventListener('submit', e => {
    e.preventDefault();

    const username = login['l-in-username'].value;
    const password = login['l-in-password'].value;

    auth.signInWithEmailAndPassword(username, password).then( cred => {
        linfeedback.innerHTML = cred.user['email'] + ' logged in successfully';
        // console.log(cred.user['email']);
        login.reset();
    });
});


// listen for auth status changes

auth.onAuthStateChanged( user => {
    if (user) {
        console.log(user);
        linfeedback.innerHTML = user['email'];
        loutfeedback.innerHTML = 'logged in';
    } else {
        console.log(user);
        linfeedback.innerHTML = '';
        loutfeedback.innerHTML = '';
    }
});


