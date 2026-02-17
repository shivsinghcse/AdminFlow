window.onload = async () => {
  admissionChart()
  paymentChart()
  await getSession()
  console.log(session);
}

const admissionChart = () => {

    const options = {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: "Admissions",
          data: [550, 660, 780, 875, 965, 887, 778],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(255, 205, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(18, 156, 126, 0.7)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1,
          borderRadius: 6
        }]
      }
    }
    const canvas = document.getElementById('admission-chart').getContext('2d');
    new Chart(canvas, options)
}

const paymentChart = () => {

    const options = {
      type: 'doughnut',
      data: {
        labels: ['Paid', 'Dues'],
        datasets: [{
          data: [55000, 26000],
          backgroundColor: [
            'rgba(43, 56, 230, 0.7)',
            'rgba(240, 27, 27, 0.7)',
          ],          
        }]
      }
    }
    const canvas = document.getElementById('payment-chart').getContext('2d');
    new Chart(canvas, options)
}