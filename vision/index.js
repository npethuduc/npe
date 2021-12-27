const IMAGENET_CLASSES = {
    1: "Acer VN7-591G",
    2: "Acer V3-571/V3-571G",
    3: "Macbook A1181 White",
    4: "HP Envy 15-TS",
    5: "Acer 3830/3830T/3830TG",
    6: "Acer R3-471T/R3-471TG",
    7: "Acer 5755/5755G",
    8: "Acer E5-571/E5-571G/E5-572/E5-572G",
    9: "HP 2560P/2570P",
}

const delay = ms => new Promise(res => setTimeout(res, ms));

//________________________________________________________________________________________________

var model;
//Call load function
asyncLoadModel('models/model.json');

//Loads the GraphModel 
async function asyncLoadModel(model_url) {

    model = await tf.loadGraphModel(model_url);

    //Hide progress bar after loaded model
    const img = document.querySelector(".cssProgress")
    img.classList.toggle("showout");
    await delay(501);
    var xl = document.getElementById("progressbar");
    xl.style.display = "none";

    //Show button and allow user to choose picture
    var chonhinh = document.getElementById("chonhinh");
    chonhinh.style.display = "block";

}


//Choose and show image on preview box
function PreviewImage() {

    var fileInput = document.getElementById("image-selector").value;

    // Allowed file type
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

    //Valid file type
    if (allowedExtensions.exec(fileInput)) {
        //Hide error box
        errori = document.getElementById("errori");
        errori.style.display = "none";

        var oFReader = new FileReader();
        oFReader.readAsDataURL(document.getElementById("image-selector").files[0]);

        oFReader.onload = function(oFREvent) {

            //Show image on preview box
            document.getElementById("selected-image").src = oFREvent.target.result;

            //Show preview box
            var hinhanh = document.getElementById("hinhanh");
            hinhanh.style.display = "block";

            //Hide and clear detail box (in case of the program was excecuted before)
            var thongtin = document.getElementById("thongtin");
            thongtin.style.display = "none";
            document.getElementById("prediction-list").innerHTML = "";

            //Show predict button and allow user to run the program
            var xp = document.getElementById("predict-button");
            xp.style.display = "block"
        }
    }
    //Invalid file type
    else {
        //Show error box
        errori = document.getElementById("errori");
        errori.style.display = "block";
        errori.innerHTML = "Vui lòng chọn hình ảnh dạng .png, .jpg hoặc .jpeg";
    }
}


//Start Detection Progress
async function getPred() {

    //Check if picture was selected
    if (document.getElementById("image-selector").value != "") {

        //Show progress bar
        var x = document.getElementById("progressbar");
        x.style.display = "block";
        await delay(1);
        const img = document.querySelector(".cssProgress")
        img.classList.toggle("showout");

        //Store image from preview box to image variable
        image = document.getElementById("selected-image");

        //Create tensor from image
        image = await tf.browser.fromPixels(image);
        image = await image.expandDims(0);

        //Perform the detection with your layer model
        predictions = await model.executeAsync(image, ['detection_classes']).then(predictions => {
            const data = predictions.dataSync()[0]

            //Get laptop name by order in imagenet_classes
            let classnum = IMAGENET_CLASSES[data];
            document.getElementById("prediction-list").innerHTML = "";
            document.getElementById("prediction-list").innerHTML = classnum;

            //Show information
            var thongtin = document.getElementById("thongtin");
            thongtin.style.display = "block";
        })

        //Hide button
        var chonhinh2 = document.getElementById("chonhinh");
        chonhinh2.style.display = "none";
        var xp2 = document.getElementById("predict-button");
        xp2.style.display = "none"

        //Hide progress bar
        img.classList.toggle("showout");
        await delay(501);
        var x = document.getElementById("progressbar");
        x.style.display = "none";
    }

    //Picture was not selected
    else {
        errori = document.getElementById("errori");
        errori.style.display = "block";
        errori.innerHTML = "Vui lòng chọn hình ảnh trước";
    }
}