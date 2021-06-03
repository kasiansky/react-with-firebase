import React, { useContext, useEffect, useState } from 'react';
import AddToDo from './AddToDo';
import { Context } from '../index';
import { UserContext } from '../App';
import ToDoCard from './ToDoCard';
import { prioritiesMappingReversed } from '../utils/priorities';

function Todos() {
  const { firestore } = useContext(Context);
  const [todos, setTodos] = useState();

  const user = useContext(UserContext);

  const getTodos = () => {
    firestore
      .collection('todos')
      .where('uid', '==', user.uid)
      .orderBy('priority', 'asc')
      .orderBy('date', 'asc')

      .get()
      .then(snapshot => {
        const todosData = snapshot.docs.map(doc => {
          const data = {
            docId: doc.id,
            ...doc.data(),
          };

          data.priority =
            data.priority && prioritiesMappingReversed[data.priority];
          return data;
        });
        setTodos(todosData);
      });
  };

  useEffect(() => {
    if (user) {
      getTodos();
    }
  }, [user]);

  return (
    <>
      <AddToDo onSave={getTodos} />
      {user &&
        todos &&
        todos.map((todo, i) => (
          <ToDoCard key={i} data={todo} onEdit={getTodos} />
        ))}
    </>
  );
}

export default Todos;
