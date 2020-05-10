$(document).ready(function () {
    
    const urlParameters = new URLSearchParams(window.location.search);
    const code = urlParameters.get('code');
    const RedirectUri = "http://localhost/webapp/upload.html"; 
    const ClientSecret = "KpmmnkqOg86IxVpPv2aDjqmb"; 
    const SCOPE = "https://www.googleapis.com/auth/drive";
    let access_token = "";
    let ClientId = "1075135948168-jnue21hiol22gptrsesla9j00omofpib.apps.googleusercontent.com";
    let googleAuthApiUrl = "https://www.googleapis.com/oauth2/v4/token";
    let googleDriveApiUrl = "https://www.googleapis.com/upload/drive/v2/files";

    $.ajax({
        type: 'POST',
        url: googleAuthApiUrl,
        data: {
            code: code
            , redirect_uri: RedirectUri,
            client_secret: ClientSecret,
            client_id: ClientId,
            scope: SCOPE,
            grant_type: "authorization_code"
        },
        dataType: "json",
        success: function (resultData) {
            localStorage.setItem("accessToken", resultData.access_token);
            localStorage.setItem("refreshToken", resultData.refreshToken);
            localStorage.setItem("expires_in", resultData.expires_in);
            window.history.pushState({}, document.title, "/SoftwareSecurityApp/" + "upload.html");
        }
    });

   

    let Upload = function (file) {
        this.file = file;
    };
    Upload.prototype.getType = function () {
        localStorage.setItem("type", this.file.type);
        return this.file.type;
    };
    Upload.prototype.getSize = function () {
        localStorage.setItem("size", this.file.size);
        return this.file.size;
    };
    Upload.prototype.getName = function () {
        return this.file.name;
    };
    Upload.prototype.doUpload = function () {
        let that = this;
        let formData = new FormData();

        
        formData.append("file", this.file, this.getName());
        formData.append("upload_file", true);

        $.ajax({
            type: "POST",
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", "Bearer" + " " + localStorage.getItem("accessToken"));
            },
            url: googleDriveApiUrl,
            data: {
                uploadType: "media"
            },
            

            success: function (data) {
                console.log(data);
                alert("Upload successful");
            },
            error: function (error) {
                console.log(error);
            },
            async: true,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            timeout: 60000
        });
    };



    $("#upload").on("click", function (e) {
        let file = $("#files")[0].files[0];
        let upload = new Upload(file);
        upload.doUpload();
    });
});


