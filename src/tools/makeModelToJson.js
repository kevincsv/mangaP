module.exports = ({schema, hide = []} = {}) => {
	schema.methods.toJSON = function () {
		const obj = this.toObject();

		for (const h of hide) {
			delete obj[ h ];
		}

		return obj;
	};
};