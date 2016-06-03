$(document).ready(function() {
	var persons = [];
	$(".add-contact form").submit(function(event) {
		event.preventDefault();
		var person = {
			"firstName": $("#first-name").val(),
			"lastName": $("#last-name").val(),
			"phoneNumber": $("#phone-number").val(),
			"street": $("#street").val(),
			"city": $("#city").val(),
			"state":$("#state").val()
		};
		persons.push(person);

		$("#first-name").val("");
		$("#last-name").val("");
		$("#phone-number").val("");
		$("#street").val("");
		$("#city").val("");
		$("#state").val("");

		$(".list-contact ul").append(
			"<li><a id=person" + String(persons.length-1) + " href='#0'>" + person.firstName + " " + person.lastName + "</a></li>"
		);
	});
});