const express = require('express');
const router = express.Router();

// === Імпорт моделей ===
const Author = require("../models/author");
const Book = require("../models/book");

// === КРОК 1: Тестовий маршрут ===
router.get('/', function (req, res, next) {
    res.send('Queries');
});

// === КРОКИ 3–6: Пошук авторів за ім’ям і прізвищем ===
router.get('/author', async function (req, res, next) {
    const firstName = req.query["first_name"];
    const familyName = req.query["family_name"];

    let query = {};
    if (firstName) query.first_name = RegExp(firstName, "i");
    if (familyName) query.family_name = RegExp(familyName, "i");

    const authors = await Author.find(query);

    let result = "";
    if (authors.length > 0) {
        result = `<ul>${authors.map((author) => `<li>${author.name}</li>`).join("")}</ul>`;
    } else {
        result = "<h1>Not found</h1>";
    }

    res.send(result);
});

// === САМОСТІЙНА РОБОТА: Пошук книг з populate автора ===
router.get('/books', async function (req, res, next) {
    const titleQuery = req.query["title"];
    const query = titleQuery ? { title: RegExp(titleQuery, "i") } : {};

    const books = await Book.find(query).populate("author");

    let result = "";
    if (books.length > 0) {
        result = `<ul>${books.map((book) =>
            `<li>${book.title} by ${book.author.first_name} ${book.author.family_name}</li>`
        ).join("")}</ul>`;
    } else {
        result = "<h1>Not found</h1>";
    }

    res.send(result);
});

module.exports = router;