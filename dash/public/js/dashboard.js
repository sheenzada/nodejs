document.addEventListener("DOMContentLoaded", function () {

  console.log("Dashboard Loaded");

  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      alert("Card Clicked!");
    });
  });

});