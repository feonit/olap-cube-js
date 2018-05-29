const originalConsole = console;
const customConsole = {
	log: string => {
		originalConsole.log(`[Cube] ${string}`)
	},
	warn: string => {
		originalConsole.warn(`[Cube] ${string}`)
	},
	warnOnce: (() => {
		const memory = {};
		return string => {
			if (!memory[string]) {
				memory[string] = true;
				originalConsole.warn(`[Cube] ${string}`)
			}
		};
	})()
};
export default customConsole
