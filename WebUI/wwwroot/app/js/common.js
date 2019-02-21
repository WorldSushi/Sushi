$(function() {

	$('.row-anchor').click((event) => {
		const row = $(event.target.parentNode);

		const href = row.data("href");

		window.location = href;
	})

});
