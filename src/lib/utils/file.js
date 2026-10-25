import { promises as fsp } from 'fs';

/** @param {string} directoryPath */
export async function makeDirectory(directoryPath) {
	await fsp.mkdir(directoryPath, { recursive: true });
}
