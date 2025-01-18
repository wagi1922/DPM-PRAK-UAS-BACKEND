const express = require('express');
const itemController = require('../controllers/itemController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @typedef {object} CreateItemRequest
 * @property {string} name.required - Nama item
 * @property {string} description - Deskripsi item
 */

/**
 * @typedef {object} ItemResponse
 * @property {string} _id - ID item
 * @property {string} name - Nama item
 * @property {string} description - Deskripsi item
 * @property {string} userId - ID pengguna yang membuat item
 * @property {string} createdAt - Tanggal item dibuat
 * @property {string} updatedAt - Tanggal item diperbarui
 */

/**
 * @typedef {object} UpdateItemRequest
 * @property {string} name - Nama item (opsional)
 * @property {string} description - Deskripsi item (opsional)
 */

/**
 * POST /api/items/create
 * @summary Create a new item
 * @tags Items
 * @security BearerAuth
 * @param {CreateItemRequest} request.body.required - Data item yang akan dibuat
 * @return {ItemResponse} 201 - Item berhasil dibuat
 * @return {object} 400 - Validation error
 * @return {object} 500 - Server error
 */
router.post('/create', authMiddleware, itemController.createItem);

/**
 * GET /api/items
 * @summary Get all items for the logged-in user
 * @tags Items
 * @security BearerAuth
 * @return {array<ItemResponse>} 200 - Daftar item
 * @return {object} 500 - Server error
 */
router.get('/', authMiddleware, itemController.getAllItems);

/**
 * GET /api/items/{id}
 * @summary Get an item by ID
 * @tags Items
 * @security BearerAuth
 * @param {string} id.path.required - ID item
 * @return {ItemResponse} 200 - Detail item
 * @return {object} 404 - Item tidak ditemukan
 * @return {object} 500 - Server error
 */
router.get('/:id', authMiddleware, itemController.getItemById);

/**
 * PUT /api/items/{id}
 * @summary Update an item by ID
 * @tags Items
 * @security BearerAuth
 * @param {string} id.path.required - ID item
 * @param {UpdateItemRequest} request.body.required - Data item yang akan diperbarui
 * @return {ItemResponse} 200 - Item berhasil diperbarui
 * @return {object} 400 - Validation error
 * @return {object} 404 - Item tidak ditemukan
 * @return {object} 500 - Server error
 */
router.put('/:id', authMiddleware, itemController.updateItem);

/**
 * DELETE /api/items/{id}
 * @summary Delete an item by ID
 * @tags Items
 * @security BearerAuth
 * @param {string} id.path.required - ID item
 * @return {object} 200 - Item berhasil dihapus
 * @return {object} 404 - Item tidak ditemukan
 * @return {object} 500 - Server error
 */
router.delete('/:id', authMiddleware, itemController.deleteItem);

module.exports = router;
