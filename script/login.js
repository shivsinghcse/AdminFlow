axios.defaults.baseURL = server

const login = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const payload = {
        email,
        password
    }

    e.target.reset()
    
    axios.post("/school/login", payload)
    .then((res) => {
        localStorage.setItem("token", res.data.token)

        Swal.fire({
            icon: "success",
            title: res.data.message+"!"
        })

        .then(() => {
            location.href = "../app/dashboard.html"
        })

    })

    .catch((err) => {

        // console.log(err.response.data.message);
        Swal.fire({
            icon: "error",
            title: "Login failed!",
            text: err.response.data.message
        })
        
    })
}
 