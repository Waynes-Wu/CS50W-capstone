document.addEventListener('DOMContentLoaded', ()=>{
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    document.querySelectorAll('.card-text>span').forEach(element => {
        let a = new Date(element.textContent);
        // cuurent date
        let b = new Date()

        // ms between now and last studied date , then convert to hrs
        let c = Math.trunc((b-a)/1000/60/60)
        
        let newColor = c > 72 ? 'bg-danger' : c > 48 ?'bg-warning' :'bg-success';
        element.parentElement.parentElement.classList.add(newColor)

        const cardBody = element.parentElement.parentElement;

        cardBody.querySelector('button').addEventListener('click', ()=>{
            let p = cardBody.querySelector('p.definition')
            let button = cardBody.querySelector('button')
            if (p.classList.contains('invisible')){
                p.classList.remove('invisible')
                button.value = 'check definition'
                
                let acronym = cardBody.querySelector('.card-title').textContent;

                const request = new Request(
                    '',
                    {headers: {'X-CSRFToken': csrftoken}}
                );
                fetch(request, {
                    method: 'PUT',
                    mode: 'same-origin',
                    body: JSON.stringify({acronym : acronym})
                })
                .then(response => response.json())
                .then(response => {
                    console.log(response.message)
                });
            }
            else{
                p.classList.add('invisible')
                button.value = 'hide definition'
            }
        })

    });


    
})