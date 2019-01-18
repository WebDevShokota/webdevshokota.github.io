window.addEventListener('DOMContentLoaded', function(){
	// Переключение блоков
	let infoHeaderTab = document.getElementsByClassName('info-header__tab'),
		infoBlock = document.getElementsByClassName('info-block'),
		infoHeader = document.getElementsByClassName('info-header')[0];

	function hideinfoBlock(a){
		for (let i = a; i < infoBlock.length; i++){
			infoBlock[i].classList.remove('show');
			infoBlock[i].classList.add('hide');
		}
	}

	hideinfoBlock(1);

	function showinfoBlock(b){
		if(infoBlock[b].classList.contains('hide')){
			hideinfoBlock(0);
			infoBlock[b].classList.remove('hide');
			infoBlock[b].classList.add('show');
		}
	}

	infoHeader.addEventListener('click', (event) => {
		let target = event.target;
		if(target.className == 'info-header__tab') {
			for (let i = 0; i < infoHeaderTab.length; i++){
				if(target == infoHeaderTab[i]){
					showinfoBlock(i);
					break;
				}
			}
		}
	});

	//Таймер
	let deadline = "2019-01-18";

	function getTimeRemaining(endtime){
		let t 		= Date.parse(endtime) - Date.parse(new Date()),
			seconds = Math.floor((t/1000) % 60),
			minutes = Math.floor((t/1000/60) % 60),
			hours 	= Math.floor((t/(1000*60*60)));

		if (minutes == 0 && hours == 0) {
			return{
				'hours': 0,
				'minutes': 0,
				'seconds': 0
			}
		} else {
			return{
				'total': t,
				'hours': hours,
				'minutes': minutes,
				'seconds': seconds
			};
		}

		
	}; 

	function setClock(id, endtime){
		let timer = document.getElementById(id),
			hours = timer.querySelector('.hours'),
			minutes = timer.querySelector('.minutes'),
			seconds = timer.querySelector('.seconds');

			function updateClock(){
				let t 				= getTimeRemaining(endtime);
				hours.innerHTML 	= t.hours;
				minutes.innerHTML 	= t.minutes;
				seconds.innerHTML 	= t.seconds;

				if (t.total <= 0){
					clearInterval(timeInterval);
				}
			};

			updateClock();
			let timeInterval = setInterval(updateClock, 1000);
	};

	setClock('timer', deadline);

//Форма
	let message = new Object();
	message.loading = "Закрузка";
	message.success = "Отправлено. Ожидайте звонка.";
	message.failure = "Ошибка. Повторите позже.";
	//Всплывающее окно
	let form = document.getElementsByClassName('form')[1],
		input = form.getElementsByTagName('input'),
		statusMessage = document.createElement('div');
		statusMessage.style.textAlign = 'center';
		statusMessage.style.fontSize = '20px';
		statusMessage.style.paddingTop = '20px';
		statusMessage.classList.add('status');

		form.addEventListener('submit', function(event){
			event.preventDefault();
			form.appendChild(statusMessage);

		//AJAX
		let request = new XMLHttpRequest();
		request.open("POST", 'server.php')
		
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		let formData = new FormData(form);
		request.send(formData);

		request.onreadystatechange = function(){
			if (request.redyState < 4){
				statusMessage.innerHTML = message.loading;
			} else if (request.readyState === 4){
				if(request.status == 200 && request.status < 300){
					statusMessage.innerHTML = message.success;
				} 
				else {
					statusMessage.innerHTML = message.failure;
				}
			}
		}
		for (let i = 0; i < input.length; i++){
			input[i].value = '';
		}
	});

//Контакты
	let formX = document.getElementsByClassName('form')[0],
		inputX = formX.getElementsByTagName('input'),
		statusMessageX = document.createElement('div');
		statusMessageX.style.color = '#c78030';
		statusMessageX.style.fontSize = '20px';
		statusMessageX.style.paddingTop = '20px';
		statusMessageX.classList.add('status');

		formX.addEventListener('submit', function(event){
			event.preventDefault();
			formX.appendChild(statusMessageX);

		//AJAX
		let request = new XMLHttpRequest();
		request.open("POST", 'server.php')
		
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		let formDataX = new FormData(form);
		request.send(formDataX);

		request.onreadystatechange = function(){
			if (request.redyState < 4){
				statusMessageX.innerHTML = message.loading;
			} else if (request.readyState === 4){
				if(request.status == 200 && request.status < 300){
					statusMessageX.innerHTML = message.success;
				} 
				else {
					statusMessageX.innerHTML = message.failure;
				}
			}
		}
		for (let i = 0; i < inputX.length; i++){
			inputX[i].value = '';
		}
	});

//Слайдер
	let slideIndex = 1,
		slides = document.getElementsByClassName('slider-block__img'),
		prev = document.querySelector('.slider-block__prev'),
		next = document.querySelector('.slider-block__next'),
		dotsWrap = document.querySelector('.slider-dots'),
		dots = document.getElementsByClassName('dot');

	function showSlides(n) {
		if (n > slides.length){
			slideIndex = 1;
		};
		if (n < 1){
			slideIndex = slides.length;
		};

		for (let i = 0; i < slides.length; i++){
			slides[i].style.display = 'none';
		};
		for (let i = 0; i < dots.length; i++){
			dots[i].classList.remove('dot-active');
		};

		slides[slideIndex - 1].style.display = 'block';
		dots[slideIndex - 1].classList.add('dot-active');
	};

	showSlides(slideIndex);

	function plusSlides(n){
		showSlides(slideIndex += n);
	};

	function currentSlide(n){
		showSlides(slideIndex = n);
	};

	prev.addEventListener('click', function(){
		plusSlides(-1);
		setTimeout(time, 5000);
	});

	next.addEventListener('click', function(){
		plusSlides(1);
		setTimeout(time, 5000);
	});

	function time(){
		plusSlides(1)
	}
	setTimeout(time, 5000);

	dotsWrap.addEventListener('click', function(event){
		for (let i = 0; i < dots.length + 1; i++){
			if (event.target.classList.contains('dot') && event.target == dots[i-1]){
				currentSlide(i);
				setTimeout(time, 5000);
			}
		}
	});

//Калькулятор
	let persons = document.getElementsByClassName('price-block__input')[0],
		restDays = document.getElementsByClassName('price-block__input')[1],
		place = document.getElementById('selectId'),
		totalValue = document.getElementById('totalId'),
		personsSum = 0,
		daysSum = 0,
		total = 0;

	totalValue.innerHTML = 0;

	persons.addEventListener('change', function(){
		personsSum = +this.value;
		total = (daysSum + personsSum)*4000;
		if (restDays.value == ''){
			totalValue.innerHTML = 0;
		} else {
			totalValue.innerHTML = total;
		}
	});
	restDays.addEventListener('change', function(){
		daysSum = +this.value;
		total = (daysSum + personsSum)*4000;
		if (persons.value == ''){
			totalValue.innerHTML = 0;
		} else {
			totalValue.innerHTML = total;
		}
	});

	place.addEventListener('change', function(){
		if (restDays.value == '' || persons.value == ''){
			totalValue.innerHTML = 0;
		} else {
			let x = total;
			totalValue.innerHTML = x * this.options[this.selectedIndex].value;
		};
	});

});