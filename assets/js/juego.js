// 2C = Two of Clubs (Treboles)
// 2C = Two of Diamonds (Treboles)
// 2C = Two of Hearts (Treboles)
// 2C = Two of Spades (Treboles)

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0, puntosComputadora = 0;

// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

btnDetener.disabled = true;
btnPedir.disabled = true;

if(btnPedir.disabled === true || btnDetener.disabled === true) {
    btnDetener.classList.add('disabled');
    btnPedir.classList.add('disabled');
}

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntosHtml = document.querySelectorAll('small');

// Get the modal
let modal = document.getElementById("myModal");
let modalImg = document.querySelector(".content-mimg img");
console.log(modalImg);
let modalHeader = document.querySelector('.modal-header h2');

// Esta funcion crea una nueva baraja
const crearDeck = () => {
    for( let i = 2; i <= 10; i++ ){
        for( let tipo of tipos ){
            deck.push(i + tipo)
        }
    }
    
    for( let tipo of tipos ){
        for( let especial of especiales ){
            deck.push( especial + tipo )
        }
    }

    deck = _.shuffle(deck);
    return deck;
}

// Esta funcion me permite tomar una carta
const pedirCarta = () => {

    if ( deck.length === 0 ){
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();

    // console.log(carta); // carta debe de ser de la baraja
    return carta;
}

// pedirCarta();
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    // 2 = 2 10 = 10 3 = 3
    // isNaN = is not a Number
    return ( isNaN(valor) ) ? 
            ( valor === 'A' ) ? 11 : 10 
            : valor * 1;
    // if( isNaN( valor ) ){
    //     puntos = ( valor === 'A' ) ? 11 : 10;
    // } else{
    //     puntos = valor * 1;
    // }
}

// Turno de la computadora
const turnoCompuradora = ( puntosMinimos ) => {
    do {
        const carta = pedirCarta();
    
        puntosComputadora = puntosComputadora + valorCarta( carta );
        puntosHtml[1].innerText = puntosComputadora
    
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`; // 3H, JD
        imgCarta.classList.add('carta');
        divCartasComputadora.append( imgCarta );

        if( puntosMinimos > 21 ) {
            break;
        }
    } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout( () => {
        if ( puntosComputadora === puntosMinimos ){
            modal.style.display = "block";
            modalHeader.innerText = "Nobody Wins! :c";
            modalImg.src = "./assets/img/twins_amico.png";
        } else if ( puntosMinimos > 21 ){
            modal.style.display = "block";
            modalHeader.innerText = "Player Lose! :c";
            modalImg.src = "./assets/img/missed_chances.gif";
        } else if ( puntosMinimos === 21 ) {
            modal.style.display = "block";
            modalHeader.innerText = "Player Win!";
            modalImg.src = "./assets/img/achievement.gif";
        } else if ( puntosComputadora > 21 ) {
            modal.style.display = "block";
            modalHeader.innerText = "Player Win!";
            modalImg.src = "./assets/img/achievement.gif";
        } else {
            modal.style.display = "block";
            modalHeader.innerText = "Computer Win!";
            modalImg.src = "./assets/img/missed_chances.gif";
        }
    }, 100 );
}

// Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    
    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHtml[0].innerText = puntosJugador

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`; // 3H, JD
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    if ( puntosJugador > 21 ) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        if(btnPedir.disabled === true || btnDetener.disabled === true) {
            btnDetener.classList.add('disabled');
            btnPedir.classList.add('disabled');
        }
        turnoCompuradora(puntosJugador);
    } else if ( puntosJugador === 21 ) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        if(btnPedir.disabled === true || btnDetener.disabled === true) {
            btnDetener.classList.add('disabled');
            btnPedir.classList.add('disabled');
        }
        turnoCompuradora(puntosJugador);
    }

});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    if(btnPedir.disabled === true || btnDetener.disabled === true) {
        btnDetener.classList.add('disabled');
        btnPedir.classList.add('disabled');
    }

    turnoCompuradora(puntosJugador);
});

btnNuevo.addEventListener('click', () => {
    console.clear();

    deck = [];
    deck = crearDeck();
    console.log(deck);
    
    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHtml[0].innerText = 0;
    puntosHtml[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnDetener.disabled = false;
    btnPedir.disabled = false;

    if(btnPedir.disabled === false || btnDetener.disabled === false) {
        btnDetener.classList.remove('disabled');
        btnPedir.classList.remove('disabled');
    }
});

// STYLE CSS

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.querySelector('.titulo')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== MODAL SCORE ===============*/
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}