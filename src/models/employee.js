import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const employeeSchema = mongoose.Schema({
    id: String,
    name: String,
    surname: String,
    departmentId: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

employeeSchema.plugin(paginate);
let Employee = mongoose.model('employee', employeeSchema);

export default Employee;