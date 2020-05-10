// Image Preview
$(document).ready(function () {
    googleLogin();

    $('.image-section').hide();
    let imagePreview = $('#imagePreview');
    let result = $('#result');
    $('.loader').hide();
    result.hide();

    
    function readURL(input) {
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.css('background-image', 'url(' + e.target.result + ')');
                imagePreview.hide();
                imagePreview.fadeIn(650);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        result.text('');
        result.hide();
        readURL(this);
    });
});

function googleLogin() {
    
    let clientId = "1075135948168-jnue21hiol22gptrsesla9j00omofpib.apps.googleusercontent.com";

   
    let redirect_uri = "http://localhost/webapp/upload.html";

    
    let scope = "https://www.googleapis.com/auth/drive";

    
    let url = "";

   
    $("#login").click(function () {
        
        signIn(clientId, redirect_uri, scope, url);
    });

    function signIn(clientId, redirect_uri, scope, url) {
       
        url = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=" + redirect_uri
            + "&prompt=consent&response_type=code&client_id=" + clientId + "&scope=" + scope
            + "&access_type=offline";

        
        window.location = url;
    }
}