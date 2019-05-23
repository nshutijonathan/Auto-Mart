import express from 'express';
import bodyParser from 'body-parser';
// set  up the express app
const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

// When a random route is inputed
app.get('/', (req, res) => {
  return res.status(200).send({
    status: 200,
    message: 'Welcome to Auto mart',
  });
});
const port = process.env.PORT || 3000;
app.listen(port, () => (console.log(`Listening on port ${port}`)));
export default app;
