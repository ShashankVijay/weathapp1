console.log("This is the JavaScript from the client side.")

const weatherForm = document.querySelector('form')
const searchboxelement = document.querySelector('input')

const msgs = document.querySelector('#msg1')
const msgs2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit',(e)=>
{
    e.preventDefault();
    const loc = searchboxelement.value
    
    msgs.textContent = 'Loading.....'
    msgs2.textContent = ''
    fetch("http://localhost:3000/weather?address="+loc.toString()).then((response)=>
{
    response.json().then((p_response)=>
    {
        if(p_response.error === undefined)
        {
            console.log(p_response)
            msgs.textContent = p_response.place
            msgs2.textContent = 'It is currently '+p_response.temperature+' F with a '+p_response.rain+' chance of rain. '+p_response.summary+'.'
        }
        else
        {
            console.log(p_response.error)
            msgs.textContent = p_response.error
        }
    })
})

})