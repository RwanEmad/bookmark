

let bookmarkName = document.getElementById('bookmarkName')
let bookmarkUrl = document.getElementById('bookmarkUrl')

let bookmarks = []

if (localStorage.getItem("Bookmarks") != null) {
    bookmarks = JSON.parse(localStorage.getItem("Bookmarks"))
    displayBookmarks(bookmarks)

}
else {
    localStorage.setItem("Bookmarks", JSON.stringify(bookmarks))
    displayBookmarks(bookmarks)
    console.log(bookmarks)

}

function addBookmark() {

    if (validate(bookmarkName) && validate(bookmarkUrl)) {
        let Url = bookmarkUrl.value
        let site = {
            bookmarkName: bookmarkName.value[0].toUpperCase() + bookmarkName.value.slice(1),
            bookmarkUrl: 'https://' + Url
        }
        console.log(bookmarks)
        bookmarks.push(site)
        displayBookmarks(bookmarks)
        clearInput()
        localStorage.setItem("Bookmarks", JSON.stringify(bookmarks))
    } else {
        // alert("some thing went wrong")
        customAlert.alert('Oops! site name or site url is invalid.', ' ')
    }

}

function displayBookmarks(bookmarks) {
    var link = 'https://'
    let cartona = " ";

    for (let i = 0; i < bookmarks.length; i++) {
        cartona += ` <tr class="border-bottom">
        <td>
            ${i + 1}
        </td>
        <td>
            ${bookmarks[i].bookmarkName}
        </td>
        <td>
            <a class="btn btn-visit btnTxt text-white" href="${bookmarks[i].bookmarkUrl.toLowerCase()}" target="_blank">
                <i class="fa-solid fa-eye pe-2"></i>Visit
            </a>
        </td>
        <td>
            <a class="btn btn-delete pe-2 btnTxt text-white" onclick="deleteItem(${i})" >
                <i class="fa-solid fa-trash-can"></i>
                Delete
            </a>
        </td>
    </tr>`

    }
    document.getElementById("sites").innerHTML = cartona;
}

function clearInput() {
    bookmarkName.value = ""
    bookmarkUrl.value = ""
}


function deleteItem(index) {
    bookmarks.splice(index, 1)
    displayBookmarks(bookmarks)
    localStorage.setItem("Bookmarks", JSON.stringify(bookmarks))
}



function validate(hamo) {
    var validates = {
        bookmarkUrl: /^[a-z]{3,20}.com$/,
        bookmarkName: /^[a-zA-Z\s]{3,20}$/
    }
    if (validates[hamo.id].test(hamo.value)) {
        hamo.classList.replace("is-invalid", "is-valid")
        hamo.nextElementSibling.classList.add('d-none')
        return true
    } else {
        hamo.classList.add("is-invalid")
        hamo.nextElementSibling.classList.remove('d-none')
        return false
    }
}

function CustomAlert() {
    this.alert = function (message, title) {
        document.body.innerHTML = document.body.innerHTML + '<div id="dialogoverlay"></div><div id="dialogbox" class="slit-in-vertical bgDanger"><div><div id="dialogboxhead"></div><div id="dialogboxbody"></div><div id="dialogboxfoot"></div></div></div>';

        let dialogoverlay = document.getElementById('dialogoverlay');
        let dialogbox = document.getElementById('dialogbox');

        let winH = window.innerHeight;
        dialogoverlay.style.height = winH + "px";

        dialogbox.style.top = "150px";

        dialogoverlay.style.display = "block";
        dialogbox.style.display = "block";

        document.getElementById('dialogboxhead').style.display = 'block';

        if (typeof title === 'undefined') {
            document.getElementById('dialogboxhead').style.display = 'none';
        } else {
            document.getElementById('dialogboxhead').innerHTML = '  ' + title;
        }
        document.getElementById('dialogboxbody').innerHTML = message;
        document.getElementById('dialogboxfoot').innerHTML = '<button class="pure-material-button-contained active" onclick="customAlert.ok()">OK</button>';
    }

    this.ok = function () {
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
    }
}

let customAlert = new CustomAlert();