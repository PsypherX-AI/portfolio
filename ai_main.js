// FOR UPDATING WEBSITE GALLERY CHANGE THE FOLLOWING ARRAYS TO MATCH THE IMAGE NAMES IN EACH FOLDER
const FANTASY = ["Samurai", "SamuraiPink", "SamuraiTree", "SamuraiGod", "SamuraiOverlookin", "SamuraiEnemy", "GoddessForest", "GoddessLandscape", "HourglassFire", "FutureSetup", "ShipBlue", "Astronaught", "CrystalDragon", "Planets", "Diablo", "FutureCPU", "SquirelArcher", "SquirelArcher2", "TrollWarrior", "Warrior", "DragonSword1", "DragonSword2"];
const LANDSCAPES = ["RedJapan", "RedJapan2", "JapanSketch", "JapanNight", "JapanMoon", "JapanRedMoon", "Bloodriver", "Bloodriver2", "Bloodriver3", "Forest", "Coral", "ElegantGirl", "GirlRain", "GoldRiverGreece", "GoldRiver", "GoldGreyRiver", "MountainVillage", "BlossomTree", "JapanCity"];
const PSYCHEDELIC = ["Hoffman", "DMTForest", "JoburgCBD", "Forest", "WizardCathedral", "Hyperbeast", "Fractal1", "Fractal2", "Apples", "Apples2", "Apples3", "Apples4", "Apples5", "DragonsSamurai", "DragonSamurai", "DragonSamurai2", "SamuraiSkeleton", "Fractal3", "Fractal4"];
const REALISTIC = ["Face", "Face2", "VW", "VW2", "Eyes1", "Eyes2", "Eyes3", "Eyes4", "GoldRose", "Katana", "HippieVW", "HippieVW2", "Dakar1", "Dakar2", "Dakar3", "Dakar4", "CharPortrait", "Oldman1", "Oldman2", "Oldman3"];
const UV = ["test", "test", "test"];
const ANIMALS = ["Kitten", "KittenKickflip", "Panda", "SadPanda", "DJShephard1", "DJShephard2", "DJShephard3", "DJShephard4", "RaveShephard", "DJShephard", "Shephard", "Shephard2"];
const COSMIC = ["Hourglass", "HourglassCosmic", "CosmicMountain", "Cosmic", "CosmicEyes", "CosmicEyes2", "CosmicEye1", "CosmicEye2", "CosmicEye3", "CosmicEye4", "Wizard"];

window.onscroll = function () {
    scrollFunction();
}

window.onload = function () {
    setImages('Fantasy', FANTASY);
}

function scrollFunction () {
    // Scroll To Top Button
    if (document.documentElement.scrollTop > 700) {
        document.getElementById("scrolltotop_parent").style.opacity = 1;
        document.getElementById("scrolltotop_parent").style.transition = "opacity 0.3s";
        document.getElementById("scrolltotop_parent").style.cursor = "pointer";
    }
    else {
        document.getElementById("scrolltotop_parent").style.opacity = 0;
        document.getElementById("scrolltotop_parent").style.transition = "opacity 0.3s";
        document.getElementById("scrolltotop_parent").style.cursor = "default";
    }
}

function scrollToTop () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function navbarHover (flag) {
    if (flag) {
        document.getElementById("navbar").style.opacity = 1;
        document.getElementById("navbar").style.transition = "opacity 0.3s";
    }
    else {
        scrollFunction();
    }
}

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function mobileNavBar() {
    var x = document.getElementById("myTopnav");
    var y = document.getElementById("navbar");

    if (x.className === "nav-items") {
      x.className += " responsive";
    } else {
      x.className = "nav-items";
    }

    if (y.className === "") {
        y.className += " responsive";
      } else {
        y.className = "";
      }
  } 

/* --- GALLERY CHANGING --- */

/* PRIVATE CONSTANTS */
// Button onClick image changing

let currentImages = [];

/**
 * Changes the folder directory
 */
