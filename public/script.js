document.addEventListener('DOMContentLoaded', () => {
  fetch('/discount')
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data)
      document.getElementById('discount').textContent = `${data.discount}%`|| 'No discount found';
    })
    .catch(error => {
      console.error('Error fetching discount:', error);
      document.getElementById('discount').textContent = 'Failed to load discount';
    });
});
