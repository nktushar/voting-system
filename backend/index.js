import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import RegisterModel, { create } from './models/Register';

const app = express();

app.use(json());
app.use(cors());

connect("mongodb://localhost:27017/votingSystem");

app.post("/register", (req, res) => {
    create(req.body).then((data) => { 
        res.json(data);
    }
    ).catch((error) => {
        res.json({error: true, message: error});
    }
    );
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
}
);
