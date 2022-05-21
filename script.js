let bodyTag = document.querySelector("body");
let createHouseTag = document.querySelector(".post-property");
let formTag = document.querySelector(".form");
let containerTag = document.querySelector(".container");
let formDisplay = false;
let houseArr = [];
let bhkCount = document.querySelector(".bhk-selector");
let filterZone = document.querySelector(".zone-selector");

createHouseTag.addEventListener("click", function(){
    if (formDisplay){
        formTag.style.display = 'flex';
    }else{
        formTag.style.display = 'none';
    }
    formDisplay = !formDisplay
});









function createHouse(){
    formTag.style.display = 'none';
    formDisplay = !formDisplay
    

    let BedROOMS = document.getElementById("bed_rooms").value;
    let houseName = document.getElementById("h_name").value;
    let location = document.getElementById("location").value;
    let price = document.getElementById("price").value;

    let ghurTKT = document.createElement("div");
    ghurTKT.setAttribute("class" , "ghur");
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

    houseArr.push({"Name" : houseName , "Price" : price , "Location" : location , "BHK" : BedROOMS});

    let imageTag = ghurTKT.querySelector(".ghur-photo");
    let soldTag = ghurTKT.querySelector(".sold");


    soldTag.addEventListener("click", function(){
        alert("CLICK IMAGE TO BUY");

        imageTag.addEventListener("click" , function(){
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

    updateHouseCount(BedROOMS);
    
    
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
                filterArr.push(houseArr[j])
            }
        }
        console.log(filterArr);
        showFilter(filterArr);
    } )

}


function showFilter(filterArr){
    containerTag.remove()
}





