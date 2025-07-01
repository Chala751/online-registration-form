import mongoose from 'mongoose'

const StudentSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  interest: String,
  certificateUrl: String, 
})

export default mongoose.models.Student || mongoose.model("Student", StudentSchema)
