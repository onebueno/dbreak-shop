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
        <div className="about__block">
          <h2 className="about__block-title">LA MARCA</h2>
          <div className="about__text">
            <p>
              Don't Break nació de la convicción de que la ropa debe
              ser tan resistente como quienes la visten. Cada prenda
              es diseñada para las personas que enfrentan sus propios
              límites y eligen no romperse.
            </p>
            <p>
              Construimos con materiales premium, cortamos para durar
              y diseñamos para destacar sin gritar. La oscuridad no
              es ausencia de luz — es presencia de carácter.
            </p>
          </div>
        </div>

        <div className="about__block">
          <h2 className="about__block-title">FILOSOFÍA</h2>
          <div className="about__values">
            {[
              { title: "CALIDAD SIN COMPROMISO", desc: "Materiales seleccionados, costuras reforzadas, acabados que perduran." },
              { title: "DISEÑO ATEMPORAL", desc: "Sin tendencias efímeras. Piezas que se mantienen relevantes." },
              { title: "COMUNIDAD PRIMERO", desc: "Construido para y con las personas que visten la marca." },
            ].map(v => (
              <div key={v.title} className="about__value-item">
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
