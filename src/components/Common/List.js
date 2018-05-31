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
            hideSelectColumn: true            
        };
    }
    render() {
        return (
            <BootstrapTable data={this.props.data}  selectRow={this.selectRowProp}  options={this.options} bordered={false}  pagination={true}  striped hover condensed>
                <TableHeaderColumn  dataField="id" isKey hidden>Id</TableHeaderColumn>    
                {this.props.columns.map((col,i) => 
                    <TableHeaderColumn 
                        key={i}
                        dataField={col.name}
                        dataFormat={titleFormatter} 
                        dataSort={true}
                        caretRender={getCaret}
                        filter={{type: 'TextFilter', delay: 0 }}
                        columnTitle
                    >
                    {col.name}
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