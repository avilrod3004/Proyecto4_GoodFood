import React from 'react';
import LogoFacebook from "../../assets/facebook.svg"
import LogoTwitter from "../../assets/twitter.svg"
import LogoTikTok from "../../assets/tiktok.svg"
import LogoInstagram from "../../assets/instagram.svg"
import LogoGitHub from "../../assets/github.svg"

/**
 * Componente que renderiza el pie de página con enlaces a redes sociales y términos.
 *
 * @returns {JSX.Element} El pie de página con enlaces a redes sociales y términos de servicio.
 */
const Footer = () => {
    return (
        <footer className="pie">
            <nav className="pie__menu-cuentas">
                <ul className="menu-cuentas__listado-cuentas">
                    <li className="listado-cuentas__opcion-cuentas">
                        <a href="https://github.com/avilrod3004/Proyecto4_GoodFood" target="_blank"
                           className="opcion-cuentas__enlace-cuentas">
                            <img src={LogoGitHub} alt="Logo GitHub" className="enlace-cuentas__logo"/>
                            <span className="enlace-cuentas__nombre">GitHub</span>
                        </a>
                    </li>
                    <li className="listado-cuentas__opcison-cuentas">
                        <a href="https://www.facebook.com" target="_blank" className="opcion-cuentas__enlace-cuentas">
                            <img src={LogoFacebook} alt="Logo Facebook" className="enlace-cuentas__logo"/>
                            <p className="enlace-cuentas__nombre">Facebook</p>
                        </a>
                    </li>
                    <li className="listado-cuentas__opcion-cuentas">
                        <a href="https://x.com/" target="_blank" className="opcion-cuentas__enlace-cuentas">
                            <img src={LogoTwitter} alt="Logo Twitter/X" className="enlace-cuentas__logo"/>
                            <span className="enlace-cuentas__nombre">X</span>
                        </a>
                    </li>
                    <li className="listado-cuentas__opcion-cuentas">
                        <a href="https://www.tiktok.com/" target="_blank" className="opcion-cuentas__enlace-cuentas">
                            <img src={LogoTikTok} alt="Logo TikTok" className="enlace-cuentas__logo"/>
                            <span className="enlace-cuentas__nombre">TikTok</span>
                        </a>
                    </li>
                    <li className="listado-cuentas__opcion-cuentas">
                        <a href="https://www.instagram.com/" target="_blank" className="opcion-cuentas__enlace-cuentas">
                            <img src={LogoInstagram} alt="Logo Instagram" className="enlace-cuentas__logo"/>
                            <span className="enlace-cuentas__nombre">Instagram</span>
                        </a>
                    </li>
                </ul>
            </nav>

            <nav className="pie__menu-terminos">
                <ul className="menu-terminos__listado-terminos">
                    <li className="listado-terminos__opcion-terminos">
                        <a href="#" className="opcion-terminos__enlace-terminos">© 2024 GoodFood</a>
                    </li>
                    <li className="listado-terminos__opcion-terminos">
                        <span className="opcion-terminos__separador">|</span>
                    </li>
                    <li className="listado-terminos__opcion-terminos">
                        <a href="#" className="opcion-terminos__enlace-terminos">Terms of Service</a>
                    </li>
                    <li className="listado-terminos__opcion-terminos">
                        <span className="opcion-terminos__separador">|</span>
                    </li>
                    <li className="listado-terminos__opcion-terminos">
                        <a href="#" className="opcion-terminos__enlace-terminos">Privacy Policy</a>
                    </li>
                    <li className="listado-terminos__opcion-terminos">
                        <span className="opcion-terminos__separador">|</span>
                    </li>
                    <li className="listado-terminos__opcion-terminos">
                        <a href="#" className="opcion-terminos__enlace-terminos">Manege Privacy Preferences</a>
                    </li>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;