import { Link } from 'react-router-dom';
import logored from '../assets/logored.png';

function Footer() {
  return (
    <>
      <div id='footer-container'>
        <address id='footer-address'>
          <p>Pocket Butcher, LLC</p>
          <p> 257 Marbled Way</p>
          <p>New York, NY 10001</p>
          <p>
            Email:{' '}
            <a href='mailto:contactpocketbutcher@gmail.com'>
              contactpocketbutcher@gmail.com
            </a>
          </p>
          <p>
            Phone: <a href='tel:+15555555555'>(917) 555-5555</a>
          </p>
        </address>
        <address id='footer-address'>
          <p>
            Lovingly crafted by:
            <br />
            Juan Pablo González Marín <span />
            <a href='https://www.linkedin.com/in/juan-pablo-gonzalez-marin-b1720620b/'>
              LinkedIn
            </a>{' '}
            <span />
            <a href='https://github.com/jpgm1848'>GitHub</a>
          </p>
          <p>
            Julie Hildabrand <span />
            <a href='https://www.linkedin.com/in/julie-hildabrand-29857a184/'>
              LinkedIn
            </a>{' '}
            <span />
            <a href='https://github.com/juliehildabrand'>GitHub</a>
          </p>
          <p>
            Vanessa Szajnberg <span />
            <a href='https://www.linkedin.com/in/vszajnberg/'>
              LinkedIn
            </a>{' '}
            <span />
            <a href='https://github.com/iamfernweh'>GitHub</a>
          </p>
        </address>
        <p>
          Created in <span>2024</span>
        </p>
      </div>
    </>
  );
}

export default Footer;
