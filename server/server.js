import express from 'express';
import bodyParser from 'body-parser';
import UsersData from './models/users';
// set  up the express app
const app = express();

// parse incoming request body
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

// When a random route is inputed
app.get('/', (req, res) => {
  return res.status(200).send({
    status: 200,
    message: 'Welcome to Auto mart',
  });
});
app.post('/api/v1/auth/signup', (req, res) => {
  const users = {
    id: UsersData.length + 1,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
    address: req.body.address,
    is_admin: req.body.is_admin
  };
  UsersData.push(users);
  return res.status(201).send({
    status: 201,
    message: 'User created successfully',
    data: {
      id: Object.values(users)[0], first_name: Object.values(users)[2], last_name: Object.values(users)[3], email: Object.values(users)[1]
    }
  });
});
app.get('/api/v1/users/:id', (req, res) => {
  const selecteduser = UsersData.find(checkId => checkId.id === parseInt(req.params.id, 10));
  if (selecteduser) {
    return res.status(200).send({
      status: 200,
      message: `User with id ${req.params.id} retrieved successfully`,
      data: selecteduser
    });
  }
  return res.status(404).send({
	  status: 404,
    message: `User with id ${req.params.id} not found`

  });
});

app.get('/api/v1/users', (req, res) => {
  return res.status(200).send({
    status: 200,
    message: 'All users retrieved successfully',
    data: UsersData
  });
});
app.delete('/api/v1/users/:id', (req, res) => {
  const selecteduser = UsersData.find(checkId => checkId.id === parseInt(req.params.id, 10));
  if (!selecteduser) {
    return res.status(404).send({
      status: 404,
      message: `User with id ${req.params.id} not found`
    });
  }
  const index = UsersData.indexOf(selecteduser);
  UsersData.splice(index, 1);
  return res.status(200).send({
    status: 200,
    message: `User with id ${req.params.id} is successfully deleted `
  });
});
const port = process.env.PORT || 3000;
app.listen(port, () => (console.log(`Listening on port ${port}`)));
export default app;
