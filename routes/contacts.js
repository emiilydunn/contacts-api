import express from 'express';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';


const router = express.Router();

//Prisma setup
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});


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


//Get all contacts with Prisma 
router.get('/get/all', async (req, res) => {
  const contact = await prisma.contact.findMany()

  res.json(contact);
});


//Get a contact by ID with Prisma
router.get('/get/:id', async (req, res) => {
  const id = req.params.id;

  //Validate if id is a number
  if (isNaN(id)) {
    res.status(400).json({ message: 'Invalid ID. Please try again.' });
    return;
  }

  const contact = await prisma.contact.findUnique({
    where: {
      id: parseInt(id),
    },
  })

  //If statement to output valid/invalid ID
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Contact not found. Please try again." })
  }

});



//Add post, put, and delete routers

//Create new contact (with Multer)
// .../api/contacts/create
router.post('/create', upload.single('image'), async (req, res) => {
  const filename = req.file ? req.file.filename : null;
  const { firstName, lastName, title, email, phone } = req.body;

  if(!firstName || !lastName || !email || !phone) {
    return res.status(400).json({ message: 'Required fields must have a value.'});
  }
  //Error handling - fix this later
  //To-do: Delete uploaded file
  /*if (!firstName) {
    return res.status(400).json({ message: "Please include first name." });
  }
  if (!lastName) {
    return res.status(400).json({ message: "Please include last name." });
  }
  if (!email) {
    return res.status(400).json({ message: "Please include email." });
  }
  if (!phone) {
    return res.status(400).json({ message: "Please include phone." });
  }*/

  //Prisma Create
  const contact = await prisma.contact.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      title: title,
      filename: filename,
    },
  });

  res.json(contact);
});

//Look up Prisma update and delete in documentation

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
