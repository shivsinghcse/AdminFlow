axios.defaults.baseURL = server 

const signup = (e) => {
    e.preventDefault();
    const form = e.target
    const schoolName = form.elements.schoolName.value.trim()
    const dirName = form.elements.dirName.value.trim()
    const mobile = form.elements.mobileNumber.value.trim()
    const email = form.elements.email.value.trim()
    const password = form.elements.password.value.trim()

    const payload = {
        schoolName,
        dirName, 
        mobile,
        email,
        password
    }

    form.reset()

    axios.post("/school/signup", payload)

    .then((res)=>{
        Swal.fire({
            icon: "success",
            title: res.data.message
        })
        .then(() => {
            location.href = "./login.html"
        })
    })

    .catch((err)=>{
        console.log(err);
        Swal.fire({
            icon: "error",
            title: "Signup failed!",
            text: err
        })
    })
    
}