const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArgoSchema = new Schema({
  argo: {
    type: String,
    required: true, 
  },
});

const Argo = mongoose.model("Argo", ArgoSchema);

module.exports = Argo;