import axios from 'axios'

export default function call(config){
    return axios(config).then((response)=>response).catch(function (error) {
      
       if(error.response){
          return {
             status: error.response.status,
             body: error.response.data
          }
       }else if(error.request){
          return {
             status: 500,
             body: {
                "error": [error.message]
             }
          }
       }else {
          return {
             status: 500,
             body: {
                "error": [error.message]
             }
          }
       }
   })
 }