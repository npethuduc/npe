List = document.querySelector('#detail-list'); //Progress list
List2 = document.querySelector('#list2'); //Name and badge
List3 = document.querySelector('#geti'); //Left box
List4 = document.querySelector('#modl'); //Right box
Listx = document.querySelector('#mod-list'); //Mod list

//Render progress list
function renderList(doc) {
    let li = document.createElement('li');
    let time = document.createElement('span');
    let det = document.createElement('span');

    time.textContent = doc.data().a;
    det.textContent = doc.data().b;

    li.appendChild(time);
    li.appendChild(det);

    List.appendChild(li);
}

//Render detail list
function renderList2(doc) {
    linebreak = document.createElement("br");

    //Name badge
    let li2 = document.createElement('p');
    let name2 = document.createElement('h1');
    let det2 = document.createElement('span');
    name2.textContent = doc.data().a;
    det2.textContent = doc.data().b;
    li2.appendChild(name2);
    li2.appendChild(det2);

    List2.appendChild(li2);

    //Show profile pic
    if (det2.innerHTML == "NPE N Series") {
        document.getElementById('nhh').src = 'images/pic01.png';
    } else if (det2.innerHTML == "NPE Blue Flag") {
        document.getElementById('nhh').src = 'images/pic02.png';
    } else if (det2.innerHTML == "NPE DarkBlue Flag") {
        document.getElementById('nhh').src = 'images/pic03.png';
    } else {
        document.getElementById('nhh').src = 'images/pic0.png';
    }

    //Left badge
    let li2g = document.createElement('p');
    let getd = document.createElement('span');
    let modd = document.createElement('span');

    getd.textContent = doc.data().c;
    modd.textContent = doc.data().d;
    li2g.innerHTML += "<b>Ngày nhận: </b>";
    li2g.appendChild(getd);
    li2g.appendChild(linebreak);
    li2g.innerHTML += "<b>Nội dung: </b>";
    li2g.appendChild(modd);

    List3.appendChild(li2g);

    //Right badge
    let li2g2 = document.createElement('p');
    let statd = document.createElement('span');
    let returnd = document.createElement('span');
    let priced = document.createElement('span');

    statd.textContent = doc.data().e;
    returnd.textContent = doc.data().g;
    priced.textContent = doc.data().f;
    li2g2.innerHTML += "<b>Tình trạng: </b>";
    li2g2.appendChild(statd);
    li2g2.appendChild(linebreak);
    li2g2.innerHTML += "<b>Chi phí: </b>";
    li2g2.appendChild(priced);
    li2g2.appendChild(linebreak);
    li2g2.innerHTML += "<b>Ngày giao: </b>";
    li2g2.appendChild(returnd);

    List4.appendChild(li2g2);
}

//Render mod list
function renderList3(doc) {
    for (let i = 1; i < 40; i++) {
        if (doc.data()[i]) {
            let a = document.createElement('a');
            let content = document.createElement('span');

            content.textContent = doc.data()[i];

            a.appendChild(content);

            Listx.appendChild(a);
        }
    }
}

// Press Enter to go
var numb = document.getElementById("numb");
numb.addEventListener("keypress", function(e) {
    if (e.key === "Enter") { // Checks whether the pressed key is "Enter"
        e.preventDefault();
        // Trigger the button element with a click
        document.getElementById("myBtn").click();
    }
});

function myFunction() {
    //Reset list and box
    document.getElementById("detail-list").innerHTML = "";
    document.getElementById("list2").innerHTML = "";
    document.querySelector('#geti').innerHTML = "";
    document.querySelector('#modl').innerHTML = "";
    document.querySelector('#mod-list').innerHTML = "";

    //Hide error box
    xi = document.getElementById("numb").value;
    var x2 = document.getElementById("errori");
    x2.style.display = "none";

    //Check empty input
    if (xi) {
        //Check valid code
        db.collection(xi).doc('01').get().then(doc => {
            //Valid code
            if (doc.exists) {
                //Get all doc before "x"
                db.collection(xi).where(firebase.firestore.FieldPath.documentId(), '<', 'x').get().then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        renderList(doc);
                    });
                });
                //Get info from doc "x"
                db.collection(xi).where(firebase.firestore.FieldPath.documentId(), '==', 'x').get().then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        renderList2(doc);
                    });
                });
                //Get info from doc "y"
                db.collection(xi).where(firebase.firestore.FieldPath.documentId(), '==', 'y').get().then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        renderList3(doc);
                    });
                });

                //Show name box
                var xi1 = document.getElementById("ibox");
                xi1.style.display = "block";

                //Show info box
                var xi2 = document.getElementById("infobox");
                xi2.style.display = "grid";

                //Show mod list box
                var mi = document.getElementById("modlist");
                mi.style.display = "block";

                //Hide input box
                var mi = document.getElementById("inputb");
                mi.style.display = "none";
            }
            //Invalid code
            else {
                var x1 = document.getElementById("errori");
                x1.style.display = "block";

                var x3 = document.getElementById("ibox");
                x3.style.display = "none";

                var x4 = document.getElementById("infobox");
                x4.style.display = "none"

                var x5 = document.getElementById("modlist");
                x5.style.display = "none"
            }
        })
    } else {
        //Show error box
        var x2 = document.getElementById("errori");
        x2.style.display = "block";
    }

};