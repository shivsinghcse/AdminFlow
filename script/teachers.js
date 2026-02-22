axios.defaults.baseURL = server

window.onload = async () => {
    await getSession()
    fetchTeachers()
}

const createTeacher = async (e) => {
    e.preventDefault()
    
    const teacherName = document.getElementById('teacherName').value.trim();
    const gender = document.getElementById('gender').value.trim();
    const dob = document.getElementById('dob').value.trim();
    const doj = document.getElementById('doj').value.trim();
    const religion = document.getElementById('religion').value.trim();
    const mobile = document.getElementById('mobile-number').value;
    const email = document.getElementById('email-id').value.trim();
    const qualification = document.getElementById('qualification').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const country = document.getElementById('country').value.trim();
    const pincode = document.getElementById('pincode').value.trim();
    const previousSchool = document.getElementById('previousSchool').value.trim();
    const subjects = document.getElementById('subjects').value.trim();

    const payload = {
        teacherName,
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
        subjects,
        previousSchool
    }

    try
    {
        await axios.post('/teacher', payload, getServerSession())
        e.target.reset()
        closeAdmissionForm()
        Swal.fire({
            icon: 'success',
            title: 'Teacher added'
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
            text: err.response ? err.response.data.message : err.message
        })
    }   
}

const fetchTeachers = async () => {
    try
    {
        const res = await axios.get('/teacher', getServerSession())
        const teachers = res.data
        const container = document.querySelector('.teachers-container')
        
        for(let teacher of teachers)
        {
            const ui = `
                <div class="border border-gray-200 p-6 flex flex-col justify-center items-center gap-2 rounded-lg shadow-lg">
                <div class="text-center flex flex-col items-center justify-center gap-2">
                    <img 
                        src="../images/demo.jpg" 
                        alt="students image"
                        class="w-30 h-30 rounded-full" 
                    />
                    <h1 class="text-lg font-semibold capitalize">${teacher.teacherName}</h1>
                </div>

                <div class="flex flex-col items-center">
                    <small class="text-sm text-gray-600">${teacher.email}</small>
                    <small class="text-xs text-gray-600">+91 ${teacher.mobile}</small>
                </div>
                
                <div class="flex justify-center flex-col flex-wrap items-center gap-2 my-2">

                    <h1 class="text-sm font-semibold text-gray-800 ">Subjects:</h1>
                    <div class="flex flex-wrap items-center justify-center gap-1">
                        <span class="bg-zinc-500 py-[2px] px-2 rounded text-xs text-gray-200">Maths</span>
                        <span class="bg-zinc-500 py-[2px] px-2 rounded text-xs text-gray-200">Physics</span>
                        <span class="bg-zinc-500 py-[2px] px-2 rounded text-xs text-gray-200">Computer</span>
                    </div>
                </div>

                <!-- <div class="flex flex-col items-center justify-center">
                    <small class="text-sm text-gray-600">Section: A2</small>
                    <small class="text-sm text-gray-800 font-semibold">Class Teacher: Mr. Prashant Tiwari</small>
                </div> -->
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
            text: err.response ? err.response.data.message ?? err.message  : err.message
        })
    }
}