import React, { Component } from 'react';

import AppHeader from '../app-header';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';

export default class App extends Component {

	state = {
		todoData: [
			{label: 'Complited tusk', state: 'completed', id: 1},
			{label: 'Editing tusk', state: 'editing', id: 2},
			{label: 'Active tusk', state: 'active', id: 3},
		]
	}

	changeOfState = (id) => {
		this.setState(({ todoData }) => {
			const ind = todoData.findIndex(elem => elem.id === id);

			const element = todoData[ind];

			if (element.state === 'completed') {
				element.state = 'active';
			} else element.state = 'completed';

			const newState = [
			...todoData.slice(0, ind),
			element,
			...todoData.slice(ind + 1)
			]

			return {
				todoData: newState
			}
		})
	}

	onDeleted = (id) => {
		this.setState(({ todoData }) => {
			const ind = todoData.findIndex(elem => elem.id === id);

			const newState = [
			...todoData.slice(0, ind),
			...todoData.slice(ind + 1)
			]

			return {
				todoData: newState
			}
		})
	}

	render() {
		return (
			<section className="todoapp">
				<header className="header">
					<AppHeader />
					<NewTaskForm />
				</header> 
				<section className="main">
					<TaskList 
					todos={this.state.todoData}
					changeOfState={ this.changeOfState }
					onDeleted={ this.onDeleted } />
				</section>
				<Footer />
			</section>
		);
	}
};

