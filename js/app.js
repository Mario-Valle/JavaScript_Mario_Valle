var Calculadora = {
	
	Pantalla: document.getElementById("display"),
	ValorEnPantalla: "0",
	operacion: "",
	Valor1: 0,
	Valor2: 0,
	ValorTemporal: 0,
	Resultado: 0,
	Tacla_Igual_Auxiliar: false,
	
	init: (function(){
		this.asignarEventosFormatoBotones(".tecla");
		this.asignarEventosaFuncion();
	}),
	
	//EVENTOS DE LOS BOTONES
	
	asignarEventosFormatoBotones: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onmousedown = this.Dismuye_Tamano_Tecla;
			x[i].onmouseup = this.Aumenta_Tamano_Tecla;
		};
	},

	Dismuye_Tamano_Tecla: function(event){
		Calculadora.Dismuye_Tamano(event.target);
	},

	Aumenta_Tamano_Tecla: function(event){
		Calculadora.Aumenta_Tamano(event.target);
	},
	
	//TAMAÑOS DE BOTONES	
	Dismuye_Tamano: function(elemento){
		elemento.style.padding = "1.1px"
	},
	
	Aumenta_Tamano: function(elemento){
		elemento.style.padding = "0px"
	},
	
	asignarEventosaFuncion: function(){
		document.getElementById("0").addEventListener("click", function() {Calculadora.Numero_Entero("0");});
		document.getElementById("1").addEventListener("click", function() {Calculadora.Numero_Entero("1");});
		document.getElementById("2").addEventListener("click", function() {Calculadora.Numero_Entero("2");});
		document.getElementById("3").addEventListener("click", function() {Calculadora.Numero_Entero("3");});
		document.getElementById("4").addEventListener("click", function() {Calculadora.Numero_Entero("4");});
		document.getElementById("5").addEventListener("click", function() {Calculadora.Numero_Entero("5");});
		document.getElementById("6").addEventListener("click", function() {Calculadora.Numero_Entero("6");});
		document.getElementById("7").addEventListener("click", function() {Calculadora.Numero_Entero("7");});
		document.getElementById("8").addEventListener("click", function() {Calculadora.Numero_Entero("8");});
		document.getElementById("9").addEventListener("click", function() {Calculadora.Numero_Entero("9");});
		document.getElementById("on").addEventListener("click", function() {Calculadora.LimpiarPantalla();});
		document.getElementById("sign").addEventListener("click", function() {Calculadora.CambiarSigno();});
		document.getElementById("punto").addEventListener("click", function() {Calculadora.Numeros_Decimales();});
		document.getElementById("igual").addEventListener("click", function() {Calculadora.verResultado();});
		document.getElementById("raiz").addEventListener("click", function() {Calculadora.OperacionAritmetica("raiz");});
		document.getElementById("dividido").addEventListener("click", function() {Calculadora.OperacionAritmetica("/");});
		document.getElementById("por").addEventListener("click", function() {Calculadora.OperacionAritmetica("*");});
		document.getElementById("menos").addEventListener("click", function() {Calculadora.OperacionAritmetica("-");});
		document.getElementById("mas").addEventListener("click", function() {Calculadora.OperacionAritmetica("+");});
	},
	
	LimpiarPantalla: function(){ 

	    this.ValorEnPantalla = "0";
		this.operacion = "";
		this.Valor1 = 0;
		this.Valor2 = 0;
		this.Resultado = 0;
		this.Tacla_Igual_Auxiliar = false;
		this.ValorTemporal = 0;
		this.ActualizarPantalla();
	},
	
	CambiarSigno: function(){
		if (this.ValorEnPantalla !="0") {
			var aux;
			if (this.ValorEnPantalla.charAt(0)=="-") {
				aux = this.ValorEnPantalla.slice(1);
			}	else {
				aux = "-" + this.ValorEnPantalla;
			}
		this.ValorEnPantalla = "";
		this.ValorEnPantalla = aux;
		this.ActualizarPantalla();
		}
	},
	
	Numeros_Decimales: function(){
		if (this.ValorEnPantalla.indexOf(".")== -1) {
			if (this.ValorEnPantalla == ""){
				this.ValorEnPantalla = this.ValorEnPantalla + "0.";
			} else {
				this.ValorEnPantalla = this.ValorEnPantalla + ".";
			}
			this.ActualizarPantalla();
		}
	},
	
	Numero_Entero: function(valor){
		if (this.ValorEnPantalla.length < 8) {
		
			if (this.ValorEnPantalla=="0") {
				this.ValorEnPantalla = "";
				this.ValorEnPantalla = this.ValorEnPantalla + valor;
			} else {
				this.ValorEnPantalla = this.ValorEnPantalla + valor;
			}
		this.ActualizarPantalla();
		}
	},
	
	OperacionAritmetica: function(oper){
		this.Valor1 = parseFloat(this.ValorEnPantalla);
		this.ValorEnPantalla = "";
		this.operacion = oper;
		this.Tacla_Igual_Auxiliar = false;
		this.ActualizarPantalla();
	},
	
	verResultado: function(){

		if(!this.Tacla_Igual_Auxiliar){ 
			this.Valor2 = parseFloat(this.ValorEnPantalla);
			this.ValorTemporal = this.Valor2;
			this.realizarOperacion(this.Valor1, this.Valor2, this.operacion);
		
		} else {
			this.realizarOperacion(this.Valor1, this.ValorTemporal, this.operacion);
		}
	
		this.Valor1 = this.Resultado;
		this.ValorEnPantalla = "";
	
		if (this.Resultado.toString().length < 9){
			this.ValorEnPantalla = this.Resultado.toString();
		} else {
			this.ValorEnPantalla = this.Resultado.toString().slice(0,8) + "...";
		}
	
		this.Tacla_Igual_Auxiliar = true;		
		this.ActualizarPantalla();
	
	},
	
	realizarOperacion: function(Valor1, Valor2, operacion){
		switch(operacion){
			case "+": 
				this.Resultado = eval(Valor1 + Valor2);
			break;
			case "-": 
				this.Resultado = eval(Valor1 - Valor2);
			break;
			case "*": 
				this.Resultado = eval(Valor1 * Valor2);
			break;
			case "/": 
				this.Resultado = eval(Valor1 / Valor2);
			break;
			case "raiz":
				this.Resultado = eval(Math.sqrt(Valor1));
		}
	},
	
	ActualizarPantalla: function(){
		this.Pantalla.innerHTML = this.ValorEnPantalla;
	}
	
};

Calculadora.init();