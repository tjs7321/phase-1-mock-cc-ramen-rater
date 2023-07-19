const baseURL = "http://localhost:3000/ramens"
const ramenMenu = document.getElementById("ramen-menu")
const bigImage = document.getElementById("big-image")
const bigName = document.getElementById("big-name")
const bigRestaurant = document.getElementById("big-restaurant")
const bigRating = document.getElementById("rating-display")
const bigComment = document.getElementById("comment-display")
const newRamenForm = document.getElementById("new-ramen")
const newName = document.getElementById("new-name")
const newRestaurant = document.getElementById("new-restaurant")
const newImage = document.getElementById("new-image")
const newRating = document.getElementById("new-rating")
const newComment = document.getElementById("new-comment")


newRamenForm.onsubmit = (e) => {
    e.preventDefault()
    let newRamen = {
        name: newName.value,
        restaurant: newRestaurant.value,
        image: newImage.value,
        rating: newRating.value,
        comment: newComment.value
    }
    const postNewRamen = {
        method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(newRamen)
    }
    fetch(baseURL, postNewRamen)
    .then(response => {return response.json()})
    .then(ramen => {
        ramenThumbnail = document.createElement("img")
        ramenThumbnail.src = ramen.image
        ramenThumbnail.onclick = () => {
            centerRamenImage(ramen.id)
        }
        ramenMenu.appendChild(ramenThumbnail)
    })
    newRamenForm.reset()
}

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
        }
    }
})
const centerRamenImage = (ramenId) => {
    fetch("http://localhost:3000/ramens" + '/' + ramenId)
    .then(response => response.json())
    .then(ramen => {
        bigImage.src = ramen.image
        bigName.innerText = ramen.name
        bigRestaurant.innerText = ramen.restaurant
        bigRating.innerText = ramen.rating
        bigComment.innerText = ramen.comment
    })
}
