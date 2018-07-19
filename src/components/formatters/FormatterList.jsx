import React from 'react'
import { faTimes } from '@fortawesome/fontawesome-free-solid'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import toastr from 'toastr'
import { Async }  from 'react-select';
import 'react-select/dist/react-select.css';
import ObjectApi from '../../api/ObjectApi'

function cellFormatter(cell, row) {

    return <strong><div className="call">{ cell }</div></strong>
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function lookupIncluded(item, row){
	/*
		lookup the relationship item in the row "included" data
		this follows the jsonapi format:

		item : { "id" : .. , "type" : .. }
		row : { "data" : .. , "links" : .. , "relationships" : }
	*/
	
	if(!item.id || !item.type){
		toastr.error('Data Error')
	}
	if(!row || !row.included || !row.relationships){
		return <div/>
	}
	for(let included of row.included){
		if(included.type === item.type && included.id === item.id){
			return included
		}
	}
	return null
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function toOneFormatter(cell, row){

	let user = row.user ? row.user : ''
	let name = user ? user.attributes.name : ''
	return <span className="editable">{name}</span>
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class ItemLink extends React.Component {
	/*
		Single item in the tomany relationship formatter
	*/

	render(){
		let attr = 'name'
		return <span>{this.props.item.attributes[attr]}</span>
	}
}

function toManyFormatter(cell, row, col){

	if(!cell){
		return <div/>
	}
	
	const items = cell.map(function(item){
					let item_data = lookupIncluded(item, row)
					let result = '';
					if(item_data){
						result = <ItemLink item={item_data} />
					}
					return <div key={item_data.id}>{result}</div>
	})
	
	return <div>{items}</div>
}

class ToManyRelationshipEditor extends React.Component {
	/*
		props:
			row : values
			column: declaration
	*/
	constructor(props) {
	    super(props)

	    this.state = {
			selectedOption: ''
		}
		this.handleDelete.bind(this)
	}

	handleDelete(item_id){
		let items = []
		let rel_name = this.props.column.relationship
		for(let item of this.props.row[rel_name]){
			if(item.id !== item_id){
				items.push(item)
			}
		}
		this.props.onUpdate(items)
	}

	renderItem(item){
		return <div key={item.id}>
					{item.attributes.name}
					<FontAwesomeIcon className="RelationDeleteIcon" icon={faTimes} onClick={() => this.handleDelete(item.id)}></FontAwesomeIcon>
				</div>
	}

 	render() {
		if(!this.props.column){
 			let error = 'ToManyRelationshipEditor: no column declaration'
 			//toastr.warning(error)
 			console.log(error, this.props)
 			return <div/>
 		}
		let rel_name = this.props.column.relationship
		if(!this.props.row || ! this.props.row.relationships || ! this.props.row.relationships[rel_name] || ! this.props.row.relationships[rel_name].data){
 			return <div/>
 		}
	  	let items = this.props.row.relationships[rel_name].data
	  	return <div ref={ node => this.parent = node }>{items.map((item) => this.renderItem(item) ) } </div>

	  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function getOptions(collection){
	/*
		return an option list for the <Async> select filter
	*/
	
	var label = 'name' // attribute to be used for the label
	var offset = 0
	var limit = 20
		
	var result = (input, callback) => {
		let api_endpoint = ObjectApi.search(collection, { "query" : `${input}` }, offset, limit)
	  	api_endpoint.then((result) => {
	  		let options = result[collection].data.map(function(item){ return { value: item.id, label: item.attributes[label]} } )

	  		//options.unshift({ value: null , label : 'No parent', style: { fontStyle: 'italic' } })
		    callback(null, {
		      options: options,
		      // CAREFUL! Only set this to true when there are no more options,
		      // or more specific queries will not be sent to the server.
		      complete: false
		    });
		  }, 500);
	}

	return result
}


class toOneEditor extends React.Component {

	 constructor(props) {
	    super(props);

	    this.state = {
			selectedOption: ''
		}
	}

	onChange(selectedOption){

		if(!selectedOption){
			// filter has been cleared
			this.props.onUpdate(null)
			return
		}

		this.parent.value = selectedOption.value
		this.setState({ selectedOption : selectedOption});
		// selectedOption can be null when the `x` (close) button is clicked
		if (selectedOption) {
			let value = null // No parent id ==> remove the relationship 
			if(selectedOption.value){
				value = { id : selectedOption.value }
			}
			this.props.onUpdate(value)
		}
	}

	/*getValue() {
		alert()
		return this.state.selectedOption.label
	}*/

 	render() {
	  	const { value, onUpdate, ...rest } = this.props;

	  	let options = getOptions('Users')
		
	  	return <Async
				    name="parentName"
				    key="parent"
				    value={value}
				    ref={ node => this.parent = node }
				    loadOptions={options}
				    onUpdate={onUpdate}
				    onChange={this.onChange.bind(this)}
				    filterOptions={(options, filter, currentValues) => {return options;}}
				    { ...rest }
				/>
	  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let FormatterList = { cellFormatter : cellFormatter, 
					  toOneFormatter : toOneFormatter,
					  toManyFormatter: toManyFormatter,
					  toOneEditor: toOneEditor,
					  ToManyRelationshipEditor: ToManyRelationshipEditor,
					  }

export default FormatterList


