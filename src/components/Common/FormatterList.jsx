import React from 'react'

function cellFormatter(cell, row) {

    return <strong>{ cell }</strong>
}

let FormatterList = { cellFormatter : cellFormatter }

export default FormatterList