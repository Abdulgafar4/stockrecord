import React from 'react';
import "./style.css"
import l10 from "./image/10.jpg";
import l1 from "./image/1.png";
import l2 from "./image/2.png";
import l3 from "./image/3.png";
import { Typography } from '@material-ui/core';






export default function Home() {

   
        return (
  <div>
  <div className="header">
    <div className="banner">
      <div className="app-text">
        <h3>airbnb for yatchting</h3>
        <h1>Manage<br />Your Shop</h1>
        <Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</Typography>
        <div className="btn-group">
          <div className="play-btn">
          </div>
        </div>
      </div>
      <div className="app-picture">
        <img src={l10} alt=""/>
      </div>
    </div>
    <div className="about-services">
      <ul>
        <li>
          <img src={l1}  alt=""/>
          <h1>SEO Consultancy</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </li>
        <li>
          <img src={l2} alt=""/>
          <h1>Competitor Analysis</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </li>
        <li>
          <img src={l3} alt=""/>
          <h1>Social Media Marketing</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </li>
      </ul>
    </div>
    <div className="social-icons">
      <ul>
        <li><i className="fa fa-facebook"></i></li>
        <li><i className="fa fa-twitter" ></i></li>
        <li><i className="fa fa-linkedin" ></i></li>
        <li><i className="fa fa-instagram" ></i></li>
      </ul>
    </div>
  </div>
</div>
     
    );
    
}





 

 

