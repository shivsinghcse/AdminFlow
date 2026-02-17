axios.defaults.baseURL = server 

const signup = async (e) => {
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

    try
    {
        const data = await axios.post("/school/signup", payload)

            Swal.fire({
                icon: "success",
                title: data.data.message
            })
            .then(() => {
                location.href = "./login.html"
            })
    }
    catch(err)
    {
        Swal.fire({
            icon: "error",
            title: "Signup failed!",
            text: err.message
        })
    }    
}