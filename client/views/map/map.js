Template.map.helpers({
	exampleMapOptions: function(event, instance) {
		if (GoogleMaps.loaded()) {
			return {
				center: new google.maps.LatLng(Template.instance().lat.get(), Template.instance().lng.get()),
				zoom: 14
			};
		}
	}
});


Template.map.created = function() {
	var instance = this;
	this.lat = new ReactiveVar();
	this.lng = new ReactiveVar();

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
		// Add a marker to the map once it's ready
		var marker = new google.maps.Marker({
			position: map.options.center,
			map: map.instance
		});
	});



};