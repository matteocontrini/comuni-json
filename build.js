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

let tree = { zone: [] };

data.forEach((comune) => {
	// Cerca zona esistente, o altrimenti creala
	let zona = tree.zone.find(z => z.codice == comune.zona.codice);
	if (!zona) {
		zona = { ...comune.zona, regioni: [] };
		tree.zone.push(zona);
	}

	// Cerca regione esistente, o altrimenti creala
	let regione = zona.regioni.find(r => r.codice == comune.regione.codice);
	if (!regione) {
		regione = { ...comune.regione, province: [] };
		zona.regioni.push(regione);
	}

	// Cerca provincia esistente, o altrimenti creala
	let provincia = regione.province.find(p => p.codice == comune.provincia.codice);
	if (!provincia) {
		provincia = { ...comune.provincia, sigla: comune.sigla, comuni: [] };
		regione.province.push(provincia);
	}

	// 100 volte più veloce di 'delete'
	// https://jsperf.com/delete-vs-undefined-vs-null/16
	comune.zona = undefined;
	comune.regione = undefined;
	comune.provincia = undefined;
	comune.sigla = undefined

	provincia.comuni.push(comune);
});

outFilePath = path.join(__dirname, 'comuni_tree.json');
fs.writeFileSync(outFilePath, JSON.stringify(tree));
