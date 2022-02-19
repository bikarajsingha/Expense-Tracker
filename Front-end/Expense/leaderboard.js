document.addEventListener('DOMContentLoaded', (e) => {
    premiumUser()
    getUsers()
})



function premiumUser() {
    const token = localStorage.getItem('token')

    axios.get('http://localhost:3000/purchase/is-premium', {headers: {"Authorization": token}}) 
    .then(res => {
        const body = document.body
        const h1 = document.querySelector('.container h1')
        const leaderBoard = document.querySelector('.leaderBoard')

        body.classList.add('active')
        h1.classList.add('active')
        leaderBoard.classList.add('active')
    })
    .catch(err => {
        window.location.replace('./index.html')
    })
}

function getUsers() {
    const token = localStorage.getItem('token')

    axios.get('http://localhost:3000/purchase/leader-board', {headers: {"Authorization": token}})
    .then(res => {
        const rows = res.data.user
        const div = document.createElement('div')
        const leaderBoard = document.getElementsByClassName('leaderBoard')[0]

        const rowDiv = document.createElement('div')
        div.classList.add('row')

        rows.forEach((row, i) => {
            div.innerHTML = `
            <span class="rank">${i+1}</span>
            <span class="user">${row.name}</span>
            <span class="amountSpent">${row.totalExpense}</span>
            `
            rowDiv.append(div)
            leaderBoard.innerHTML += rowDiv.innerHTML
        })
    })
    .catch(err => console.log(err))
}