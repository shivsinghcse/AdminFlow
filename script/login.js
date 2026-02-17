axios.defaults.baseURL = server

const login = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const payload = {
        email,
        password
    }

    e.target.reset()

    try{
        const data = await axios.post("/school/login", payload)

        localStorage.setItem("token", data.data.token)
        location.href = "../app/dashboard.html"
    }
    catch(err)
    {
        Swal.fire({
            icon: "error",
            title: "Login failed!",
            text: err.response.data.message
        })
    }
}
 