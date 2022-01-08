function verificar_raya_horinzontal(tablero, fila, elemento) {
    var cant_element = 0;
    for (let index = 0; index < tablero[fila].length; index++) {
        if (tablero[fila][index] == elemento) {
            cant_element += 1;
        }
    }
    return cant_element == 3;
}

function verificar_raya_vertical(tablero, columna, elemento) {
    var cant_element = 0;
    for (var index = 0; index < 3; index++) {
        if (tablero[index][columna] == elemento) {
            cant_element++;
        }
    }
    return cant_element == 3;
}
function verificar_raya_diagonal_izquierda(tablero, elemento) {
    let columna = 0;
    var cant_element = 0;
    for (var index = 0; index < 3; index++) {
        if (tablero[index][columna] == elemento) {
            cant_element++;
            columna++;
        }
    }
    return cant_element == 3;
}

function verificar_raya_diagonal_derecha(tablero, elemento) {
    let columna = 2;
    var cant_element = 0;
    for (var index = 0; index < 3; index++) {
        if (tablero[index][columna] == elemento) {
            cant_element++;
            columna--;
        }
    }
    return cant_element == 3;
}

function setear_tablero(tablero) {
    tablero.forEach(columna => {
        columna.innerText = "";
    });
}

export {
    verificar_raya_vertical, verificar_raya_horinzontal, verificar_raya_diagonal_izquierda, verificar_raya_diagonal_derecha, setear_tablero
}