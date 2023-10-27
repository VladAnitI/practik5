import { useState, useRef } from 'react';
import { useLocalStorage } from './hooks/use-localStorage.hook.js';
import './App.css';

function App() {
	const [userName, setUserName] = useState('');
	const [userLastname, setUserLastname] = useState('');
	const [userAge, setUserAge] = useState('');

	const [className, setClassName] = useState('');
	const [classLastname, setClassLastname] = useState('');
	const [classAge, setClassAge] = useState('');

	const input1Ref = useRef(null);
	const input2Ref = useRef(null);
	const input3Ref = useRef(null);

	const currentFocus = (inputRef, inInput) => {
		if (inInput === false) {
			inputRef.current.focus();
		}
	};

	const newClass = (setClassElement, isValid) => {
		isValid === false ? setClassElement('notValid') : setClassElement('');
	};

	const validateForm = (inInput) => {
		let result = true;
		if (isNaN(userAge) === true || userAge === '' || userAge.length > 2) {
			currentFocus(input3Ref, inInput);
			newClass(setClassAge, false);
			result = false;
		} else {
			newClass(setClassAge, true);
		}
		if (userLastname.length <= 2 || userLastname.length > 15) {
			currentFocus(input2Ref, inInput);
			newClass(setClassLastname, false);
			result = false;
		} else {
			newClass(setClassLastname, true);
		}
		if (userName.length <= 2 || userName.length > 15) {
			currentFocus(input1Ref, inInput);
			newClass(setClassName, false);
			result = false;
		} else {
			newClass(setClassName, true);
		}

		return result;
	};

	const formRep = (event) => {
		event.preventDefault();
		if (validateForm(false) === true) {
			addData({
				name: userName,
				lastname: userLastname,
				age: userAge
			});

			setUserName('');
			setUserLastname('');
			setUserAge('');
		}
	};

	const [elements, setElements] = useLocalStorage('data');

	const addData = (newData) => {
		console.log(elements);
		setElements([newData]);
	};

	return (
		<div className="App">
			<div></div>
			<div className="Main">
				<form onSubmit={formRep} className="Form">
					<input
						onChange={(event) => {
							validateForm(true);
							return setUserName(event.target.value);
						}}
						value={userName}
						name="name"
						placeholder="Имя"
						ref={input1Ref}
						autoComplete="off"
						className={className}
					/>
					<input
						onChange={(event) => {
							validateForm(true);
							return setUserLastname(event.target.value);
						}}
						value={userLastname}
						name="lastname"
						placeholder="Фамилия"
						ref={input2Ref}
						autoComplete="off"
						className={classLastname}
					/>
					<input
						onChange={(event) => {
							validateForm(true);
							return setUserAge(event.target.value);
						}}
						value={userAge}
						name="age"
						placeholder="Возраст"
						ref={input3Ref}
						autoComplete="off"
						className={classAge}
					/>
					<button type="submit">Подобрать котика</button>
				</form>
			</div>
			<div></div>
		</div>
	);
}

export default App;
