axios.defaults.baseURL = server
window.onload = async () => {
    await getSession()
    fetchEmployees()
}

const createEmployee = async (e) => {
    e.preventDefault()
    
    const employeeName = document.getElementById('employeeName').value.trim();
    const gender = document.getElementById('gender').value.trim();
    const dob = document.getElementById('dob').value.trim();
    const doj = document.getElementById('doj').value.trim();
    const religion = document.getElementById('religion').value.trim();
    const mobile = document.getElementById('mobile-number').value.trim();
    const email = document.getElementById('email-id').value.trim();
    const qualification = document.getElementById('qualification').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const country = document.getElementById('country').value.trim();
    const pincode = document.getElementById('pincode').value.trim();
    // const previousSchool = document.getElementById('previousSchool').value.trim();
    const designation = document.getElementById('designation').value.trim();

    const payload = {
        employeeName,
        gender,
        dob,
        doj,
        religion,
        mobile,
        email, 
        qualification,
        address,
        city, 
        state, 
        pincode,
        country,
        designation
        
    }

    try
    {
        const res = await axios.post('/employee', payload, getServerSession())
        e.target.reset()
        closeAdmissionForm()
        Swal.fire({
            icon: 'success',
            title: 'Employee added'
        })
        .then(()=>{
            location.reload()
        })
    }
    catch(err)
    {
        Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: err.response ? err.response.data.message ?? err.message : err.message
        })
    }

}

const fetchEmployees = async () => {
    try
    {
        const res = await axios.get('/employee', getServerSession())
        const employees = res.data
        const container = document.querySelector('.employees-container')

        for(let employee of employees){
            const ui = `
                <div class="border border-gray-200 p-6 flex flex-col justify-center items-center gap-2 rounded-lg shadow-lg">
                    <div class="text-center flex flex-col items-center justify-center gap-2">
                        <img 
                            src="../images/demo.jpg" 
                            alt="students image"
                            class="w-30 h-30 rounded-full" 
                        />
                        <h1 class="text-lg font-semibold capitalize">${employee.employeeName}</h1>
                    </div>

                    <div class="flex flex-col items-center">
                        <small class="text-sm text-gray-600">${employee.email}</small>
                        <small class="text-xs text-gray-600">+91 ${employee.mobile}</small>
                    </div>

                    <div class="flex justify-center items-center gap-2 my-2">
                        <h1 class="text-sm font-semibold text-zinc-600 ">Designation :</h1>
                        <span class="bg-zinc-500 py-1 px-3 rounded text-xs text-gray-200 capitalize">${employee.designation}</span>                   
                    </div>  
                    <button onclick="deleteEmployee('${employee._id}')" class="text-md bg-rose-200 text-rose-600 px-6 py-2 rounded-lg hover:cursor-pointer hover:bg-rose-600 hover:text-white transition active:scale-95">Delete</button>
                </div>   
            `
            container.innerHTML += ui
        }
        
        
    }
    catch(err)
    {
        Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: err.response ? err.response.data.message ?? err.message : err.message
        })
    }
}


const deleteEmployee = (empId) => {
    try
    {
        axios.delete(`/employee/${empId}`, getServerSession())
        Swal.fire({
            icon: 'success',
            title: 'Employee deleted'
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
            text: err.response ? err.response.data.message ?? err.message : err.message
        })
    }
}