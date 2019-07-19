import Plotly from 'plotly.js-dist';
import Papa from 'papaparse';
//const fs = require("fs")
import style from './style.css';


const h0 = 0.00073104758291628
const h1 = -9.422037142360840E-10
const h2 = 1.821338928754860E-15
const j0 = -3.944677820299490E-10
const j1 = 7.533778133432170E-16
const j2 = -2.327332308407290E-22
const q1 = 0.0005257539357631470
const q2 = -5.45935900774016000E-10
const z0 = -6.62535827657940000E-13
const z1 = 6.31115867284297000E-18
const z2 = 2.74449263932997000E-23
const z3 = 7.51309156335764000E-18
const z4 = -1.89363763784246000E-23
const w0 = 5.71837437918073000E-10
const w1 = -4.99611267464002000E-15
const w2 = -2.55703586846164000E-20
const w3 = -6.48369162580799000E-15
const w4 = -5.31052146805903000E-18
const v0 = -2.05196047843108000E-07
const v1 = 1.58244686429457000E-12
const v2 = 8.63713589799872000E-18
const v3 = 2.19460816699582000E-12
const v4 = -5.31052146805903000E-18
const u4 = 8.57637064891050000E-16
const u3 = -3.75754889916101000E-10
const u2 = -1.40362639584169000E-15
const u1 = -2.42200447462305000E-10
const u0 = 0.00003936397979529
const s4 = -7.72586610400176000E-14
const s3 = 3.95348453688314000E-08
const s2 = 1.00323500324347000E-13
const s1 = 2.54428571106237000E-08
const s0 = -0.0063083048607919200
const r4 = 3.64183681207667000E-12
const r3 = -2.39000366864629000E-06
const r2 = -3.69287657496846000E-12
const r1 = -1.15547572846259000E-06
const r0 = -0.049491785362206100
const x = 999.843633188666

var addDataInit = true
var addVisInit = true
var dataCount = 1
var data = []

const p_f = function (p, T, C, returnMe) {
	if (!returnMe) {
		p = document.getElementById("p").value
		T = document.getElementById("T").value
		C = document.getElementById("C").value
	}

	let z = z0 + z1 * p + z2 * Math.pow(p, 2) + z3 * C + z4 * Math.pow(C, 2)
	let w = w0 + w1 * p + w2 * Math.pow(p, 2) + w3 * C + w4 * Math.pow(C, 2)
	let v = v0 + v1 * p + v2 * Math.pow(p, 2) + v3 * C + v4 * Math.pow(C, 2)
	let u = u0 + u1 * p + u2 * Math.pow(p, 2) + u3 * C + u4 * Math.pow(C, 2)
	let s = s0 + s1 * p + s2 * Math.pow(p, 2) + s3 * C + s4 * Math.pow(C, 2)
	let r = r0 + r1 * p + r2 * Math.pow(p, 2) + r3 * C + r4 * Math.pow(C, 2)

	let out1 = Math.pow((-100), 2) * q2 + (-100) * q1 + (q2 * Math.pow(p, 2) + q1 * p)
	let out2 = z * Math.pow(T, 6) + w * Math.pow(T, 5) + v * Math.pow(T, 4)
	let out3 = u * Math.pow(T, 3) + s * Math.pow(T, 2) + r * (T)
	let out4 = (j0 + j1 * p + j2 * Math.pow(p, 2)) * Math.pow(C, 2)
	let out5 = (h0 + h1 * p + h2 * Math.pow(p, 2)) * C

	let sum = x + out1 + out2 + out3 + out4 + out5

	if (returnMe == true) return sum
	else document.getElementById("output").innerHTML = sum + ' kg/m³'

}

