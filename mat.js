import { precondicion } from './util.js';

export class Matriz {
	constructor(filas, columnas, datos) {
		this.filas = filas;
		this.columnas = columnas;
		this.datos = datos;
	}

	static conTamanno(filas, columnas) {
		let m = new Array(filas*columnas);
		return new Matriz(filas, columnas, m);
	}

	entrada(i, j) {
		return this.datos[i*this.columnas+j];
	}

	asignarEntrada(i, j, valor) {
		this.datos[i*this.columnas+j] = valor;
	}
};

export const suma = (A, B) => {
	precondicion(A.filas == B.filas, "Las matrices tienen tamannos compatibles");
	precondicion(A.columnas == B.columnas, "Las matrices tienen tamannos compatibles");

	const resultado = Matriz.conTamanno(A.filas, A.columnas);
	for (let i = 0; i < A.filas; ++i) {
		for (let j = 0; j < A.columnas; ++j) {
			const entrada = A.entrada(i, j) + B.entrada(i, j);
			resultado.asignarEntrada(i, j, entrada);
		}
	}
	return resultado;
};

export const producto = (A, B) => {
	precondicion(A.columnas == B.filas, "Las matrices tienen tamannos compatibles");

	const resultado = Matriz.conTamanno(A.filas, B.columnas);
	for (let i = 0; i < A.filas; ++i) {
		for (let j = 0; j < B.columnas; ++j) {
			let entrada = 0;
			for (let k = 0; k < A.columnas; ++k)
				entrada += A.entrada(i, k) * B.entrada(k, j);
			resultado.asignarEntrada(i, j, entrada);
		}
	}
	return resultado;
};


export const vector = (x, y, z) =>
	new Matriz(4, 1, [
		x,
		y,
		z,
		1,
	]);

export const X = v => v.entrada(0, 0);
export const Y = v => v.entrada(1, 0);
export const Z = v => v.entrada(2, 0);

export const rotacionX = (theta) => {
	const cosTheta = Math.cos(theta);
	const sinTheta = Math.sin(theta);
	return new Matriz(4, 4, [
		1,        0,         0, 0,
		0, cosTheta, -sinTheta, 0,
		0, sinTheta,  cosTheta, 0,
		0,        0,         0, 1,
	]);
};

export const rotacionY = (theta) => {
	const cosTheta = Math.cos(theta);
	const sinTheta = Math.sin(theta);
	return new Matriz(4, 4, [
		cosTheta, 0, -sinTheta, 0,
		       0, 1,         0, 0,
		sinTheta, 0,  cosTheta, 0,
		       0, 0,         0, 1,
	]);
};

export const rotacionZ = (theta) => {
	const cosTheta = Math.cos(theta);
	const sinTheta = Math.sin(theta);
	return new Matriz(4, 4, [
		cosTheta, -sinTheta, 0, 0,
		sinTheta,  cosTheta, 0, 0,
		       0,         0, 1, 0,
		       0,         0, 0, 1,
	]);
};

export const escala = (x, y, z) => {
	return new Matriz(4, 4, [
		x, 0, 0, 0,
		0, y, 0, 0,
		0, 0, z, 0,
		0, 0, 0, 1,
	]);
};

export const traslacion = (x, y, z) => {
	return new Matriz(4, 4, [
		1, 0, 0, x,
		0, 1, 0, y,
		0, 0, 1, z,
		0, 0, 0, 1,
	]);
};

