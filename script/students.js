axios.defaults.baseURL = server

window.onload = async () => {
    await getSession()
    fetchStudents()
}

const createAdmission = async (e) => {
    e.preventDefault()
    const studentName = document.getElementById('studentName').value.trim()
    const fatherName = document.getElementById('fatherName').value.trim()
    const motherName = document.getElementById('motherName').value.trim()
    const gender = document.getElementById('gender').value.trim()
    const dob = document.getElementById('dob').value.trim()
    const religion = document.getElementById('religion').value.trim()
    const mobile = document.getElementById('mobile-number').value.trim()
    const email = document.getElementById('email-id').value.trim()
    const sclass = document.getElementById('class').value.trim()
    const section = document.getElementById('section').value.trim()
    const address = document.getElementById('address').value.trim()
    const city = document.getElementById('city').value.trim()
    const state = document.getElementById('state').value.trim()
    const country = document.getElementById('country').value.trim()
    const pincode = document.getElementById('pincode').value.trim()
    const previousSchool = document.getElementById('previousSchool').value.trim()    

    const payload = {
        studentName,
        fatherName,
        motherName,
        gender,
        dob,
        religion,
        mobile,
        email,
        class : sclass,
        section,
        address, 
        city, 
        state, 
        country, 
        pincode, 
        previousSchool
    }

    

    try
    {
        const res = await axios.post("/student", payload, getServerSession())
        e.target.reset()
        closeAdmissionForm()
        Swal.fire({
            icon: "success",
            title: "Admission success",
        })
        .then(()=>{
            location.reload()
        })
    }
    catch(err)
    { 
        Swal.fire({
            icon: "error",
            title: "Admission Failed",
            text: err.response ? err.response.data.message : err.message
        })
    }
}

const fetchStudents = async () => {
    const res = await axios.get("/student", getServerSession())
    const students = res.data

    const container = document.querySelector('.student-container')

    for(let student of students){
        const ui = `
            <div class="border border-gray-200 p-6 flex flex-col justify-center items-center gap-2 rounded-lg shadow-lg">
                <div class="text-center flex flex-col items-center justify-center gap-2">
                    <img 
                        src="../images/demo.jpg" 
                        alt="students image"
                        class="w-30 h-30 rounded-full" 
                    />
                    <h1 class="text-lg font-semibold capitalize">${student.studentName}</h1>
                </div>

                <div class="flex flex-col items-center">
                    <small class="text-sm text-gray-600">${student.email}</small>
                    <small class="text-xs text-gray-600">+91 ${student.mobile}</small>
                </div>

                <div class="space-x-4 my-2">
                    <button class="bg-linear-to-t from-sky-500 to-indigo-500 text-white font-medium px-6 py-2 rounded">
                        Class - ${student.class}
                    </button>

                    <button class="bg-linear-to-t from-amber-500 to-orange-500 text-white font-medium px-6 py-2 rounded">
                        Roll - ${student.roll}
                    </button>
                </div>

                <div class="flex flex-col items-center justify-center">
                    <small class="text-sm text-gray-600">Section: ${student.section}</small>
                    <small class="text-sm text-gray-800 font-semibold">Class Teacher: Mr. Prashant Tiwari</small>
                </div>
            </div>
        `
        container.innerHTML += ui
    }
}