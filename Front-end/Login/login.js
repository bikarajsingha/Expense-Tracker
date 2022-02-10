const form = document.querySelector('form')

form.addEventListener('submit', e => {
    e.preventDefault(e.target)

    const form = new FormData(e.target)

    let loginDetails =  {
        email: form.get('name'),
        password: form.get('password')
    }

    axios.post('http://localhost:3000/user/log-in', loginDetails)
    .then(res => {
        if(res.status == 200) localStorage.setItem('token', res.data.token)
        alert('successfully logged In')
    })
})

