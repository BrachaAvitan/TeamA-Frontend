import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import { fetchBooks, addBook, deleteBook, updateBook } from '../Redux/BookSlice';

const MainPage = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const status = useSelector((state) => state.books.status);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [newBook, setNewBook] = useState({
    BookName: '',
    AuthorName: '',
    Price: '',
    TargetAudience: '',
    YearOfIssue: ''
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [dispatch, status]);

  const handleDelete = (bookId) => {
    dispatch(deleteBook(bookId));
  };

  const handleUpdate = (book) => {
    setSelectedBook(book);
    setOpenUpdateDialog(true);
  };

  const handleAddBook = () => {
    dispatch(addBook(newBook));
    handleCloseAddDialog();
  };

  const handleUpdateBook = () => {
    dispatch(updateBook({ ...selectedBook, ...newBook }));
    handleCloseUpdateDialog();
  };

  const handleClickOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewBook({
      BookName: '',
      AuthorName: '',
      Price: '',
      TargetAudience: '',
      YearOfIssue: ''
    });
  };

  const handleClickOpenUpdateDialog = () => {
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
    setNewBook({
      BookName: '',
      AuthorName: '',
      Price: '',
      TargetAudience: '',
      YearOfIssue: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  return (
    <div>
      <TableContainer component={Paper} sx={{ maxWidth: 800, margin: 'auto', marginTop: 4 }}>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'center', margin: 2 }}>
          Book List
        </Typography>
        <Table sx={{ border: '1px solid black' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ border: '1px solid black' }}>Book Name</TableCell>
              <TableCell sx={{ border: '1px solid black' }}>Author Name</TableCell>
              <TableCell sx={{ border: '1px solid black' }}>Price</TableCell>
              <TableCell sx={{ border: '1px solid black' }}>Target Audience</TableCell>
              <TableCell sx={{ border: '1px solid black' }}>Year of Issue</TableCell>
              <TableCell sx={{ border: '1px solid black' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell sx={{ border: '1px solid black' }}>{book.BookName}</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>{book.AuthorName}</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>{book.Price}</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>{book.TargetAudience}</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>{book.YearOfIssue}</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>
                  <Button onClick={() => handleUpdate(book)} variant="contained" color="primary" sx={{ marginRight: 1 }}>
                    Update
                  </Button>
                  <Button onClick={() => handleDelete(book.id)} variant="contained" color="secondary">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <Button onClick={handleClickOpenAddDialog} variant="contained" color="primary">
          Add New Book
        </Button>
      </div>

      {/* Add Book Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Book</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Book Name"
            type="text"
            fullWidth
            name="BookName"
            value={newBook.BookName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Author Name"
            type="text"
            fullWidth
            name="AuthorName"
            value={newBook.AuthorName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            name="Price"
            value={newBook.Price}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Target Audience"
            type="text"
            fullWidth
            name="TargetAudience"
            value={newBook.TargetAudience}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Year of Issue"
            type="number"
            fullWidth
            name="YearOfIssue"
            value={newBook.YearOfIssue}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddBook} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Book Dialog */}
      <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
        <DialogTitle>Update Book</DialogTitle>
        <DialogContent>
          {selectedBook && (
            <>
              <TextField
                margin="dense"
                label="Book Name"
                type="text"
                fullWidth
                name="BookName"
                value={newBook.BookName}
                onChange={handleUpdateChange}
              />
              <TextField
                margin="dense"
                label="Author Name"
                type="text"
                fullWidth
                name="AuthorName"
                value={newBook.AuthorName}
                onChange={handleUpdateChange}
              />
              <TextField
                margin="dense"
                label="Price"
                type="number"
                fullWidth
                name="Price"
                value={newBook.Price}
                onChange={handleUpdateChange}
              />
              <TextField
                margin="dense"
                label="Target Audience"
                type="text"
                fullWidth
                name="TargetAudience"
                value={newBook.TargetAudience}
                onChange={handleUpdateChange}
              />
              <TextField
                margin="dense"
                label="Year of Issue"
                type="number"
                fullWidth
                name="YearOfIssue"
                value={newBook.YearOfIssue}
                onChange={handleUpdateChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateBook} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MainPage;
