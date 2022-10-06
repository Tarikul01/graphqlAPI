const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./db');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');

const { createJwtToken } = require('./util/auth');
const { authenticate } = require('./middleware/auth.middleware.js');

const app = express();
dotenv.config();
connectDB();

//middleware use
app.use(authenticate);
app.get('/', (req, res) => {
	console.log(req.verifiedUser);
	res.json({ msg: req.verifiedUser });
});
app.get('/authtest', (req, res) => {
	res.json(createJwtToken({ msg: 'Hello graphql' }));
});
app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		graphiql: true,
	})
);

app.listen(process.env.PORT, () => {
	console.log(`App running on port http://localhost:${process.env.PORT}/`);
});
