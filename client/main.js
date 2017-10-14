import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';
import { Events } from "../imports/api/events.js";
import './main.html';

Router.route('/');
if (Meteor.isClient) {
    Template.register.events({
    'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.registerEmail.value;
        var passwordVar = event.target.registerPassword.value;
        Accounts.createUser({
            email: emailVar,
            password: passwordVar
        	});
    	}
	});
    Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(emailVar, passwordVar);
    	}
	});
	Template.dashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    	}
	});
    Template.createGame.events({
    'submit form': function(event){
    	event.preventDefault();
		var sportVar = $('input[name="group1"]:checked').val();
		var dateVar = event.target.date.value;
		console.log(dateVar);
		var timeVar = event.target.time.value;
		var locVar = event.target.loc.value;
		Events.insert({ sport: sportVar, date: dateVar, time: timeVar, loc: locVar});
		console.log(Events.find({}).fetch());
		location.reload();
		}
	});
	Template.displayTable.onRendered(function(){
		var arr = Events.find({}).fetch();
		console.log(arr[0]);
		for(var x = 0; x < arr.length; x++){
			$("#tableBody").append("<tr> <td>" + arr[x]['sport'] + "</td><td>" + arr[x]['date'] + "</td><td>" + arr[x]['time'] + "</td><td>" + arr[x]['loc'] + "</td></tr>");
		}

	});

}