const addData = function (p, T, C, Z, file) {
	if (!file) {
		p = document.getElementById("p").value
		T = document.getElementById("T").value
		C = document.getElementById("C").value
		Z = document.getElementById("Z").value
	}

	try {
		p = parseFloat(p)
	} catch {}
	try {
		T = parseFloat(T)
	} catch {}
	try {
		C = parseFloat(C)
	} catch {}
	try {
		Z = parseFloat(Z)
	} catch {}


	let dichte = p_f(p, T, C, true)
	data.push([p, T, C, dichte, Z, dataCount])

	if (addDataInit == true) {
		let section = document.createElement("section");
		section.id = 'table'
		section.innerHTML = `
			<table>
				<tbody id="dataBody">
					<tr id="-1">
						<th>NR.</th>
						<th>p[kPa]</th>
						<th>T[°C]</th>
						<th>C[mg/l]</th>
						<th>Tiefe[m]</th>
						<th>Dichte ρf[kg/m³]</th>
						<th>Aktion</th>
					</tr>
				</tbody>
			</table>`
		document.getElementById('main').appendChild(section)
		addDataInit = false
	}


	let tr = new TrClass(p, T, C, Z, dichte);
	tr.registerDeleteEvent();

	if (!file) {
		visualize()
	}

	dataCount++

}


const visualize = () => {
	let section
	if (addVisInit == true) {
		section = document.createElement("section");
		section.id = 'visualization'
		document.getElementById('main').prepend(section)
		addVisInit = false
	} else {
		section = document.getElementById('visualization')
	}

	let xDensity = []
	let y = []
	let xpressure = []
	let xTemp = []
	let xC = []



	for (let i = 0; i < data.length; i++) {
		xDensity.push(data[i][3])
		y.push(data[i][4])
		xpressure.push(data[i][0])
		xTemp.push(data[i][1])
		xC.push(data[i][2])
	}


	let density = {
		y: y,
		x: xDensity,
		name: 'Dichte ρf[kg/m³]',
		mode: 'markers',
		marker: {
			color: 'green',
			size: 12,
			symbol: 'circle',
			opacity: 0.8
		},
		type: 'scatter'
	};

	let pressure = {
		y: y,
		x: xpressure,
		name: 'p[kPa]',
		mode: 'markers',
		marker: {
			color: 'red',
			size: 12,
			symbol: 'circle',
			opacity: 0.8
		},
		xaxis: 'x2',
		type: 'scatter'
	};

	let temperature = {
		y: y,
		x: xTemp,
		name: 'T[°C]',
		mode: 'markers',
		marker: {
			color: 'blue',
			size: 12,
			symbol: 'circle',
			opacity: 0.8
		},
		xaxis: 'x3',
		type: 'scatter'
	};

	let salinity = {
		y: y,
		x: xC,
		name: 'C[mg/l]',
		mode: 'markers',
		marker: {
			color: 'yellow',
			size: 12,
			symbol: 'circle',
			opacity: 0.8
		},
		xaxis: 'x4',
		type: 'scatter'
	};

	var layout = {
		title: 'Tiefenprofil',
		grid: {
			rows: 1,
			columns: 4,
			subplots: [
				['xy', 'x2y', 'x3y', 'x4y'],
			],
			columnorder: 'left to right'
		},
		yaxis: {
			title: 'Tiefe'
		},
		xaxis: {
			title: 'Dichte ρf[kg/m³]',
			titlefont: {
				color: 'green'
			},
			tickfont: {
				color: 'green'
			}
		},
		xaxis2: {
			title: {
				text: 'p[kPa]'
			},
			titlefont: {
				color: 'red'
			},
			tickfont: {
				color: 'red'
			}

		},
		xaxis3: {
			title: {
				text: 'T[°C]'
			},
			titlefont: {
				color: 'blue'
			},
			tickfont: {
				color: 'blue'
			}
		},
		xaxis4: {
			title: {
				text: 'C[mg/l]'
			},
			titlefont: {
				color: 'yellow'
			},
			tickfont: {
				color: 'yellow'
			}
		}
	}

	var plotData = [density, pressure, temperature, salinity];

	Plotly.newPlot(section, plotData, layout, {
		responsive: true
	});

	section.style.height = document.getElementById('visualization').getElementsByClassName('main-svg')[0].clientHeight + "px"

}


