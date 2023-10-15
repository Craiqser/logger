export default class Logger {
	static Level = Object.freeze({ Debug: 'DBG', Info: 'INF', Warn: 'WRN', Error: 'ERR' });
	static #levelIdxs = Object.values(this.Level);
	static #logLevelColors = ['36', '32', '33', '31'];

	#options = { level: Logger.Level.Debug, levelIdx: 0, name: '' };

	/**
	 * @param {'DBG' | 'INF' | 'WRN' | 'ERR'} level
	 * @param {string} message
	 * @param {{ level: 'DBG' | 'INF' | 'WRN' | 'ERR'; levelIdx: number; name: string; }} options
	 */
	static #messageFormat(level, message, options) {
		const dt = new Date().toISOString();
		const levelIdx = this.#levelIdxs.indexOf(level);
		const res = `\x1b[90m${dt} \x1b[${this.#logLevelColors[levelIdx]}m${level} ${options.name}\x1b[0m${message}\n`;
		return res;
	}

	/**
	 * @param {'DBG' | 'INF' | 'WRN' | 'ERR'} level
	 * @param {string} message
	 * @param {{ level: 'DBG' | 'INF' | 'WRN' | 'ERR'; levelIdx: number; name: string; }} options
	 */
	static #write(level, message, options) {
		if (this.#levelIdxs.indexOf(level) < options.levelIdx) return;
		const log = this.#messageFormat(level, message, options);
		(level === Logger.Level.Error) ? process.stderr.write(log) : process.stdout.write(log);
	}

	/**
	 * Constructs a new instance of the class.
	 *
	 * @param {{ level: 'DBG' | 'INF' | 'WRN' | 'ERR'; name: string?; }} options
	 */
	constructor(options) {
		Object.assign(this.#options, options);
		this.#options.levelIdx = Object.values(Logger.Level).indexOf(this.#options.level);
		this.#options.name = options.name ? options.name + ': ' : '';
	}

	/**
	 * @param {string} message
	 */
	debug(message) { Logger.#write(Logger.Level.Debug, message, this.#options); }
	/**
	 * @param {string} message
	 */
	info(message) { Logger.#write(Logger.Level.Info, message, this.#options); }
	/**
	 * @param {string} message
	 */
	warn(message) { Logger.#write(Logger.Level.Warn, message, this.#options); }
	/**
	 * @param {string} message
	 */
	error(message) { Logger.#write(Logger.Level.Error, message, this.#options); }
}
