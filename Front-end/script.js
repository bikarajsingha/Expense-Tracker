const form = document.querySelector('form')

form.addEventListener('submit', e => {
    if(e.target.className == 'formRegistration'){
        signUp(e)
    }else if(e.target.className == 'logInForm'){
        logIn(e)
    }
})

function logIn(e){
    e.preventDefault(e.target)

    const form = new FormData(e.target)

    let obj =  {
        email: form.get('name'),
        password: form.get('password')
    }

    console.log(obj)
}

function signUp(e) {
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