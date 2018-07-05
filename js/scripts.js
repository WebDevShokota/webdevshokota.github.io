document.body.onload = function() {

	setTimeout(function() {
		var preloader = document.getElementById('page-preloader');
		if( !preloader.classList.contains('done') )
		{
			preloader.classList.add('done');
		} 
	}, 1000);

}

$(document).ready(function() {

	//E-mail Ajax Send
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

});