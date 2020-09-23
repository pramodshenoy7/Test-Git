

const weatherForm = document.querySelector('form');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2'); 

weatherForm.addEventListener('submit', (e)=>{
    const search = document.getElementsByTagName('input')[0].value;
    e.preventDefault();
    console.log(search)
    messageOne.textContent="Loading..."
    messageTwo.textContent=""
    fetch('/weather?address='+search).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error;
        }
        else{
            messageOne.textContent=data.location;
            messageTwo.textContent=data.forecast.Conditions;
        }
    })
})
})

