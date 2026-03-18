import { GithubIcon } from "lucide-react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__dev">
          <p>
            Designed & Developed by{" "}
            <a
              href="https://www.linkedin.com/in/sean-sebastian-macarayo-598b521a3/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__dev-link"
            >
              Sean Macarayo
            </a>
          </p>
        </div>

        <div className="footer__extra">
          <div className="footer__social-row">
            <a
              href="https://github.com/seanjoerick/memoir-booth"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__icon-link"
            >
              <GithubIcon size={16} />
            </a>
            <span className="footer__copy">© 2026 memoirBooth</span>
            <span className="footer__divider">•</span>
            <p className="footer__made-with">
              Built with <span>♡</span> for memories
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
