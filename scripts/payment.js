

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