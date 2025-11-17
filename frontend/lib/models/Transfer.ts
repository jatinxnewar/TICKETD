import mongoose, { Schema, models, model } from "mongoose"

const TransferSchema = new Schema({
  listingId: { type: Schema.Types.ObjectId, ref: "Listing", required: true },
  fromUserId: { type: String, required: true },
  toUserId: { type: String, required: true },
  price: { type: String, required: true },
  transferMethod: { type: String },
  transferDate: { type: Date, default: Date.now },
  metadata: { type: Schema.Types.Mixed }
})

export default models.Transfer || model("Transfer", TransferSchema)
