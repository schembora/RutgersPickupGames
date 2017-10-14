import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Mongo } from 'meteor/mongo';
import './main.html';


if (Meteor.isClient) {
    Event = new Mongo.Collection("event");
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
    'event form': function(event){
        event.preventDefault();
	var sportVar = $('input[name="group1"]:checked').val();
	var dateVar = event.target.date.value;
	var timeVar = event.target.time.value;
	var locVar = event.target.loc.value;
	Events.insert({ sport: sportVar, date: dateVar, time: timeVar, loc: locVar});
}
