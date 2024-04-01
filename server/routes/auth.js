const express = require('express');
const pool = require('../config/dbConn');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const router = express.Router();

