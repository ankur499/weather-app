
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#m1')
const messageTwo = document.querySelector('#m2')



weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    const location = search.value
    fetch('http://localhost:3000/weather?city='+location+'').then( (res) => {
        res.json().then( (data) =>{
            if(data.error){
                messageOne.textContent = data.error
                messageTwo.textContent = ""
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})