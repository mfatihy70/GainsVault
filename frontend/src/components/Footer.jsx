const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3">
      <div className="container text-center">
        <p>
          GainsVault, Wien | Telefon: +43 123 456 789 | Email:{" "}
          <a href="mailto:gainsvault@support.com" className="text-white">
            gainsvault@support.com
          </a>
        </p>
        <p>
          <a href="about" className="text-white text-decoration-none mx-2">
            About Us
          </a>
          |
          <a href="imprint" className="text-white text-decoration-none mx-2">
            Imprint
          </a>
          |
          <a href="help" className="text-white text-decoration-none mx-2">
            Help
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
