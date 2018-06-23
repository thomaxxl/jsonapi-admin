//import APP from '../Config.json';
import * as Param from '../Config';
import { setAxiosConfig } from 'redux-json-api';
import { readEndpoint } from 'redux-json-api';
import { buildApi, get, post, patch, destroy } from 'redux-bees';

function mapIncludes(api_data){
    /*
        Relationship item attributes are not included in the jsonapi response data:
        according to the jsonapi spec this only contains "id" and "type" parameters.

        We include them ourselves here so it's easier to look it up later on
    */
    let included = api_data.included
    let items = api_data.data
    if (! included){
        return
    }
    for(let item of items){
        if(item.relationships){
            for(let relationship_name of Object.keys(item.relationships)){
                let relationship = item.relationships[relationship_name]
                if (relationship === undefined){
                    continue
                }
                if (! relationship.data){
                    continue
                }
                if(relationship.data.constructor === Array){
                    // -tomany relationship
                    for(let related of relationship.data){
                        for(let included_item of included){
                            if(related.id === included_item.id){
                                related['attributes'] = included_item.attributes
                            }
                        }
                    }
                }
                else { 
                    // -toone relationship
                    var related = relationship.data
                    for(let included_item of included){
                            if(related.id === included_item.id){
                                relationship.data['attributes'] = included_item.attributes
                                console.log('FOUND::',related['attributes'])
                            }
                        }
                }
                // map the relationship items on the top level of item (e.g. user.relationships.books.data => user.books)
                item[relationship_name] = relationship.data
            }
        }
    }
    return api_data
}

function jsonapi2bootstrap(jsonapi_data, objectKey){
    /*
        jsonapi and bootstrap have different data formats
        this function transforms data from jsonapi to bootstrap format
    */

    let data = []
    for (let item of jsonapi_data.data){
        /* map the attributes inline :
            item = { id: .. , attributes : {...} } ==> item = { id: ... , attr1: ... , attr2: ... }
        */
        let item_data = Object.assign({id : item.id, relationships: item.relationships, included: jsonapi_data.included}, item.attributes)
        data.push(item_data)
    }
    jsonapi_data.data = data
    mapIncludes(jsonapi_data)    
    return jsonapi_data
}

const apiEndpoints = {  
  getDatas:      { method: get,     path: '/:key' },
  getSearch:     { method: post,    path: '/:key/search' },
  getFilter:     { method: post,    path: '/:key/startswith' },
  search:        { method: post,    path: '/:key/search' },
  createData:    { method: post,    path: '/:key' },
  updateData:    { method: patch,   path: '/:key/:id' },
  updateRelationship: { method: patch,   path: '/:key/:id/:rel_name' },
  destroyData:   { method: destroy, path: '/:key/:id' },
};

const config = {
  baseUrl: Param.URL
};
 
const api = buildApi(apiEndpoints, config);

const getInitialObject = () => {
    var initObj = {};
    Object.keys(Param.APP).map(function(key, index) {
        initObj [key] = {
            offset: 0,
            limit: 50,
            data: [],
            count: 0,
            filter: {},
            search: "",
            included: []
        };
    });
    return initObj;
}

var datas = getInitialObject();

class ObjectApi {

    static updateRelationship(objectKey, id, rel_name, data){
        return new Promise ((resolve)=>{
            var func = api.updateRelationship
            var post_args = { data : data }
            var request_args = { key: Param.APP[objectKey].API , id: id, rel_name : rel_name }
            func( request_args, post_args ).then(console.log('updated')).then((result)=>{
                        resolve(Object.assign({}, {}));
                    })
        })
    }

    static search(objectKey, filter, offset, limit, queryArgs){
        return new Promise ((resolve)=>{
                var func = api.search;
                var post_args = {
                    "meta":{
                        "method":"search",
                        "args": filter
                    }
                }
            
                let request_args = Object.assign({ key: Param.APP[objectKey].API,
                                                    "page[offset]": offset,
                                                    "page[limit]": limit
                                                  },
                                                 Param.APP[objectKey].request_args ? Param.APP[objectKey].request_args : {}, 
                                                 queryArgs)
                func( request_args,
                      post_args
                    )
                .then((result)=>{
                    datas[objectKey] = {
                        offset: offset,
                        limit: limit,
                        data: result.body.data,
                        count: result.body.meta.count,
                        filter: datas [objectKey].filter,
                        included: result.body.included ? result.body.included : []
                    };
                    resolve(Object.assign({}, datas));
                });
        });
    }

    static getAllDatas(objectKey, offset, limit, queryArgs ) {
        console.log('getAllDatas')
        return new Promise ((resolve)=>{
                var filter = datas [objectKey].filter;
                var search = datas [objectKey].search;
                var func = null;
                var post_args = {}
                /*if (Object.keys(filter).length != 0) {
                    func = api.getFilter;
                    post_args = {
                        "meta":{
                            "method":"startswith",
                            "args": filter
                        }
                    }
                }
                else */
                if(search){
                    func = api.getSearch;
                    post_args = {
                        "meta":{
                            "args" : {
                                "query": search
                            }
                        }
                    }
                }
                else {
                    func = api.getDatas;
                }
                if(! queryArgs){
                    queryArgs = {}
                }
                let request_args = Object.assign({ key: Param.APP[objectKey].API,
                                                    "page[offset]": offset,
                                                    "page[limit]": limit
                                                  },
                                                 Param.APP[objectKey].request_args ? Param.APP[objectKey].request_args : {}, 
                                                 queryArgs)
                func( request_args,
                      post_args
                    )
                .then((result)=>{
                    let transformed_data = jsonapi2bootstrap(result.body, objectKey)
                    datas[objectKey] = {
                        offset: offset,
                        limit: limit,
                        data: transformed_data.data,
                        count: transformed_data.meta ? transformed_data.meta.count : -1,
                        filter: datas [objectKey].filter,
                    };
                    resolve(Object.assign({}, datas));
                });
        });
    }

    static saveData(objectKey, data) {
        return new Promise((resolve, reject) => {
            var attributes = {};
            Param.APP [objectKey].column.map(function(item, index) {
                if(item.dataField && ! item.readonly ){
                    attributes[item.dataField] = data[item.dataField]
                }
            });
            if (data.id) {
                api.updateData({
                        id: data.id,
                        key: Param.APP [objectKey].API},
                    {data:{
                        id: data.id, 
                        type: Param.APP [objectKey].API_TYPE, 
                        attributes: attributes}}).then(()=>{
                            resolve(data);
                        });
                
            } else {
                api.createData({
                        key: Param.APP [objectKey].API},
                    {data:{
                        type: Param.APP [objectKey].API_TYPE,
                        attributes: attributes}})
                    .then((result)=>{
                        resolve();
                    })
            }
        });
    }

    static getData(objectKey, dataId) {
        return new Promise((resolve) => {
            const existingDataIndex = datas [objectKey].data.findIndex(data => data.id === dataId);
            const dataFound = Object.assign({}, datas[objectKey].data[existingDataIndex]);
            console.log('dataFound',dataFound)
            resolve(dataFound);
        });
    }

    static deleteData(objectKey, dataIds) {
        return new Promise((resolve) => {
            dataIds.map((dataId, index) => {
                api.destroyData({
                    id: dataId,
                    key: Param.APP [objectKey].API})
                .then(() => {
                    resolve();
                });
            });
        });
    }
}

export default ObjectApi;
exports.getInitialObject = datas;