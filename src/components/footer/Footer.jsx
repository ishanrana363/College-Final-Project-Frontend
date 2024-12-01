import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <footer className="w-full bg-gradient-to-r from-purple-500 via-pink-400 via-red-300 to-orange-500 text-white py-12">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
          {/* Contact Info Section */}
          <div className="footer__col">
            <h4 className="text-xl font-semibold mb-4">CONTACT INFO</h4>
            <p className="flex items-center mb-2">
              <i className="ri-map-pin-2-fill text-2xl mr-2"></i>
              123, London Bridge Street, London
            </p>
            <p className="flex items-center mb-2">
              <i className="ri-mail-fill text-2xl mr-2"></i>
              support@Lebaba.com
            </p>
            <p className="flex items-center">
              <i className="ri-phone-fill text-2xl mr-2"></i>
              (+012) 3456 789
            </p>
          </div>

          {/* Company Section */}
          <div className="footer__col">
            <h4 className="text-xl font-semibold mb-4">COMPANY</h4>
            <Link to="/" className="block mb-2">Home</Link>
            <Link to="/about" className="block mb-2">About Us</Link>
            <Link to="/work-with-us" className="block mb-2">Work With Us</Link>
            <Link to="/blog" className="block mb-2">Our Blog</Link>
            <Link to="/terms" className="block">Terms & Conditions</Link>
          </div>

          {/* Useful Links Section */}
          <div className="footer__col">
            <h4 className="text-xl font-semibold mb-4">USEFUL LINKS</h4>
            <Link to="/help" className="block mb-2">Help</Link>
            <Link to="/track-order" className="block mb-2">Track My Order</Link>
            <Link to="/men" className="block mb-2">Men</Link>
            <Link to="/women" className="block mb-2">Women</Link>
            <Link to="/dresses" className="block">Dresses</Link>
          </div>

          {/* Instagram Section */}
          <div className="footer__col">
            <h4 className="text-xl font-semibold mb-4">INSTAGRAM</h4>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-2">
              <img src="https://res.cloudinary.com/dj2edy2rg/image/upload/v1733071155/instagram-4_1_aszusb.jpg" alt="instagram" className="w-full h-auto object-cover" />
              <img src="https://res.cloudinary.com/dj2edy2rg/image/upload/v1733071154/instagram-5_1_tqpn8z.jpg" alt="instagram" className="w-full h-auto object-cover" />
              <img src="https://res.cloudinary.com/dj2edy2rg/image/upload/v1733071154/instagram-3_1_n1mwos.jpg" alt="instagram" className="w-full h-auto object-cover" />
              <img src="https://res.cloudinary.com/dj2edy2rg/image/upload/v1733071155/instagram-6_1_qyw8sc.jpg" alt="instagram" className="w-full h-auto object-cover" />
              <img src="https://res.cloudinary.com/dj2edy2rg/image/upload/v1733071154/instagram-1_1_fvaabc.jpg" alt="instagram" className="w-full h-auto object-cover" />
              <img src="https://res.cloudinary.com/dj2edy2rg/image/upload/v1733071154/instagram-1_1_fvaabc.jpg" alt="instagram" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </footer>

      {/* Footer Bottom Bar */}
      <div className="bg-gray-900 text-center py-4 text-sm text-gray-400">
        Copyright © 2025 Web Design Mastery. All rights reserved.
      </div>
    </div>
  )
}

export default Footer
