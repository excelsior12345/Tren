let array:any[][] = [];
const playernameInput:any = document.getElementById("jugador");
// querySelector sirve para obtener elementos del HTML (clases, id, etiquetas)
const modal:any = document.querySelector(".modal")
let playername:string = "Player";
let contador:any = 0;
let posicion:any;
let tiempo:number;
let totalTiradas:number;
let recuentoTiradas:number = 0;
let cuentaTiradas:any = null;
let recuentoBombas:number=0;
let nMinas:any = document.getElementById("minas");
let players:any[][] = [];
let mensajeFinal = document.getElementById("modal_text")
const bomb = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAAXNSR0IArs4c6QAABEdJREFUeF7tm4+xDTEUh8+rAB3QARWgAlSAClABKkAFqAAVoAJUgApQAfPN7Jp9+zbJ7yTZ7N57k5k77817+Xe+/eWck2TvmfUSJXDW+cQJdEAJhXRAHVCZE+kK6grqCioj0BVUxu/UfNAtM7tjZvy8PkO3yOJUAAHjxQAmJKmjA3TVzH4IC+ipmT0T6h0NoEdm9nIw+JOZ3TOz3wEAr83sgQCHKkcBaMngr2Z2ewGSB85RAIoZPIfkhbM5oJuTyHF55ixZHhhIwafw++fJ3/i7YvAICWccW1Z/hiX6RvFha0ax+2Z2d/iIbuBcNWDhYwBKP0oBNvVD5dvwcEI+60K72oCYHE70cWKiirG167x1OOz/Y9cEBBjCaewJ1jZa7S8LTtAxqaMO9chH8BFkp3ss2XBqAMI3AGePqsE+fM21SJ6UfKAlS4xIAZy9l1CeJM07F5ASdqUJNKqUDSkH0KEoZ84+C5IXED7nXeZTJwd5P+Q2dEGOQ9RjM9mquCF5ABGtvmQ45OdmFspaWwPiQbwa8jTpoXgAfXSG8g/DRGJHElsAYhsjpyQqIDJj9jhqeTioJlV/C0BPJsclqfktn4HMWpHjfBeXFhtB/BT+RSmtAbmTRkVBHiM4vMIRq8XTt9pnqJ4bDh0pgH6J6lGky9kwu3x+8mmVgWfBUQCpOQ8OOXYkQQTEh6nHFqVqmbbPhqMAYrlwTZIq7HdC0WrL/Rq51/x6J2XLuf+nlthfobfYEypJLIWhk1XYrF5J1opUiAEiVyD3SZWQenhytG/lZ0LzvDE7vk3ZIytIiTA/zQz/slS8iaVr4o7KSvAIdhdTkOJ/Qmk76mFbsoeSCiDROcYAkexxGxEr3EctJYVc7HEEu4fi2lrMJxwDpDjoECAFbit4mwIiQixdoShwWwFinFS0zvJBipGhlwKUlwVOAlBLI0vG2kxBJZNu1ZYThuxcrDSKtTKyZJzVnLSSB5VMvFXb1fIgJZNuZWTJOJyJZweNGnuxksm3aBvK1aSxU95dCfXSQBtWStmYvdWg4aH7oSL/o2SY6onihgKJDu09I7/QmSI/thKX9kogMq+i/GfsVwF0qNGsKHp5AJGFct58SCpCPRzkye8ihpSoKIi23pvVrVekerObnKcKiI72dMYTM6xoazHv2AMIyfL6yJ6XGkuL417lOxxJ9Shhft7J1tc4KaOKw3qJgsa2e82NqvmdKSTPEpu244Uo7tj3UqqE9CVjcgHR116UtIpyPHlQTCX4JNS0hePGIfOQPK/buBVfoqBxMKIbkFJ3aO7JRRoQyoFTLVqVJoqKcSSTbEvWVBOqYRweSJNSQ0HTibItwQA+NUGN3/HixrZ4++AhWxvQdGz8E8tAeb8oNGfOc1DLqn4mBmxNQNNxeZVm/K46KlvyV/iV8duHbGvUF0E9gnDXbQXIPbG9NOiAEk+iA+qAyhZrV1BXUJmC/gGqoLZJ3qgY8wAAAABJRU5ErkJggg=="/>`

