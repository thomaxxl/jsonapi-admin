import * as Param from '../Config';
import configureStore from '../configureStore';
import { setAxiosConfig } from 'redux-json-api';
import { readEndpoint } from 'redux-json-api';
import { buildApi, get, post, patch, destroy } from 'redux-bees';
import configureStoreapi from '../configureStore';

const store = configureStoreapi();

 
const apiEndpoints = {
  getDatas:      { method: get,     path: '/:key/?page[limit]=50' },
  createData:    { method: post,    path: '/:key' },
  updateData:    { method: post,    path: '/:key/:id' },
  destroyData:   { method: destroy, path: '/:key/:id' },
};

const config = {
  baseUrl: Param.URL
};
 
const api = buildApi(apiEndpoints, config);

function replaceAll(str, find, replace) {
    return str;
}

const generateId = (data) => {
    return replaceAll(data.Name, ' ', '-');
};

var datas = Param.InitObject();

class ObjectApi {
    static getAllDatas( objectKey ) {
        return new Promise ((resolve)=>{
            var data = [];
            if(datas [objectKey].length == 0)
                api.getDatas({key: Param.APP [objectKey].API})
                .then((result)=>{
                    datas [objectKey] = [];
                    var length = result.body.data.length;
                    for ( var i = 0 ; i < length ; i++){
                        data = {};
                        data['id'] = result.body.data[i].id;

                        Param.APP[objectKey].column.map((item, index) => {
                            data [item.name] = result.body.data[i].attributes [item.api];
                        })
                        datas [objectKey].push(data);
                    }
                    resolve(Object.assign({}, datas));
                });
            else {
                resolve(Object.assign({}, datas));
            }
        });
    }

    static saveData(objectKey, data) {
        return new Promise((resolve, reject) => {
            // Simulate server-side validation
            var attributes = {};
            Param.APP [objectKey].column.map(function(item, index) {
                attributes [item.api] = data [item.name];
            });

            if (data.id) {
                const existingDataIndex = datas [objectKey].findIndex(a => a.id === data.id);
                datas [objectKey].splice(existingDataIndex, 1, data);

                api.updateData({
                        id: data.id,
                        key: Param.APP [objectKey].API},
                    {data:{
                        id: data.id, 
                        type: Param.APP [objectKey].API_TYPE, 
                        attributes: attributes}});
                resolve(data);
            } else {
                api.createData({
                        key: Param.APP [objectKey].API},
                    {data:{
                        type: Param.APP [objectKey].API_TYPE,
                        attributes: attributes}})
                    .then((result)=>{
                        console.log(result);
                        data.id = result.body.data.id;
                        datas [objectKey].push(data);
                        resolve(data);
                    })
            }
        });
    }

    static getData(objectKey, dataId) {
        return new Promise((resolve) => {
            const existingDataIndex = datas [objectKey].findIndex(data => data.id === dataId);
            const dataFound = Object.assign({}, datas [objectKey][existingDataIndex]);
            resolve(dataFound);
        });
    }

    static deleteData(objectKey, dataId) {
        console.log("delete");
        console.log(objectKey);
        return new Promise((resolve) => {
            const indexOfDataToDelete = datas [objectKey].findIndex(data => data.id === dataId);
            datas [objectKey].splice(indexOfDataToDelete, 1);
            api.destroyData({ 
                id: dataId,
                key: Param.APP [objectKey].API});
            resolve();
        });
    }
}

export default ObjectApi;