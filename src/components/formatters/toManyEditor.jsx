import {APP} from '../../Config.jsx';
import ObjectApi from '../../api/ObjectApi'
import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import { get_ApiObject, get_ApiComponent } from '../../api/ApiObject';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faCheck, faMinus } from '@fortawesome/fontawesome-free-solid'
import Select from 'react-select'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ObjectAction from '../../action/ObjectAction'
import toOneEditor from './toOneEditor'


function getOptions(collection,data){
  /*
    return an option list for the <Async> select filter
  */
  if(!collection || !APP[collection]){
    console.log('Invalid Collection')
    return {}
  }
  let attr = APP[collection].main_show

  var label = attr // attribute to be used for the label
  var offset = 0
  var limit = 20
    
  var result 
  
  result = (input, callback) => {

      let api_endpoint = ObjectApi.search(collection, { "query" : `${input}` }, offset, limit)
      api_endpoint.then((result) => {
        let options = result[collection].data.map(function(item){ return { value: item.id, label: item.attributes[label]} } )
        setTimeout(() => {
          callback(options);
        }, 200);
      });
    }

  return result
}


type State = {
  selectedOption: string,
  value: string,    
};

class ToManyEditor extends React.Component {
	/*
		props:
			row : values
			column: declaration
	*/
	constructor(props) {
	    super(props)
	    this.state = {
			selectedOption: '',
			show_add_rel : false
		}
    this.handleDelete.bind(this)
	}

	handleDelete(item_id){
		let items = []
		let rel_name = this.props.column.dataField
		for(let item of this.props.row[rel_name].data){
			if(item.id !== item_id){
				//items.push(JSON.stringify({ id: item.id, type: item.type}))
				items.push({ id: item.id, type: item.type})
			}
		}
		this.props.onUpdate(JSON.stringify(items))
	}

	// handleDelete(item_id){
	// 	console.log('track_many_edotor_1')
	// 	console.log(this.props)
	// 	this.props.onUpdate({'id':item_id,'action_type':'delete','url':this.props.column.relation_url})
	// }

	renderItem(item){
		let object_cfg;
		for(var k in APP){
			if(APP[k].API_TYPE == item.type){
				object_cfg = APP[k]
			}
		}
		let attr = object_cfg && object_cfg.main_show
		if(!attr){
			console.log()
			console.log(item)
			return <div/>
		}
		if(!attr && object_cfg['column']){
			//APP[objectKey]['column'][0]['dataField']
		}
		return <div key={item.id}>
					{item.attributes[attr]}
					<FontAwesomeIcon className="RelationDeleteIcon" icon={faTimes} onClick={() => this.handleDelete(item.id)}></FontAwesomeIcon>
				</div>
	}
	
	toggle_add_rel(){
		this.setState({ show_add_rel : ! this.state.show_add_rel})
	}

  onChange = (selectedOption) => {
    
      let rel_name = this.props.column.relationship.name
      let items = this.props.row[rel_name].data
      console.log("selectedOption", selectedOption)
      if(!selectedOption || selectedOption == "null"){
        // filter has been cleared
        this.props.onUpdate(items)
        return
      }
      
      // this.parent.value = selectedOption.value
      // this.setState({ selectedOption : selectedOption});
      // selectedOption can be null when the `x` (close) button is clicked
      if (selectedOption) {
        let value = null // No parent id ==> remove the relationship 
        if(selectedOption.value){
          value = { id : selectedOption.value, type: this.props.column.relationship_type }
          items.push(value)
          this.setState({value : selectedOption.value, inputValue:  selectedOption.value})
        }
        

        // onUpdate is the react-bootstrap-table callback that will display the updated value
        // json serialization due to npm update issues
        this.props.onUpdate(JSON.stringify(items))
      }
  }

  onInputChange(){
    alert('oi')
  }

 	render() {
		if(!this.props.column){
 			let error = 'ToManyRelationshipEditor: no column declaration'
 			//toastr.warning(error)
 			console.log(error, this.props)
 			return <div/>
 		}
    let rel_name = this.props.column.relationship.name

		if(!this.props.row || ! this.props.row[rel_name] || ! this.props.row[rel_name].data){
 			return <div/>
 		}
    let items = this.props.row[rel_name].data
    let options = getOptions(this.props.column.relationship.target)
    
		const select = this.state.show_add_rel ? 
        <AsyncSelect
          isClearable={true}
          value={this.state.selectedOption}
          cacheOptions
          loadOptions={options}
          defaultOptions
          onInputChange={this.handleInputChange}
          onChange={this.onChange}
          ref={ref => {
            this.select = ref;
          }}
          asyncOptions={this.getOptions}
        /> :
				<FontAwesomeIcon className="RelationAddIcon" icon={faPlus} onClick={this.toggle_add_rel.bind(this)}/>
		const Editor = connected_toOneEditor
	  	return <div>
	  				{items.map((item) => this.renderItem(item))}
	  				
	  				{select}
	  			</div>
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



export {ToManyEditor}