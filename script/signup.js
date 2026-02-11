const signup = (e) => {
    e.preventDefault();
    const form = e.target
    const fullname = form.elements.fullname.value.trim()
    const mobileNumber = form.elements.mobileNumber.value.trim()
    const email = form.elements.email.value.trim()
    const password = form.elements.password.value.trim()

    console.log(fullname, mobileNumber, email, password);
}