import mascotImg from '../assets/IMG_2.png'
import './About.css'

export default function About() {
  return (
    <div className="about">
      <div className="about__hero">
        <div className="about__hero-text">
          <p className="about__eyebrow">NOSOTROS</p>
          <h1 className="about__title">DON'T BREAK<br />WORLDWIDE</h1>
        </div>
        <div className="about__hero-mascot">
          <img src={mascotImg} alt="dbreak mascot" />
        </div>
      </div>

      <div className="about__content">

        <div className="about__manifesto">
          <p className="about__manifesto-text">
            "For all those who once had their heart broken<br />
            and became rockstars."
          </p>
        </div>

        <div className="about__block">
          <h2 className="about__block-title">EL ESPÍRITU</h2>
          <div className="about__text">
            <p>
              DontBreak representa a quienes, en algún momento, se rompieron por dentro —
              una pérdida, una traición, un fracaso, una caída —
              pero en vez de venirse abajo, se volvieron más fuertes.
            </p>
            <p>
              No es una marca de tristeza. Es una marca de renacimiento.
            </p>
          </div>
        </div>

        <div className="about__block">
          <h2 className="about__block-title">EL MENSAJE</h2>
          <div className="about__text">
            <p>
              El dolor no te destruyó. Te convirtió en alguien más resistente,
              más creativo, más auténtico. Un rockstar no en el sentido literal,
              sino en el sentido de actitud, poder interno y estilo propio.
            </p>
          </div>
        </div>

        <div className="about__block">
          <h2 className="about__block-title">IDENTIDAD URBANA</h2>
          <div className="about__text">
            <p>
              La marca encaja perfecto en el streetwear porque la calle también es eso:
              caerse, levantarse, aprender, resistir y encontrar tu propia voz.
            </p>
            <p>
              El dolor se convierte en estética.<br />
              La historia se vuelve estilo.
            </p>
          </div>
        </div>

        <div className="about__closing">
          <p>"Yo pasé por fuego, pero no me rompí. Me transformé."</p>
        </div>

      </div>
    </div>
  )
}
