//Плавный переход по якорям 
$(document).ready(function(){
	$("#headerId").on("click","a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 1500);
	});
});

// Всплывающее окно
let overlay = $('#overlayId');

$(document).ready(function(){
	
	$('.overlay-button').on("click", function(){
		overlay.fadeIn(500);
	});

	$('.popup-close').on("click", function(){
		overlay.fadeOut(500);
	});

});

$(document).mouseup(function (e) {
    if (overlay.has(e.target).length === 0){
        overlay.fadeOut(500);
    }
});