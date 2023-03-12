import axios from 'axios'
import { AxiosOptions } from '../../components/Models/Fetch/AxiosOptions'

export default function call(config: AxiosOptions){
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