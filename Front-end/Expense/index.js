const form = document.querySelector('form')
const token = localStorage.getItem('token')


document.addEventListener('DOMContentLoaded', (e) => {
    getExpenses()
})

form.addEventListener('submit', e => {
    e.preventDefault()

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
                "color": "#3399cc"
            },
            "handler": function(response) {
                axios.post('http://localhost:3000/purchase/update-transaction-status', {
                    order_id: options.order_id,
                    payment_id: response.razorpay_payment_id
                }, {
                    headers: { "Authorization": token }
                })
                .then(_ => {
                    console.log('You are a Premium User Now')
                })
                .catch(err => {
                    alert('Something went wrong. Try Again!!!')
                })
            }
        }

        const rzp1 = new Razorpay(options)
        rzp1.open()
        e.preventDefault()
    })
    .catch(err => console.log(err))
}


