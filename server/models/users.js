export const User_data = {
  id: 1,
  first_name: 'nshuti',
  last_name: 'jonathan',
  password: 'zero',
  address: 'kigali',
  is_admin: false
};

class Users {
  constructor(id, email, first_name, last_name, password, address, is_admin) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.password = password;
    this.address = address;
    this.is_admin = is_admin;
  }
}
export default { Users };
