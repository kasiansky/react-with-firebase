import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  MenuItem,
  TextField,
  Select,
  InputLabel,
  FormControl,
} from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import { priorities, prioritiesMapping } from '../utils/priorities';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Context } from '../index';
import { useAuthState } from 'react-firebase-hooks/auth';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      marginTop: '100px',
    },
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const AddToDo = props => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [date, setDate] = useState(new Date());
  const [priority, setPriority] = useState(priorities[0]);
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  console.log('USER: ', user, useAuthState(auth));

  const addTodo = async () => {
    firestore
      .collection('todos')
      .add({
        uid: user.uid,
        text,
        date,
        priority: prioritiesMapping[priority],
        isDone: false,
      })
      .then(() => {
        props.onSave();
      });
    setText('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    addTodo();
  };
  const handleTextChange = e => {
    setText(e.target.value);
  };
  const handleChangePriority = e => {
    setPriority(e.target.value);
  };
  const handleDateChange = date => {
    setDate(date);
  };

  return (
    user && (
      <div class='app-add-todo'>
        <h3>Add ToDo Item:</h3>
        <form
          className='app-add-todo-form'
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          <TextField
            id='outlined-basic'
            multiline
            rowsMax={4}
            label='Add Todo'
            onChange={handleTextChange}
            name='todo'
            value={text}
            autoFocus
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant='inline'
              format='MM/dd/yyyy'
              id='date-picker-inline'
              label='Deadline'
              value={date}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <FormControl className={classes.formControl}>
            <InputLabel shrink id='demo-simple-select-placeholder-label-label'>
              Priority
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              className='app-add-todo-form__priority'
              value={priority}
              onChange={handleChangePriority}
            >
              {priorities.map(prior => (
                <MenuItem key={prior} value={prior}>
                  {prior}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type='submit'
            color='primary'
            variant='contained'
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
    )
  );
};

export default AddToDo;
