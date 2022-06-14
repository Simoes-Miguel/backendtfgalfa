import { Datos } from "../models/datos";

async function insert(dato, req, res) {
  const dato = dato;
  try {
    let datoGuardado = await dato.save();
    res.status(200).json({ accion: "save", data: datoGuardado });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ accion: "save", mensaje: "error al guardar el dato" });
  }
}

export { insert };
