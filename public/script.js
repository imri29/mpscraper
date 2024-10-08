document.addEventListener("DOMContentLoaded", () => {
  fetch("/discount")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("discount").textContent = `${data.discount}%` || "No discount found";
    })
    .catch((error) => {
      console.error("Error fetching discount:", { error });
      document.getElementById("discount").textContent = "Failed to load discount";
    });
});
