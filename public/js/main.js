console.log('Js loading now ');
// Forms show/hide
function toggleFormVisibility(event){

    //get access to elements
    var signUpForm = document.getElementById("signUp-form");
    var signInForm = document.getElementById("signIn-form");
    var signInFormSpan = document.getElementById("sign-in-form-show");
    var signUpFormSpan = document.getElementById("sign-up-form-show");

    //get clicked element
     var element = event.target;
    //element id of clicked element
    var elementId = element.id;


    if(elementId == "sign-in-form-show"){
      signInForm.style.display = "block";
      signUpForm.style.display = "none";  
      signInFormSpan.style.display = "none";
      signUpFormSpan.style.display = "block";

    }

    if(elementId == "sign-up-form-show"){

      signInForm.style.display = "none";
      signUpForm.style.display = "block";  
      signInFormSpan.style.display = "block";
      signUpFormSpan.style.display = "none";  

    }

}

