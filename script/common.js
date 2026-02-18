let session = null

const server = "https://adminflow-backend.onrender.com"
axios.defaults.baseURL = server

const drawer = document.getElementById('drawer')

const openAdmissionForm = () => {
    drawer.style.width = '50%'   
}


const closeAdmissionForm = () => {
    drawer.style.width = 0    
}

const getSession = async() => {
    const token = localStorage.getItem('token')
    
    if(!token){
        if(location.pathname === "/login.html" || location.pathname === "/signup.html") return

        location.href = "/login.html"
    }
    else{
        try
        {
            const res = await axios.post("/token/verify", {token: token})
            session = res.data
            showUserInfo()
        }
        catch(err)
        {
            localStorage.clear()
            if(location.pathname === "/login.html" || location.pathname === "/signup.html") return
            location.href = "/login.html"
        }
    }
}


const logout = () => {
    localStorage.clear()
    location.href = "/login.html"
}

const showUserInfo = () => {
    const schoolName = document.querySelector('#schoolName')
    const email = document.querySelector('#email')
    const mobile = document.querySelector('#mobile')

    if(!schoolName || !email || !mobile) return 

    schoolName.textContent = session.schoolName
    email.textContent = session.email
    mobile.textContent = session.mobile
}

const getServerSession = () => {
    const token = localStorage.getItem('token')
    const options = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return options
}