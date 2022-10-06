const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1] || '';
	try {
		const verified=jwt.verify(token,process.env.JWT_SECRET);
		 req.verifiedUser=verified;
		// console.log(token);
		 console.log("Verifications Sucees",verified);
		next();
	} catch (error) {
		console.log('Veriefied Failed!');
		next();
	}
};

module.exports = { authenticate };
