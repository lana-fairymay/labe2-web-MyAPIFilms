
const findFilm = (params) => {
    let count = Number(document.getElementById("user-country").value);
    console.log(count);
}
const btn = document.querySelector(".btn_search");

btn.addEventListener("click", findFilm);
