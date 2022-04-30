const url = window.location.search;
const urlParams = new URLSearchParams(url);
const city = urlParams.get("city");
const apiURL = `https://travel-advisor.p.rapidapi.com/locations/search?query=${city}&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US`;
const key = "a43f3539d7msh9724254b1ad2431p15964djsn92b1a91fded0";
const xhr = new XMLHttpRequest();
let mapDetails = [{ lat: 0.0, lng: 0.0 }]; //default value to avoid error
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var jsonData = JSON.parse(this.responseText);
    getListView(jsonData.data);
    initMap();
  }
};

xhr.open("GET",apiURL);
xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key" , key);
xhr.send();

let getListView = (data) => {
  let name, img, address, locationId, rating;
  let hotel ="";
  mapDetails = [];
  const populateViews = (item) => {
    if (item.result_type == "lodging") {
      name = item.result_object.name;
      img = item.result_object.photo.images.large.url;
      address = item.result_object.address;
      locationId = item.result_object.location_id;
      rating = item.result_object.rating;
      mapDetails.push({
        lat: parseFloat(item.result_object.latitude),
        lng: parseFloat(item.result_object.longitude),
        locationId: locationId,
        name: name,
        address: address,
      });
      hotel = hotel + `               
                    <li class="li-content">
                        <a href="detail.html?id=${locationId}">
                        <img src="${img}" alt="${name}" />
                        <dl>
                            <dt><h3>${name}</h3></dt>
                            <dt>${rating}<span class="fa-solid fa-star fill"></span></dt>
                            <dt>${address}</dt>
                          </dl>
                        </a>  
                    </li> `;
    }
  };

  data.forEach(populateViews);//populate both list and map view data

  let listView = document.getElementById("list");
  listView.innerHTML = hotel;
};

let map;

initMap = () => {
  var options = {
    center: { lat: mapDetails[0].lat, lng: mapDetails[0].lng },
    zoom: 10,
  };
  map = new google.maps.Map(document.getElementById("map"), options);

  // adding markers based on hotel data
  for (let i = 0; i < mapDetails.length; i++) {
    addMarker(mapDetails[i]);
  }

  function addMarker(data) {
    let marker = new google.maps.Marker({
      position: { lat: data.lat, lng: data.lng },
      map: map,
    });
    //adding info window associated with markers
    let infoWindow = new google.maps.InfoWindow({
      content: `<p>${data.name}</p>
                <a href="detail.html?id=${data.locationId}">Book Now</a>`,
    });

    marker.addListener("click", function () {
      infoWindow.open(map, marker);
    });
  }
}