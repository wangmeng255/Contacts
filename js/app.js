"use strict"
$(document).ready(function() {
	var persons = [];
	var phoneCount = 0;
	var addressCount = 0;
	$(".add-contact form").submit(function(event) {
		event.preventDefault();
		var formSerial=$(this).serializeArray();
		if(formSerial[0].value && formSerial[1].value && formSerial[2].value){
			var person = {
				phoneNumber: [],
				Address: []
			};
			for(var i=0; i<formSerial.length; i+=1)
			{
				if(formSerial[i].name.startsWith("phoneNumber")) {
					person["phoneNumber"].push(formSerial[i].value);
				}
				else {
					if(formSerial[i].name.startsWith("street")) {
						var Address = "";
						if(formSerial[i].value) Address += formSerial[i].value + ", ";
						if(formSerial[i+=1].value) Address += formSerial[i].value + ", ";
						if(formSerial[i+=1].value) Address += formSerial[i].value;
						if(Address.slice(Address.length-2, Address.length-1)==", ") Address = Address.slice(0, Address.length-3);
						person.Address.push(Address);
					}
					else {
						person[formSerial[i].name] = formSerial[i].value;
					}
				}
			}
			persons.push(person);
			$(".add-contact input[type='text']").each(function() {
				$(this).val("");
				if($(this).attr("name").match(/\d$/)) {
						$(this).siblings().each(function() {
							$(this).remove()
						});
						$(this).parent().remove();
						$(this).remove();
				}
			});

			$(".list-contact ul").append(
				"<li class=person><a href='#0'>" + person.firstName + " " + person.lastName + "</a></li>"
			);
			phoneCount = 0;
			addressCount = 0;
		}
		else{
			alert("Please submit first name, last name and phone number.");
		}
	})
	.on("click", "#add-phone-number", function() {
		phoneCount += 1;
		$("#street").parent().before(
			"<div><label for='phone-number" + phoneCount +"'>Phone Number</label>" +
			"<input type='button' class='del-phone-number' value='Remove Phone Number'><br>" +
			"<input type='text' name='phoneNumber" + phoneCount + 
			"' id='phone-number" + phoneCount +
			"'><br></div>"
		);
	})
	.on("click", "#add-address", function() {
		addressCount += 1;
		$("#add-address").before("<div><label for='street" + addressCount + 
			"'>Street</label><input type='button' class='del-address' value='Remove Address'><br><input type='text' name='street" + addressCount + 
			"' id='street" + addressCount + "'><br></div><div><label for='city" + 
			addressCount + "'>City</label><br><input type='text' name='city" + addressCount +
			"' id='city"+ addressCount +"'><br></div><div><label for='state" + addressCount + 
			"'>State</label><br>" + "<input type='text' name='state" + addressCount + 
			"' id='state" + addressCount + "'><br></div>");
	})
	.on("click", ".del-phone-number", function() {
		$(this).siblings().each(function() {
			$(this).remove();
		});
		$(this).parent().remove();
		$(this).remove();
	})
	.on("click", ".del-address", function() {
		$(this).siblings().each(function() {
			$(this).remove();
		});
		$(this).parent().next().next().remove();
		$(this).parent().next().remove();
		$(this).parent().remove();
		$(this).remove();
	});
	$(".list-contact").on("click", ".person", function() {
		$(".show-contact ul").html("");
		var listItem = $(this);
		var i = $(".list-contact li").index(listItem);
		$(".show-contact ul").prepend(
			"<h2>" + persons[i].firstName + " " + persons[i].lastName + "</h2>"
		);
		var showStr = "<li>First name: " + persons[i].firstName + "</li>" +
			"<li>Last name: " + persons[i].lastName + "</li>" +
			"<ul>Phone Number:"; 
		for(var j=0; j<persons[i].phoneNumber.length; j+=1)
			showStr += "<li>" + persons[i].phoneNumber[j] + "</li>";
		showStr += "</ul><ul>Address:";
		if(persons[i]["Address"][0]) {
			for(var j=0; j<persons[i]["Address"].length; j+=1)
				showStr += "<li>" + persons[i].Address[j] + "</li>";
		}
		showStr += "</ul>";
		$(".show-contact ul").append(showStr);
	});
});