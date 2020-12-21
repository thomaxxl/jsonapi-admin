import {APP} from '../../Config.jsx';
import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import getOptions from './getOptions'


type State = {
  selectedOption: string,
  value: string,    
};

export default class toOneEditor extends  React.Component {

  state = {
      selectedOption: '',
      inputValue: '',
      value:'',
      type: null // jsonapi relationship target type
    }
    select: ElementRef<*>;

  constructor(props) {
      super(props);
      console.log('toOneEditor props:', props)
      //let key = this.props.column.relation_name
      let relation_name = this.props.column.relationship.name
      let relationship_key = this.props.column.relationship_key
      let relationship_type = this.props.column.relationship_type
      let target_collection = APP[relationship_key]
      if(!target_collection){
          console.warn(`no target collection for ${relationship_key}`)
          return
      }
      let label_attr = APP[relationship_key].main_show
      var offset = 0
      var limit = 20
      if(relation_name && this.props.row.relationships && this.props.row.relationships[relation_name]){
          const rel = this.props.row.relationships[relation_name]
          console.debug('toOneEditor rel:', rel)
          this.state.type = rel?.data?.type
          this.state.selectedOption =  {value: rel?.data?.id , label: label_attr ? rel?.data?.attributes[label_attr] : 'no label' }
      }
  }

  handleInputChange = (newValue,  {action}, removedValue) => {

    switch (action) {
      case 'remove-value':
      case 'pop-value':
        if (removedValue.isFixed) {
          return;
        }
        break;
      case 'clear':
        //value = colourOptions.filter(v => v.isFixed);
        break;
    }

    const inputValue = newValue;
    console.debug(newValue)
    this.setState({inputValue});
    return inputValue;
  };

  onChange = (selectedOption) => {
    
    console.debug("selectedOption", selectedOption)
    if(!selectedOption || selectedOption == "null"){
      // filter has been cleared
      this.props.onUpdate(null)
      return
    }
    
    // this.parent.value = selectedOption.value
    // this.setState({ selectedOption : selectedOption});
    // selectedOption can be null when the `x` (close) button is clicked
    if (selectedOption) {
      let value = null // No parent id ==> remove the relationship 
      if(selectedOption.value){
        value = { id : selectedOption.value, type: this.props.column.relationship_type }
        this.setState({value : selectedOption.value, inputValue:  selectedOption.value})

        var sel_opt_rel_key = this.props.column.relationship_key
        var sel_opt_rel_type = this.props.column.relationship_type
        
      }
      // onUpdate is the react-bootstrap-table callback that will display the updated value
      // json serialization due to npm update issues
      this.props.onUpdate(JSON.stringify(value))
    }
  }

  getOptions(input, callback) {
    let options = { options: {} }
    callback(null, options)
  }

  render() {

    let key = this.props.column.relationship_key
    if(!key){
      alert('no relationship key in config', this.props.column)
      return <div/>
    }
    
    let options = getOptions(key)
    
    return (
      <div>
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
        />
      </div>
    );
  }
}
