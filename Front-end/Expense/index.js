const form = document.querySelector('form')
const notification = document.getElementById('premium')


document.addEventListener('DOMContentLoaded', (e) => {
    getExpenses() 
    premiumUser()
})

form.addEventListener('submit', e => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const form = new FormData(e.target)

    const expenseDetails = {
        expense: form.get('expenseAmount'),
        description: form.get('description'),
        category: form.get('category')
    }

    axios.post('http://localhost:3000/expense/addexpense', expenseDetails, {headers: {"Authorization": token}})
    .then(res => {
        getExpenses()
    })
    .catch(err => {
        window.location.replace('../Login/login.html')
    })
})


function getExpenses(){
    const token = localStorage.getItem('token')
    axios.get('http://localhost:3000/expense/allexpense', {headers: {"Authorization": token}})
    .then(res => {
        const result = res.data
        const expenseList = document.getElementById('expenseList')

        if(result.length > 0){
            expenseList.innerHTML = ''
            result.forEach(expense => {
                div = document.createElement('div')
                div.innerText= `$${expense.amount}--${expense.description}--${expense.category}`
                expenseList.append(div)
            })
        }
    })
    .catch(err => console.log(err))
}

document.getElementById('rzp-button1').onclick = function(e) {
    const token = localStorage.getItem('token')

    axios.get('http://localhost:3000/purchase/premium-membership', {headers: {"Authorization": token}})
    .then(res => {
        res = res.data
      
        let options = {
            "key": res.key_id,
            "name": "Test company",
            "order_id": res.order.id,
            "prefill": {
                "name": "Test User",
                "email": "test.user@eample.com",
                "contact": "6000873255"
            },
            "theme": {
                "color": "rgb(113, 113, 238)"
            },
            "handler": function(response) {
                axios.post('http://localhost:3000/purchase/update-transaction-status', {
                    order_id: options.order_id,
                    payment_id: response.razorpay_payment_id
                }, {
                    headers: { "Authorization": token }
                })
                .then(_ => {
                    notification.classList.add('active')
                })
                .catch(err => {
                    alert('Something went wrong. Try Again!!!')
                })
            }
        }

        const rzp1 = new Razorpay(options)
        rzp1.open()
        e.preventDefault()

        rzp1.on('payment.failed', function (response) {
            alert('Something went wrong. Try Again!!!')
            console.log(response.error)
        })
    })
    .catch(err => console.log(err))
}

const notifButton = document.getElementsByClassName('notfButton')[0].addEventListener('click', (e) =>{
    notification.classList.remove('active')
    location.reload()
})

function premiumUser() {
    const token = localStorage.getItem('token')

    axios.get('http://localhost:3000/purchase/is-premium', {headers: {"Authorization": token}}) 
    .then(res => {
        console.log(res)
        const body = document.body
        const h1 = document.querySelector('.container h1')
        const expenses = document.querySelector('.expenses')
        const input = document.querySelectorAll('.expenses form input')
        const select = document.querySelector('.expenses form select')
        const submit = document.querySelector('.submit')
        const rzpButton = document.querySelector('#rzp-button1')
        const leadButton = document.getElementById('leaderBoard')
        
        console.log(rzpButton)
        body.classList.add('active')
        h1.classList.add('active')
        expenses.classList.add('active')
        input[0].classList.add('active')
        input[1].classList.add('active')
        select.classList.add('active')
        submit.classList.add('active')
        leadButton.classList.add('active')

        rzpButton.remove()
    })
    .catch(err => console.log(err, 999999999999))
}

const leaderBoard = document.getElementById('leaderBoard').onclick = function(){
    window.location.href="./leaderboard.html"
}