let rank:any = document.getElementById("contenedor_div");

    if (localStorage.getItem("players")) {
        // JSON.parse para convertir string a array
        players = JSON.parse(localStorage.getItem("players")!);
        let ranking:any = players.sort((a, b) => a[1] > b[1] ? 1 : -1) // If ternario
        document.getElementById('ranking')!.innerHTML = "Ranking"
        for (let i = 0; i < players.length; i++) {
            rank.innerHTML += `<p>${ranking[i][0]}: ${ranking[i][1]} segundos | ${ranking[i][2]} minas</p>`;
        }
    }
    
    cuentaTiradas = document.getElementById("tiradas");
    //Añadimos la tabla de la partida 
    let tablero:any = "<div>";
    for (let i = 0; i < 5; i++) {
        array[i] = new Array(0,0,0,0,0);
        tablero += `
        <div class="row">
            <div class="field" id='${i}0' onclick='mostrar(${i}, 0)'>&nbsp;</div>
            <div class="field" id='${i}1' onclick='mostrar(${i}, 1)'>&nbsp;</div>
            <div class="field" id='${i}2' onclick='mostrar(${i}, 2)'>&nbsp;</div>
            <div class="field" id='${i}3' onclick='mostrar(${i}, 3)'>&nbsp;</div>
            <div class="field" id='${i}4' onclick='mostrar(${i}, 4)'>&nbsp;</div>
        </div>
        `;
    }
  
    tablero += "</div>";
    document.getElementById("info_tablero")!.innerHTML += tablero;

//funcion para iniciar el juego 
function jugar() {
    if (!nMinas.value) {
        alert("Tienes que poner un numero de minas")
    } else {
    const fieldset = document.getElementById("info_partida")
    fieldset!.style.display = "none"
    document.getElementById("info_tablero")!.style.display = "block"
    playername = playernameInput.value || "Player"
    nMinas = nMinas.value || 1;
    document.getElementById("game_info")!.innerHTML += `<p>Nombre: ${playername}</p>`
    document.getElementById("game_info")!.innerHTML += `<p>Número de minas: ${nMinas}</p>`

    let count:number = 0;
    let timer:any = document.getElementById("tiempo");
    totalTiradas = nMinas * 3;
    cuentaTiradas.innerHTML = "<span>0 tiradas de " + totalTiradas + "</span>";

    tiempo=0;
    do {
        let a:number = Math.floor(Math.random() * 5);
        let b:number = Math.floor(Math.random() * 5);
        if(array[a][b] != 1){
            array[a][b] = 1;
            count++;
             tiempo += 30;
           
            
        }
    }
     while (count < parseInt(nMinas))
    console.log(tiempo);
    let intervalId = setInterval(function () {
        if (contador == tiempo) {
            console.log("gola");
            mensajeFinal!.innerHTML = "Game Over"
            modal!.style.display = "flex";
            clearInterval(intervalId);
        } else {
            timer.innerHTML = contador + " seg";
            contador++;
        }
    }, 1000);
    console.log(array)
}
}



function mostrar(a:number, b:number) {
   
   posicion = document.getElementById(`${a}${b}`)!;
    if (recuentoTiradas != totalTiradas) {
        recuentoTiradas++;
        cuentaTiradas.innerHTML = recuentoTiradas + " tiradas de " + totalTiradas;
       
        if (array[a][b] == 1) {

           posicion.innerHTML = bomb;
           posicion.style.backgroundColor = "red"
           recuentoBombas++;
            if (recuentoBombas == nMinas) {
                mensajeFinal!.innerHTML = "You are the WINNER!!"
                console.log("You are the WINNER!!")
                modal!.style.display = "flex";
                let player:any = [playername, contador, nMinas];
                players.push(player);
                localStorage.setItem("players", JSON.stringify(players))
                
            } 
            
        } else {
           posicion.style.backgroundColor = "green";
        }
    } else {
        mensajeFinal!.innerHTML = "Game Over"
        // para guardar aunque pierdas
        modal!.style.display = "flex";
        let player:any = [playername, contador, nMinas];
        players.push(player);
        localStorage.setItem("players", JSON.stringify(players))
    }
}

function volver() {
    location.reload();
    modal!.style.display = "none"
}