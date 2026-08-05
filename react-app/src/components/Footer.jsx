import { ArrowUp, Facebook, Instagram, MapPin, Phone } from './Icons'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img src="/images/soapheader_logo.png" alt="SOAP Hand Car Wash" />
          <p>SOAP Hand Car Wash offers the highest quality workmanship in the Greater Houston Area. We offer a wide variety of eco-friendly detailing and wash services.</p>
        </div>
        <div>
          <h3>Company</h3>
          <a href="#services">Services</a><a href="#why-us">Why Us</a><a href="#programs">Programs</a><a href="#gallery">Gallery</a>
        </div>
        <div>
          <h3>Visit SOAP</h3>
          <a href="#locations"><MapPin size={15} /> 3 Houston locations</a>
          <a href="tel:7136369646"><Phone size={15} /> 713-636-9646</a>
          <a href="#faq">FAQ</a><a href="#blog">Blog</a>
        </div>
        <div>
          <h3>Follow along</h3>
          <p>Clean cars. Thoughtful care. Houston proud.</p>
          <div className="socials"><a href="#home" aria-label="Instagram"><Instagram /></a><a href="#home" aria-label="Facebook"><Facebook /></a></div>
        </div>
      </div>
      <div className="footer-bottom"><span>© 2026 SOAP Hand Car Wash</span><span>Safe. Spotless. Eco-friendly.</span></div>
      <a className="back-to-top" href="#home" aria-label="Back to top"><ArrowUp /></a>
    </footer>
  )
}
