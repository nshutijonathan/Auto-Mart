import express from 'express';
import bodyParser from 'body-parser';
import { User_data } from './models/users';
// set  up the express app
const app = express();
const array = [1, 2, 3];
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

// When a random route is inputed
app.get('/', (req, res) => {
  return res.status(200).send({
    status: 200,
    message: 'Welcome to Auto mart',
    data: User_data
  });
});
const port = process.env.PORT || 3000;
app.listen(port, () => (console.log(`Listening on port ${port}`)));
export default app;
