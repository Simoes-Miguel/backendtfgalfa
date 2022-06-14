import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { Dato } from "./models/datos.js";
import multer from "multer";

// const upload = multer({ dest: "uploads/" });

dotenv.config();
let app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(morgan("dev"));
app.listen(3000);
app.get("/", function (req, res) {
  console.log("base!");
  res.send("base!");
});
app.get("/posts", function (req, res) {
  console.log("posts!");
  res.send("posts!");
});

const run = async () => {
  await mongoose.connect(process.env.URL_BASEDATOS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await app.listen(process.env.PUERTO_SERVIDOR);
  console.log("Servidor y base de datos arrancados");
};

run().catch((err) => console.log("Fallo al arrancar:" + err));

app.get("/insert", (req, res) => {
  let recibido = req.params;
  console.log(recibido);
  let dato = new Dato();
  dato.nombre = "alcampo";
  dato.total = 10;
  dato.save((err, data) => {
    if (err) {
      console.log(err);
      res.status(100).send("no");
    } else {
      res.status(200).send("yes");
    }
  });
});

app.get("/insertar/:dato", async (req, res) => {
  try {
    let datoRecibido = req.params.dato;
    datoRecibido = datoRecibido.split(",");
    console.log(datoRecibido);

    let datoEnvio = new Dato();

    datoEnvio.nombre = datoRecibido[0]?.split("=")[1] || "";
    datoEnvio.total = datoRecibido[1]?.split("=")[1] || 0;
    datoEnvio.fecha = datoRecibido[2]?.split("=")[1] || "";

    datoEnvio.save((err, data) => {
      if (err) {
        console.log(err);
        res.status(100).send("no");
      } else {
        res.status(200).send("yes");
      }
    });
  } catch (err) {
    res.status(200).send(err);
  }
});

app.get("/damelotodo", async (req, res) => {
  try {
    let datosEnviar = await Dato.find();
    res.status(200).json({ accion: "get all", datos: datosEnviar });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ accion: "get all", mensaje: "error al obtener los datos" });
  }
});
