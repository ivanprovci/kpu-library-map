document.addEventListener("DOMContentLoaded", () => {
	const KPU_LIBRARY_COORDS = { lat: 49.132, lng: -122.871 }

	function initMap() {
		const distanceOutput = document.getElementById("distance")

		// map
		const map = new google.maps.Map(document.getElementById("map"), {
			zoom: 11,
			center: KPU_LIBRARY_COORDS,
		})

		// library marker, and clickable info window
		const libraryMarker = new google.maps.Marker({
			position: KPU_LIBRARY_COORDS,
			map: map,
			title: "KPU Library",
		})
		const libraryInfoWindow = new google.maps.InfoWindow({
			content: "KPU Library",
		})
		libraryMarker.addListener("click", () => {
			libraryInfoWindow.open({
				anchor: libraryMarker,
				map,
			})
		})

		// get user's position with geolocation api
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					// user marker, and clickable info window
					const userMarker = new google.maps.Marker({
						position: {
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						},
						map: map,
						title: "Your Location",
					})

					const userInfoWindow = new google.maps.InfoWindow({
						content: "You",
					})

					userMarker.addListener("click", () => {
						userInfoWindow.open({
							anchor: userMarker,
							map,
						})
					})

					const distance = (
						google.maps.geometry.spherical.computeDistanceBetween(
							userMarker.position,
							libraryMarker.position
						) / 1000
					) // convert to km
						.toFixed(2)

					distanceOutput.textContent =
						"Distance to KPU Surrey Library from your location: " +
						distance +
						"km"
				},
				() => {
					distanceOutput.textContent =
						"ERROR: Failed to get user coordinates"
				},
				{
					// more accurate user position
					enableHighAccuracy: true,
				}
			)
		} else {
			distanceOutput.textContent =
				"ERROR: Location services have been disabled"
		}
	}

	initMap()
})
