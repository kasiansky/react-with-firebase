import React, { useContext, useState } from 'react';
import { Context } from '../index';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Card,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { priorities } from '../utils/priorities';
import moment from 'moment';
import { prioritiesMapping } from '../utils/priorities';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const ToDoCard = props => {
  const todo = props.data;
  const { firestore } = useContext(Context);
  const [isInEditMode, setisInEditMode] = useState(false);
  const [currentToDo, setcurrentToDo] = useState({
    text: todo.text,
    priority: todo.priority,
  });
  const [text, setText] = useState(todo.text);
  const [date, setDate] = useState(todo.date ? todo.date.toDate() : new Date());
  const [priority, setPriority] = useState(todo.priority);
  const classes = useStyles();

  const handleSetDone = () => {
    firestore
      .collection('todos')
      .doc(todo.docId)
      .update({ isDone: true })
      .then(() => props.onEdit());
  };

  const handleRemoveTodo = () => {
    firestore
      .collection('todos')
      .doc(todo.docId)
      .delete()
      .then(() => {
        props.onEdit();
      });
  };

  const handleUpdateTodo = () => {
    const convertedPriority = priority ? prioritiesMapping[priority] : null;

    firestore
      .collection('todos')
      .doc(todo.docId)
      .update({
        text,
        date,
        priority: convertedPriority,
      })
      .then(() => props.onEdit());
  };

  const changeEditMode = () => {
    setisInEditMode(!isInEditMode);
  };
  const onEditTodo = () => {
    handleUpdateTodo();
    setisInEditMode(false);
  };
  const handleChangeText = e => {
    setText(e.target.value);
  };
  const handleDateChange = date => {
    setDate(date);
  };
  const handleChangePriority = e => {
    setPriority(e.target.value);
  };

  if (!todo) return null;

  const todoDate = todo.date && moment(todo.date.toDate()).format('MM/DD/YYYY');

  return isInEditMode ? (
    <Card className={`${classes.root} app-todo-card`}>
      <CardContent>
        <TextField
          onChange={handleChangeText}
          defaultValue={todo.text}
          id='text'
          label='Edit Text'
          name='text'
          autoFocus
          style={{ marginRight: '10px' }}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant='inline'
            format='MM/dd/yyyy'
            id='date-picker-inline'
            label='Date picker inline'
            value={date}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            style={{ marginRight: '10px' }}
          />
        </MuiPickersUtilsProvider>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id='demo-simple-select-placeholder-label-label'>
            Priority
          </InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            defaultValue={todo.priority}
            onChange={handleChangePriority}
          >
            {priorities.map(prior => (
              <MenuItem key={prior} value={prior}>
                {prior}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>
      <CardActions>
        <Button
          disabled={
            currentToDo.text === todo.text &&
            currentToDo.date === todo.date &&
            currentToDo.priority === todo.priority
          }
          color='primary'
          variant='contained'
          onClick={onEditTodo}
        >
          Save
        </Button>
        <Button color='secondary' variant='contained' onClick={changeEditMode}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  ) : (
    <Card className={`${classes.root} app-todo-card`}>
      <CardContent>
        <Typography variant='h5' component='h2'>
          {todo.text}
        </Typography>

        <Typography className={classes.pos} color='textSecondary'></Typography>
        <Typography variant='body2' component='p'>
          {todoDate && `Due Date: ${todoDate}`}
          <br />
          {todo.priority && `Priority: ${todo.priority}`}
        </Typography>
      </CardContent>
      <CardActions>
        <div className='app-todo-card__action-wrapper'>
          <div>
            {todo.isDone ? (
              <Button variant='contained' disabled>
                IS DONE
              </Button>
            ) : (
              <Button
                color='primary'
                variant='contained'
                onClick={handleSetDone}
              >
                DONE
              </Button>
            )}
          </div>
          <div>
            <Button
              color='primary'
              variant='contained'
              onClick={changeEditMode}
              style={{ marginRight: '10px' }}
            >
              EDIT
            </Button>
            <Button
              color='secondary'
              variant='contained'
              onClick={handleRemoveTodo}
            >
              REMOVE
            </Button>
          </div>
        </div>
      </CardActions>
    </Card>
  );
};

export default ToDoCard;
