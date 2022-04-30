
document.getElementById("row2").style.display = "none";
let changeText = () => {
    var operation= document.getElementById("view-button");
    console.log(operation.innerText);
    if(operation.innerText==="View more"){
      document.getElementById("row2").style.display = "flex"; 
       operation.innerText = "View Less";
    }
    else{
      document.getElementById("row2").style.display = "none";
  
      operation.innerText="View more";
    }
  }
  
