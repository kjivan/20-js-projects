const container = document.querySelector(".container");
const emptySeats = document.querySelectorAll(".row .seat:not(.occupied)");
const seats = document.querySelectorAll(".row .seat");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

const clearButton = document.getElementById("clear");
const saveButton = document.getElementById("save");
const resetButton = document.getElementById("reset");

let ticketPrice = +movieSelect.value;

populateUI();
updateSelectedCount();

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    emptySeats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const occupiedSeats = JSON.parse(localStorage.getItem("occupiedSeats"));

  if (occupiedSeats !== null && occupiedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (occupiedSeats.indexOf(index) > -1) {
        seat.classList.add("occupied");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  movieSelect.selectedIndex = selectedMovieIndex;
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatsIndex = [...selectedSeats].map((seat) =>
    [...emptySeats].indexOf(seat)
  );

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  updateSelectedCount();
  setMovieData(e.target.selectedIndex, e.target.value);
});

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

clearButton.addEventListener("click", () => {
  emptySeats.forEach((seat) => seat.classList.remove("selected"));
  updateSelectedCount();
});

saveButton.addEventListener("click", () => {
  emptySeats.forEach(
    (seat) =>
      (seat.className = seat.classList.contains("selected")
        ? "seat occupied"
        : seat.className)
  );
  updateSelectedCount();
  updateOccupied();
});

function updateOccupied() {
  const occupiedSeats = document.querySelectorAll(".row .seat.occupied");
  const occupiedIndicies = [...occupiedSeats].map((seat) =>
    [...seats].indexOf(seat)
  );
  localStorage.setItem("occupiedSeats", JSON.stringify(occupiedIndicies));
}

resetButton.addEventListener("click", () => {
  seats.forEach((seat) => (seat.className = "seat"));
  updateSelectedCount();
  updateOccupied();
});
