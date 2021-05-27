const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const { config } = require("../config/config");

const createUser = async (req, res) => {}

const loginUser = async (req, res) => {}

exports.createUser = createUser;
exports.loginUser = loginUser;
