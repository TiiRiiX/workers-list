import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Grid, Row, Col, ListGroup, ListGroupItem, Panel, FormGroup, Checkbox, ControlLabel, FormControl, Radio, Button, ButtonToolbar, Alert } from "react-bootstrap";
import $ from "jquery";

class ListWorker extends Component {
	render() {
		return(
			<div className="ListWorker">
				<Panel bsStyle="primary">
					<Panel.Heading>
						<Panel.Title>Список сотрудников</Panel.Title>
					</Panel.Heading>
					<ListGroup>
						{this.props.workers.map((worker, index) => (
							<ListGroupItem 
								bsStyle={index == this.props.selectedWorker ? "info" : null}
								onClick={() => {this.props.selectWorker(index);}}
								key={index}
								header={worker.name}
							>
								<p style={{margin:0}}>{worker.post}</p>
								<p style={{margin:0}}>{worker.birthday ? "Дата рождения: "+worker.birthday : ""}</p>
								<p style={{margin:0}}>{worker.sex ? "Пол: "+worker.sex : ""}</p>
								<p style={{margin:0}}>{worker.fired ? "Уволен" : ""}</p>
							</ListGroupItem>
						))}
					</ListGroup>
				</Panel>
			</div>
		);
	}
}

class ControlPanel extends Component {
	constructor(props) {
		super();
		this.state = {
			nameInput: "",
			postInput: "Cистемный администратор",
			birthdayInput: undefined,
			sexInput: null,
			isFiredInput: false,
			isShowingError: false
		};
		this.createWorker = this.createWorker.bind(this);
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangePost = this.handleChangePost.bind(this);
		this.handleChangeBitrhday = this.handleChangeBitrhday.bind(this);
		this.handleChangeSex = this.handleChangeSex.bind(this);
		this.handleChangeFired = this.handleChangeFired.bind(this);
	}
	createWorker() {
		if (this.state.nameInput == "") {
			this.setState({isShowingError : true});
		} else {
			this.props.addNewWorkers({
				name: this.state.nameInput,
				post: this.state.postInput,
				birthday: this.state.birthdayInput,
				sex: this.state.sexInput,
				fired: this.state.isFiredInput
			});
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedWorker != -1 && this.props.selectedWorker != nextProps.selectedWorker) {
			let selectedWorker = nextProps.workers[nextProps.selectedWorker]
			this.setState({
				nameInput: selectedWorker.name,
				postInput: selectedWorker.post,
				birthdayInput: selectedWorker.birthday,
				sexInput: selectedWorker.sex,
				isFiredInput: selectedWorker.fired
			});
		} else if (nextProps.selectedWorker == -1) {
			this.setState({
				nameInput: "",
				postInput: "Системный администратор",
				birthdayInput: undefined,
				sexInput: null,
				isFiredInput: false
			});
		}
	}
	componentDidMount() {
		if ( $('[type="date"]').prop('type') != 'date' ) {
			$('[type="date"]').datepicker();
		}
	}
	handleChangeName(event) {
		console.log($());
		this.setState({nameInput: event.target.value})
		if (this.state.isShowingError && this.state.nameInput != "") {
			this.setState({isShowingError: false});
		} 
		if (this.props.selectedWorker != -1) {
			let workers = this.props.workers;
			workers[this.props.selectedWorker].name = event.target.value;
			this.props.updateWorkers(workers);
		}
	}
	handleChangePost(event) {
		this.setState({postInput: event.target.value})
		if (this.props.selectedWorker != -1) {
			let workers = this.props.workers;
			workers[this.props.selectedWorker].post = event.target.value;
			this.props.updateWorkers(workers);
		}
	}
	handleChangeBitrhday(event) {
		this.setState({birthdayInput: event.target.value})
		if (this.props.selectedWorker != -1) {
			let workers = this.props.workers;
			workers[this.props.selectedWorker].birthday = event.target.value;
			this.props.updateWorkers(workers);
		}
	}
	handleChangeSex(event) {
		this.setState({sexInput: event.target.value})
		if (this.props.selectedWorker != -1) {
			let workers = this.props.workers;
			workers[this.props.selectedWorker].sex = event.target.value;
			this.props.updateWorkers(workers);
		}
	}
	handleChangeFired(event) {
		this.setState({isFiredInput: event.target.checked})
		if (this.props.selectedWorker != -1) {
			let workers = this.props.workers;
			workers[this.props.selectedWorker].fired = event.target.checked;
			this.props.updateWorkers(workers);
		}
	}
	render() {
		return(
			<div className="ControlPanel">
				<Panel bsStyle="primary">
					<Panel.Heading>
						<Panel.Title>Карточка сотрудника</Panel.Title>
					</Panel.Heading>
					<Panel.Body>
						{this.state.isShowingError ? 
						<Alert bsStyle="danger">
							Поля "ФИО Работника" и "Должность" обязательны для заполнения
						</Alert> : null
						}
						<FormGroup validationState={this.state.nameInput == "" ? 'error' : 'success'}>
							<ControlLabel>ФИО Работника</ControlLabel>
							<FormControl 
								placeholder="Фамилия Имя Отчество" 
								onChange={this.handleChangeName} 
								value={this.state.nameInput}
							/>
							<FormControl.Feedback />
						</FormGroup>
						<FormGroup>
							<ControlLabel>Должность</ControlLabel>
							<FormControl 
								componentClass="select"
								onChange={this.handleChangePost}
								value={this.state.postInput}
							>
								<option defaultValue="Cистемный администратор">Cистемный администратор</option>
								<option value="Руководитель проекта">Руководитель проекта</option>
								<option value="IT-Менеджер">IT-Менеджер</option>
								<option value="Менеджер проекта">Менеджер проекта</option>
								<option value="Администратор баз данных">Администратор баз данных</option>
								<option value="Дизайнер">Дизайнер</option>
								<option value="Копирайтер">Копирайтер</option>
							</FormControl>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Дата рождения</ControlLabel>
							<FormControl 
								type="date" 
								onChange={this.handleChangeBitrhday} 
								value={this.state.birthdayInput}
							/>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Пол</ControlLabel>
							<Radio 
								name="sexWorker" 
								onChange={this.handleChangeSex} 
								checked={this.state.sexInput == "мужской" ? true : false} 
								value="мужской"
							>
								Муж.
							</Radio>
							<Radio 
								name="sexWorker"
								onChange={this.handleChangeSex}
								checked={this.state.sexInput == "женский" ? true : false} 
								value="женский"
							>
								Жен.
							</Radio>
						</FormGroup>
						<FormGroup>
							<Checkbox onChange={this.handleChangeFired} checked={this.state.isFiredInput}>Уволен</Checkbox>
						</FormGroup>
					</Panel.Body>
					<Panel.Footer>
						<ButtonToolbar>
							<Button bsStyle="primary" onClick={this.createWorker}>Добавить</Button>
							<Button 
								bsStyle="primary" 
								className={this.props.selectedWorker == -1 ? "disabled" : ""} 
								onClick={this.props.deleteWorker}
							>
								Удалить
							</Button>
						</ButtonToolbar>
					</Panel.Footer>
				</Panel>
			</div>
		);
	}
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			workers: [],
			selectedWorker: -1
		};
		this.addNewWorkers = this.addNewWorkers.bind(this);
		this.selectWorker = this.selectWorker.bind(this);
		this.updateWorkers = this.updateWorkers.bind(this);
		this.deleteWorker = this.deleteWorker.bind(this);
	}
	addNewWorkers(worker) {
		let tempWorkers = this.state.workers;
		tempWorkers.push(worker);
		this.setState({workers: tempWorkers});
		this.selectWorker(tempWorkers.length - 1);
	}
	selectWorker(index) {
		this.setState({selectedWorker: index});
	}
	updateWorkers(workers) {
		this.setState({workers: workers});
	}
	deleteWorker() {
		if (this.state.selectedWorker != -1) {
			let tempWorkers = this.state.workers;
			tempWorkers.splice(this.state.selectedWorker, 1)
			this.setState({workers: tempWorkers});
			this.selectWorker(-1);
		}
	}
	render() {
		return (
			<div className="App">
				<Grid>
					<Row>
						<Col md={6} sm={6}>
							<ListWorker 
								selectedWorker={this.state.selectedWorker}
								selectWorker={this.selectWorker}
								workers={this.state.workers}
							/>
						</Col>
						<Col md={6} sm={6}>
							<ControlPanel 
								addNewWorkers={this.addNewWorkers}
								workers={this.state.workers}
								selectedWorker={this.state.selectedWorker}
								updateWorkers={this.updateWorkers}
								deleteWorker={this.deleteWorker}
							/>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default App;
