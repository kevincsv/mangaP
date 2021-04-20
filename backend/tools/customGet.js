module.exports = (req, _res, next) => {
	const shallowReq = {
		headers: req.headers,
		get: req.get
	};

	const customGet = (key, defaultValue) => shallowReq.get (key) || req.query[ key ] || req.params[ key ] || req.body[ key ] || defaultValue;

	/**
	 *
	 * @param key = string | string[]
	 * @param defaultValue = any | {*}
	 * @returns any | {*}
	 */
	req.get = (key, defaultValue) => {
		if (Array.isArray (key)) {
			return key.reduce ((accumulator, k) => {
				accumulator[ k ] = customGet (k, typeof defaultValue === 'object' ? defaultValue[ k ] : defaultValue);

				return accumulator;
			}, {});
		}

		return customGet (key, defaultValue);
	};

	next ();
};