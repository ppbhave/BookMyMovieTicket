import "./styles/header.css"

function Header () {
 return (  
 <div>
 <header id="header" className="fixed-top">
 <div className="container d-flex align-items-center">

   <h1 className="logo mr-auto"><a href="movies.html">Book My Movie</a></h1>
    {/* <a href="index.html" className="logo mr-auto"><img src="assets/img/logo.png" alt="" className="img-fluid"></a>--> */}
   <nav className="nav-menu d-none d-lg-block">
     <ul>
       <li>Movies</li>
       <li>Login</li>
        <li className="drop-down" id="logged-in">profile
         <ul>
           <li>My profile</li>
           <li>My Bookings</li>
           <li id="logout">Logout</li>
         </ul>
       </li>    
      </ul>
   </nav>

 </div>
</header>
</div>
)
}
export default Header;