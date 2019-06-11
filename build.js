const fs   = require('fs');
const path = require('path');

let dataPath = path.join(__dirname, 'data');
let files = fs.readdirSync(dataPath);

let data = [];

files.forEach((f) => {
	let filePath = path.join(__dirname, 'data', f);
	let content = fs.readFileSync(filePath).toString();
	let obj = JSON.parse(content);
	data.push(obj);
});

data.sort((a, b) => {
	return a['nome'].localeCompare(b['nome']);
});

let outFilePath = path.join(__dirname, 'comuni.json');
fs.writeFileSync(outFilePath, JSON.stringify(data));

// ***********************
// Crea versione ad albero
// ***********************
function CheckData(thisData, destArray, destFound, onNew)
{
	if(!(thisData['codice'] in destFound)) {
		let newData = JSON.parse(JSON.stringify(thisData));
		if(onNew) {
			onNew(newData);
		} else {
			newData = JSON.parse(JSON.stringify(thisData));
		}		
		destArray.push( newData );
		destFound[thisData['codice']] = destArray.length-1;
		return newData;
	} else {
		return destArray[destFound[thisData['codice']]];
	}	
}

let tree = {"zone":[],"_foundZone":{}}
for(var i=0;i<data.length;i++) {
	// Zona	
	let thisZona = CheckData(data[i]['zona'], tree.zone, tree._foundZone, (newZona)=>{
		newZona.regioni = []
		newZona._foundRegioni = {};
	});
	// Regione
	let thisRegione = CheckData(data[i]['regione'], thisZona.regioni, thisZona._foundRegioni, (newRegione)=>{
		newRegione.provincie = []
		newRegione._foundProvincie = {};
	});
	// Provincia
	let thisProvincia = CheckData(data[i]['provincia'], thisRegione.provincie, thisRegione._foundProvincie, (newProvincia)=>{
		newProvincia.sigla = data[i]['sigla'];
		newProvincia.comuni = []
		newProvincia._foundComuni = {};
	});
	// comune
	/*let thisComune =*/ CheckData(data[i], thisProvincia.comuni, thisProvincia._foundComuni, (newComune)=>{
		delete newComune['zona'];
		delete newComune['regione'];
		delete newComune['provincia'];
		delete newComune['sigla'];
	});
}

delete tree._foundZone
tree.zone.sort((a, b) => {
	return a['codice'].localeCompare(b['codice']);
});

for(var idZona=0;idZona<tree.zone.length;idZona++)
{
	let thisZona = tree.zone[idZona];
	delete thisZona._foundRegioni;
	thisZona.regioni.sort((a, b) => {
		return a['codice'].localeCompare(b['codice']);
	});
	for (let idRegione = 0; idRegione < thisZona.regioni.length; idRegione++) {
		let thisRegione = thisZona.regioni[idRegione];
		delete thisRegione._foundProvincie;
		thisRegione.provincie.sort((a, b) => {
			return a['codice'].localeCompare(b['codice']);
		});
		for (let idProvincia = 0; idProvincia < thisRegione.provincie.length; idProvincia++) {
			let thisProvincia = thisRegione.provincie[idProvincia];
			delete thisProvincia._foundComuni;
			thisProvincia.comuni.sort((a, b) => {
				return a['codice'].localeCompare(b['codice']);
			});
		}	
	}	
}

outFilePath = path.join(__dirname, 'comuni_tree.json');
fs.writeFileSync(outFilePath, JSON.stringify(tree));
