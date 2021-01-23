alert("Hello");
console.log("Hey");

header = document.querySelector(".header");
chats = document.querySelector("#chat_window");
footer = document.querySelector(".footer");

fromBox = document.querySelector("#from_box");
toBox = document.querySelector("#to_box");
loadButton = document.querySelector("#load-button");

messagebox = document.querySelector("#message_box");
sendButton = document.querySelector("#send-button");

chats.style.height = (window.innerHeight - header.offsetHeight - footer.offsetHeight - 150) + "px";

var thisConvoRef = null,
    fromRef = null,
    toRef = null,
    presentlyLoadedLocation = null;

var from = null,
    to = null,
    coupleKey = null;

function getCoupleKey(s1, s2) {
    if (s1 < s2)
        return s1 + " " + s2;
    else
        return s2 + " " + s1;
}

function load() {
    from = fromBox.value;
    if (from === "") {
        alert("Your username is required!");
        return;
    }
    to = toBox.value;
    if (to === "") {
        alert("Reciever username is required!");
        return;
    }
    coupleKey = getCoupleKey(from, to);
    if (presentlyLoadedLocation !== null)
        presentlyLoadedLocation.off();

    thisConvoRef = firebase.database()
        .ref("conversations/" + coupleKey);

    fromRef = firebase.database()
        .ref("users/" + from);

    toRef = firebase.database()
        .ref("users/" + to);

    thisConvoRef.on('value', (snapshot) => {
        console.dir(snapshot);
        chats.innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            convo = childSnapshot.val();
            console.log(convo);
            HTML = getMessageHTML(convo['from'], convo['message']);
            chats.innerHTML += HTML;
        })
        allP = document.querySelectorAll(".text");
        allP[allP.length - 1].scrollIntoView();
    })
    presentlyLoadedLocation = thisConvoRef;

    sendButton.disabled = false;
    messagebox.focus();
}

function getMessageHTML(username, message) {
    return "<div class=\"message\">  " +
        "<span class = \"speaker\">" +
        username +
        ": </span> " +
        "<span class = \"text\">" +
        message +
        "</span> " +
        "</div>";
}

function send() {
    message = messagebox.value;
    if (message === "") {
        return;
    }

    if (thisConvoRef === null) {
        return;
    }

    messageKey = thisConvoRef.push({
        from: from,
        to: to,
        message: message
    }).key;

    fromRef.push({
        with: to,
        type: "sent",
        key: messageKey
    });
    toRef.push({
        with: from,
        type: "recieved",
        key: messageKey
    });

    messagebox.value = "";
}

loadButton.addEventListener('click', load);
fromBox.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        load();
    }
});
toBox.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        load();
    }
});
sendButton.addEventListener('click', send);
messagebox.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        send();
    }
})


document.addEventListener('DOMContentLoaded', function() {
    loadButton.disabled = false;
});