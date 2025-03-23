import { Link } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import InputField from './InputField'

function SignUpForm() {
  return (
    <Container>
      <form action="signup.php" method="POST" className="cool-form container bg-dark bg-opacity-50 text-white p-2 rounded justify-content-center align-items-center col-md-6 mt-5 mb-5">
        <h3 className="text-center mb-4">SignUp</h3>

        <div className="container border border-4 text-center mt-3 mb-4 p-2">Alle Felder gekennzeichnet mit einem <span className="text-danger">*</span> müssen ausgefüllt werden</div>

        <fieldset className="row">
          <legend className="col-form-label col-2 pt-0 mb-2">Anrede</legend>
          <div className="col-10">
            <div className="form-check">
              <label className="from-check-label" htmlFor="Herr">Herr</label>
              <input className="form-check-input" type="radio" id="Herr" name="salutation" value="Herr" required="" />
            </div>
            <div className="form-check">
              <label className="from-check-label" htmlFor="Frau">Frau</label>
              <input className="form-check-input" type="radio" id="Frau" name="salutation" value="Frau" required="" />
            </div>
          </div>
        </fieldset>

        <div className="row mb-1">
          <div className="col">
            <div>
              <InputField name="firstname" label="Vorname" required={true} />
            </div>    </div>
          <div className="col">
            <InputField name="lastname" label="Nachname" required={true} />
          </div>
        </div>

        <div className="row mb-1">
          <div className="col-7">
            <InputField name="email" type="email" label="Email Adresse" required={true} />
          </div>
          <div className="col-5">
            <InputField name="username" label="Benutzername" required={true} />
          </div>
        </div>

        <div>
          <InputField name="phone" type="tel" label="Telefonnummer" required={true} />
        </div>

        <hr />

        <div className="mt-4 mb-5">
          <InputField name="password" type="password" label="Passwort" required={true} />
          <InputField name="password-again" type="password" label="Passwort nochmal" required={true} />
        </div>

        <button type="submit" id="signup" className="btn btn-primary w-100">SignUp</button>
        <div className="text-center mt-3">Bereits einen Account? <Link to="/login" className="font-weight-bold text-white">Login</Link></div>
      </form>
    </Container >
  )
}
export default SignUpForm