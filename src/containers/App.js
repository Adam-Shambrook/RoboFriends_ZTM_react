import React, { useState , useEffect }  from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import { connect } from 'react-redux';
import { setSearchField , requestRobots} from '../actions';
import './App.css';


const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return { 
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	}
}

function App(){
	const [robots, setRobots] = useState([]);
	const [searchField, setSearchField] = useState('');
	const [count, setCount] = useState(0);
	
	useEffect(()=> {
		fetch('https://jsonplaceholder.typicode.com/users')
	 		.then(response => response.json())
	 		.then(users => setRobots(users));
	}, [count])

	const onSearchChange = (event) => {	
		setSearchField(event.target.value)
		}
		
		const filteredRobots = robots.filter(robot =>{
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})
		return !robots.length ?
			<h1>Loading</h1> :
			(
				<div className ='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<button onClick={() => setCount(count+1)}>Click me!</button>
				<SearchBox searchChange={onSearchChange} />
				<Scroll>
					<CardList 
						robots={filteredRobots}
					/>
				</Scroll>
				</div>
			);
	}

export default connect(mapStateToProps, mapDispatchToProps)(App);