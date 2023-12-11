const letterContainer= document.getElementById("letter-container");
const optionsContainer= document.getElementById("options-container");
const userInputSection= document.getElementById("user-input-section");
const newGameContainer= document.getElementById("new-game-container");
const newGameButton= document.getElementById("new-game-button");
const canvas= document.getElementById("canvas");
const resultText= document.getElementById("result-text");

// está escrito con camelCase

console.log(letterContainer)

let nombres= ["Juli", "Joaquin", "Ignacio"];
console.log(nombres)
// manejo de indices
console.log(nombres[0])
console.log(nombres[1])
console.log(nombres[2])
// longitud
console.log(nombres.length);

let options = {
 frutas:[
    "manzana",
    "frutilla",
    "pera",
    "sandia",
    "naranja",
    "mandarina",
    "uvas",
    "kiwi"
],
animales:[
    "perro",
    "gato",
    "nutria",
    "jirafa",
    "rinoceronte",
    "leon",
    "pantera",
    "tortuga",
    "mamut",
    "hamster"
],
paises:[
    "australia",
    "argentina",
    "suecia",
    "alemania",
    "chile",
    "irlanda",
    "nigeria",
    "españa",
    "mexico"
],
};

// contadores
let winCount = 0;
let count = 0;
let chosenWord = "";

// trabajaremos con el display de las opciones
const displayOption = ()=>{
    optionsContainer.innerHTML += `<h3>Seleccioná una opción</h3>`;
    // ` Cntl + Alt + donde está la llave izquierda, o Alt + 96 (se llama template literal) 
    let buttonCon = document.createElement("div");
    // inerHTML nos sirve para poder ingresar codigo html en js
    for (let value in options){
        buttonCon.innerHTML += `<button class="options" onClick="generateWord('${value}')">${value}</button>`;
    };
    // la funcion de appendChild es agregar al ultimo en este caso el boton
    optionsContainer.appendChild(buttonCon);
};

// funcion para poder bloquar todos los botones
const blocker =()=>{
    // crear dos variables
    let optionsButton = document.querySelectorAll(".options");
    let letterButton = document.querySelectorAll(".letters");

    optionsButton.forEach((button)=>{
        button.disabled = true;
    });

    letterButton.forEach((button)=>{
        button.disabled = true;
    });
    // eliminar la clase de la lista de elementos (dejar sin estilos)
    newGameContainer.classList.remove("hide"); // va a mostrarlo
};

// CUALQUIER PROBLEMA SE PUEDE VER EN TERMINAL, ARRIBA EN EL MENU DE OPCIONES :)
 
// generador de palabras 
const generateWord = (optionValue)=>{
    let optionsButton = document.querySelectorAll(".options");
    optionsButton.forEach((button)=>{
        if (button.innerText.toLowerCase()=== optionValue){
            button.classList.add("active");
        }
        button.disabled = true;
    });

    // inicializamos el contenido de las letras en cero y limpiamos lo anterior
    letterContainer.classList.remove("hide");
    userInputSection.innerText="";

    let optionArray = options[optionValue];

    // codigo para elegir una palabra aleatoria
    chosenWord = optionArray[Math.floor(Math.random()* optionArray.length)];
    chosenWord = chosenWord.toUpperCase();
    
    // una vez que ya se selecciono la palabra
    // por cada letra vamos a reemplazarlo por un signo
    let displayItem= chosenWord.replace(/./g, '<span class="dashes"> - </span>')
    userInputSection.innerHTML = displayItem;
}

// cuando hagamos click en el boton de nuevo juego se reinicie todo
const initializer = ()=>{
    winCount = 0;
    count = 0;

    userInputSection.innerHTML = "";
    optionsContainer.innerHTML = "";
    letterContainer.classList.add("hide");
    newGameContainer.classList.add("hide");
    letterContainer.innerHTML = "";

    // crear las letras // o letras en mayuscula
    // codigo ASCII, es para saber el codigo de los numeros/letras/simbolos
    for (let i = 65; i < 91; i++){
        let button = document.createElement("button");
        button.classList.add("letters");
        button.innerText = String.fromCharCode(i);

        button.addEventListener("click", ()=>{
            // split () divide un objeto en string
            let charArray = chosenWord.split("");
            let dashes = document.getElementsByClassName("dashes");

            if (charArray.includes(button.innerText)){
                charArray.forEach((char,index)=>{
                    if (char === button.innerText){
                        dashes [index].innerText = char;
                        winCount +=1;
                        if (winCount === charArray.length){
                            resultText.innerHTML = `<h2 class="win-msg">Ganaste!</h2>`;
                            // esta es la funcion cuando estan activados los botones
                            blocker();
                        };
                    };
                });
            } else{
                // contador de cuando perdemos
                count +=1;
                dibujarHombre(count);
                // contador = 6 (head, body, left/right arm, left/right leg) 
                // alt+60 para <, alt+62 para >
                if (count == 6){
                    resultText.innerHTML = `<h2 class="lose msg">Mejor suerte la próxima :(</h2><p>La palabra era <span>${chosenWord}</span></p>`;
                    blocker();
                }

            }
            // desactivar todos los botones
            button.disabled = true;
        });
        letterContainer.append(button);
    }
    displayOption();
    let {initialDrawning} = canvasCreator();
    initialDrawning();
};

// Funcion para crear el hombre
const canvasCreator=()=>{
    // trabajar en una representacion bidimensional (en X e Y)
    let context = canvas.getContext("2d")
    context.beginPath();
    context.strokeStyle= "#000"; // color a la linea
    context.lineWidth = 2; // tamaño de la linea

    // como se van a dibujar las lineas
    const drawnLine = (fromX, fromY, toX, toY) =>{
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke(); // este metodo es para dibujar trazos
    };

    // funcion para dibujar head
    const head =()=>{
        context.beginPath();
        context.arc(70,30,10,0,Math.PI*2, true);
        // calculos para hacer la circunferencia
        context.stroke();
    };

    // funcion para dibujar el body
    const body =()=>{
        drawnLine(70,40,70,80);
    };

    // funcion para dibujar el brazo izquierdo
    const leftArm =()=>{
        drawnLine(70,50,50,70);
        // fromX, fromY, toX, toY
    };

    // funcion para dibujar el brazo derecho
    const rightArm =()=>{
        drawnLine(70,50,90,70);
    };

    // funcion para dibujar la pierna izquierda
    const leftLeg =()=>{
        drawnLine(70,80,90,110);
    };

    // funcion para dibujar la pierna derecha 
    const rightLeg =()=>{
        drawnLine(70,80,90,110);
    };
    const initialDrawning=()=>{
        // va a limpiar el dibujo
        context.clearRect(0,0, context.canvas.width, context.canvas.height);
        drawnLine(10,130,130,130);
        drawnLine(10,10,10,131);
        drawnLine(10,10,70,10);
        drawnLine(70,10,70,20);
    };
    // retornar todas las funciones creadas
    return{initialDrawning, head, body, leftArm, rightArm, leftLeg, rightLeg};
};

// funcion para dibujar al hombre dependiendo de como vayamos jugando
const dibujarHombre= (count)=>{
    // destructuramos la funcion
    let {head, body, leftArm, rightArm, leftLeg, rightLeg} = canvasCreator();
    switch (count){
        case 1:
            head();
            break;
        case 2:
            body();
            break;
        case 3:
            leftArm();
            break;
        case 4:
            rightArm();
            break;
        case 5:
            leftLeg();
            break;
        case 6:
            rightLeg();
            break;
        default:
            break;
    };
};
newGameButton.addEventListener("click", initializer);
window.onload= initializer;