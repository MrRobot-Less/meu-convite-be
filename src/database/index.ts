import mongoose from "mongoose";

mongoose.connect('mongodb://localhost/meu_convite_bd');
mongoose.Promise = global.Promise;

export default mongoose;