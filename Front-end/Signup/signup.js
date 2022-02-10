const form = document.querySelector('form')

form.addEventListener('submit', e => {
    e.preventDefault()
    
    const form = new FormData(e.target)

    let signUpDetails = {
        name: form.get('username'),
        email: form.get('email'),
        number: form.get('phoneNumber'),
        password: form.get('password')
    }

    axios.post('http://localhost:3000/user/sign-up', signUpDetails)
    .then((result) => {
        alert(result.data.message)
    }).catch((err) => {
        alert('Unable to create user')
    });
})
