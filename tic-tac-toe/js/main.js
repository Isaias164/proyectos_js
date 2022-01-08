import { verificar_raya_horinzontal, verificar_raya_vertical, verificar_raya_diagonal_derecha, verificar_raya_diagonal_izquierda, setear_tablero } from "./logica.js";

var tablero = [["", "", ""], ["", "", ""], ["", "", ""]];
var casillas_out = []
var jugador1 = true;
let elemento = "x";
let piezas_insertadas = 0;
var columnas = document.querySelectorAll("table tr td");

var jugador_1 = null, jugador_2 = null;
try {
    var j1 = prompt("Ingresa tu nombre").replace(/^\w/, (c) => c.toUpperCase());
    var j2 = prompt("Ingresa el nombre de tu contrincante").replace(/^\w/, (c) => c.toUpperCase());
    jugador_1 = (j1 == null) ? "Isaias" : j1;
    jugador_2 = (j1 == null) ? "Jugador_2" : j2;
} catch (error) {
    jugador_1 = (j1 == null) ? "Isaias" : j1;
    jugador_2 = (j1 == null) ? "Jugador_2" : j2;

}
var span = document.querySelectorAll(".jugadores span");
var puntos = document.querySelectorAll(".puntos span");
var pj1 = 0, pj2 = 0;
span[0].innerText = jugador_1;
span[1].innerText = jugador_2;
span[0].style.textDecoration = "underline";
var empate = true;
columnas.forEach(td => {
    td.addEventListener("click", function () {
        var fila = parseInt(td.getAttribute("data-row"), 10);
        var columna = parseInt(td.getAttribute("data-column"), 10);
        var col = columna;
        if (!casillas_out.includes(col)) {
            if (columna == 0 || columna == 3 || columna == 6) {
                columna = 0;
            }
            else if (columna == 1 || columna == 4 || columna == 7) {
                columna = 1;
            }
            else {
                columna = 2;
            }
            if (jugador1) {
                span[1].style.textDecoration = "underline";
                span[0].style.textDecoration = "none";
                elemento = "x";
                td.innerText = elemento;
                jugador1 = false;
                piezas_insertadas += 1;
                tablero[fila][columna] = elemento;
            }
            else {
                span[1].style.textDecoration = "none";
                span[0].style.textDecoration = "underline";
                elemento = "o"
                td.innerText = elemento;
                jugador1 = true;
                piezas_insertadas += 1;
                tablero[fila][columna] = elemento;
            }
            if (piezas_insertadas >= 5) {
                let raya_horinzontal = verificar_raya_horinzontal(tablero, fila, elemento);
                let raya_vertical = verificar_raya_vertical(tablero, columna, elemento);
                let raya_diagonal_izq = verificar_raya_diagonal_izquierda(tablero, elemento);
                let raya_diagonal_der = verificar_raya_diagonal_derecha(tablero, elemento);
                if ((!jugador1 && raya_horinzontal && elemento == "x") || (!jugador1 && raya_vertical && elemento == "x") || (!jugador1 && raya_diagonal_izq && elemento == "x") || (!jugador1 && raya_diagonal_der && elemento == "x")) {
                    setTimeout(function () {
                        alert(`Gano el jugador ${jugador_1}`);
                        casillas_out = [];
                        piezas_insertadas = 0;
                        span[1].style.textDecoration = "none";
                        span[0].style.textDecoration = "underline";
                        jugador1 = true;
                    }, 50);
                    setTimeout(function () {
                        setear_tablero(columnas);
                        pj1 += 1;
                        puntos[0].innerText = pj1.toString();
                        tablero = [[], [], []];
                    }, 900);
                    empate = false;
                }
                else if ((jugador1 && raya_horinzontal && elemento == "o") || (jugador1 && raya_vertical && elemento == "o") || (jugador1 && raya_diagonal_izq && elemento == "o") || (jugador1 && raya_diagonal_der && elemento == "o")) {
                    setTimeout(function () {
                        alert(`Gano el jugador ${jugador_2}`);
                        casillas_out = [];
                        piezas_insertadas = 0;
                        span[1].style.textDecoration = "none";
                        span[0].style.textDecoration = "underline";
                        jugador1 = true;
                        tablero = [[], [], []];
                    }, 50);
                    setTimeout(function () {
                        setear_tablero(columnas);
                    }, 1000);
                    pj2 += 1;
                    puntos[1].innerText = pj2.toString();
                    empate = false;
                }
            }
            casillas_out.push(col);
        }
        if (empate && casillas_out.length == 9) {
            setTimeout(function () {
                alert("Ha avido un empate");
                setear_tablero(columnas);
                casillas_out = [];
                piezas_insertadas = 0;
                span[1].style.textDecoration = "none";
                span[0].style.textDecoration = "underline";
                jugador1 = true;
                tablero = [[], [], []];
            }, 1000);
        }
    });
});