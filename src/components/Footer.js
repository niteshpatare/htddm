import React from 'react'
import './Footer.css'

export default () => (
  <div>
    <h2 className="taCenter">
      Follow  
      <a href="https://instagram.com/kayakcm/">@kayakcm</a> We Love New Friends!
    </h2>
    <br />
    <footer className="footer">
      <div className="container taCenter">
        <span>
          © Copyright {new Date().getFullYear()} All rights reserved. Crafted with {'@KayakCM'}
        </span>
      </div>
    </footer>
  </div>
)
