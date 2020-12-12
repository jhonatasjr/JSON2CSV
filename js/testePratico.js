var appForm = document.querySelector("#app form");
var btnLimpar = document.getElementById("btn-limpar");

appForm.onsubmit = jsonCsv;
btnLimpar.onclick = limparCampos;

function jsonCsv(e) { //Converter JSON pra CSV
	e.preventDefault();

	var input_json = document.getElementById("input-json");
	var input_csv = document.getElementById("input-csv");
	input_csv.innerHTML = '';

	if(!validarJson(input_json.value)) return;

	var dados = JSON.parse(input_json.value);

	console.log(dados);
	console.log(JSON.stringify(dados[0]));

	var propriedades = [];
	var primeiroItem = JSON.stringify(dados[0]).split(",");
	for(item of primeiroItem){
		let nomes = item.split('"');
		propriedades.push(nomes[1]);
	}

	var prototipo_csv = [];
	prototipo_csv[0] = '';
	for(prop of propriedades){
		prototipo_csv[0] += '"' + prop + '",';
	}

	for(var i=0; i < dados.length; i++){
		prototipo_csv[i+1] = '';
		for(prop of propriedades){
			prototipo_csv[i+1] += '"' + dados[i][prop] + '",';
		}
	}

	var csv_result = '';
	for(item of prototipo_csv){
		csv_result += item + "\n";
	}
	input_csv.innerHTML = csv_result;
}

function validarJson(txt_json) { //Função para validar os camposs
	if(txt_json.length === 0){
		alert("Por favor, insira um JSON.");
		return false;
	}

	try{
		var json_val = JSON.parse(txt_json); //Converter data para JSON
	}
	catch(e) { //em try catch pra não cair em erro de sintax quando a data for inserida errada
		alert("O JSON inserido é inválido!");
		return false;
	}
	return true;
}

function limparCampos() { //Função para limpar todos os campos
	document.getElementById("input-json").value = '';
	document.getElementById("input-csv").value = '';
}