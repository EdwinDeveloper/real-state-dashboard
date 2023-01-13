export const apiCall = async (fun, request, token) => {
    const response = await fun(request, token)
    let res = {
        status: response.status,
        body: response.body
    }
    if([ 200 ].includes(res.status)){
        if('token' in response.data){
            res["token"] = response.data.token
        }else{
            res = response.data
        }
    }else if([ 201 ].includes(res.status)){
        res['data'] = response.data.data
        res["messages"] = message_builder(response.data)
    }else if( [400, 500, 501, 503].includes(res.status)){
        res["messages"] = message_builder(res.body)
        delete res['body']
    }
     return res
}

const message_builder = (body) => {
    if('data' in body) delete body['data']
    if('status' in body) delete body['status']
    const entries = Object.entries(body)
    let messages = []
    entries.forEach(entrie => {
        messages.push({
            key: entrie[0],
            value: entrie[1][0]
        })
    })
    return messages
}