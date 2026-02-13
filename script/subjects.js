

const createSubject = (e) => {
    e.preventDefault()
    const subjectName = document.getElementById('subject').value.trim()
    const fullmarks = document.getElementById('fullmarks').value.trim()

    console.log(subjectName, fullmarks);

    e.target.reset()
}