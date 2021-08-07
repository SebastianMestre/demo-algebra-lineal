export const precondicion = (b, mensaje) => {
	if (!b) throw new Error(`No se cumple la precondicion: '${mensaje}'`);
};
