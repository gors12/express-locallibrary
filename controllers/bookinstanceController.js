const BookInstance = require("../models/bookinstance");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Book = require("../models/book");

// Display list of all BookInstances.
exports.bookinstance_list = async function (req, res, next) {
    try {
        const allBookInstances = await BookInstance.find()
            .populate("book")
            .exec();

        res.render("bookinstance_list", {
            title: "Список екземплярів книг",
            bookinstance_list: allBookInstances,
        });
    } catch (err) {
        return next(err);
    }
};

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`);
});

// Display BookInstance create form on GET.
exports.bookinstance_create_get = async (req, res, next) => {
    try {
        const allBooks = await Book.find({}, "title").sort({ title: 1 }).exec();
        res.render("bookinstance_form", {
            title: "Створити екземпляр книги",
            book_list: allBooks,
        });
    } catch (err) {
        return next(err);
    }
};

// Handle BookInstance create on POST.
exports.bookinstance_create_post = [
    // Валідація і санітизація
    body("book", "Book must be specified.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("imprint", "Imprint must be specified.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("status").escape(),
    body("due_back", "Invalid date")
        .optional({ values: "falsy" })
        .isISO8601()
        .toDate(),

    async (req, res, next) => {
        const errors = validationResult(req);

        const bookinstance = new BookInstance({
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back,
        });

        if (!errors.isEmpty()) {
            try {
                const allBooks = await Book.find({}, "title").exec();
                res.render("bookinstance_form", {
                    title: "Створити екземпляр книги",
                    book_list: allBooks,
                    selected_book: bookinstance.book._id,
                    errors: errors.array(),
                    bookinstance,
                });
            } catch (err) {
                return next(err);
            }
            return;
        }

        try {
            await bookinstance.save();
            res.redirect(bookinstance.url);
        } catch (err) {
            return next(err);
        }
    },
];

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: BookInstance delete GET");
});

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: BookInstance delete POST");
});

// Display BookInstance update form on GET.
exports.bookinstance_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: BookInstance update GET");
});

// Handle bookinstance update on POST.
exports.bookinstance_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: BookInstance update POST");
});