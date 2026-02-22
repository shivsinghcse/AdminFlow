axios.defaults.baseURL = server
let editId = null
let classesData = null
window.onload = async () => {
    await getSession()
    fetchClasses()
    fetchTeachers()
}

const createClass = async (e) => {
    e.preventDefault()
    if(editId){
        saveClass(e, editId)
        return
    }
    const classes = document.getElementById('class').value.trim()
    const sections = document.getElementById('sections').value.trim()
    const classTeacher = document.getElementById('classTeacher').value.trim()
    const fee = document.getElementById('fee').value.trim()

    const payload = {
        class: classes,
        fee,
        classTeacher,
        sections
    }

    try
    {
        const x = await axios.post('/class', payload, getServerSession())
        e.target.reset()
        closeAdmissionForm()
        Swal.fire({
            icon: 'success',
            title: 'Class added'
        })
        .then(() => {
            location.reload()
        })
    }
    catch(err)
    {
        Swal.fire({
            icon: 'error',
            title: 'Failed to load class teachers',
            text: err.response ? err.response.data.message ?? err.message : err.message
        })
    }
}


const fetchClasses = async () => {
    try
    {
        const res = await axios.get('/class', getServerSession())
        const classes = res.data
        classesData = classes
        const container = document.querySelector('.class-container')

        for(let sclass of classes){
            const ui = `
                <div class="relative border border-gray-200 p-6 flex flex-col justify-center items-center gap-2 rounded-lg shadow-lg">
                    <div class="uppercase flex items-center justify-center h-30 p-6 rounded-b-2xl shadow absolute top-0 w-[40%] bg-linear-to-t from-red-400 to-cyan-500 text-white text-2xl font-bold">
                        ${sclass.class}
                    </div>
                    <div class="mt-30 flex flex-col items-center justify-center">
                        <p class="font-semibold text-zinc-700"><span class="text-lg font-bold text-gray-700">Section</span> : ${sclass.sections}</p> 
                        <p class="font-semibold text-zinc-700"><span class="text-lg font-bold text-gray-700">Class Teacher</span> : ${sclass.classTeacher}</p> 
                    </div>    
                    <div class="space-x-4 mb-2">
                        <button onclick="editClass('${sclass._id}', '${sclass.class}', '${sclass.sections}', '${sclass.classTeacher}', '${sclass.fee}' )" class="bg-linear-to-t from-sky-500 to-indigo-500 text-white font-medium px-4 py-2 rounded hover:cursor-pointer transition active:scale-95">
                            <i class="ri-pencil-line"></i>
                            Edit
                        </button>

                        <button onclick="deleteClass('${sclass._id}')" class="bg-linear-to-t from-rose-500 to-orange-500 text-white font-medium px-4 py-2 rounded hover:cursor-pointer transition active:scale-95">
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
            icon: 'error',
            title: 'Failed to load classes',
            text: err.response ? err.response.data.message ?? err.message : err.message
        })
    }

}
const fetchTeachers = async () => {
    try
    {
        const res = await axios.get('/teacher', getServerSession())
        const teachers = res.data
        const classTeacher = document.querySelector('#classTeacher')
        
        for(let teacher of teachers){
            const ui = `<option value="${teacher._id}">${teacher.teacherName}</option>`
            
            classTeacher.innerHTML += ui
        }
    }
    catch(err)
    {
        Swal.fire({
            icon: 'error',
            title: 'Failed to load class teachers',
            text: err.response ? err.response.data.message ?? err.message : err.message
        })
    }
}

const deleteClass = async (classId) => {
    try
    {
        const x = await axios.delete(`/class/${classId}`, getServerSession())
        Swal.fire({
            icon: 'success',
            title: 'Delete success'
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

const editClass = (classId, classValue, sectionsValue, classTeacherValue, feeValue) => {
    openAdmissionForm()
    const classes = document.getElementById('class')
    const sections = document.getElementById('sections')
    const classTeacher = document.getElementById('classTeacher')
    const fee = document.getElementById('fee')
    const addNowBtn = document.querySelector('.add-now-btn')
    

    classes.value = classValue
    sections.value = sectionsValue
    classTeacher.value = classTeacherValue
    fee.value = feeValue
    addNowBtn.innerText = 'Save now'

    editId = classId
}

const saveClass = async (e, classId) => {
    const classes = document.getElementById('class').value.trim()
    const sections = document.getElementById('sections').value.trim()
    const classTeacher = document.getElementById('classTeacher').value.trim()
    const fee = document.getElementById('fee').value.trim()

    const payload = {
        class: classes,
        fee,
        classTeacher,
        sections
    }

    try
    {
        await axios.put(`/class/${classId}`, payload, getServerSession())
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

const searchClass = (input) => {
    const value = input.value.trim()
    
    const filterClasses = classesData.filter((classData) => {
        return classData.class.toLowerCase().includes(value.toLowerCase())
    })

    const container = document.querySelector('.class-container')

        container.innerHTML = ""
        for(let sclass of filterClasses){
            const ui = `
                <div class="relative border border-gray-200 p-6 flex flex-col justify-center items-center gap-2 rounded-lg shadow-lg">
                    <div class="uppercase flex items-center justify-center h-30 p-6 rounded-b-2xl shadow absolute top-0 w-[40%] bg-linear-to-t from-red-400 to-cyan-500 text-white text-2xl font-bold">
                        ${sclass.class}
                    </div>
                    <div class="mt-30 flex flex-col items-center justify-center">
                        <p class="font-semibold text-zinc-700"><span class="text-lg font-bold text-gray-700">Section</span> : ${sclass.sections}</p> 
                        <p class="font-semibold text-zinc-700"><span class="text-lg font-bold text-gray-700">Class Teacher</span> : ${sclass.classTeacher}</p> 
                    </div>    
                    <div class="space-x-4 mb-2">
                        <button onclick="editClass('${sclass._id}', '${sclass.class}', '${sclass.sections}', '${sclass.classTeacher}', '${sclass.fee}' )" class="bg-linear-to-t from-sky-500 to-indigo-500 text-white font-medium px-4 py-2 rounded hover:cursor-pointer transition active:scale-95">
                            <i class="ri-pencil-line"></i>
                            Edit
                        </button>

                        <button onclick="deleteClass('${sclass._id}')" class="bg-linear-to-t from-rose-500 to-orange-500 text-white font-medium px-4 py-2 rounded hover:cursor-pointer transition active:scale-95">
                            <i class="ri-delete-bin-3-line"></i>
                            Delete
                        </button>
                    </div>
                </div>
            `

            container.innerHTML += ui
        }

    
}