let session = null

const server = "https://school-backend-pi.vercel.app"
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
        location.href = "/login.html"
    }
    else{
        try
        {
            const res = await axios.post("/token/verify", {token: token})
            session = res.data
        }
        catch(err)
        {
            localStorage.clear()
            location.href = "/login.html"
        }
    }
}

