import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: []
        };
        this.props.columns.map((value, index) => {
            this.state.columns.push({
                dataField: value.dataField,
                text: value.text,
                filter: textFilter()
            });
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

    render() {
        var datas = []
        var length = this.props.data.data.length;
        for ( var i = 0 ; i < length ; i++){
            let item = this.props.data.data[i]
            let data = Object.assign({}, item.attributes, { id : item.id })
            datas.push(data)
        }

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            style: { backgroundColor: '#c8e6c9' },
            onSelect: this.props.handleRowSelect,
            selected: this.props.selectedIds
        };

        const pager = paginationFactory({
            page: parseInt(this.props.data.offset / this.props.data.limit) + 1,
            sizePerPage: this.props.data.limit,
            totalSize: this.props.data.total,
        });

        return (
            <BootstrapTable 
                    remote={ { pagination: true } }
                    keyField='id'
                    data={ datas }
                    columns={ this.state.columns }
                    selectRow={ selectRow }
                    pagination={ pager }
                    onTableChange={ this.handleTableChange.bind(this) }
                    filter={ filterFactory() }/>
        );
    }
}

export default List;