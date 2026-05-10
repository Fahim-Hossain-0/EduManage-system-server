const {get} = require('../app')
const { getDB } = require('../config/db');

const collection = ()=> getDB().collection('classes');