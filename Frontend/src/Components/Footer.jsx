import React from 'react';
const Footer = () => {
  return (
    <footer className="bg-white shadow-inner py-4 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} Finance Tracker. All rights reserved.
    </footer>
  );
};

export default Footer;
