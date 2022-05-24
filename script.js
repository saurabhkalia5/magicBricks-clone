let bodyTag = document.querySelector("body");
let createHouseTag = document.querySelector(".post-property");
let formTag = document.querySelector(".form");
let containerTag = document.querySelector(".container");
let formDisplay = false;
let houseArr = [];
let bhkCount = document.querySelector(".bhk-selector");
let filterZone = document.querySelector(".zone-selector");
var uid = new ShortUniqueId();
let blinkTag = document.querySelector(".free");

createHouseTag.addEventListener("click", function(){
    if (formDisplay){
        formTag.style.display = 'flex';
    }else{
        formTag.style.display = 'none';
    }
    formDisplay = !formDisplay
});






if(localStorage.getItem("houses")){
    let str = localStorage.getItem("houses");
    houseArr = JSON.parse(str);
    for(let i = 0 ; i < houseArr.length ; i++){
        createHouse(houseArr[i].id,houseArr[i].BHK, houseArr[i].Name,houseArr[i].Location, houseArr[i].Price);
        updateHouseCount(houseArr[i].BHK);
    }
}


function createHouse(id,roomCount , nameCount , locationCount , priceCount){
    formTag.style.display = 'none';
    formDisplay = !formDisplay

    let BedROOMS = ""; 
    let houseName = "";
    let location = "";
    let price = "";
    let houseId = "";
    
    if(id==undefined){
        houseId = uid();
         BedROOMS = document.getElementById("bed_rooms").value;
         houseName = document.getElementById("h_name").value;
         location = document.getElementById("location").value;
         price = document.getElementById("price").value;  
    }else{
         houseId=id;
         BedROOMS = roomCount;
         houseName = nameCount;
         location = locationCount;
         price = priceCount;
    }
   

    let ghurTKT = document.createElement("div");
    ghurTKT.setAttribute("class" , "ghur");
    ghurTKT.setAttribute("id", houseId);
    ghurTKT.innerHTML = `  <img src="/antila.jpg" class="ghur-photo">
    <div class="name">
        <h15>NAME</h15>
        <h4>${houseName}</h4>
    </div>
    <div class="price">
        <h15>price</h15>
        <h4>${price} cr</h4>
    </div>
    <div class="location">
        <h15>location</h15>
        <h4>${location}</h4>
    </div>
    <div class="bhk">
        <h15>bhk</h15>
        <h4>${BedROOMS}</h4>
    </div>
    <i class="material-icons sold">attach_money</i>
    
    `

    containerTag.appendChild(ghurTKT);
    if(id==undefined){
        houseArr.push({"id" : houseId , "Name" : houseName , "Price" : price , "Location" : location , "BHK" : BedROOMS});
        updateLocalStorage();
    }

    
    // console.log(houseArr);

    let imageTag = ghurTKT.querySelector(".ghur-photo");
    let soldTag = ghurTKT.querySelector(".sold");


    soldTag.addEventListener("click", function(){
        alert("CLICK IMAGE TO BUY");

        imageTag.addEventListener("click" , function(){
            updateHouseArray(ghurTKT);
            // console.log(ghurTKT);
            ghurTKT.remove();
            alert("CONGRATS ! YOU BOUGHT THE HOUSE");


            let counterTag = document.querySelectorAll(".counter");
            for(let i = 0 ; i < counterTag.length ; i++){
                let Bedvalue = counterTag[i].getAttribute("value");
                if(Bedvalue == BedROOMS){
                    let presentCount = parseInt(counterTag[i].getAttribute("count"));
                    let newCount = presentCount - 1 ;
                    counterTag[i].setAttribute("count" , newCount);
                    counterTag[i].innerHTML = `${Bedvalue} BHK : ${newCount} House`;
                }
            }
        })
    });
    if(id==undefined){
        updateHouseCount(BedROOMS);
    }
   
    
    
}

function updateHouseCount (BedROOMS){
    let counterTag = document.querySelectorAll(".counter");
    for(let i = 0 ; i < counterTag.length ; i++){
        let Bedvalue = counterTag[i].getAttribute("value");
        if(Bedvalue == BedROOMS){
            let presentCount = parseInt(counterTag[i].getAttribute("count"));
            let newCount = presentCount + 1 ;
            counterTag[i].setAttribute("count" , newCount);
            counterTag[i].innerHTML = `${Bedvalue} BHK : ${newCount} House`;
        }
    }
}

let filterCity = filterZone.querySelectorAll(".zone-city");
for(let i = 0 ; i < filterCity.length ; i++){
filterCity[i].addEventListener("dblclick", function(){
        let selectedCity = filterCity[i].value;
        let filterArr = [];

            for(let j = 0 ; j < houseArr.length ; j++){
                if(selectedCity.trim() == houseArr[j].Location.trim()){
                    filterArr.push(houseArr[j]);
                }else if(selectedCity=="All"){
                    filterArr.push(houseArr[j]);
                }
                
            }
        console.log(filterArr);
        console.log(houseArr);
        showFilter(filterArr);
    } )


}


function showFilter(filterArr){
    let ghurTKT = document.querySelectorAll(".ghur")
    for(let i = 0 ; i < ghurTKT.length ; i++){
        ghurTKT[i].remove();
    }

    for(let i = 0 ; i < filterArr.length ; i++){
        let id = filterArr[i].id;
        let roomCount = filterArr[i].BHK;
        let locationCount = filterArr[i].Location;
        let houseName = filterArr[i].Name;
        let priceCount = filterArr[i].Price;
        // console.log(id + roomCount + houseName + locationCount + priceCount);
        createHouse(id , roomCount , houseName , locationCount , priceCount);
    }

    
}

let sortup = document.querySelector(".ascending");
sortup.addEventListener("click",function(){
    function compare( a, b ) {
        if ( a.BHK < b.BHK ){
          return -1;
        }
        if ( a.BHK > b.BHK ){
          return 1;
        }
        return 0;
      }
      houseArr.sort( compare );
      showFilter(houseArr);

});

let sortdown = document.querySelector(".descending");
sortdown.addEventListener("click",function(){
    function compare( a, b ) {
        if ( b.BHK < a.BHK ){
          return -1;
        }
        if ( b.BHK > a.BHK ){
          return 1;
        }
        return 0;
      }
      houseArr.sort( compare );
      showFilter(houseArr);
})

function updateHouseArray(ghurTKT){
    let ids = ghurTKT.getAttribute("id");
    // console.log(id);
    for(let i = 0 ; i < houseArr.length ; i++){
        if(houseArr[i].id == ids){
            houseArr.splice(i,1);
            updateLocalStorage();
        }
    }

    
}

function updateLocalStorage(){
        let stringiFy = JSON.stringify(houseArr);
        localStorage.setItem("houses",stringiFy);
}




