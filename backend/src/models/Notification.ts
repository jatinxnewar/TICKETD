import mongoose, { Schema, models, model } from "mongoose"

const NotificationSchema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  metadata: { type: Schema.Types.Mixed },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})

export default models.Notification || model("Notification", NotificationSchema)
