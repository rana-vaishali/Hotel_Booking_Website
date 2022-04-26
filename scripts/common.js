let headerTemplate = `<div>
<!--Image logo-->
<img src="./assests/images/logo.png" class="logo" alt="logo"></div>

<div class="login-div" id="login-button"> 
 <button type="button" id="login" data-backdrop="false" class="btn btn-light btn-sm" data-toggle="modal" data-target="#login-modal" onclick="mainLogin(event)">
  LOGIN
</button> 
</div>

<!-- login Modal -->
<div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="login-modal-label" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="login-modal-label">Please Login</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="login-form">
                        <div class="login-field">
                            <label for="username">Username: </label>
                            <input type="text" id="username" name="username" placeholder="Enter Username" required />
                        </div>
                        <div class="login-field">
                            <label for="password">Password: </label>
                            <input type="password" id="password" name="password" placeholder="Enter Password" required />
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button id="login-button" type="button" class="btn btn-primary" data-dismiss="modal" onclick="login(event)">Login</button>
                </div>
            </div>
        </div>
    </div>
`;
document.getElementById("header-template").innerHTML = headerTemplate;
let footerTemplate = ` <div class="foo-contact"><button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#contactModal" id="contact-button">Contact Us</button></div>
<!--part 2-->
<div class="copywrite">&copy; 2020 ROOM SEARCH PVT. LTD.</div>          
<br />
<!--part 3-->
<div id="social-group">
    <a href="https://www.facebook.com" target="_blank"><img class="socialImg " src="assests/images/facebook.png"  alt="facebook" /></a>
    <a href="https://www.instagram.com" target="_blank"><img class="socialImg" src="assests/images/instagram.png" alt="instagram"/></a>
    <a href="https://twitter.com" target="_blank"><img class="socialImg " src="assests/images/twitter.png" alt="twitter" /></a>
</div>

<!--contact us Modal -->
<div class="modal fade" id="contactModal" tabindex="-1" role="dialog" aria-labelledby="ContactModalLabel" aria-hidden="true">
 <div class="modal-dialog" role="document">
   <div class="modal-content">
     <div class="modal-header">
       <h5 class="modal-title" id="ContactModalLabel">Get in touch</h5>
       <button type="button" class="close" data-dismiss="modal" aria-label="Close">
         <span aria-hidden="true">&times;</span>
       </button>
     </div>

     <div class="modal-body">
       <span>
           <form action="index.html" method="get" target="_self" >
               <p>Thank you for reaching out!!!</p>
               <p>Please enter your email and we will get back to you.</p>
               <input type="email" placeholder="Enter your email" name="email" required/><br />
               <div class="modal-footer"></div>
               <button type="submit" style="float: right;" class="btn btn-primary">Submit</button>
       </form>
   </span>
   </div>

     
   </div>
 </div>
</div>   
`;
document.getElementById("footer-template").innerHTML = footerTemplate;



let mainLogin = e => {
	if (localStorage.getItem('isLogin') === 'true') {
		localStorage.setItem('isLogin', 'false');
		location.reload();
	}
};



    let login = e => {
      // setting both username and password to admin
      localStorage.setItem('username', 'admin');
      localStorage.setItem('password', 'admin');
      // setting the user state as non logged on webpage load
      localStorage.setItem('isLogin', 'false');
    
      e.preventDefault();
      let userElement = document.getElementById('username');
      let passwordElement = document.getElementById('password');
    
      if (
        userElement.value === localStorage.getItem('username') &&
        passwordElement.value === localStorage.getItem('password')
      ) {
        localStorage.setItem('isLogin', 'true');
            alert('Successfully logged in!');
            let loginElement = document.getElementById('login')
            loginElement.dataset.target = '';
            loginElement.innerText = 'LOGOUT';
            location.reload();
      } else {
        alert('Incorrect credentials! Login failed!');
        // clearing values of username & password fields from login modal
        userElement.value = '';
        passwordElement.value = '';
      }
    };
    
    let isLogin = localStorage.getItem('isLogin');
    let loginElement = document.getElementById('login');
    
    
    let checkLogin = () => {
        if (!isLogin || isLogin === 'false') {
            localStorage.clear();
            loginElement.dataset.target = '#login-modal';
            loginElement.innerText = 'LOGIN';
        } else if (isLogin === 'true') {
            loginElement.dataset.target = '';
            loginElement.innerText = 'LOGOUT';
        }
    }
    
    checkLogin();