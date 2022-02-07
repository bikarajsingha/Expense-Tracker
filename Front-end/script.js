const form = document.getElementById('formRegistration')

form.addEventListener('submit', signup)

function signup(e) {
    e.preventDefault()
    
    const form = new FormData(e.target)

    let obj = {
        name: form.get('username'),
        email: form.get('email'),
        number: form.get('phoneNumber'),
        password: form.get('password')
    }

    axios.post('http://localhost:3000/user/sign-up', obj)
    .then((result) => {
        alert(result.data.message)
    }).catch((err) => {
        alert('Unable to create user')
    });
}