import React from 'react';
import toastr from 'toastr'

class Collection extends React.Component {

    constructor(props){
        super(props)
    }
}


function get_columns(json){
    const column_names = new Set()
    const attributes = json.attributes
    
    for(let attr of Object.keys(attributes)){
        column_names.add(attr)
    }

    return column_names;
}

function get_relationships(json){
    const rel_names = new Set()
    const relationships = json.relationships

    for(let rel of Object.keys(relationships)){
        rel_names.add(rel)
    }
    
    return rel_names
}

function parse_collection(json){

    const data = json.data
    const instance = data[0]
    if(!instance){
        toastr.error(`No Instance`)
        return
    }
    toastr.success('OK')
    const column_names = get_columns(instance)
    const rel_names = get_relationships(instance)
    
    console.log(column_names)
    console.log(rel_names)
}

class Disco extends React.Component {

    constructor(props){
        super(props);
        this.read_collection(props.api_root +'/People')
    }

    read_collection(url){
        url = new URL(url)
        fetch(url)
                .then(resp => resp.json())
                .then((data)=> {
                    parse_collection(data)
                })
    }

    render(){

        return <span>Disco</span>
    }
}


export {Disco}