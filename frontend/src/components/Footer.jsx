const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>Kontakt</h5>
            <p>
              GainsVault
              <br />
              Wien
            </p>
            <p>
              Telefon: +43 123 456 789
              <br />
              Email:{" "}
              <a href="mailto:gainsvault@support.com" className="text-white">
                gainsvault@support.com
              </a>
            </p>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Navigation</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Workouts
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Profil
                </a>
              </li>
              <li>
                <a
                  href="impressum.html"
                  className="text-white text-decoration-none"
                >
                  Impressum
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Hilfe
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Newsletter</h5>
            <form>
              <div className="mb-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Ihre E-Mail-Adresse"
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Abonnieren
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
