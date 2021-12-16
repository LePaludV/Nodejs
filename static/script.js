$(document).ready(function() {

	icons = [
		'air',
		'fire',
		'paper',
		'rock',
		'scissors',
		'sponge',
		'water'
	];
	
	icons.forEach(function(icon) {
		$("#buttons").append(`<button>${icon}</button>`);
	});

	$('button').click(function() {
		player = $(this).text();
		$("#player img").attr('src', `ressources/${player}.png`);
		
		r = Math.floor(Math.random() * icons.length);
		cpu = icons[r];
		$("#cpu img").attr('src', `ressources/${cpu}.png`);
		$.ajax({
			method: 'get',
			url: 'fight',
			dataType: 'json',
			data: {player: player, cpu: cpu},
			success: function(data) {
				switch (data.outcome) {
					case 1: 
						$('#result h2').text("Player wins");
						$('#result p').text(data.message);
						break;
					case -1: 
						$('#result h2').text("CPU wins");
						$('#result p').text(data.message);
						break;
					case 0: 
						$('#result h2').text("Draw");
						$('#result p').text("");
				}
			},
			error: function() {
				console.log("An error has occured");
			}
		});
	});
	
});

