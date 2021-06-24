
document.addEventListener("DOMContentLoaded", function(event) {
	hacerClasificacion();
    console.log("DOM fully loaded and parsed");
  });


const participantes = ['Lope', 'Nando', 'Pavon', 'Herry', 'Manolo', 'Pere', 'Guille', 'Jesus', 'Baltar']
var competicion;

function hacerClasificacion() {
	var resp;
	var participante; 
	var puntuaje = 0;
	recogerComp();
		
	for (var elm of participantes) {
		
		puntuaje = 0;
		
		participante = elm;
		 
		recogerDatos(participante);
				
		
		}

	}	
	

function recogerComp() {
		 	
		 var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			  competicion = this.responseXML;
			}
		  };
		  xhttp.open("GET", 'Selecciona un participante para ver sus pronósticos.xml', false);
		  xhttp.send();	
		}

function recogerDatos(participante) {	
		 var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			  resp = this.responseXML;
			  calcularPuntosGrupo(resp, competicion, participante);
			  calcularPuntosPosicionGrupo (resp, competicion, participante);
			  calcularPuntos(participante);
			}
		  };
		  xhttp.open("GET", participante + ".xml", false);
		  xhttp.send();
		  
		}

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

function calcularPuntosGrupo(resp, competicion, participante){
			var puntuaje = 0;
			var x = resp.getElementsByTagName('partido')
			
			var z = competicion.getElementsByTagName('partido')
			
			for(i = 0; i < x.length; i++) {
			rla = parseInt(x[i].getElementsByTagName("ResultadoLocal")[0].childNodes[0].nodeValue);
			rlb = parseInt(z[i].getElementsByTagName("ResultadoLocal")[0].childNodes[0].nodeValue);
			rva = parseInt(x[i].getElementsByTagName("ResultadoVisitante")[0].childNodes[0].nodeValue);
			rvb = parseInt(z[i].getElementsByTagName("ResultadoVisitante")[0].childNodes[0].nodeValue);
			resa = Math.sign(rla - rva)
			resb = Math.sign(rlb - rvb)
			
			puntuaje += calcularPartidoGrupo(rla,rva,resa,rlb,rvb,resb)
			
			}
			
			document.getElementById(participante).children[1].innerHTML = puntuaje;
			}

function calcularPartidoGrupo(a,b,c,d,e,f){
		var puntopartido = 0;
		if ( a === d && b === e && c === f) {
			puntopartido += 7;} 
		else if ( c === f && ( a === d || b === e ) ) {
			puntopartido +=5;}
		else if (c === f && ( a != d && b != e )){
			puntopartido +=3;}
		else if (c != f && ( a === d || b === e ) ){
			puntopartido +=1;}
		else {
			puntopartido +=0;}
		return puntopartido;
		}

function calcularPuntos(participante){
		var puntostotales = 0;
		var puntospartidos = parseInt(document.getElementById(participante).children[1].innerHTML);
		var puntosgrupos = parseInt(document.getElementById(participante).children[2].innerHTML);
		var puntosotros = parseInt(document.getElementById(participante).children[3].innerHTML);
		var puntosclasificatorias = parseInt(document.getElementById(participante).children[4].innerHTML);
		var puntosfinalistas = parseInt(document.getElementById(participante).children[5].innerHTML);
		puntostotales = puntospartidos + puntosgrupos + puntosotros + puntosclasificatorias + puntosfinalistas
		document.getElementById(participante).children[6].innerHTML = puntostotales
		}
