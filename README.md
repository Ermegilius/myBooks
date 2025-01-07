# MyBooks Project

MyBooks is my learning project. It builds a web application designed to help users manage their personal book collection. Users can add new books, mark books as completed, and categorize books by genres.

## Features

- **Book List**: Displays a list of all books in the collection.
- **Book Details**: Shows detailed information about a book, including the author, genres, completion status, and rating.
- **Add New Book**: A form to add new books to the collection.
- **Delete Book**: Allows users to remove a book from the collection.
- **Filter**: Users can filter the book list.

## Installation

1. Clone the repository:

```shell
git clone https://github.com/yourusername/myBooks.git
```

2. Navigate to the project directory:

```shell
cd myBooks
```

3. Install the required dependencies:

```shell
npm install
```

4. Start the server:

```shell
npm run server
```

5. Run the App:

```shell
npm run fyl
```

## Usage

- To add a new book, click on the "Add Book" button and fill out the form.
- To delete a book, click on the book in the list and then click the "Delete" button or on "Delete" icon in the upper-right corner of the book.
- To filter books by name, author or genre, use the filters dropdown at the top of the book list.

## Data Structure

The book data is stored in a JSON file located at books.json. Each book entry includes the following fields:

- `id`: Unique identifier for the book.
- `author`: The author of the book.
- `name`: The title of the book.
- `genres`: An array of genres the book belongs to.
- `completed`: A boolean indicating whether the book has been completed.
- `start`: The start date of reading the book.
- `end`: The end date of reading the book.
- `stars`: The rating of the book.
- `img`: A URL to the book's cover image.

## Future Improvements

Add user authentication to allow multiple users to manage their own book collections.
Add edit functionality to allow users to update book details.
Add more detailed validation to the forms.
Improve the UI/UX with more styling and responsive design.
Add more features like sorting books by rating or completion status.

## Reflection

This project helped me understand React components, props, and hooks better. I got some understanding ot Material UI implementation. I gained experience with managing state and handling user input in forms. Additionally, I learned how to build "fake" JSON server.

## Contact

For any questions or feedback, please contact me at [ermegilius@gmail.com](mailto:ermegilius@gmail.com).
Thank you for using MyBooks! Happy reading! 📚
