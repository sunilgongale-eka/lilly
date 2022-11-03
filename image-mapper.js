var loadFile = function (event) {
  var image = document.getElementById("output");
  let imageData = event.target.files[0];
  image.src = URL.createObjectURL(imageData);
  console.log("image", event.target.files);
  document.getElementById("uploadImage").style.display = "none";
  document.getElementById("imageName").innerHTML = imageData.name;
  document.getElementById("imageDimensions").innerHTML = imageData.size;
  document.getElementById("imageType").innerHTML = imageData.type;
  document.getElementById("imageData").style.display = "inline-block";
};

var x,
  y,
  data = [];

function getAxis(event) {
  x = event.pageX;
  y = event.pageY;
  let descBox = document.getElementById("descriptionBox").style;
  descBox.display = "inline";
  descBox.top = y;
  descBox.left = x;
  document.getElementById("enterDescription").style.display = "inline";
}

function saveData() {
  document.getElementById("desc").innerHTML = "";
  document.getElementById("enterDescription").style.display = "none";
  var descp = document.getElementById("description").value;
  document.getElementById("displayData").style.display = "inline";
  data.push({ x: x, y: y, description: descp });

  if (data.length) {
    for (let i = 0; i < data.length; i++) {
      document.getElementById("desc").innerHTML +=
        "<tr ><td class='short-column'>" +
        data[i].x +
        "</td>" +
        "<td class='short-column'>" +
        data[i].y +
        "</td>" +
        "<td class='large-column'>" +
        data[i].description +
        "</td> </tr>";
    }
  }

  document.getElementById("pointer").innerHTML +=
    "<span class='red-pointer'" +
    x +
    y +
    " " +
    "style=top:" +
    y +
    ";" +
    "left:" +
    x +
    "></span>";
  document.getElementById("description").value = "";
}

function closeDescription() {
  document.getElementById("descriptionBox").style.display = "none";
  document.getElementById("description").value = "";
}

let filterData = [];

function mouse_position(event) {
  filterData = [];
  let cursorXpos = event.pageX;
  let cursorYpos = event.pageY;
  document.getElementById("hoverData").style.display = "none";

  filterData = data.filter(
    (i) =>
      i.x <= cursorXpos + 10 &&
      i.x >= cursorXpos - 10 &&
      i.y <= cursorYpos + 10 &&
      i.y >= cursorYpos - 10
  );
  if (filterData.length) {
    document.getElementById("hoverData").style.display = "inline";
    document.getElementById("hoverData").innerHTML =
      "<span>" + filterData[0].description + "</span>";
    document.getElementById("hoverData").style.top = filterData[0].y;
    document.getElementById("hoverData").style.left = filterData[0].x;
  }
}
