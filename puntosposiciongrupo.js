function calcularPuntosPosicionGrupo (resp, competicion, participante) {
  var puntuaje = 0;
  var x = resp.getElementsByTagName('grupo')
  var z = competicion.getElementsByTagName('grupo')
  var posA;
  var posB;
    for(i = 0; i < x.length; i++) {
      posA = x[i].getElementsByTagName('pos')[0].childNodes[0].nodeValue;
      posB = z[i].getElementsByTagName('pos')[0].childNodes[0].nodeValue;
      posA === posB ? puntuaje += 5 : puntuaje += 0
    }
  document.getElementById(participante).children[2].innerHTML = puntuaje;
}
