const form = document.querySelector('form')


document.addEventListener('DOMContentLoaded', (e) => {
    getExpenses()
})

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
    .then(res => {
        getExpenses()
        console.log(res)
    })
    .catch(err => {
        window.location.replace('../Login/login.html')
    })
})


function getExpenses(){
    const token = localStorage.getItem('token')

    axios.get('http://localhost:3000/user/allexpense', {headers: {"Authorization": token}})
    .then(res => {
        const result = res.data
        const expenseList = document.getElementById('expenseList')

        if(result.length > 0){
            expenseList.innerHTML = ''
            result.forEach(expense => {
                div = document.createElement('div')
                div.innerText= `${expense.amount} ${expense.description} ${expense.category}`
                expenseList.append(div)
            })
        }
    })
    .catch(err => console.log(err))
}


