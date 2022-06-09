pub fun main(): {String: AnyStruct} {

    let mutableData : {String: AnyStruct} = {   
                  "qwerty" : "asd",
                  "qqq" : "rrr",
                  "aa":"bb"
                
              }

               let newData : {String: AnyStruct} = {   
                  "troy" : "boss",
                  "qqq" : "ppp",
                  "aa":"dd"
                
              }

              let a=newData.keys
              let v=newData.values

              var i=0
              while i<newData.length
              {
                mutableData.insert(key: a[i], v[i])
                i=i+1
              }

              return mutableData
}


