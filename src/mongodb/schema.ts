import { model, Schema } from 'mongoose'

const cutieSchema = new Schema({
  name: { required: true, type: String },
  createdAt: { type: Date, default: Date.now },

}, { versionKey: false })

export const Cutie = model('Cutie', cutieSchema, 'cuties')
