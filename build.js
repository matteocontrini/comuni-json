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
