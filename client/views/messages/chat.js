Template.chat.events({
	'button.send-message': function(e) {
		var message = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		};

		var conversation = Conversatoin.findOne({_id: Router.current().params._id});
	}
});