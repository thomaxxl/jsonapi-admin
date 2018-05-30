import delay from './delay';
import * as params from '../config_ui';
import configureStore from '../configureStore';
import { setAxiosConfig } from 'redux-json-api';
import { readEndpoint } from 'redux-json-api';
import { buildApi, get, post, patch, destroy } from 'redux-bees';
import configureStoreapi from '../configureStore';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

const store = configureStoreapi();

 
const apiEndpoints = {
  getDatas:      { method: get,     path: '/Users/?page[limit]=50' },
  createData:    { method: post,    path: '/Users' },
  updateData:    { method: patch,   path: '/Users/:id' },
  destroyData:   { method: destroy, path: '/Users/:id' },
};

const config = {
  baseUrl: params.BaseUrl
};
 
const api = buildApi(apiEndpoints, config);

function replaceAll(str, find, replace) {
    return str;
}

const generateId = (data) => {
    return replaceAll(data.Name, ' ', '-');
};

var datas = [];

class UserApi{
    static getAllDatas(){
        var data = [];
        if(datas.length == 0)
         api.getDatas()
            .then((result)=>{
                var length = result.body.data.length;
                for ( var i = 0 ; i < length ; i++){
                    data = [];
                    data['id'] = result.body.data[i].id;
                    data['Comment'] = result.body.data[i].attributes.comment;
                    data['Email'] = result.body.data[i].attributes.email;
                    data['Name'] = result.body.data[i].attributes.name;
                    // data['Number'] = 1;
                    // data['User_id'] = result.body.data[i].attributes.user_id;
                    datas.push(data);
                }
            });
        return new Promise ((resolve)=>{
            setTimeout(()=>{
                resolve(Object.assign([],datas));
            },1500);
        });   
    }

    static saveData(data) {
        data = Object.assign({}, data); // to avoid manipulating object passed in.
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate server-side validation
                const minDataNameLength = 1;
                if (data.Name.length < minDataNameLength) {
                    reject(`Name must be at least ${minDataNameLength} characters.`);
                }

                if (data.id) {
                    const existingDataIndex = datas.findIndex(a => a.id === data.id);
                    datas.splice(existingDataIndex, 1, data);
                    var attributes = {
                        'name':data.Name,
                        'email':data.Email,
                        'comment':data.Comment,
                        // 'number':data.Number,
                        //'user_id':data.User_id
                    }
                    api.updateData({id:data.id},{data:{id:data.id,type:'User',attributes:attributes}});
                } else {

                    var attributes = {
                        'name':data.Name,
                        'email':data.Email,
                        'comment':data.Comment,
                        // 'number':data.Number,
                        // 'user_id':data.User_id
                    }
                    api.createData({data:{type:'User',attributes:attributes}})
                        .then((result)=>{
                            data.id = result.body.data.id;
                            datas.push(data);
                        })
                }
                resolve(data);
            }, delay);
        });
    }

    static getData(dataId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const existingDataIndex = datas.findIndex(data => data.id === dataId);
                const dataFound = Object.assign({}, datas[existingDataIndex]);
                resolve(dataFound);
            }, delay);
        });
    }

    static deleteData(dataId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const indexOfDataToDelete = datas.findIndex(data => data.id === dataId);
                datas.splice(indexOfDataToDelete, 1);
                api.destroyData({ id: dataId })
                resolve();
            }, delay);
        });
    }
}

export default UserApi;