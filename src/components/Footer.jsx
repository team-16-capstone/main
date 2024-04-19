import { Link } from 'react-router-dom';
import logored from '../assets/logored.png';

function Footer() {
  

  return (
    <>
      <div id='footer-container'>
        <address id='footer-address'>
            <p>Pocket Butcher, LLC</p>
            257 Marbled Way<br/>
            New York, NY 10001<br/>
            Email: <a href="mailto:inquiries@pocketbutcher.com">Inquiries@PocketButcher.com</a><br/>
            Phone: <a href="tel:+15555555555">(917) 555-5555</a> 
        </address>
        <p>Copyright©<span>2024</span></p>
      </div>
    </>
  );
}

export default Footer;