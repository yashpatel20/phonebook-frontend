import React, { useState, useEffect } from "react";
import Person from "./components/Person";
import phonebook from "./services/phonebook";
import Notification from "./components/Notification";

const App = () => {
  //states
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilterName, setNewFilterName] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [notifMessage, setNotifMessage] = useState([true, "Read successful"]);

  //fetch data
  useEffect(() => {
    phonebook.getAll().then(data => setPersons(data));
  }, []);
  //Create new Entry
  const addPerson = event => {
    event.preventDefault();
    const newEntry = {
      name: newName,
      number: newNumber
    };
    //check if name already exists, if number is different then update else do nothing
    const findPerson = persons.find(
      entry => entry.name === newEntry.name && entry.number !== newEntry.number
    );
    if (findPerson) {
      const changedPerson = { ...findPerson, number: newEntry.number };
      phonebook
        .update(findPerson.id, changedPerson)
        .then(returnedPerson => {
          setPersons(
            persons.map(person =>
              person.id !== findPerson.id ? person : returnedPerson
            )
          );
          setNotifMessage([true, "Update successful"]);
        })
        .catch();
      //then update
    } else {
      phonebook.create(newEntry).then(initialEntries => {
        setPersons(persons.concat(initialEntries));
        setNotifMessage([true, "Create successful"]);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  //Delete Entry
  const deletePerson = event => {
    const findPerson = persons.find(entry => entry.name === event.target.value);
    phonebook.deleteEntry(findPerson.id).then(empty => {
      setNotifMessage([true, "Delete successful"]);
      phonebook.getAll().then(data => setPersons(data));
    });
  };

  //handlers
  const handleNameChange = event => setNewName(event.target.value);
  const handleNumberChange = event => setNewNumber(event.target.value);
  const handleFilterNameChange = event => {
    setNewFilterName(event.target.value);
    setShowAll(false);
  };

  //use regex to filter
  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name === newFilterName);
  const rows = personsToShow.map(person => {
    return (
      <div>
        <Person
          key={person.name}
          name={person.name}
          number={person.number}
          handleDelete={deletePerson}
        />
      </div>
    );
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} />
      <div>
        Filter:{" "}
        <input value={newFilterName} onChange={handleFilterNameChange} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{rows}</div>
    </div>
  );
};

export default App;
