const Login = require('../services/Login');
const express = require('express');

const router = express.Router();

const login = new Login();

router.post('/auth/', async (req, res) => {
 // Convertir explicitement en string
 const pin = String(req.body.pin);
 const mobile = String(req.body.mobile);

 console.log('Request received :', {
  body: req.body,
  url: req.url,
  method: req.method
 });

 if (!pin || !mobile) {
  return res.status(400).json({ message: 'The field \'PIN\' and \'mobile\' are mandatory!' });
 }

 console.log(`\n🔐 connection in progress :`, pin, mobile);
 try {
  const response = await login.connect(pin, mobile);
  if (!response) {
   return res.status(404).json({ error: 'User not found' });
  }

  console.log('♥️ User search Result');
  return res.json(response);
 } catch (error) {
  console.error('\n🔴 User search error:', error);

  if (error) {
   return res.status(400).json({
    status: 'error',
    message: 'error during search',
   });
  }

  return res.status(500).json({
   status: 'error',
   message: 'A server error has occurred',
  });
 }
});

module.exports = router;


// const Login = require('../services/Login');
// const express = require('express');
//
// const router = express.Router();
//
// const login = new Login();
//
//
//
//  router.post('/auth/', async (req, res) => {
//  // const data = req.body.pin;
//
//   const { pin, mobile } = req.body;
//
//  console.log('Request received :', {
//  body: req.body,
//  url: req.url,
//  method: req.method
//  });
//
//  if (!pin || !mobile){
//  return res.status(400).json({ message: 'The field \'PIN\' and \\ is mandatory!' });
//  }
//
//  console.log(`\n🔐 connection in progress :`,pin, mobile);
//  try {
//  const response = await login.connect(pin, mobile);
//  if (!response) {
//  return res.status(404).json({ error: 'User not found' });
//  }
//
//  console.log('♥️ User search Result');
//  return res.json(response);
//  } catch (error) {
//  console.error('\n🔴 User search error:', error);
//
//  if (error) {
//  return res.status(400).json({
//  status: 'error',
//  message: 'error during search',
//  });
//  }
//
//  return res.status(500).json({
//  status: 'error',
//  message: 'A server error has occurred',
//  });
//  }
//  });
//
// // router.post('/check/:mobile', async (req, res) => {
// // const data = req.body.mobile;
// //
// // console.log('Request received :', {
// // body: req.body,
// // url: req.url,
// // method: req.method
// // });
// //
// // if (!data){
// // return res.status(400).json({ message: 'The field \'Mobile\' is mandatory!' });
// // }
// //
// // console.log(`\n🔍 Recherche de l'utilisateur :`,data);
// // try {
// // const response = await login.search(data);
// // if (!response) {
// // return res.status(404).json({ error: 'User not found' });
// // }
// //
// // console.log('♥️ User search Result');
// // return res.json(response);
// // } catch (error) {
// // console.error('\n🔴 User search error:', error);
// //
// // if (error) {
// // return res.status(400).json({
// // status: 'error',
// // message: 'error during search',
// // });
// // }
// //
// // return res.status(500).json({
// // status: 'error',
// // message: 'A server error has occurred',
// // });
// // }
// // });
//
//  module.exports = router;