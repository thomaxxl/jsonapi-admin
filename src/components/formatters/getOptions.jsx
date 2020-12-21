import {APP} from '../../Config.jsx'
import ObjectApi from '../../api/ObjectApi'

function getOptions(collection){
    /*
      return an option list for the <Async> select filter
    */
    if(!collection || !APP[collection]){
      console.log('Invalid Collection')
      return {}
    }
    let attr = APP[collection].main_show
  
    var label = attr // attribute to be used for the label
    var offset = 0
    var limit = 20  
    var result 
    
    result = (input, callback) => {
          let api_endpoint = ObjectApi.search(collection, { "query" : `${input}` }, offset, limit)
          api_endpoint.then((result) => {
              let options = result[collection].data.map(function(item){ return { value: item.id, label: item.attributes[label]} } )
              setTimeout(() => {
              callback(options);
              }, 200);
          })
          .catch((err)=>{console.warn(err)})
      }
  
    return result
  }

export default getOptions;