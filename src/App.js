import { useState, useRef } from 'react';
import { useLocalStorage } from './hooks/use-localStorage.hook.js';
import './App.css';

function App() {
	const [userName, setUserName] = useState('');
	const [userLastname, setUserLastname] = useState('');
	const [userAge, setUserAge] = useState('');

	const input1Ref = useRef(null);
	const input2Ref = useRef(null);
	const input3Ref = useRef(null);

	// function handleClick() {
    //     inputRef.current.focus();
    // }

	const formRep = (event) => {
		event.preventDefault();

		addData({
			name: userName,
			lastname: userLastname,
			age: userAge
		});

		setUserName('');
		setUserLastname('');
		setUserAge('');
	};

	const [elements, setElements] = useLocalStorage('data');

	const addData = (newData) => {
		setElements([...elements, newData]);
	};

	return (
		<div className="App">
			<div></div>
			<div className="Main">
				<form onSubmit={formRep} className="Form">
					<input
						onChange={(event) => {
							return setUserName(event.target.value);
						}}
						value={userName}
						name="name"
						placeholder="Имя"
						ref={input1Ref}
					/>
					<input
						onChange={(event) => {
							return setUserLastname(event.target.value);
						}}
						value={userLastname}
						name="lastname"
						placeholder="Фамилия"
						ref={input2Ref}
					/>
					<input
						onChange={(event) => {
							return setUserAge(event.target.value);
						}}
						value={userAge}
						name="age"
						placeholder="Возраст"
						ref={input3Ref}
					/>
					<button type="submit">Подобрать котика</button>
				</form>
			</div>
			<div></div>
		</div>
	);
}

export default App;
