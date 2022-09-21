let addToy = false;
let toyBoxDiv = document.querySelector('div#toy-collection')
let toyForm = document.querySelector('.add-toy-form')


fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(function(toysArr){
    toysArr.forEach(createToyCard)
  }
  )




function createToyCard(toy){
  let toyCardDiv = document.createElement('div')
  toyCardDiv.className = 'card'
  
  let toyCardNameH2 = document.createElement('h2')
  toyCardNameH2.innerText = toy.name

  let toyImage = document.createElement('img')
    toyImage.src = toy.image
    toyImage.className = 'toy-avatar'
    toyImage.alt = toy.name
  
  let likesP = document.createElement('p')
    likesP.innerText = `${toy.likes} likes`

  let likesBtn = document.createElement('button')
    likesBtn.className = 'like-btn'
    likesBtn.innerText = 'like ♥'

  toyCardDiv.append(toyCardNameH2,toyImage,likesP,likesBtn)
  toyBoxDiv.append(toyCardDiv)

  likesBtn.addEventListener('click',(e) => {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        likes: toy.likes +1
      })
    })
    .then(res => res.json())
    .then(function(updatedToyObj){
      toy.likes = updatedToyObj.likes
      likesP.innerText = `${updatedToyObj.likes} Likes`
    })
  })

};



toyForm.addEventListener('submit',(e) =>{
  e.preventDefault()
  let newName = e.target.name.value
  let newImage = e.target.image.value

  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify({
      name: newName,
      image: newImage,
      likes: 0
    })
  })
    .then(res => res.json())
    .then(function(newToy){
      createToyCard(newToy)
    })
})


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
