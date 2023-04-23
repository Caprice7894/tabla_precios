function collapseChars(str) {
  let res = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== str[i+1]) {
      res += str[i];
    }
  }
  return res;
}

function cleanEntry (line){
	// Remove extra spaces and replace the delimiter with a comma
	line = line.replace(/   /g, "|");
	line = line.replace(/  /g, "|");
	//line = line.replace(/ /g, "|");
	line = line.replace(/\t/g, "|");
	line = collapseChars(line)
	// Replace the decimal comma with a dot
	line = line.replace(/,/g, ".");
	let res = line.split('|')
	res = res.map((col)=>col.trim(' '))
	return res
}

let lines = [
		"02/04/2023 - 22:54   9553102042023   COM CLAVE MOVIL               DEBITO             -0,50                 0,85",
		"02/04/2023 - 22:54   9553102042023   COM CLAVE MOVIL               DEBITO             -0,50                 0,85",
		"02/04/2023 - 22:54   0050986746186   OP PAGOMOVILBDV OTROS BANCO   CREDITO            1,00                  1,35",
		"02/04/2023 - 01:31   95404           COM MANTENIMIENTO DE CUENTA   DEBITO             -0,05                 0,35",
	]



console.log(lines.map(cleanEntry));