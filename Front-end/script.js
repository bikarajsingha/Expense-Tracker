document.addEventListener('submit', (e) => {
    if(e.target.className == 'submit'){
        signup(e)
    }
})

function signup(e) {
    e.preventDefault()
    const form = new FormData(e.target.parentElement)

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
        // console.log(err)
        alert(err.data.message)
    });
}