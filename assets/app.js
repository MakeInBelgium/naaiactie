$(document).ready(function () {
	if (
		location.protocol !== "https:" &&
		location.hostname !== "localhost" &&
		location.hostname !== "127.0.0.1" &&
		location.hostname !== "0.0.0.0"
	) {
		location.replace(
			`https:${location.href.substring(location.protocol.length)}`
		);
	}

});



function sendWhatsapp(){
	let link = "https://www.praatbox.be/"+generatePraatboxURL(getParameterByName("wrd_a"), getParameterByName("wrd_b"), getParameterByName("wrd_c"));
	window.open("https://api.whatsapp.com/send?text="+escape(link), '_blank');
}
