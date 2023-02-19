import axios from 'axios'
import { Settings } from '../../components/Models/Fetch/Settings'

export default function call(config: Settings){
    return axios(config).then((response)=>{
      return response
    }).catch(function (error) {
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