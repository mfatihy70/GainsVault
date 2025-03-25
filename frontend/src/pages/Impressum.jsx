import React from "react"

const Impressum = () => {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Impressum</title>
      <h1
        className="text-white fw-bold p-3 text-center"
        style={{ backgroundColor: "#718487" }}
      >
        Impressum
      </h1>
      {/* Container für das Impressum */}
      <div className="container-fluid" style={{ backgroundColor: "#f7f7f7" }}>
        {/* Container Hintergrundfarbe geändert */}
        <div className="container-fluid bg-white shadow-sm p-4 my-4 rounded">
          <h2 className="fw-bold">Angaben gemäß § 5 TMG</h2>
          <p>
            GainsVault
            <br />
            Höchstädtplatz 6
            <br />
            1200 Wien, Österreich
          </p>
          <h2 className="fw-bold">Kontakt</h2>
          <p>
            Telefon: +43 123 456 789
            <br />
            E-Mail:{" "}
            <a href="mailto:gainsvault@support.com" className="text-primary">
              gainsvault@support.com
            </a>
          </p>
          <h2 className="fw-bold">Vertreten durch</h2>
          <div className="d-flex justify-content-between flex-wrap px-5 my-4">
            <p className="mb-0">Fatih Yildiz</p>
            <p className="mb-0">Elsherif Ibrahim</p>
            <div className="text-center">
              <p className="mb-0">Emre Yüksel</p>
              <img
                src="bilder/foto3.jpg"
                alt="Team Foto"
                className="rounded-circle shadow-sm mt-2"
                style={{ width: 150, height: 150, objectFit: "cover" }}
              />
            </div>
            <div className="text-center">
              <p className="mb-0">Shez Soltani</p>
              <img
                src="bilder/foto2.jpg"
                alt="Team Foto"
                className="rounded-circle shadow-sm mt-2"
                style={{ width: 150, height: 150, objectFit: "cover" }}
              />
            </div>
            <div className="text-center">
              <p className="mb-0">Humza Ajaz</p>
              <img
                src="bilder/foto1.jpg"
                alt="Team Foto"
                className="rounded-circle shadow-sm mt-2"
                style={{ width: 150, height: 150, objectFit: "cover" }}
              />
            </div>
          </div>
          <h2 className="fw-bold">Haftung für Inhalte</h2>
          <p>
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für
            die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können
            wir jedoch keine Gewähr übernehmen.
          </p>
          <h2 className="fw-bold">Haftung für Links</h2>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren
            Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
            fremden Inhalte auch keine Gewähr übernehmen.
          </p>
        </div>
      </div>
      {/* JavaScript zum Laden des Footers */}
      <div id="footer-placeholder" />
    </>
  )
}

export default Impressum
