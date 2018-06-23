import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import ObjectApi from '../../api/ObjectApi'
import * as Param from '../../Config';
import { faFilter  } from '@fortawesome/fontawesome-free-solid'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import cellEditFactory from 'react-bootstrap-table2-editor';


function resolveFormatter(value){
    return  Param.FormatterList[value.formatter]
}

function handleMouse(){
    let d = ObjectApi.getAllDatas('XWConfig', 0, 1)
    d.then(data => {
        let columns = []
        for (let attr of Object.keys(data['XWConfig']['data'][0].attributes) ) {
            columns.push({ "dataField" : attr })
        }
        console.log(JSON.stringify(columns, null, 2) )
    })
}

class JAFilter extends React.Component {

    render(){
        let listFilter = textFilter({ className:"textFilter", 
                                      style: { display: 'inline-block',
                                               backgroundColor: 'yellow'
                                    }})
        return <div>{listFilter}</div>
    }
}

class ColHeader extends React.Component {
    // todo: this generates a warning because text is no longer a string:
    // Warning: Failed prop type: Invalid prop `column.text` of type `object` supplied to `HeaderCell`, expected `string`.

    onClick(){
        alert('todo')
    }

    render(){
        return  <span>{this.props.text}
                    <FontAwesomeIcon className="column-filter" onClick={this.onClick.bind(this)} icon={faFilter} />
                </span>
    }
}

class List extends React.Component {

    constructor(props) {
        super(props)
        this.columns = []
        this.props.columns.map((value, index) => {
            /* 
                merge the config column properties 
                with our property dict
            */

            // Dispatch the formatter from string to function
            if(value.formatter){
                let formatter_name = value.formatter
                value.formatter = Param.FormatterList[formatter_name] //resolveFormatter(value.formatter)
                if (!value.formatter) { console.log(`formatter ${formatter_name} not found!`) }
            }
            if(value.editor){
                let editor_name = value.editor
                value.editor = Param.FormatterList[value.editor] //resolveFormatter(value.formatter)
                if (!value.editor){ console.log(`formatter ${editor_name} not found!`) }   
            }
            if(value.editorRenderer){
                const EditorRenderer = Param.FormatterList[value.editorRenderer]
                value.editorRenderer = (editorProps, value, row, column, rowIndex, columnIndex) => 
                    ( <EditorRenderer className="editable" { ...editorProps } row={row} column={column} value={ value }  /> )
            }
            if(!value.text){
                value.text = value.name
            }
            if(!value.dataField){
                console.log('No dataField for column', value)
                value.dataField = '__dummy'+Math.random(); // filler to avoid console warnings (lol if you run into this :p)
                value.readonly = true
            }
            if(value.readonly){
                value.editable = false
            }
            value.plaintext = value.text
            let listFilter = textFilter({ className:"textFilter", 
                                          style: { display: 'inline',
                                                   backgroundColor: 'white', 
                                                   visibility: 'hidden'
                                        }})
            const ff = <JAFilter />
            
            let column = Object.assign({}, { //filter: listFilter,
                                            delay: 100,
                                            editable : true,
                                            onSort: (field, order) => {
                                                console.log(field, order);
                                            }
                                        },
                                        value)
            this.columns.push(column);
        }, this);


        this.options = {
            sortIndicator: true,
            noDataText: 'No data'
        };

        this.selectRowProp = {
            mode: 'radio',
            bgColor: '#c1f291',
            onSelect: props.handleRowSelect,
            clickToSelect: true, 
            mode: 'checkbox',  
        };
    }

    handleTableChange(type, { page, sizePerPage, filters }) {

        Object.keys(this.props.filter).map((key)=>{
            delete this.props.filter[key];
        })

        Object.keys(filters).map((key)=>{
            this.props.filter[key] = filters[key].filterVal;
        },this)

        this.props.onTableChange(page,sizePerPage);
    }

    afterSaveCell(oldValue, newValue, row, column){
        console.log('SAVE::',oldValue, newValue)
        console.log(column)
        if(column.relationship){
            this.props.handleSaveRelationship(newValue, row, column)
        }
        else{
            this.props.handleSave(row)
        }

        // todo!!!
    }

    onChange(event){
        console.log('onChange', event)
    }

    render() {

        var length = this.props.data.length;
        
        const selectRow = {
            mode: 'checkbox',
            clickToSelect: false,
            style: { backgroundColor: '#c8e6c9' },
            onSelect: this.props.handleRowSelect,
            selected: this.props.selectedIds,
            clickToEdit: true

        };

        const pager = paginationFactory({
            page: parseInt(this.props.data.offset / this.props.data.limit) + 1,
            sizePerPage: this.props.data.limit,
            totalSize: this.props.data.count,
        });

        return <BootstrapTable
                  keyField="id"
                  data={ this.props.data.data }
                  columns={ this.columns  }
                  cellEdit={ cellEditFactory({ mode: 'dbclick', afterSaveCell: this.afterSaveCell.bind(this) }) }
                  pagination={ pager }
                  selectRow={ selectRow }
                  onTableChange={this.handleTableChange.bind(this)}
                  remote={ { pagination: true } }
            />

        /*return (
            <div>
            <div id="popover_target" />
            <BootstrapTable 
                    remote={ { pagination: true } }
                    keyField='id'
                    data={ data }
                    columns={ this.columns }
                    selectRow={ selectRow }
                    pagination={ pager }
                    cellEdit={ cellEditFactory({ mode: 'click' })}
                    onTableChange={this.handleTableChange.bind(this)}
                    filter={ filterFactory() }/></div>
        );*/
    }
}

export default List;