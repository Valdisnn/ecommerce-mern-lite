import React from "react";
import styled from "styled-components";

const FooterBlock = styled.div`
  .footer {
    padding-top: 20px;
    min-height: 100px;
    width: 100%;
    overflow: hidden;
    align-items: center;
    border-top: 1px solid #ddd;
  }

  .author-logo {
    background-color: #ff0000;
    display: flex;
    color: white;
    padding: 6px;
    border-radius: 0.5rem;
    text-transform: uppercase;
  }

  a {
    color: white;
    text-decoration: none !important;
  }

  .footer-content {
    display: flex;
    justify-content: space-beetwen;
    align-items: center;
  }

  .footer .logo {
    flex: 1 1;
  }

  .footer p {
    text-transform: uppercase;
    color: #000;
    font-weight: bold;
  }

  .footer .allrights {
    font-size: 9px;
    text-transform: uppercase;
    color: #555;
    margin-bottom: -20px;
  }

  .footer img {
    max-width: 50px;
    margin-right: 2%;
  }

  @media (max-width: 767px) {
    .footer img {
      max-width: 30px;
      margin-right: 2%;
    }

    .footer p {
      font-size: 20px;
    }
  }

  @media (max-width: 320px) {
    .footer p {
      font-size: 16px;
    }

    .footer .allrights {
      font-size: 6px;
    }
  }
`;

function Footer() {
  return (
    <>
      <FooterBlock>
        <br />
        <div className="footer">
          <div className="footer-content">
            <div className="logo">
              <h1>
                <p>AGETECH</p>
                <span className="allrights">© 2021 Все права защищены</span>
              </h1>
            </div>
            <div className="author-logo">
              <h1>
                <a
                  href="https://vk.com/juravloff"
                  target="_blank"
                  rel="noreferrer"
                >
                  V.J. Lab
                </a>
              </h1>
            </div>
          </div>
        </div>
      </FooterBlock>
    </>
  );
}

export default Footer;
