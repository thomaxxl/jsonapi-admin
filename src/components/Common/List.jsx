import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { APP, FormatterList } from '../../Config';
import cellEditFactory from 'react-bootstrap-table2-editor';


// function resolveFormatter(value){
//     return  Param.FormatterList[value.formatter]
// }

// function handleMouse(){
//     let d = ObjectApi.getAllDatas('XWConfig', 0, 1)
//     d.then(data => {
//         let columns = []
//         for (let attr of Object.keys(data['XWConfig']['data'][0].attributes) ) {
//             columns.push({ "dataField" : attr })
//         }
//         console.log(JSON.stringify(columns, null, 2) )
//     })
// }

// class JAFilter extends React.Component {

//     render(){
//         let listFilter = textFilter({ className:"textFilter", 
//                                       style: { display: 'inline-block',
//                                                backgroundColor: 'yellow'
//                                     }})
//         return <div>{listFilter}</div>
//     }
// }

// class ColHeader extends React.Component {
//     // todo: this generates a warning because text is no longer a string:
//     // Warning: Failed prop type: Invalid prop `column.text` of type `object` supplied to `HeaderCell`, expected `string`.
//     onClick(){
//         alert('todo')
//     }
//     render(){
//         return  <span>{this.props.text}
//                     <FontAwesomeIcon className="column-filter" onClick={this.onClick.bind(this)} icon={faFilter} />
//                 </span>
//     }
// }

function dispatch_col_type(column){
    if(column.type === "integer"){
            let col_style = {width: '6em'}
            column.headerStyle = Object.assign({}, col_style, (column.headerStyle || {}) )
            col_style.paddingLeft = '1.5em'
            column.style = Object.assign({}, col_style, (column.style || {}) )
    }
    if(column.type === "date"){
        const col_style = {width: '12em'}
        column.style = Object.assign({}, col_style, (column.style || {}) )
        column.headerStyle = Object.assign({}, col_style, (column.headerStyle || {}) )
    }
}

class List extends React.Component {

    constructor(props) {
        super(props)
        const columns = APP[this.props.objectKey].column || []
        this.columns = columns.map((column, index) => {
            /* 
                merge the config column properties 
                with our property dict
            */
            
            if(column.formatter){
                /* 
                    Dispatch the formatter from string to function
                    Only replace it the first time (when it's still a string)
                    this turned out to be quite ugly... TODO: redo!
                */

                let formatter_name = column.formatter
                if(typeof column.formatter === 'string'){ // bah!, we only need to replace it once
                   column.formatter = FormatterList[formatter_name] //resolveFormatter(column.formatter)
                }
                if (!column.formatter){
                    console.log(`formatter ${formatter_name} not found!`) 
                }
                else{
                    column.location = this.props.location
                }
            }
            if(column.editor){
                let editor_name = column.editor
                if(typeof column.editor === 'string'){
                   column.editor = FormatterList[column.editor] //resolveFormatter(column.formatter)
                }
                if (!column.editor){ console.log(`formatter ${editor_name} not found!`) }   
            }
            if(column.editorRenderer){
                const EditorRenderer = column.editorRenderer  
                column.editorRenderer = (editorProps, value, row, column, rowIndex, columnIndex) => 
                    ( <EditorRenderer className="editable" { ...editorProps } row={row} column={column} value={ value }  /> )
            }
            if(!column.text){
                column.text = column.name
            }
            if(!column.dataField){
                console.log('No dataField for column', column)
                column.dataField = '__dummy'+Math.random(); // filler to avoid console warnings (lol if you run into this :p)
                column.readonly = true
            }
            if(column.readonly){
                column.editable = false
            }
            dispatch_col_type(column)
            
            column.plaintext = column.text
            // let listFilter = textFilter({ className:"textFilter", 
            //                               style: { display: 'inline',
            //                                        backgroundColor: 'white', 
            //                                        visibility: 'hidden'
            //                             }})
            // const ff = <JAFilter />
            
            column = Object.assign({}, { //filter: listFilter,
                                        delay: 100,
                                        editable : true,
                                        onSort: (field, order) => {
                                            console.log(field, order);
                                        }
                                    },
                                    column)
            return column
        }, this);


        this.options = Object.assign({}, 
                                     { sortIndicator: true,
                                       mode: 'checkbox',
                                       noDataText: 'No data' }, 
                                    APP[this.props.objectKey].options || {} )


        this.selectRow = Object.assign({}, {
            mode: 'checkbox',
            /*clickToSelect : true,*/
            /*clickToSelectAndEditCell : true,*/
            style: { backgroundColor: '#c8e6c9' },
            onSelect: this.props.handleRowSelect,
            selected: this.props.selectedIds
            }, 
            APP[this.props.objectKey].selectRow || {} )

        if(APP[this.props.objectKey].selectRow === undefined){
            /*this.selectRow.hideSelectColumn = true*/
            this.selectRow.selectionRenderer = ({ mode, checked, disabled }) => console.log(mode, checked, disabled),
            this.selectRow.selectionHeaderRenderer = ({ mode, checked, indeterminate }) => console.log(mode, checked, indeterminate)
        }
    }

    handleTableChange(type, { page, sizePerPage, filters }) {
        Object.keys(this.props.filter).map((key)=>{
            delete this.props.filter[key];
            return 0;
        })

        Object.keys(filters).map((key)=>{
            this.props.filter[key] = filters[key].filterVal;
            return 0;
        },this)

        this.props.onTableChange(page,sizePerPage);
    }

    afterSaveCell(oldValue, newValue, row, column){
        if(column.relationship){
            this.props.handleSaveRelationship(newValue, row, column)
        }
        else{
            this.props.handleSave(row)
        }
        // todo!!!
    }

    test(){
        alert()
    }

    render__() {
    const tableOptions = {
      onRowClick: this.showModal,
      expandBy: 'column',
    }

    return (
      <BootstrapTable
        data={[
          { id: 1, foo: 'bar', expand: 'foo' },
          { id: 2, foo: 'bar', expand: 'bar' },
        ]}
        options={tableOptions}
        expandableRow={this.isExpandableRow}
        expandComponent={this.expandComponent}
        expandColumnOptions={{ expandColumnVisible: true }}
      >
      </BootstrapTable>
    )
}
    render() {

        const pager = paginationFactory({
            page: parseInt(this.props.data.offset/this.props.data.limit,10) + 1,
            sizePerPage: this.props.data.limit,
            totalSize: this.props.data.count,
        })
        
        const tableOptions = {
              onRowClick: this.test,
              expandBy: 'column',
            }

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: false,
            style: { backgroundColor: '#c8e6c9' },
            onSelect: this.props.handleRowSelect,
            selected: this.props.selectedIds,
            clickToEdit: true

        }

        console.log('props', this.props)
        let table_props = { options : this.options || {} ,
                            selectRow : selectRow || {}
                            }

        return <BootstrapTable hover condensed
                  keyField="id"
                  data={ this.props.data.data }
                  columns={ this.columns }
                  cellEdit={cellEditFactory({ mode: 'dbclick', afterSaveCell: this.afterSaveCell.bind(this) })}
                  pagination={pager}
                  onTableChange={this.handleTableChange.bind(this)}
                  remote={ { pagination : true } }
                  options={tableOptions}
                  {...table_props}
            />
    }
}

export default List