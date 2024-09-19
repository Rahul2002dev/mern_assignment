const {v4 : uuidv4} = require('uuid')
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;


app.use(cors({
    origin: 'http://localhost:5173', // Allow only this origin
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());




const upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'upload/');
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
      }
    }),
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb('Error: Images only!');
      }
    }
  });

  app.post('/submit',upload.single('img'),(req,res) => {
        const {name,email,mobileNo,designation,gender,Course} = req.body;

        if(!name || !email || !mobileNo || !designation || !gender || !Course){
            return res.status(400).json(
                "all field are required"
            )
        }
        if(req.file){
            console.log("upload file",req.file);
        }

        

        const id = uuidv4();

        const filePath = 'employees.json';
        const existingData = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf-8')) : [];
        existingData.push({ name, email, mobileNo, designation, gender ,Course,id});
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf-8');
        console.log("Data written to file:", existingData);

        res.cookie('formData', JSON.stringify({ name, email, mobileNo, designation, gender,Course,id}), { maxAge: 900000, httpOnly: true });

        res.json({ message: 'Form data submitted successfully' });

    
  })

  app.put('/employees/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, mobileNo, designation, gender, Course } = req.body;

    const filePath = 'employees.json';
    if (fs.existsSync(filePath)) {
        let existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const index = existingData.findIndex(emp => emp.id === id);

        if (index !== -1) {
            existingData[index] = { id, name, email, mobileNo, designation, gender, Course };
            fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf-8');
            return res.json({ message: 'Employee updated successfully' });
        } else {
            return res.status(404).json({ error: 'Employee not found' });
        }
    } else {
        return res.status(404).json({ error: 'File not found' });
    }
});

  app.delete('/employees/:id', (req, res) => {
    const { id } = req.params;

    const filePath = 'employees.json';
    if (fs.existsSync(filePath)) {
        let existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        existingData = existingData.filter(employee => employee.id !== id);

        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf-8');
        res.json({ message: 'Employee deleted successfully' });
    } else {
        res.status(404).json({ error: 'File not found' });
    }
});

  app.get('/employees', (req, res) => {
    try {
      const filePath = 'employees.json';
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        console.log('File content:', data); 
        const parsedData = JSON.parse(data);
        res.json(parsedData);
      } else {
        res.json([]);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`)
})