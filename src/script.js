import Papa from 'papaparse'
import {query, newElement, elementToString} from './utils.js'

const filePrasing = () => new Promise((resolve)=> {
  Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vRTrATB1atjCBg8sJwozqjWOAM1ovnwj0KVIWF3XuzDyOn-b2okdvUzzJRivXi3vUvlvuv0TDZS8bls/pub?output=csv", {
   download: true,
   header: true,
   newline: "",
   complete: function(results, file) {resolve(results.data);}
  })
})

const getData = async() => await filePrasing();
document.addEventListener('DOMContentLoaded', async (e)=>{
	//Main
	const tasa_dol = query('#tasadol')
	const preciobs = query('#preciobs')
	const preciodol = query('#preciodol')


	preciobs.addEventListener('change', (ev)=>nuevoPrecioBs(ev,tasa_dol))
	preciodol.addEventListener('change', (ev)=>nuevoPrecioDol(ev,tasa_dol))
	tasa_dol.addEventListener('change', onChangeTasaDol)

	let datos = await getData()
	datos = datos.map(item => Object.values(item))
	
	const tasas = {
			//'divisas':{'USD':24.4},
			'divisas':await fetchTasas()
		}.divisas;
	
	preciodol.placeholder = '1$'
	preciobs.placeholder = `${tasas.USD}BsD`

	tasa_dol.value = tasas.USD

	const table = query('tbody')
	datos = datos.map((fila)=> {
		const row = newElement('tr',table)
		fila[2] = fila[1] * tasa_dol.value;
		fila.forEach(col => newElement('td',row, col))
		return fila;
	})

	query('progress').remove()	
})

const fetchTasas = async () => {
	return await fetch('https://tasa-dolar.fly.dev')
		.then(r => r.json())
		.then(d => d.divisas)
}

const nuevoPrecioBs = (ev,tasa_dol)=>{
	preciodol.value = preciobs.value / tasa_dol.value
}
	
const nuevoPrecioDol = (ev,tasa_dol)=>{
	preciobs.value = preciodol.value * tasa_dol.value
}

const onChangeTasaDol = (ev)=>{
	preciobs.placeholder = `${ev.target.value}BsD`
}