import { Schema, model } from 'mongoose';
n
const RegisterSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    studentID: {
        type: String,
        required: true,
        min: 8,
        max: 8
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    }
});

const RegisterModel = model("register", RegisterSchema);
export default RegisterModel;
