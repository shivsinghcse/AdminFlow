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

    fetch("http://localhost:8080/school/signup", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    
    .then((res) => {
        return res.json()
    })
    
    .then((data) => {
        console.log(data);
    })
    
    .catch((err) => {
        console.log(err.message);
    })
}