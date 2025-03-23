import '../App.css'
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap'
import InputField from './InputField'

function LoginForm() {
  return (
    <Container>
      <form action="login.php" method="post" className="cool-form container bg-dark bg-opacity-50 text-white p-2 rounded display-flex justify-content-center align-items-center col-md-4 mt-5 mb-5">
        <h3 className="text-center">Login</h3>

        <InputField className="mt-3" name="username" label="Benutzername" required={true} />
        <InputField name="password" type="password" label="Passwort" required={true} />

        <a href="#" className="font-weight-bold text-white float-end mt-3 mb-2">Passwort vergessen?</a>
        <button type="submit" className="btn btn-primary w-100" id="login" name="login">Login</button>
        <div className="text-center mt-3">Noch keinen Account? <Link to="/signin" className="font-weight-bold text-white">Registrieren</Link></div>
      </form>
    </Container>
  )
}

export default LoginForm 