const parseFile = (file) => {
	if (addDataInit != true) {
		document.getElementById('main').removeChild(document.getElementById('table'))
	}

	dataCount = 1
	data = []
	addDataInit = true

	let csv = Papa.parse(file);

	let i;
	if (document.getElementById("headerCheck").checked == true) {
		i = 1
	} else {
		i = 0
	}

	while (i < csv.data.length) {
		if (csv.data[i].length < 4) {
			i++
			continue
		}
		addData(csv.data[i][0], csv.data[i][1], csv.data[i][2], csv.data[i][3], true)
		i++;
	}

	visualize()

}

const checkFileSupport = () => {
	//Check the support for the File API support 
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		let fileSelected = document.getElementById('csvfiletoread');
		let fileUpload = document.getElementById('csvImportButton');
		fileUpload.addEventListener('click', function (e) {

			//Set the extension for the file
			let fileExtension = /csv.*/;
			//Get the file object 
			let fileTobeRead = fileSelected.files[0];

			//Check of the extension match 
			if (fileTobeRead.type.match(fileExtension)) {
				//Initialize the FileReader object to read the 2file 
				let fileReader = new FileReader();
				fileReader.onload = function (e) {

					//here the file is loaded and will be parsed
					parseFile(fileReader.result)
					exportData()

				}
				fileReader.readAsText(fileTobeRead);
			} else {
				alert("Please select csv file");
			}

		}, false);
	} else {
		alert("File upload is not supported...");
	}
}

const exportData = () => {

	let dataArray = []

	for (let i = 0; i < data.length; i++) {
		dataArray.push([data[i][0], data[i][1], data[i][2], data[i][3], data[i][4]])
	}


	let csv = Papa.unparse({
		"fields": ["Druck (p[kPa])", "Temperatur (°C)", "Salinität (C[mg/l])", "Dichte (ρf[kg/m³])", "Tiefe (m)"],
		"data": dataArray
	});

	let csvData = new Blob([csv], {
		type: 'text/csv'
	});

	let url = window.URL.createObjectURL(csvData);

	document.getElementById('download_link').href = url;


}


const initHandler = () => {
	document.getElementById('p').oninput = p_f
	document.getElementById('T').oninput = p_f
	document.getElementById('C').oninput = p_f
	document.getElementById('addData').onclick = addData

	checkFileSupport()

	p_f()
}

window.onload = initHandler




class TrClass {

	constructor(p, T, C, Z, dichte) {
		this.tr = document.createElement("tr")
		this.btn = document.createElement("BUTTON")
		this.init(p, T, C, Z, dichte)
	}

	init(p, T, C, Z, dichte) {
		this.btn.innerHTML = "LÖSCHEN"
		this.btn.classList = "delete"
		this.btnTD = document.createElement("td")
		this.tr.id = dataCount
		this.btnTD.appendChild(this.btn)
		this.tr.innerHTML = `
			<td>${dataCount}</td>
			<td>${p}</td>
			<td>${T}</td>
			<td>${C}</td>
			<td>${Z}</td>
			<td>${dichte}</td>`
		document.getElementById('dataBody').appendChild(this.tr)
		this.tr.appendChild(this.btnTD)
	}

	registerDeleteEvent() {
		var that = this;

		that.btn.addEventListener('click', function (e) {
			return that.deleteRow(e);
		});
	}

	deleteRow(e) {
		for (let i = 0; i < data.length; i++) {
			if (data[i][5] == this.tr.id) {
				data.splice(i, 1)
			}
		}
		document.getElementById('dataBody').removeChild(document.getElementById(this.tr.id))
		visualize()
	}

}