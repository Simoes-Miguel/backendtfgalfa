import mongoose from "mongoose";
const { Schema } = mongoose;

let DatosSchema = new Schema({
  _id: { type: Schema.ObjectId, auto: true },
  nombre: String,
  total: Number,
  fecha: String,
});

const Dato = mongoose.model("Dato", DatosSchema);

export { Dato };
