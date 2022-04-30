const PRICE_PER_ROOM = 1000;
const url = window.location.search;
const urlParams = new URLSearchParams(url);
const id = urlParams.get("id");
const key = "a43f3539d7msh9724254b1ad2431p15964djsn92b1a91fded0";

function changeValue() {
    let numberElement = document.getElementById("number");
    let totalPriceElement = document.getElementById("total");
    let toDateElement = document.getElementById("toDate");
    let fromDateElement = document.getElementById("fromDate");

    
    let refToId = document.getElementById("id");

    let toDateValue = new Date(toDateElement.value);
    let fromDateValue = new Date(fromDateElement.value);

    toDateElement.min = fromDateElement.value;

    let days = (toDateValue - fromDateValue)/(24*60*60*1000);
    
    if(numberElement.value && toDateElement.value && fromDateElement.value)
        totalPriceElement.value = "Rs. " + parseInt(numberElement.value)*PRICE_PER_ROOM*days;
    else
        totalPriceElement.value = "Rs.0";   
}



getHotelImages = () => {
    const xhr = new XMLHttpRequest();
    const apiURL = `https://travel-advisor.p.rapidapi.com/photos/list?location_id=${id}&currency=USD&limit=50&lang=en_US`;
    xhr.onreadystatechange = function () {
       if (xhr.readyState == 4 && xhr.status == 200) {
         var jsonData = JSON.parse(this.responseText);
         console.log(jsonData.data);
         parseHotelImages(jsonData.data);
       }
    };
    xhr.open("GET",apiURL);
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key" , key);
    xhr.send();
 }
 getHotelDetails = () => {//to get hotel details
    const xhr = new XMLHttpRequest();
    const apiURL = `https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id=${id}`;
    xhr.onreadystatechange = function () {
       if (xhr.readyState == 4 && xhr.status == 200) {//check if positive reply is received
         var jsonData = JSON.parse(this.responseText);
         console.log(jsonData.data);
         parseHotelDetails(jsonData.data);//sending to another function to parse and populate details
       }
    };
    xhr.open("GET",apiURL);
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key" , key);
    xhr.send();
 }
 getHotelImages();
 getHotelDetails();
 parseHotelImages = data => {//set hotel images in carousel
    let carouselContent = "";
    let isActive = "active";
    getImages = (item) => {
       const image = item.images.large.url;
       carouselContent = carouselContent + `
         <div class="carousel-item ${isActive}">
         <img
           src=${image}
           class="align-items-center reSize"
           alt="..."
         />
       </div>`
       isActive = "";
    }
    data.forEach(getImages);
    
    const refToCarousel = document.getElementById("slides");
    refToCarousel.innerHTML = carouselContent;
 }
 parseHotelDetails = (data) => {//setting hotel details on page
   const name = data[0].name;
    const rating = data[0].rating;
    const description = data[0].description;
    const amenities = data[0].amenities;
 
    printRating(rating);
    const refToHotelName = document.getElementById("name-hotel");
    refToHotelName.innerHTML = name;
    const refToAmenities  = document.getElementById("Amenities");
    //Constructing an unordered list from data
    let listData = "";
    for(i = 0 ; i < 10 ; i++) {
       listData = listData + `<li>${amenities[i].name}</li>`;
    }
    refToAmenities.innerHTML = listData;
 
    const refToDescription = document.getElementById("description-hotel");
    refToDescription.innerHTML = description;
 }
 
 printRating = (rating) => {//print rating as stars based on numerical value
    let ratingNum = parseInt(rating);
    console.log("dddddddddddddddd"+ratingNum);
    let ratingString = "";
    let i = 0;
    // var isPositive = true;     
   const refToRating = document.getElementById("star-Rating");
   for(i = 0 ; i < ratingNum ; i++) {
      ratingString = ratingString + `<i class="fa-solid fa-star fill"></i>`;
   }
   if(rating.length > 1 && rating[2] != "0") {
      // isPositive = false;
      ratingString = ratingString + `<span class="fa-solid fa-star-half-stroke fill"></span>`;
      i++;
   }
   for(let j = i ; j < 5 ; j++) {
     ratingString = ratingString + `<i class="fa-solid fa-star"></i>`;
   }
  ratingString = ratingString +`<span class="fa-solid fa-star fill"></span>`;
    refToRating.innerHTML = ratingString;
 }