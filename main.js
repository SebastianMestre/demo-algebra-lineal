import { Matriz, producto, rotacionX, rotacionZ, escala, traslacion, vector } from './mat.js';

const ctx = cnv.getContext('2d');

const I4 = new Matriz([
	[1, 0, 0, 0], 
	[0, 1, 0, 0], 
	[0, 0, 1, 0], 
	[0, 0, 0, 1],
]);

let phi = 20 * (Math.PI / 180);
const theta = 30 * (Math.PI / 180);

let alfa = 45;
let k = 0.59;
let cantidadRamas = 3;
let profundidad = 4;

function draw(alfa, k, cantidadRamas) {
	phi += 0.008;

	const angulos = [];
	for (let i = 0; i < cantidadRamas; ++i)
		angulos.push(i * 360 / cantidadRamas);

	const MundoAPantalla = (()=>{
		const Rz = rotacionZ(phi);
		const Rx = rotacionX(theta);
		const s = 200;
		const S = escala(s, s, s);
		const proyeccion = new Matriz([
				[1, 0, 0, 0],
				[0, 0, -1, 0],
		]);
		return producto(proyeccion, producto(S, producto(Rx, Rz)));
	})();

	function plotearSegmento(p1, p2) {
		const dx = cnv.width/2;
		const dy = cnv.height;
		const pp1 = producto(MundoAPantalla, p1);
		const pp2 = producto(MundoAPantalla, p2);
		ctx.moveTo(pp1.entrada(0, 0)+dx, pp1.entrada(1, 0)+dy);
		ctx.lineTo(pp2.entrada(0, 0)+dx, pp2.entrada(1, 0)+dy);
	}

	const transformaciones = [
	];
	const T1 = traslacion(0, 0, 1);
	const T2 = producto(rotacionX(alfa), escala(k, k, k));
	for (const angulo of angulos) {
		const Rz = rotacionZ(angulo * (Math.PI / 180));
		const T = producto(T1, producto(Rz, T2));
		transformaciones.push(T);
	}

	function arbol(rec, A) {
		if (rec == 0)
			return;

		const p1 = producto(A, vector(0, 0, 0));
		const p2 = producto(A, vector(0, 0, 1));

		plotearSegmento(p1, p2);

		if (rec == 1)
			return;

		for (const T of transformaciones)
			arbol(rec-1, producto(A, T));
	}


	ctx.clearRect(0, 0, cnv.width, cnv.height);
	ctx.beginPath();
	arbol(profundidad, I4);
	ctx.stroke();
}

function update() {
	draw(alfa, k, cantidadRamas);
}

window.setInterval(update, 30);

{
const ramasInp = document.getElementById('ramasInp');
ramasInp.addEventListener("change", function() {
	cantidadRamas = ramasInp.value;
});

const profInp = document.getElementById('profInp');
profInp.addEventListener("change", function() {
	profundidad = profInp.value;
});

const escalaInp = document.getElementById('escalaInp');
escalaInp.addEventListener("input", function() {
	k = escalaInp.value;
});

const alfaInp = document.getElementById('alfaInp');
alfaInp.addEventListener("input", function() {
	alfa = alfaInp.value;
});
}
