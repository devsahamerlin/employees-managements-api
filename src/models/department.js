import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const departmentSchema = mongoose.Schema({
    id: String,
    name: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

departmentSchema.plugin(paginate);
let Department = mongoose.model('department', departmentSchema);

export default Department;