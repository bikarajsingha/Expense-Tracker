document.addEventListener('DOMContentLoaded', (e) => {
    premiumUser()
})

function premiumUser() {
    const token = localStorage.getItem('token')

    axios.get('http://localhost:3000/purchase/is-premium', {headers: {"Authorization": token}}) 
    .then(res => {
        const body = document.body
        const h1 = document.querySelector('.containerReport h1')

        body.classList.add('active')
        h1.classList.add('active')
    })
    .catch(err => console.log(err))
}