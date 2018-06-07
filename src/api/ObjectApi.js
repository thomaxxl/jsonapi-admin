import * as Param from '../Config';
import configureStore from '../configureStore';
import { setAxiosConfig } from 'redux-json-api';
import { readEndpoint } from 'redux-json-api';
import { buildApi, get, post, patch, destroy } from 'redux-bees';
import configureStoreapi from '../configureStore';

const store = configureStoreapi();

const apiEndpoints = {
  getDatas:      { method: post,     path: '/:key/startswith' },
  createData:    { method: post,    path: '/:key' },
  updateData:    { method: patch,   path: '/:key/:id' },
  destroyData:   { method: destroy, path: '/:key/:id' },
};

const config = {
  baseUrl: Param.URL
};
 
const api = buildApi(apiEndpoints, config);

var datas = Param.InitObject();

class ObjectApi {
    static getAllDatas( objectKey, offset, limit ) {
        return new Promise ((resolve)=>{
                var filter = datas[objectKey].filter;
                if(Object.keys(filter).length == 0){
                    Param.APP[objectKey].column.map((item,i)=>{
                        filter[item.dataField] = "";
                    })
                }
                api.getDatas(
                    {
                        key: Param.APP [objectKey].API,
                        "page[offset]": offset,
                        "page[limit]": limit
                    },
                    {
                        "meta":{
                            "method":"startswith",
                            "args":filter
                        }
                    }
                )
                .then((result)=>{
                    datas[objectKey] = {
                        offset: offset,
                        limit: limit,
                        data: result.body.data,
                        total: result.body.meta.count,
                        filter: datas [objectKey].filter
                    };
                    resolve(Object.assign({}, datas));
                });
        });
    }

    static saveData(objectKey, data) {
        return new Promise((resolve, reject) => {
            var attributes = {};
            Param.APP [objectKey].column.map(function(item, index) {
                attributes [item.dataField] = data [item.text];
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
            const dataFound = Object.assign({}, datas [objectKey].data[existingDataIndex]);
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