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
		var numPlayersVar = event.target.numOfPlayers.value;
		var userIdsVar = Array();
		userIdsVar.push(Meteor.userId());
		Events.insert({ sport: sportVar, date: dateVar, time: timeVar, loc: locVar, initialNumPlayers: 1, numPlayers: numPlayersVar, userIds: userIdsVar});
		location.reload();
		}
	});
	Template.displayTable.onRendered(function(){
		var arr = Events.find({}).fetch();
		var txtButton;
		for(var x = 0; x < arr.length; x++){
			if (arr[x]['userIds'].includes(Meteor.userId())){
				txtButton = "<button id= "+arr[x]['_id'] +" class='btn leave waves-effect waves-red'> Leave </button>";
			}
			else{txtButton = "<button id= "+arr[x]['_id'] +" class='btn join waves-effect waves-light'> Join </button>";}
			$("#tableBody").append("<tr> <td>" + arr[x]['sport'] + "</td><td>" + arr[x]['date'] + "</td><td>" + 
				arr[x]['time'] + "</td><td>" + arr[x]['loc'] + " </td> <td>" + "" + arr[x]['initialNumPlayers'] + "/" + arr[x]['numPlayers'] +
				"</td><td>" + txtButton + "</td></tr>");
		}

	});
	Template.displayTable.events({
		'click .join': function(event){
			event.preventDefault();
			var id = event.target.id
			var temp = Events.find({_id: id}).fetch()[0]['userIds']
			temp.push(Meteor.userId());
			Events.update( {_id: id}, {$set:{initialNumPlayers: Events.find({ _id: id }).fetch()[0]['initialNumPlayers'] + 1}});
			Events.update( {_id: id}, {$set:{userIds: temp}});
			location.reload();
		}
	});
	Template.displayTable.events({
		'click .leave': function(event){
			event.preventDefault();
			var id = event.target.id
			var temp = Events.find({_id: id}).fetch()[0]['userIds']
			temp.splice(temp.indexOf(Meteor.userId()),1);
			Events.update( {_id: id}, {$set:{initialNumPlayers: Events.find({ _id: id }).fetch()[0]['initialNumPlayers'] - 1}});
			Events.update( {_id: id}, {$set:{userIds: temp}});
			location.reload();
		}
	});

}