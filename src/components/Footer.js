import React from 'react'
import './Footer.css'

export default () => (
  <div>
    <footer className="footer">
      <div className="container taCenter">
        <span>
          © Copyright {new Date().getFullYear()} All rights reserved. Crafted with {'@KayakCM'}. Follow  
          <a href="https://instagram.com/kayakcm/">@kayakcm</a> We Love Friends.
        </span>
      </div>
    </footer>
  </div>
)
