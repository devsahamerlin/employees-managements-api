import express from 'express';
import cors from 'cors';
import dotEnv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();
dotEnv.config();

const swaggerDocument = YAML.load('./swagger.yaml');

import employeesRoutes from "./routes/employees.js";
import departmentsRoutes from "./routes/departments.js";

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use("/api/v1/departments", departmentsRoutes);
app.use("/api/v1/employees", employeesRoutes);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT|| 5002;

app.get('/api/v1/', function(req, res){
    res.status(200).send({message: "Server is up!"});
 });

app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}/api/v1`));

export default app;
