import React, { PropTypes } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const getCaret = direction => {
    if (direction === 'asc') {
        return (
            <span> <i className="fa fa-sort-asc" aria-hidden="true"/></span>
        );
    }

    if (direction === 'desc') {
        return (
            <span> <i className="fa fa-sort-desc" aria-hidden="true"/></span>
        );
    }

    return (
        <span> <i className="fa fa-sort" aria-hidden="true" /></span>
    );
};

const titleFormatter = (cell, row) => {
    return `<a href=${row.watchHref} target="_blank">${cell}</a>`;
};

class List extends React.Component {
    constructor(props) {
        super(props);
        this.options = {
            sortIndicator: true,
            noDataText: 'No data'
        };

        this.selectRowProp = {
            mode: 'radio',
            bgColor: '#c1f291',
            onSelect: props.handleRowSelect,
            clickToSelect: true, 
            //hideSelectColumn: true,
            mode: 'checkbox',  
        };
    }
    render() {

        let options = this.options;
        // TODO: value don't show yet
        options['sizePerPageList'] = [ {
                                        text: '10', value: 10
                                      }, {
                                        text: '50', value: 50
                                      }, {
                                        text: '100', value: 100
                                      } ] ;
        options['sizePerPage'] = 50;

        var datas = []
        var length = this.props.data.length;
        for ( var i = 0 ; i < length ; i++){
            let item = this.props.data[i]
            let data = Object.assign({}, item.attributes, { id : item.id })
            datas.push(data)
        }

        return (
            <BootstrapTable data={datas}  selectRow={this.selectRowProp} options={options} bordered={false}  pagination={true}  striped hover condensed>
                <TableHeaderColumn  dataField="id" isKey hidden>Id</TableHeaderColumn>    
                {this.props.columns.map((col,i) => 
                    <TableHeaderColumn 
                        key={i}
                        dataField={col.api}
                        dataFormat={titleFormatter} 
                        dataSort={true}
                        caretRender={getCaret}
                        filter={{type: 'TextFilter', delay: 0 }}
                        columnTitle
                    >
                    {col.name ? col.name : col.api}
                    </TableHeaderColumn>
                )}       
            </BootstrapTable>
        );
    }
}

List.propTypes = {
    data: PropTypes.array.isRequired,
    handleRowSelect: PropTypes.func.isRequired
};

export default List;