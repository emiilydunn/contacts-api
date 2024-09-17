import express from 'express';
import multer from 'multer';

const router = express.Router();

//Multer setup
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
    cb(null, 'public/images/'); // save uploaded files in `public/images` folder
   },
   filename: function (req, file, cb) {
    //Get file extension
    const ext = file.originalname.split('.').pop(); 
    //Generate unique filename - current timestamp + random number between 0 and 1000.
    const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1000) + '.' + ext; 
    cb(null, uniqueFilename);
   }
  });
const upload = multer({ storage: storage });
  
  

router.get('/', (req, res) => {
  res.send('Updated Contacts route - testing nodemon');
});

//Get all contacts
router.get('/all', (req, res) => {
  res.send('All contacts');
});

//Get a contact by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send('Contact by id ' + id);
});

//Add post, put, and delete routers

//Create new contact (with Multer)
// .../api/contacts/create
router.post('/create', upload.single('image'), (req, res) => {
  const filename = req.file ? req.file.filename : '';
  const { first_name, last_name, email, phone } = req.body;

  //const firstName = req.body.first_name;
  //const lastName = req.body.last_name;

  console.log('Uploaded file: ' + filename);
  console.log(`My contact's name: ${first_name} ${last_name}`);
  console.log(`My contact's phone number: ${phone}. Email address: ${email}.`)

  res.send('Create a new Contact');
});

//Update contact by ID (with Multer)
// .../api/contacts/update
router.put('/update/:id', upload.single('image'), (req, res) => {
  const id = req.params.id;
  res.send('Update Contact')
});

//Delete contact by ID
// .../api/contacts/delete
router.delete('/delete/:id', (req, res) => {
  res.send('Delete Contact')

});




export default router;