function changeGallery(folder, butId) {
    updateCategoryButtons(butId);

    switch (folder) {
        case "landscape":
            setImages('Landscapes', LANDSCAPES); 
            break;
        case "psychedelic":
            setImages('Psychedelic', PSYCHEDELIC);
            break;
        case "realistic":
            setImages('Realistic', REALISTIC); 
            break;
        case "uv":
            setImages("UVNeon", UV);
            break;
        case "cosmic":
            setImages("Cosmic", COSMIC);
            break; 
        case "animals":
            setImages("Animals", ANIMALS);
            break;   
        default:
            setImages('Fantasy', FANTASY);
            break;    
    }
}

/**
 * This function updates each image individually
 * @param {*} folder 
 * @param {*} imgList 
 */
function setImages(folder, imgList) {
    let outputContainer = document.getElementById("output");

    // first remove all images
    for (let i = 0; i < currentImages.length; i++) {
        outputContainer.removeChild(currentImages[i]);
    }

    // reset currentImages
    currentImages = [];

    for (let i = 0; i < imgList.length; i++) {
        let imgId = "img" + i;
        let imgUrl = "assets/ai_images/" + folder + "/" + imgList[i] + ".png";

        let newImg = document.createElement("img");
        newImg.id = imgId;
        newImg.src = imgUrl;
        newImg.style.cursor = "pointer";
        // newImg.onclick = function() {
        //     enlargeImage(i);
        // };
        
        newImg.setAttribute('alt', imgList[i]);
        newImg.setAttribute('onclick', 'enlargeImage(this.alt)');

        outputContainer.appendChild(newImg);

        currentImages.push(newImg);

        // let img = document.getElementById(imgId);
        // img.src = imgUrl;
        // img.style.height = "100%";
    }

    // setTotalImages(imgList);

    fadeImagesIn(imgList);
}

function enlargeImage(imgAlt) {
    // Get the modal
    var modal = document.getElementById('myModal');
    var img;

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    currentImages.forEach(element => {
        if (element.alt === imgAlt) {
            img = document.getElementById(element.id);
        }
    });
    
    var modalImg = document.getElementById("imgModal");
    var captionText = document.getElementById("caption");

    // img.onclick = function(){
        modal.style.display = "block";
        modalImg.src = img.src;
        captionText.innerHTML = img.alt;
    // }

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() { 
        modal.style.display = "none";
    }
}

/**
 * Hide / Show image holders for category
 */
function setTotalImages(imgList) {
    // Get the longest list first
    let longestList = FANTASY.length;
    if (REALISTIC.length > longestList) {
        longestList = REALISTIC.length;
    }
    else if (ANIMALS.length > longestList) {
        longestList = ANIMALS.length;
    } 
    else if (PSYCHEDELIC.length > longestList) {
        longestList = PSYCHEDELIC.length;
    }
    else if (COSMIC.length > longestList) {
        longestList = COSMIC.length;
    }
    else if (LANDSCAPES.length > longestList) {
        longestList = LANDSCAPES.length;
    }

    // Now all items will always be covered because of longestList
    for (let i = 0; i < longestList; i++) {
        let thisImage = document.getElementById("img" + i);

        if (i < imgList.length) {
            thisImage.style.opacity = 1;
        }
        else {
            thisImage.style.opacity = 0;
        }
    }
}

/**
 * This animates a fade in for all the images
 * @param {*} imgList 
 */
function fadeImagesIn(imgList) {
    let container = document.getElementById("gallery-container");
    container.style.opacity = 0;

    var j = 1;
        var k = window.setInterval(function() {
            if (j >= 20) {
              clearInterval(k);
            } else {
                container.style.opacity = j / 20;
              j++;
            }
          }, 15);
}

/**
 * This toggles buttons when selected
 * @param {*} id 
 */
function updateCategoryButtons (id) {
    for (let i = 0; i < 6; i++) {
        let button = document.getElementById("btnCat" + i);

        if (i === id) {
            button.classList.remove("unselected");
            button.classList.add("selected");
        }
        else {
            button.classList.remove("selected");
            button.classList.add("unselected");
        }
    }
}