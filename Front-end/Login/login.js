const form = document.getElementById('logInForm')
const formPassword = document.getElementById('forgetPasswordForm')

if(form){
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
            window.location.replace('../Expense/index.html')
            alert('successfully logged In')
        })
        .catch(err => {
            console.log('INVALID CRED')
        })
    })
}

if(formPassword){
    formPassword.addEventListener('submit', (e) => {
        e.preventDefault()
        
        const form = new FormData(e.target)
      
        axios.post('http://localhost:3000/password/forgotpassword', {email: form.get('email')})
        .then(res => {
            alert('email successfuly sent')
        })
        .catch(err => {
            alert("user doesn't exit")
        })
    })
    
}



