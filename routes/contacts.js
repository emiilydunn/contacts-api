import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Updated Contacts route - testing nodemon');
});

// Get all contacts
router.get('/all', (req, res) => {
  res.send('All contacts');
});

// Get a contact by id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send('Contact by id ' + id);
});

//Add post, put, and delete routers

// .../api/contacts/create
router.post('/create', (req, res) => {
  res.send('Create new Contact');
});

// .../api/contacts/update
router.put('/update', (req, res) => {
  res.send('Update Contact')
});

// .../api/contacts/delete
router.delete('/delete', (req, res) => {
  res.send('Delete Contact')

});


export default router;
