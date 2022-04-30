

function payNow(){
    alert('Hi your booking is successfull!');
}
document.getElementById("login-button").addEventListener("click", myFunction());
function myFunction() {
let value=document.getElementById("login").innerText;
if(value==="LOGIN")
{
    document.getElementById('paybutton').disabled = true;
}
else{
    document.getElementById('paybutton').disabled = false;
}

}

const urlParams = new URLSearchParams(window.location.search);
const hotelId = urlParams.get("id");
const key = "7f9f15f992mshda3749cebff6b34p1f5740jsn7e5848b768e0";
const xhr = new XMLHttpRequest();
const apiURL = `https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id=${hotelId}&checkin=2022-03-15&adults=1&lang=en_US&currency=USD&nights=2`;
console.log(hotelId);