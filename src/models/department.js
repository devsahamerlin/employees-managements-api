import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    id: String,
    name: String,
    employees: [{ type: Schema.Types.ObjectId, ref: 'employee' }],
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

departmentSchema.plugin(paginate);
let Department = mongoose.model('department', departmentSchema);

export default Department;