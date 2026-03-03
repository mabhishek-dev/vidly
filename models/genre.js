import mongoose from "mongoose";
import Joi from "joi";

export const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

export const Genre = mongoose.model("Genre", genreSchema);

export function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}
