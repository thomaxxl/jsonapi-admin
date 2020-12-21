import React from 'react'
import { faPlus, faTimes, faCheck, faMinus } from '@fortawesome/fontawesome-free-solid'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import toastr from 'toastr'
import {APP} from '../../Config.jsx';
import Select from 'react-select'
import AsyncSelect from 'react-select/async';
import { Button, Popover, PopoverHeader, PopoverBody, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
//import 'react-select/dist/react-select.css';
import ObjectApi from '../../api/ObjectApi'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ObjectAction from '../../action/ObjectAction'
import toOneEditor from './toOneEditor'
import {ToManyEditor} from './toManyEditor'

function cellFormatter(cell, row) {

    return <strong><div className="call">{ cell }</div></strong>
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// function lookupIncluded(item, row){
// 	/*
// 		lookup the relationship item in the row "included" data
// 		this follows the jsonapi format:

// 		item : { "id" : .. , "type" : .. }
// 		row : { "data" : .. , "links" : .. , "relationships" : }
// 	*/
	
// 	if(!item.id || !item.type){
// 		toastr.error('Data Error')
// 	}
// 	if(!row || !row.included || !row.relationships){
// 		return <div/>
// 	}
// 	for(let included of row.included){
// 		if(included.type === item.type && included.id === item.id){
// 			return included
// 		}
// 	}
// 	return null
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function toOneFormatter(cell, row, rowIdx, formatExtraData){
	/*
		cell contains the FK of the relationship
		row contains the api object

		we want to show the row.relationship_name
	*/

	const column = formatExtraData?.column // column metadata from Config.json
	
	if(!row?.relationships[column?.relationship_name]){
		console.log("No relationship")
		return <span>{cell}</span>
	}
	const relationship = row.relationships[column?.relationship_name].data

	if(!relationship){
		console.log("No relationship data")
		return <span>{cell}</span>
	}
	
	if(!relationship || relationship.id != cell || ! APP[column.relationship_key] ){
		// this happens between update and refresh
		return <span></span>
	}

	if(! relationship.attributes){
		console.log("No attributes ", relationship)
		return <span></span>
	}
	const relationship_collection = APP[column.relationship_key]
	const rel_attr_show = relationship_collection.main_show

	return <span className="editable">{relationship.attributes[rel_attr_show]}</span>
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class ItemLink extends React.Component {
	/*
		Single item in the tomany relationship formatter
	*/
	
	render(){
		let objectKey = null
		for (const [key, value] of Object.entries(APP)) {
			if(value.API_TYPE == this.props.item.type){
				objectKey = key;
				break;
			}
		}
		if(! APP[objectKey]){
			console.warn(`Key ${objectKey} not found in APP!`)
			console.warn(this.props.item.type)
			return <div/>
		}
		
		let attr = APP[objectKey].main_show
		if(!attr){
			console.warn(`No main_show for ${APP[objectKey]}`)
			return <div/>
		}
		return <span>{this.props.item.attributes[attr]}</span>
	}
}

function toManyFormatter(cell, row, col){

	if(!cell || !cell.data){
		return <div/>
	}

	const items = cell.data.map(function(item){
					let item_data = item
					let result = '';
					if(item_data && item_data.attributes){
						result = <ItemLink item={item_data} />
					}
					return <div key={item_data.id}>{result}</div>
	})
	
	return <div>{items}</div>
}

function booleanFormatter(cell, row, col){
	let icon = faMinus
	if(cell != 0){
		icon = faCheck
	
	}
	return <FontAwesomeIcon className="RelationDeleteIcon" icon={icon}></FontAwesomeIcon>
}

class BooleanEditor extends React.Component {
    onChange(event) {
        this.range.value = event.target.value;
        this.props.onUpdate(event.target.value);
    }

    render() {
    	const BooleanOptions = { "true" : 1, "false" :0 }
    	const { value, onUpdate, ...rest } = this.props;
        let defaultValue = value;
        
        return (
            <Input
            	className="BooleanEditor"
                type="select"
                key="boolselect"
                ref={node => (this.range = node)}
                bsSize="sm"
                defaultValue={defaultValue}
                onChange={this.onChange.bind(this)}
                {...rest}
            >
            <option/>
                {Object.keys(BooleanOptions).map((status) => (
                    <option key={BooleanOptions[status]} value={BooleanOptions[status]} defaultValue={defaultValue} >
                        {status}
                    </option>
                ))}
            </Input>
        );
    }
}


class ListEditor extends React.Component {
    onChange(event) {
        this.range.value = event.target.value;
        this.props.onUpdate(event.target.value);
    }

    render() {
    	const ListOptions = {"Low" : 0, "Normal": 1, "High": 2, "Urgent":3}
    	const { value, onUpdate, ...rest } = this.props;
        let defaultValue = value;
        
        return (
            <Input
            	className="ListEditor"
                type="select"
                key="prioselect"
                ref={node => (this.range = node)}
                bsSize="sm"
                defaultValue={defaultValue}
                onChange={this.onChange.bind(this)}
                {...rest}
            >
            <option/>
                {Object.keys(ListOptions).map((key) => (
                    <option key={ListOptions[key]} value={ListOptions[key]} defaultValue={key} >
                        {key}
                    </option>
                ))}
            </Input>
        );
    }
}


const mapStateToProps = (state, own_props) => { 

	let select_option;
	if(own_props.row && own_props.row.route){
		select_option = state.object[own_props.row.route].select_option
	}
	else{
		alert('error')
	}

	return { select_option: select_option} 
}

const mapDispatchToProps = dispatch => ({
	action: bindActionCreators(ObjectAction, dispatch),
})

const connected_toOneEditor = connect(mapStateToProps, mapDispatchToProps)(toOneEditor)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let FormatterList = { cellFormatter : cellFormatter,
					  toOneFormatter : toOneFormatter,
					  toManyFormatter: toManyFormatter,
					  toOneEditor: connected_toOneEditor,
					  ToManyEditor: ToManyEditor,
					  ToManyRelationshipEditor: ToManyEditor,
					  booleanFormatter: booleanFormatter,
					  BooleanEditor: BooleanEditor,
					  ListEditor : ListEditor
					}

export {FormatterList}
