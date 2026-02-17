window.onload = async () => {
    await getSession()
}

const createEmployee = (e) => {
    e.preventDefault()
    
    const employeeName = document.getElementById('employeeName').value.trim();
    const gender = document.getElementById('gender').value.trim();
    const dob = document.getElementById('dob').value.trim();
    const doj = document.getElementById('doj').value.trim();
    const religion = document.getElementById('religion').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const email = document.getElementById('email').value.trim();
    const qualification = document.getElementById('qualification').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const country = document.getElementById('country').value.trim();
    const pincode = document.getElementById('pincode').value.trim();
    // const previousSchool = document.getElementById('previousSchool').value.trim();
    const desiganation = document.getElementById('desiganation').value.trim();

    console.log(employeeName, gender, dob, doj, religion, mobile, email, qualification, address, city, state, country, pincode, desiganation);

    e.target.reset()
}