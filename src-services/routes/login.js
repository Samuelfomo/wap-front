const Login = require('../services/Login');
const express = require('express');

const router = express.Router();

const login = new Login();

router.post('/auth/', async (req, res) => {
 const pin = String(req.body.pin);
 const mobile = String(req.body.mobile);

 console.log('Request received :', {
  body: { pin, mobile },
  url: req.url,
  method: req.method
 });

 if (!pin || !mobile) {
  return res.status(400).json({ message: 'The field \'PIN\' and \'mobile\' are mandatory!' });
 }

 console.log(`\n🔐 connection in progress :`, pin, mobile);

 try {
  const response = await login.connect(pin, mobile);
  console.log('✅ Authentication successful');
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
