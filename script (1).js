// Select elements
const submitLoc = document.querySelector(".accessbtn");
const checkbox = document.querySelector("#checkbox");
const locationInput = document.querySelector(".curloc");
const addressInput = document.querySelector(".curadd");
const destinationInput = document.querySelector(".dest");

// Event listener for checkbox
checkbox.addEventListener("click", () => {
    if (checkbox.checked) {
        alert("Live Location access granted to site");
    } else {
        alert("Live Location access revoked from site");
    }
});

// Event listener for submit button
submitLoc.addEventListener("click", () => {
    const location = locationInput.value.trim();
    const address = addressInput.value.trim();
    const destination = destinationInput.value.trim();

    // Validate inputs
    if (!location || !address || !destination) {
        alert("Please fill in all the fields before submitting.");
        return;
    }

    // Save data to local storage
    localStorage.setItem("Current Location", location);
    localStorage.setItem("Current Address", address);
    localStorage.setItem("Destination", destination);

    // Clear inputs
    locationInput.value = "";
    addressInput.value = "";
    destinationInput.value = "";

    alert("Location details saved to local storage!");
});
