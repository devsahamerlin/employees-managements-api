import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    id: String,
    name: String,
    surname: String,
    birthDate: String,
    departments: [{ type: Schema.Types.ObjectId, ref: 'department' }],
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

employeeSchema.plugin(paginate);
let Employee = mongoose.model('employee', employeeSchema);

export default Employee;