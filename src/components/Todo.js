import React, {useState} from 'react';
import './Todo.css';

function Todo() {
    const [todo, setTodo] = useState(''); // yeni eklenecek to do
    const [todoList, setTodoList] = useState([]); //todolar bir listede tutulacak
    const [editingIndex, setEditingIndex] = useState(null); //edit yapilacak todonun indexi
    const [editingValue, setEditingValue] = useState('');//editlenmis degeri gosterir
    const [filter, setFilter] = useState('all'); // footer kismindaki stateler icin
    const [selectAll, setSelectAll] = useState(false); // tum todolari kontrol eden checkbox

    //to do yazildiktan sonra enter tusuna basarak ekler
    const handleKeyPress = (event) => {
        if (todo !== "" && event.key === 'Enter') {
            addTodo();
        }
    };
//var olan to do listesine yeni todolar eklenir
    const addTodo = () => {
        setTodoList([...todoList, {text: todo, completed: false}]);
        setTodo('');
    };
//index numarasina gore silme islemi
    const deleteTodo = (index) => {
        setTodoList(todoList.filter((_, i) => i !== index));
    };
//kullanici edit islemine basladiysa burasi calsiir
    const startEditing = (index) => {
        setEditingIndex(index);
        setEditingValue(filteredList()[index].text);
    };
//edit islemi bittiginde cagrilir
    const stopEditing = () => {
        setEditingIndex(null);
        setEditingValue('');
    };
//edit iselmi bittikten sonra liste guncellenir ve edit islemini bitiren fonksiyon cagrilir
    const updateTodo = (index) => {
        const updatedList = [...todoList];
        updatedList[index].text = editingValue;
        setTodoList(updatedList);
        stopEditing();
    };
//listedeki  todolari tamamlandi seklinde gosteremyi saglayan fonskiyon
    const toggleCompleted = (index) => {
        const updatedList = [...todoList];
        updatedList[index].completed = !updatedList[index].completed;
        setTodoList(updatedList);
    };
//tamamlanmis todolari silmek icin olusturlan fonksiyon
    const clearCompleted = () => {
        setTodoList(todoList.filter((item) => !item.completed));
    };
//listedeki aktif todolari filtreleyerek gosterir
    const activeTodoCount = () => {
        return todoList.filter((item) => item.completed).length
    };
//todonun durumuna gore liste doner
    const filteredList = () => {
        switch (filter) {
            case 'active':
                return todoList.filter((item) => !item.completed);
            case 'completed':
                return todoList.filter((item) => item.completed);
            default:
                return todoList;
        }
    };

    //listedki tum todolari secem islemini yapan fonskiyon

    const handleSelectAll = () => {
        if(todoList.length) {
            const updatedList = todoList.map((item) => ({
                ...item,
                completed: !selectAll,
            }));
            setTodoList(updatedList);
            setSelectAll(!selectAll);
        }
    };

    return (
        <div>
            <section className="todoapp">
                <header className="header">
                    <h1>TODOS</h1>

                    <input
                        className="new-todo"
                        property="newTodo"
                        placeholder="What needs to be done?"
                        autoFocus
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <label id="checkLabel"
                        for="toggleAll">

                    </label>
                    <input id="toggleAll"
                           style={{display: "flex"}}
                           type="checkbox"
                           checked={selectAll}
                           onChange={handleSelectAll}
                    />
                </header>

                <ul className="todo-list">
                    {filteredList().map((item, index) => (
                        <li className="listItem" key={index}>
                            {editingIndex === index ? (
                                <>

                                <input

                                    type="text"
                                    value={editingValue}
                                    onChange={(e) => setEditingValue(e.target.value)}
                                    onBlur={stopEditing}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            updateTodo(index);
                                        }
                                    }}
                                    autoFocus
                                /></>
                            ) : (
                                <>
                                    <input
                                        id="myCheck"
                                        checked={item.completed}
                                        onChange={() => toggleCompleted(index)}
                                        type="checkbox"
                                        style={{marginRight: '10px'}}
                                    />
                                    <span
                                        style={{textDecoration: item.completed ? 'line-through' : 'none'}}
                                        onClick={() => startEditing(index)}
                                    >
                  {item.text}
                </span>
                                    <button
                                        className="destroy"
                                        mv-action="delete(todo)"
                                        onClick={() => deleteTodo(index)}
                                    ></button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
                <footer className="footer">
        <span className="todo-count">
          <strong>{activeTodoCount()} items left</strong>
        </span>
                    <ul className="filters">
                        <li className="btn">
                            <button onClick={() => setFilter('all')}>All</button>
                            <button onClick={() => setFilter('active')}>Active</button>
                            <button onClick={() => setFilter('completed')}>Completed</button>
                        </li>
                    </ul>
                    <button className="clear-completed" onClick={clearCompleted}>
                        Clear completed
                    </button>
                </footer>
            </section>
        </div>
    );

};

export default Todo;
