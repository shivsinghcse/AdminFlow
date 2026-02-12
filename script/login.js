const login = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    console.log(email, password);
    location.href = '../app/students.html'
}
 