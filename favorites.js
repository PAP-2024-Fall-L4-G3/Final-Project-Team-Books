import {showFavorites} from "./book.js";

const closeOverlayBtn = document.getElementById("close-overlay");

closeOverlayBtn.addEventListener("click", () => {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("books-section").innerHTML = "";
    showFavorites();
})
showFavorites();