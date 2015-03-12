Template.map.events({
	'click button.send-map-message': function() {
		var message = {
			message: $('textarea#map-message-text').val(),
			createdAt: Date.now(),			
			creatorId: Meteor.userId(),
			lat: $('#modal-message-lat').val(),
			lng: $('#modal-message-lng').val()
		};

		MapMessages.insert(message);
		$('#map-message-text').val('');

		$('#modal-sending-message').modal('hide');
	}
});

Template.map.helpers({
	exampleMapOptions: function(event, instance) {
		if (GoogleMaps.loaded()) {
			return {
				center: new google.maps.LatLng(0, 0),
				zoom: 14,
				disableDoubleClickZoom: true
			};
		}
	}
});


Template.map.created = function() {
	var instance = this;
	this.lat = new ReactiveVar();
	this.lng = new ReactiveVar();
	this.markers = {};

	Meteor.setInterval(function() {
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				instance.lat.set(position.coords.latitude);
				instance.lng.set(position.coords.longitude);
			});
		}
	}, 1000);

	// We can use the `ready` callback to interact with the map API once the map is ready.
	GoogleMaps.ready('exampleMap', function(map) {
		google.maps.event.addListener(map.instance, 'dblclick', function(event) {
            $('input#modal-message-lat').val(event.latLng.lat());
            $('input#modal-message-lng').val(event.latLng.lng());

            $('#modal-sending-message').modal('show');
        });

        MapMessages.find().observe({
			added: function(document) {
				instance.markers[document._id] = new google.maps.Marker({
					position: new google.maps.LatLng(document.lat, document.lng),
					map: map.instance,
					title: Meteor.users.findOne(document.creatorId).username,
					icon: '/images/map-message.png'
				});

				var infowindow = new google.maps.InfoWindow({
					content: '<div id="content">' + document.message + '</div>'
				});

				google.maps.event.addListener(instance.markers[document._id], 'click', function() {
				    infowindow.open(map.instance, instance.markers[document._id]);
				});
			},
			removed: function(document) {
				instance.markers[document._id].setMap(null);
			}
		});
	});
};


Template.map.rendered = function() {
	var instance = Template.instance();	

	GoogleMaps.ready('exampleMap', function(map) {
		instance.autorun(function(c) {
			if (instance.lat.get())
				map.instance.setCenter(new google.maps.LatLng(instance.lat.get(), instance.lng.get()));
		});
	});
}