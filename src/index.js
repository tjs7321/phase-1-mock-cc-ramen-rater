const baseURL = "http://localhost:3000/ramens"
const ramenMenu = document.getElementById("ramen-menu")
const bigImage = document.getElementById("big-image")
const bigName = document.getElementById("big-name")
const bigRestaurant = document.getElementById("big-restaurant")
const bigRating = document.getElementById("rating-display")
const bigComment = document.getElementById("comment-display")


/////on page load, request all ramen from server/////
document.addEventListener("DOMContentLoaded", () => {
    fetch(baseURL)
    .then(response => response.json())
    .then(response => postRamenOnMenu(response))

    const postRamenOnMenu = (response) => {
        for (let ramen of response) {
            ramenThumbnail = document.createElement("img")
            ramenThumbnail.src = ramen.image
            ramenThumbnail.onclick = () => {
                centerRamenImage(ramen.id)
            }
            ramenMenu.appendChild(ramenThumbnail)
            console.log(ramen.id)
        }
    }
})
const centerRamenImage = (ramenId) => {
    console.log(ramenId)
    console.log("http://localhost:3000/ramens" + '/' + ramenId)
    fetch("http://localhost:3000/ramens" + '/' + ramenId)
    .then(response => response.json())
    .then(ramen => {
        bigImage.src = ramen.image
        bigName.innerText = ramen.name
        bigRestaurant.innerText = ramen.restaurant
        bigRating.innerText = ramen.rating
        bigComment.innerText = ramen.comment
        console.log(ramen)
    })
}