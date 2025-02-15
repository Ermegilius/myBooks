import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Button,
  CircularProgress,
  Stack,
  Rating,
  Chip,
  Typography,
  TextField,
  Autocomplete,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useAxios from '../services/useAxios';
import coverPlaceholder from '../assets/book-cover-placeholder.png';
import { Link } from 'react-router-dom';

//component renders a list of books with their details

//reranders a list of books with their details on change of books
function Books() {
  const {data:books=[], loading, get, remove}  = useAxios('http://localhost:3000');//use custom hook to get data from the server
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filterName, setName] = useState('');
  const [filterAuthor, setAuthor] = useState('');
  const [filterGenre, setGenre] = useState('');
 
  //get and render initial [books] list and rerander on every change of [books] (filter apply)
  useEffect(() => {
    if (books.length === 0) {
      getBooks();
    } else {
      setFilteredBooks(books);
    }
  }, [books]);

  const getBooks = async () => {
    await get('books');
  };

  const filterBooks = () => {
    let filtered = books;//get all books
    if (filterName) {
      filtered = filtered.filter(book=>
        book.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }
    if (filterAuthor) {
      filtered = filtered.filter(book=>
        book.author.toLowerCase().includes(filterAuthor.toLowerCase())
      );
    }
    if (filterGenre) {
      filtered = filtered.filter(book=>
        (book.genres || []).join(' ,').toLowerCase().includes(filterGenre.toLowerCase())
      );
    }
    setFilteredBooks(filtered);
  };

  //rerander [books] on every change of input
  useEffect(() => {
    filterBooks();
  }, [filterName, filterAuthor, filterGenre, books]);

  const genres = Array.isArray(books) ? [...new Set(books.flatMap((book) =>
    Array.isArray(book.genres) ? book.genres : []))] : []; // Ensure books is always an array

  const deleteBook = async (id) => {
    await remove(`books/${id}`);
    setName(''); 
    setAuthor('');
    setGenre(''); 
  };

  return (
    <Box sx={{ mx: 'auto', p: 2 }}>
      {loading && <CircularProgress />}
      {!loading && (
        <div>
          <Stack direction="row" spacing={8} sx={{ justifyContent: "center", alignItems: "center", width: '100%' , height: 80}}>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              options={books.map((option) => option.name)}
              onChange={(event, newValue) => setName(newValue)}
              renderInput={(params) => 
                <TextField 
                  {...params}
                  label="Book name"
                  value={filterName}
                  onChange={(e)=>setName(e.target.value)}
                />}
              sx={{ width: '25%' }}
            />
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              onChange={(event, newValue) => setAuthor(newValue)}
              options={books.map((option) => option.author)}
              sx={{ width: '25%' }}
              renderInput={(params) => 
                <TextField
                  {...params}
                  label="Author"
                  value={filterAuthor}
                  onChange={(e)=>setAuthor(e.target.value)}
                />}
            />
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              onChange={(event, newValue) => setGenre(newValue)}
              options={genres}
              sx={{ width: '25%' }}
              renderInput={(params) =>
                <TextField
                  {...params}
                  label="Genre"
                  value={filterGenre}
                  onChange={(e)=>setGenre(e.target.value)}
                />}
            />
          </Stack>

          <Stack
            sx={{ justifyContent: 'space-around' }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {filteredBooks.map((book) => (
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '15%',
                  minWidth: 200,
                  position: 'relative',
                }}
                key={book.id}
              >
                <Box
                sx={{
                    height: 250,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                }}
                >
                <IconButton
                  aria-label="delete"
                  onClick={() => deleteBook(book.id)}
                  sx={{ position: 'absolute', top: 0, right: 0, opacity: 0.5 }}
                  >
                  <DeleteIcon />
                </IconButton>
                  <CardMedia
                    component="img"
                    sx={{ width: '100%' }}
                    image={book.img ? book.img : coverPlaceholder}
                    title={book.name}
                  />
                </Box>
                <Box sx={{ pt: 2, pl: 2 }}>
                  {book.genres.map((genre, i) => (
                    <Chip
                      key={i}
                      label={genre}
                      variant="outlined"
                      size="small"
                      sx={{ mr: 1 }}
                    />
                  ))}
                  <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                    {book.name}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {book.author}
                  </Typography>
                </Box>
                <CardActions
                  sx={{
                    justifyContent: 'space-between',
                    mt: 'auto',
                    pl: 2,
                  }}
                >
                  <Rating
                    name="read-only"
                    value={book.stars}
                    readOnly
                    size="small"
                  />
                <Link to={`/book`} state={{ book }}>
                  <Button size="small">Learn More</Button>
                </Link>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </div>
      )}
    </Box>
  );
}

export default Books;
