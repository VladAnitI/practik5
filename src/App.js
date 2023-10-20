import { useState } from 'react';
import { useLocalStorage } from './hooks/use-localStorage.hook.js';
import './App.css';

function App() {
	const [userName, setUserName] = useState('');
	const [userLastname, setUserLastname] = useState('');
	const [userAge, setUserAge] = useState('');

	const [userNameClass, setUserNameClass] = useState('');
	const [userLastnameClass, setUserLastnameClass] = useState('');
	const [userAgeClass, setUserAgeClass] = useState('');

	const [valid, setValid] = useState({
		name: true,
		lastname: true,
		age: true
	});

	const validAccet = () => {
		let newValid = {
			name: false,
			lastname: false,
			age: false
		};

		if (userName.length >= 2 && userName.length <= 10) {
			newValid.name = true;
		}
		if (userLastname.length >= 2 && userLastname.length <= 10) {
			newValid.lastname = true;
		}
		if (userAge.length >= 1 && userAge.length <= 3) {
			newValid.age = true;
		}

		setValid(newValid);
	};

	const isValib = () => {
		if (valid.name === true && valid.lastname === true && valid.age === true) {
			setUserNameClass('valid');
			setUserLastnameClass('valid');
			setUserAgeClass('valid');
		} else {
			if (valid.name === false) {
				setUserNameClass('notValid');
			}
			if (valid.lastname === false) {
				setUserLastnameClass('notValid');
			}
			if (valid.age === false) {
				setUserAgeClass('notValid');
			}
		}
	};

	const formRep = (event) => {
		event.preventDefault();

		if (valid.name === true && valid.lastname === true && valid.age === true) {
			addData({
				name: userName,
				lastname: userLastname,
				age: userAge
			});

			setUserName('');
			setUserLastname('');
			setUserAge('');
		}
		isValib();
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
						className={userNameClass}
						onChange={(event) => {
							validAccet();
							return setUserName(event.target.value);
						}}
						value={userName}
						name="name"
						placeholder="Имя"
					/>
					<input
						className={userLastnameClass}
						onChange={(event) => {
							validAccet();
							return setUserLastname(event.target.value);
						}}
						value={userLastname}
						name="lastname"
						placeholder="Фамилия"
					/>
					<input
						className={userAgeClass}
						onChange={(event) => {
							validAccet();
							return setUserAge(event.target.value);
						}}
						value={userAge}
						name="age"
						placeholder="Возраст"
					/>
					<button type="submit">Подобрать котика</button>
				</form>
			</div>
			<div></div>
		</div>
	);
}

export default App;
