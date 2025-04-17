const {Schema, model} = require('../connection');

// Define the schema for a Task
const taskSchema = new Schema({
  title: {
    type: String,
    required: true, // Task must have a title
    trim: true, // Removes leading/trailing spaces
  },
  description: {
    type: String,
    required: true, // Task must have a description
    trim: true, // Removes leading/trailing spaces
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'], // Enum for task status
    default: 'Pending', // Default status is Pending
  },
  deadline: {
    type: Date,
    required: true, // Deadline must be provided
  },
  // assignedTo: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User', // Reference to the User model (intern or mentor)
  //   required: true, // Task must be assigned to a user
  // },
  // associatedInternship: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Internship', // Reference to the Internship model
  //   required: true, // Task must be associated with an internship
  // },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'], // Priority levels
    default: 'Medium', // Default priority is Medium
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'project', // Reference to the Project model
    required: true, // Task must be associated with a project
  }
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Create a Mongoose model for the Task
module.exports = model('Task', taskSchema);