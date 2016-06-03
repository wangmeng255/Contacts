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
			"<li class=person><a href='#0'>" + person.firstName + " " + person.lastName + "</a></li>"
		);
	});
	$(".list-contact").on("click", ".person", function() {
		$(".show-contact ul").html("");
		var listItem = $(this);
		var i = $(this).index(".list-contact li");
		$(".show-contact ul").prepend(
			"<h2>" + persons[i].firstName + " " + persons[i].lastName + "</h2>"
		);
		$(".show-contact ul").append(
			"<li>First name: " + persons[i].firstName + "</li>" +
			"<li>Last name: " + persons[i].lastName + "</li>" +
			"<li>Phone Number: " + persons[i].phoneNumber + "</li>" +
			"<ul>Address:<li>" + persons[i].street + ", " + persons[i].city + ", " + persons[i].state + "</li></ul>"
		);
	});
});