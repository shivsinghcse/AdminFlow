axios.defaults.baseURL = server
let editId = null
window.onload = async () => {
    await getSession()
    fetchSubjects()
}

const createSubject = async (e) => {
    e.preventDefault()

    if(editId){
        saveSubject(editId, e)
        return
    }
    const subject = document.getElementById('subject').value.trim()
    const fullmarks = document.getElementById('fullmarks').value.trim()

    const payload = {
        subjectName: subject,
        fullmarks
    }


    try
    {
        const res =  await axios.post('/subject', payload, getServerSession())
        e.target.reset()
        closeAdmissionForm()
        Swal.fire({
            icon: "success",
            title: "Subject created"
        }).then(()=>{
            location.reload()
        })
    }
    catch(err)
    {
        Swal.fire({
            icon: "error",
            title: "Failed",
            text: err.response ? err.response.data.message : err.message
        })
    }
}

const fetchSubjects = async () => {
    try
    {
        const res = await axios.get('/subject', getServerSession())
        const subjects = res.data
        const container = document.querySelector('.subject-container')
        for(let subject of subjects){
            const ui = `
                <div class="border border-gray-200 p-6 flex flex-col justify-center items-center gap-2 rounded-lg shadow-lg">
                <div class="text-center flex flex-col items-center justify-center gap-2">
                    <i class="ri-git-repository-line text-6xl"></i>
                    <h1 class="text-lg font-semibold capitalize">${subject.subjectName}</h1>
                </div>

                <div class="flex flex-col items-center">
                    <label class="text-sm text-gray-600">${subject.fullmarks} Marks</label>  
                </div>

                <div class="space-x-4 my-2">
                    <button onclick="editSubject('${subject._id}', '${subject.subjectName}', '${subject.fullmarks}')" class="bg-linear-to-t from-sky-500 to-indigo-500 text-white font-medium px-4 py-2 rounded hover:cursor-pointer transition active:scale-95">
                        <i class="ri-pencil-line"></i>
                        Edit
                    </button>

                    <button onclick="deleteSubject('${subject._id}')" class="bg-linear-to-t from-rose-500 to-orange-500 text-white font-medium px-4 py-2 rounded hover:cursor-pointer transition active:scale-95">
                        <i class="ri-delete-bin-3-line"></i>
                        Delete
                    </button>
                </div>
            </div>  
            `
            container.innerHTML += ui
        }
    }
    catch(err)
    {
        Swal.fire({
            icon: "error",
            title: "Failed",
            text: err.response ? err.response.data.message : err.message
        })
    }
}

const deleteSubject = async (subjectId) => {
    try
    {
        await axios.delete(`/subject/${subjectId}`, getServerSession())
        Swal.fire({
            icon: "success",
            title: "Subject deleted"
        })
        .then(() => {
            location.reload()
        })
    }
    catch(err)
    {
        Swal.fire({
            icon: "error",
            title: "Failed",
            text: err.response ? err.response.data.message : err.message
        })
    }
}

const editSubject = (subjectId, subjectName, fullMarks) => {
        const subject = document.getElementById('subject')
        const fullmarks = document.getElementById('fullmarks')
        
        openAdmissionForm()

        subject.value = subjectName
        fullmarks.value = fullMarks

        editId = subjectId
}


const saveSubject = async (subjectId, e) => {
    const subject = document.getElementById('subject').value.trim()
    const fullmarks = document.getElementById('fullmarks').value

    const payload = {
        subjectName: subject,
        fullmarks
    }

    try
    {
        await axios.put(`/subject/${subjectId}`, payload, getServerSession())
        e.target.reset()
        closeAdmissionForm()
        Swal.fire({
            icon: 'success',
            title: 'Update success'
        })
        .then(() => {
            location.reload()
        })
    }
    catch(err)
    {
        Swal.fire({
            icon: 'error',
            title: 'Update failed',
            text: err.response ? err.response.data.message : err.message
        })
    }
}