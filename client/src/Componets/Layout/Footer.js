import React from "react";

const Footer = () => {
  return (
    <footer className="py-1 bg-black " style={footerStyle}>
      <div className="container">
        <p className="text-center">&copy; WokeFit</p>
      </div>
    </footer>
  );
};

const footerStyle = {
  // backgroundColor: "#432E21",
  color: "#fff",
};

export default Footer;
