const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.email.value;
    const password = form.password.value;

    try {
        const res = await fetch('/signup', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        console.log(data);
        if (data.errors) {
            console.log('some errors happened');
        } else {
            location.assign('/');
        }
    }
    catch (err) {
        console.log(err);
    }
})
