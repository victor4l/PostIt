import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import '../auth/passport';
import tokenValidator from '../auth/tokenValidator';
import userController from '../controllers/user';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
// Load passport configuration

const router = express.Router();
router.use(passport.initialize());
router.use(passport.session());

// Authentication Routes
router.post('/signin', (req, res, next) => {
  passport.authenticate('local.signin', (err, user, info) => {
    if (!user) {
      return res.status(401).send({ success: false, message: info.message });
    }
    // Successful signin
    // if user is found and password is right
    // create a token
    if (user) {
      const newUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      };
      const token = jwt.sign(newUser, jwtSecret, {
        expiresIn: '2 days' // expires in 48 hours
      });
      return res.status(202).send({ success: true, user: newUser, token, message: 'Successful Signin' });
    }
  })(req, res, next);
}, (err, req, res, next) =>
    // Handle server errors
    res.status(500).send({ success: false, message: 'Internal Server Error' })
);

router.post('/signup', (req, res, next) => {
  passport.authenticate('local.signup', (err, user, info) => {
    if (err) {
      const errorMessages = err.errors.map(error => error.message);
      return res.status(500).send({ success: false,
        message: 'Incomplete Fields',
        messages: errorMessages
      });
    }
    if (!user) {
      return res.status(401).send({ success: false, message: info.message });
    }
    if (user) {
      const newUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      };
      const token = jwt.sign(newUser, jwtSecret, {
        expiresIn: '2 days' // expires in 48 hours
      });
      return res.status(202).send({ success: true, user: newUser, token, message: 'Successful Sign up' });
    }
  })(req, res, next);
}, (err, req, res, next) =>
    // Handle server errors
    res.status(500).send({ success: false, message: 'Internal Server Error' })
);

// Validate token before accessing this route
router.use(tokenValidator.validateToken);

// Loading all groups a user belongs to (paginated)
router.get('/:userId/groups/:offset/:limit', userController.messageboard);

// Loading all groups a user belongs to (at once)
router.get('/:userId/groups', userController.messageboard);


export default router;
