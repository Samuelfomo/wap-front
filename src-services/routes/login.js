const Login = require('../services/Login');
const express = require('express');

const router = express.Router();

const login = new Login();

router.post('/auth/', async (req, res) => {
 const pin = String(req.body.pin);
 const account_number = String(req.body.account_number);

 console.log('Request received :', {
  body: { pin, account_number },
  url: req.url,
  method: req.method
 });

 if (!pin || !account_number) {
  return res.status(400).json({ message: 'The field \'PIN\' and \'account_number\' are mandatory!' });
 }

 console.log(`\n🔐 connection in progress :`, pin, account_number);

 try {
  const response = await login.connect(pin, account_number);
  console.log('✅ Authentication successful', response);
  return res.json(response);
 } catch (error) {
  // Log simplifié
  console.error('❌ Authentication error:', error.message);

  return res.status(401).json({
   status: 'error',
   message: error.message
  });
 }
});

// router.post('/update/', async (req, res) => {
//  const {guid, mobile, account_number, account_name, firstname, lastname } = req.body;
//
//  console.log('Request received:', {
//   body: { pin, account_number, mobile, guid },
//   url: req.url,
//   method: req.method
//  });
//
//  // Validate required fields
//  if (!pin || !account_number) {
//   return res.status(400).json({
//    status: 'error',
//    message: 'PIN and account number are mandatory!'
//   });
//  }
//
//  try {
//   const response = await login.update({
//    guid,
//    mobile,
//    account_number,
//    account_name,
//    firstname,
//    lastname
//   });
//
//   console.log('✅ update successful', response);
//   return res.json({
//    status: 'success',
//    response: response
//   });
//
//  } catch (error) {
//   console.error('❌ Update error:', error.message);
//   return res.status(401).json({
//    status: 'error',
//    message: error.message
//   });
//  }
// });

// router.post('/auth/', async (req, res) => {
//  // Convertir explicitement en string
//  const pin = String(req.body.pin);
//  const mobile = String(req.body.mobile);
//
//  console.log('Request received :', {
//   body: req.body,
//   url: req.url,
//   method: req.method
//  });
//
//  if (!pin || !mobile) {
//   return res.status(400).json({ message: 'The field \'PIN\' and \'mobile\' are mandatory!' });
//  }
//
//  console.log(`\n🔐 connection in progress :`, pin, mobile);
//  try {
//   const response = await login.connect(pin, mobile);
//   if (!response) {
//    return res.status(404).json({ error: 'User not found' });
//   }
//
//   console.log('♥️ User search Result');
//   return res.json(response);
//  } catch (error) {
//   console.error('\n🔴 User search error:', error);
//
//   if (error) {
//    return res.status(400).json({
//     status: 'error',
//     message: 'error during search',
//    });
//   }
//
//   return res.status(500).json({
//    status: 'error',
//    message: 'A server error has occurred',
//   });
//  }
// });

module.exports = router;
