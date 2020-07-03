var naipe = ["espadas", "paus", "copas", "ouros"];
var valor = ["Ás","2","3","4","5","6","7","8","9","10","Valete","Dama","Rei"];
var deck = new Array();
var cartaDealer = new Array();
var cartaJogador = new Array();
var pontosJogador = 0;
var pontosDealer = 0;
var primeiroHit = true;
var cartaJogador2 = new Array();
function geraDeck(){
  for(let i = 0; i < naipe.length;i++){
        for(let x=0; x < valor.length; x++){
          var carta = {
            Valor: valor[x], 
            Naipe: naipe[i]};
          deck.push(carta);
        }
      }
  return deck;
}

function embaralha(){
 
  for(let i = 0; i < 1000; i++){
    var local1 = Math.floor((Math.random() * deck.length));
    var local2 = Math.floor((Math.random() * deck.length));
    var temp = deck[local1];
    deck[local1] = deck[local2];
    deck[local2] = temp;
  }
  return deck;
}

function geraEmbaralha(){
  geraDeck();
  embaralha();
}

function comecaJogo(){
  document.getElementById("status").innerHTML = "";
  document.getElementById("status2").innerHTML = "";
  primeiroHit = true;
  pontosJogador = 0;
  pontosDealer = 0;
  var hit = document.createElement("Button");
  hit.innerHTML = "Hit Me";
  document.getElementById("jogo").appendChild(hit);
  hit.setAttribute("id","hit");
  document.getElementById("hit").addEventListener("click", sorteiaJogador);
  
  var hold = document.createElement("Button");
  hold.innerHTML = "Hold";
  document.getElementById("jogo").appendChild(hold);
  hold.setAttribute("id", "hold");
  var remove = document.getElementById("iniciar");
  remove.parentNode.removeChild(remove);

  document.getElementById("hold").addEventListener("click", para);
  
  sorteiaDealer();
  sorteiaJogador();
}
function sorteiaDealer(){
  cartaDealer = deck.pop();
 document.getElementById("dealer").innerHTML =  "O dealer tirou " + cartaDealer.Valor + " de " + cartaDealer.Naipe + " e uma carta para baixo";
  pontuacaoDealer();
}

function pontuacaoDealer(){
  if (cartaDealer.Valor == "Ás"){
    pontosDealer += 1;
  }else{
    if(cartaDealer.Valor == "Valete"){
      pontosDealer += 11;
    }else{
      if(cartaDealer.Valor == "Dama"){
        pontosDealer += 12;
      }else{
        if(cartaDealer.Valor == "Rei"){
          pontosDealer += 13;
        }else{
          pontosDealer += parseInt(cartaDealer.Valor);
        }
      }
    }
  }
  document.getElementById("pontuacaoDealer").innerHTML = "Pontuação Dealer: " + pontosDealer;
}

function sorteiaJogador(){
  if(primeiroHit){
    cartaJogador = deck.pop();
    cartaJogador2 = deck.pop();
    document.getElementById("jogador").innerHTML = "Você tirou " + cartaJogador.Valor + " de " + cartaJogador.Naipe + " e " + cartaJogador2.Valor + " de " + cartaJogador2.Naipe;
  
  }else{
    cartaJogador = deck.pop();
    document.getElementById("jogador").innerHTML = "Você tirou " + cartaJogador.Valor + " de " + cartaJogador.Naipe;
  }
  pontuacaoJogador();
}
function pontuacaoJogador(){
  let x = 1;
  while (x==1){
    if (cartaJogador.Valor == "Ás"){
    pontosJogador += 1;
  }else{
    if(cartaJogador.Valor == "Valete"){
      pontosJogador += 11;
    }else{
      if(cartaJogador.Valor == "Dama"){
        pontosJogador += 12;
      }else{
        if(cartaJogador.Valor == "Rei"){
          pontosJogador += 13;
        }else{
          pontosJogador += parseInt(cartaJogador.Valor);
        }
      }
    }
  } 
    if (primeiroHit){
      if (cartaJogador2.Valor == "Ás"){
    pontosJogador += 1;
  }else{
    if(cartaJogador2.Valor == "Valete"){
      pontosJogador += 11;
    }else{
      if(cartaJogador2.Valor == "Dama"){
        pontosJogador += 12;
      }else{
        if(cartaJogador2.Valor == "Rei"){
          pontosJogador += 13;
        }else{
          pontosJogador += parseInt(cartaJogador2.Valor);
        }
      }
    }
  } 
      primeiroHit = false;
    }
    x++;
  }
  
  document.getElementById("pontuacaoJogador").innerHTML = "Pontuação Jogador: " + pontosJogador;
      if(pontosJogador == 21){
      vinteeum();
    }
    if(pontosJogador > 21){
      estourou();
    }
}

function vinteeum(){
    document.getElementById("status").innerHTML = "BLACKJACK!<br>Você venceu!";
    botaoReiniciar();

}
function botaoReiniciar(){
    var remove = document.getElementById("hit");
    remove.parentNode.removeChild(remove);
    var remove = document.getElementById("hold");
    remove.parentNode.removeChild(remove);

    var reinicia = document.createElement("Button");
    reinicia.innerHTML = "Reiniciar";
    reinicia.setAttribute("id","iniciar");
    document.getElementById("jogo").appendChild(reinicia);
    document.getElementById("iniciar").addEventListener("click", comecaJogo);
}

function estourou(){
  document.getElementById("status").innerHTML = "Você estourou!";
  cartaDealer = deck.pop();
  document.getElementById("dealer").innerHTML = "A carta para baixo do Dealer era "+ cartaDealer.Valor +" de "+ cartaDealer.Naipe;
  pontuacaoDealer();
  if (pontosDealer <= 21){
    document.getElementById("status2").innerHTML = "Você perdeu!";
  }else{
    if(pontosDealer > pontosJogador){
      document.getElementById("status2").innerHTML = "Você chegou mais perto de 21 e venceu!";
    }else{
      document.getElementById("status2").innerHTML = "Você perdeu!";
    }
  }
  botaoReiniciar();
}

function para(){
  document.getElementById("status").innerHTML = "Você parou!";
  cartaDealer = deck.pop();
  pontuacaoDealer();
  document.getElementById("dealer").innerHTML = "A carta para baixo do Dealer era "+ cartaDealer.Valor +" de "+ cartaDealer.Naipe;
  if (pontosDealer == 21){
    document.getElementById("status2").innerHTML = "O Dealer fez 21! Você perdeu!";
    botaoReiniciar();
    return;
  }
  if (pontosDealer < 21){
    if (pontosDealer > pontosJogador){
      document.getElementById("status2").innerHTML = "O dealer chegou mais perto de 21! Você perdeu!";
    }else{
      document.getElementById("status2").innerHTML = "Você chegou mais perto de 21 e venceu!";
    }
  }
  if (pontosDealer > 21){
    document.getElementById("status2").innerHTML = "O Dealer estourou! Você venceu!";
  }
  botaoReiniciar();
}


document.getElementById("iniciar").addEventListener("click", comecaJogo);
