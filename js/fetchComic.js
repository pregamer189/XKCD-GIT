var currentComic = -1; //skapar en varibel
let maxComic; //skapar en varibel

window.onload = function() { 
    
    getComic('latest'); //hämtar senaste comicen

    getComic('currentComic'); //hämtar den aktuella comicen

        //skapar en variabel för varje knapp, från HTML:en
    let first = document.getElementById('first');
    let prev = document.getElementById('prev');
    let rand = document.getElementById('rand');
    let next = document.getElementById('next');
    let last = document.getElementById('last');


    //skapar en funktion för varje knapp
    first.onclick = function() {
        currentComic = 1;
        getComic(currentComic.toString()); //alla "toString" gör att det blir en string
    }


    prev.onclick = function() {
        if (currentComic > 1){ //tillåter ej prev kappen att gå under 1
            currentComic--; //Tar bort 1 från currentComic
            getComic(currentComic.toString());
    }
}


    rand.onclick = function() {
        currentComic = Math.floor(Math.random() * maxComic); //ger ett random nummer mellan 1 och maxComic
        getComic(currentComic.toString());
    }


    next.onclick = function() {
        if (currentComic == maxComic){ //tillåter ej next knappen att gå över maxComic
            return; //Gör så att kodan slutar köras, vilket förhindrar onödigt laddande
        }
        currentComic++; //Lägger till 1 till currentComic
        getComic(currentComic.toString());
    }


    last.onclick = function() {
        if (currentComic == maxComic){ //tillåter ej last knappen att gå över maxComic
            return; //Gör så att kodan slutar köras, vilket förhindrar onödigt laddande
        }
        currentComic = maxComic; //ger "last" knappen värdet av maxComic
        getComic(currentComic.toString());
    }
}
    function getComic(comicNumber) {

    }
    

    //funktion för att hämta comicen
function getComic(which) {
    fetch('https://xkcd.vercel.app/?comic='+which) //hämtar comicen från xkcd
    .then(function(response) {
        if (response.status==200){ //ger endast respons om status är 200 (allt ok)
            return response.json();
        }
    })
    .then(function(data) { //tar fram den senaste comicen
        if (which === 'latest') {
            maxComic = data.num;
        }
        appendComic(data); 
    })
}

function appendComic(data) {

    let mainComic = document.getElementById('mainComic'); //skapar en variabel för mainComic
    mainComic.innerHTML = ''; //tömmer mainComic så att det bara finns en comic i taget

    let title = document.createElement('h1');
    title.innerHTML = data.title; //tar fram titeln av comicen
    mainComic.appendChild(title);

    let date = document.createElement('p');
    date.innerHTML = data.day + '/' + data.month + '/' + data.year; //tar fram datum av comicen
    mainComic.appendChild(date);

    let figure = document.createElement('figure'); //tar fram bilden för comicen
    let img = document.createElement('img');
    img.src = data.img;
    img.onload = function() {
        captionText.style.width = this.width + 'px'; // Genererad kod för att få captionen att bli lika bred som bilden
        caption.style.width = this.width + 'px'; // Genererad kod för att få captionen att bli lika bred som bilden
    }

    figure.appendChild(img);
    mainComic.appendChild(figure);

    let captionText = document.createElement('figcaption'); //tar fram texten för comicen
    captionText.innerHTML = data.alt;
    mainComic.appendChild(captionText);

    let caption = document.createElement('figcaption'); //tar fram numret för comicen
    caption.innerHTML = data.num;
    figure.appendChild(caption);

  
    

  



    /*
    title
    datum skapad med ett js date object
    HTML figure element med img och caption, cation ska innehålla num för serien
    */
    
}