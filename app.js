var express = require("express"),
  app = express(),
  server = require("http").Server(app),
  io = require("socket.io")(server, { cors: { origin: "*" }, allowEIO3: true }),
  port = 8889;
const SerialPort = require("serialPort");
const { MockBinding } = require("@serialport/binding-mock");
const { SerialPortStream } = require("@serialport/stream");
const { ReadlineParser } = require("@serialport/parser-readline");

var fs = require("fs");
var portName = process.argv[2];
const path = require("path");

app.use("/asset", express.static(path.join(__dirname, "asset")));

app.set("view engine", "ejs");

var colorOffset = 0;

app.get("/", function (req, res) {
  res.render("page.ejs", { colorOffset });
});

server.listen(port, () => {
  console.log("Server is listening on port" + port);
});

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  setInterval(() => {
    if (colorOffset < 100) {
      colorOffset = colorOffset + 1;
      var serialData = colorOffset;
      console.log(colorOffset);
      if (serialData <= 10) {
        socket.broadcast.emit("karnatakaOffset", serialData * 10);
        if (serialData == 10) {
          socket.broadcast.emit("dashboardVisible", { Box: "KarnatakaBox" });
        }
      } else if (serialData > 10 && serialData <= 20) {
        socket.broadcast.emit("andhraOffset", (serialData - 10) * 10);
      } else if (serialData > 20 && serialData <= 30) {
        socket.broadcast.emit("telanganaOffset", (serialData - 20) * 10);
      } else if (serialData > 30 && serialData <= 40) {
        socket.broadcast.emit("goaOffset", (serialData - 30) * 10);
      } else if (serialData > 40 && serialData <= 50) {
        socket.broadcast.emit("maharashtraOffset", (serialData - 40) * 10);
      } else if (serialData > 50 && serialData <= 60) {
        socket.broadcast.emit("madhyaPradeshOffset", (serialData - 50) * 10);
      } else if (serialData > 60 && serialData <= 70) {
        socket.broadcast.emit("gujratOffset", (serialData - 60) * 10);
      } else if (serialData > 70 && serialData <= 80) {
        socket.broadcast.emit("uttarPradeshOffset", (serialData - 70) * 10);
      } else if (serialData > 80 && serialData <= 90) {
        socket.broadcast.emit("biharOffset", (serialData - 80) * 10);
      } else if (serialData > 90 && serialData < 100) {
        socket.broadcast.emit("westBengalOffset", (serialData - 90) * 10);
      } else {
        colorOffset = 0;
        socket.broadcast.emit("clearOffset", 0);
      }
      //portMap.port.emitData(colorOffset + "\n");
    } else {
      colorOffset = 0;
    }
  }, 2000);

  // console.log("UserConnected" + socket.id);
  // const parser = new ReadlineParser();
  // portMap.pipe(parser).on("data", (line) => {
  //   console.log(Number(line));
  //   var serialData = colorOffset;
  //   if (serialData <= 10) {
  //     socket.broadcast.emit("karnatakaOffset", Number(line) * 10);
  //   } else if (serialData > 10 && serialData <= 20) {
  //     socket.broadcast.emit("andhraOffset", (Number(line) - 10) * 10);
  //   } else if (serialData > 20 && serialData <= 30) {
  //     socket.broadcast.emit("telanganaOffset", (Number(line) - 20) * 10);
  //   } else if (serialData > 30 && serialData <= 40) {
  //     socket.broadcast.emit("goaOffset", (Number(line) - 30) * 10);
  //   } else if (serialData > 40 && serialData <= 50) {
  //     socket.broadcast.emit("maharashtraOffset", (Number(line) - 40) * 10);
  //   } else if (serialData > 50 && serialData <= 60) {
  //     socket.broadcast.emit("madhyaPradeshOffset", (Number(line) - 50) * 10);
  //   } else if (serialData > 60 && serialData <= 70) {
  //     socket.broadcast.emit("gujratOffset", (Number(line) - 60) * 10);
  //   } else if (serialData > 70 && serialData <= 80) {
  //     socket.broadcast.emit("uttarPradeshOffset", (Number(line) - 70) * 10);
  //   } else if (serialData > 80 && serialData <= 90) {
  //     socket.broadcast.emit("biharOffset", (Number(line) - 80) * 10);
  //   } else if (serialData > 90 && serialData < 100) {
  //     socket.broadcast.emit("westBengalOffset", (Number(line) - 90) * 10);
  //   } else {
  //     colorOffset = 0;
  //     socket.broadcast.emit("clearOffset", 0);
  //   }
  // });
});

// MockBinding.createPort("/dev/ROBOT", { echo: true, record: true });
// const portMap = SerialPort("COM2", {
//   binding: MockBinding,
//   path: "/dev/ROBOT",
//   baudRate: 9600,
// });

// portMap.on("open", () => {
//   setInterval(() => {
//     if (colorOffset < 100) {
//       colorOffset = colorOffset + 1;
//       portMap.port.emitData(colorOffset + "\n");
//     } else {
//       colorOffset = 0;
//     }
//   }, 100);
// });
