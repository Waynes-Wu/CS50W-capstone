let sessionNumber = 0;
document.addEventListener('DOMContentLoaded', ()=>
{
	// for storage
    localStorage.getItem('tasks') || localStorage.setItem('tasks', JSON.stringify([]))
    let tasks = JSON.parse(localStorage.getItem('tasks'))
	
	localStorage.getItem('goal') || askGoal()
	let goal = localStorage.getItem('goal') 



	const addListButton = document.querySelector('i.fa-plus');
	const startStudyButton = document.querySelector('#startstudy')
	const flashcardButton = document.querySelector('#flashcard')
	const goalSpan = document.querySelector('#goal')
	const tasksList = document.querySelector('#tasksList')
	
	//user goal
	goalSpan.textContent = goal;

	// modal list all the tasks
	if (tasks.length != 0 ) {
		tasks.forEach( function callback(value, index) {
			const li = document.createElement('li');
			li.textContent = value;

			const div = document.createElement('div')
			div.className = 'vr float-right mx-2';

			const ico = document.createElement('i');
			ico.className = 'fas fa-trash float-right';
			ico.setAttribute('data-list-index', index)

			ico.addEventListener('click', e =>{
				e.target.parentElement.remove()
				tasks.splice(index,1)
				localStorage.setItem('tasks', JSON.stringify(tasks))
				window.location.reload()
			})

			li.append(div)
			li.append(ico)
			tasksList.insertBefore(li, tasksList.lastElementChild)

		});
	};

	// delete all
	document.querySelector('button#deleteAllList').onclick = ()=>
	{
		localStorage.setItem('tasks', JSON.stringify([]))
		window.location.reload()
	}


	// give function to input
	let input = document.querySelector('input.inputTasks')
	input.addEventListener("keyup", e => {
		if (e.key === 'Enter') {
			e.preventDefault();

			let newTask = e.target.value;
			e.target.value = '';

			const li = document.createElement('li')
			li.textContent = newTask
			
			const div = document.createElement('div')
			div.className = 'vr float-right mx-2';

			const ico = document.createElement('i');
			ico.className = 'fas fa-trash float-right';
			ico.setAttribute('data-list-index', tasks.length)

			ico.addEventListener('click', e =>{
				let index = ico.getAttribute('data-list-index')
				e.target.parentElement.remove()
				tasks.splice(index,1)
				localStorage.setItem('tasks', JSON.stringify(tasks))
				window.location.reload()
			})
			


			li.append(div)
			li.append(ico)
			tasksList.insertBefore(li, tasksList.lastElementChild)

			// delete function


			// save to local storage
			tasks.push(newTask)
			localStorage.setItem('tasks', JSON.stringify(tasks))
		}
	})

	// display modal using js
    addListButton.addEventListener('click', e =>{

		listModalToggle()

	})

	// for the main thing?
    startStudyButton.addEventListener('click', e =>{
        const studyModalButton = document.querySelector('#startStudyModalReminderButton')
		const divBody = document.querySelector('#putSomethingHere')

		studyModalButton.addEventListener('click', ()=>{

			let page = parseInt(divBody.getAttribute('data-page'))

			let newPage = page;

			if(newPage == 0) {

				studyModalButton.textContent = 'Continue';

				if (sessionNumber == 0){

					document.querySelector('#startStudyModalReminder>div>div>div.modal-header>button').click()
					listModalToggle()
				}

				
				divBody.innerHTML = '<div class="progress"><div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div></div><span id="timer" class="fs-3">25:00</span><br><br><button class="btn btn-info">start</button>';
				divBody.className = 'text-center';

				studyModalButton.classList.add('disabled')
				let time = 1500;

				let button = document.querySelector('#putSomethingHere>button')
				button.addEventListener('click', ()=>{
					button.classList.add('disabled')

					let stopTimer = setInterval(()=>{
						const bar = document.querySelector('div.progress>div')
						time --;
						console.log(time)
						let percent = Math.trunc((1500 - time)/1500*100);
						let sec = time % 60;
						let min = Math.trunc(time / 60 % 60);
						bar.setAttribute('style', `width: ${percent}%;`)
						bar.textContent = `${percent}%`;

						let sec0 = sec < 10 ? '0' : '';
						let min0 = min < 10 ? '0' : '';
						document.querySelector('#putSomethingHere>span').textContent = `${min0}${min}:${sec0}${sec}`;
						if(percent == 100 || time <= 0){
							clearInterval(stopTimer)

							let audio = new Audio('/static/studycom/beep.wav')
							audio.play()

							studyModalButton.classList.remove('disabled')
							time = 1500;
							sessionNumber += 1;
							divBody.setAttribute('data-page', 1)

						}
					
					
					}, 1000)
				})


			}
	
			else if(newPage == 1) {
				
				studyModalButton.classList.add('disabled')
				divBody.innerHTML = '<h2>Take a break come back later after 5 minutes</h2>';
				
				let breakTime  = 300;
				let stopBreak = setInterval(() => {
					breakTime --;
					console.log(breakTime)
					if (breakTime <= 0)
					{
						clearInterval(stopBreak)
						studyModalButton.classList.remove('disabled')
						divBody.setAttribute('data-page', 2)
					}
					
				}, 1000);
			}

			else if(newPage == 2) {
				divBody.innerHTML = '<label class="form-label">Try to recall everything you just learned</label><textarea class="form-control form-control-lg" placeholder="Briefly explain what you just learned in your own words"></textarea><small class="form-text">*note that none of these will be saved*</small><button id="stopStudy" class="btn btn-primary">Flashcards</button>';
				studyModalButton.textContent = 'Study more';
				studyModalButton.onclick = ()=>{
					divBody.setAttribute('data-page', 0)
				}
				document.querySelector('#stopStudy').addEventListener('click',()=>{
					fetch('',{
						method:'PUT',
						body: JSON.stringify({
							sessionNumber: sessionNumber
						})

					})
					.then(response => response.json())
					.then(response => {
						console.log(response.message)
						redirectCard()
					});
				})
			}
		})

    })
	
	// redirects user
    flashcardButton.onclick = redirectCard;

function redirectCard(){
	location.href = "/cards";
}

})
function askGoal(){
	let a = prompt('What is your goal?')
	localStorage.setItem('goal', a)
}

function listModalToggle(){
	let listModal = document.getElementById('listModal')
	let listModalObj = new bootstrap.Modal(listModal, {})
	listModalObj.toggle()
}