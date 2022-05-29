function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

let cookies = getCookie("userEmail");
let usersData = JSON.parse(localStorage.getItem("usersList"));
let userFind = usersData.find((user) => {
    return user._emailAddress === cookies;
})


if(!userFind) {
    location.href ="./login-signup.html"
}

function deleteCookie(cname) {
    console.log(cname)
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

