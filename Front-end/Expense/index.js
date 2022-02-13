const form = document.querySelector('form')

form.addEventListener('submit', e => {
    e.preventDefault()

    const form = new FormData(e.target)

    const token = localStorage.getItem('token')
    const expenseDetails = {
        expense: form.get('expenseAmount'),
        description: form.get('description'),
        category: form.get('category')
    }

    axios.post('http://localhost:3000/user/addexpense', expenseDetails, {headers: {"Authorization": token}})
    .then(res => console.log('workedddd!!!!!!!!'))
    .catch(err => {
        window.location.replace('../Login/login.html')
    })
})