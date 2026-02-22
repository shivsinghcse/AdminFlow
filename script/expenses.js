axios.defaults.baseURL = server

window.onload = async () => {
    await getSession()
    fetchExpense()
}

const createExpenses = async (e) => {
    e.preventDefault()
    
    const title = document.getElementById('title').value.trim();
    const amount = document.getElementById('amount').value.trim();
    const date = document.getElementById('date').value.trim();
    const description = document.getElementById('description').value.trim();

    const payload = {
        title,
        amount,
        expenseAt: date, 
        description
    }

    try 
    {
        await axios.post('/expense', payload, getServerSession())
        e.target.reset()
        closeAdmissionForm()
        Swal.fire({
            icon: 'success',
            title: 'Expense added',
        })
        .then(() => {
            location.reload()
        })
    }
    catch(err)
    {
        Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: err.response ? err.response.data.message ?? err.response : err.message
        })
    }
}

const fetchExpense = async () => {
    try 
    {
        const res = await axios.get('/expense', getServerSession())
        const expenses = res.data
        const expenseTable = document.querySelector('#expense-body')

        for(let expense of expenses){
            const ui = `
                <tr class="border-b border-gray-200 text-zinc-600 text-left">
                    <td class="py-3 pl-4">${expense.title}</td>
                    <td>${expense.description || 'Description is empty'}</td>
                    <td>₹${expense.amount.toLocaleString()}</td>
                    <td>${moment(expense.expenseAt).format('MMM DD, YYYY hh:mm A')}</td>
                    <td>
                        <div class="space-x-2">
                            <button class="bg-green-400 hover:bg-green-500 hover:cursor-pointer px-2 py-1 text-white rounded">
                                <i class="ri-edit-line"></i>
                            </button>
                            <button onclick="deleteExpense('${expense._id}')" class="bg-rose-400 hover:bg-rose-500 hover:cursor-pointer px-2 py-1 text-white rounded">
                                <i class="ri-delete-bin-line"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `

            expenseTable.innerHTML += ui
        }
        
    }
    catch(err)
    {
        Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: err.response ? err.response.data.message ?? err.response : err.message
        })
    }
}

const deleteExpense = async (id) => {
    try 
    {
        await axios.delete(`/expense/${id}`, getServerSession())
        Swal.fire({
            icon: 'success',
            title: 'Expense deleted',
        })
        .then(() => {
            location.reload()
        })
    }
    catch(err)
    {
        Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: err.response ? err.response.data.message ?? err.response : err.message
        })
    }
}