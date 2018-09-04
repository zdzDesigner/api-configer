## api-configer
> 接口配置化模块


```js
    import resource ,{ axios } from 'api-configer'
    
    const api = resource({
            user:{
                get:'./user/info'
            },
            account:{
                login:{
                    post:'./account/login'
                }
            }
        })

    api.user().then()
    api.account.login().then()
    
    // 拦截器
    axios.interceptors.response
    axios.interceptors.request
```


### 差值参数

```js 
region_post:{
    post:'./region/update?id={id}',
}
配置中参数规则
{id} => 参数必填
{id:3} => 默认参数
{id:} => 默认为空,region_post({}) 映射的接口为 => ./region/update
```

### payload 请求方式

1. application/json
2. application/x-www-form-urlencoded

payload:Boolean , default:true

```js 
region_post:{
    post:'./region/update?id={id}',
    payload:false
}
```

### withCredentials 跨域携带凭证 

withCredentials:Boolean , default:false

```js 
region_post:{
    post:'./region/update?id={id}',
    payload:false
}
```

### abort 中断请求

当重复发送请求时，中断未响应的请求（但保留最后一个请求）

payload:Boolean , default:false

```js 
region_post:{
    post:'./region/update?id={id}',
    abort:true
}
```

### compile

是否对url做编译

payload:Boolean , default:true

```js
export default {
    user_list:{
        get:'./user/list?aaa={bbb}'
        compile:false
    }
}
```
**生成 => Request URL:you root/user/list?aaa={bbb}**


### model 中 api 根路径配置 (ROOT)

axios全局配置在config mock中 *axios.defaults.baseURL*

有时期望特殊配置 如下
```js
export default {
    ROOT:'http://www.baidu.com/console',
    user_list:{
        get:'./user/list'
    },
    user_list2:{
        get:'../user/list'
    }
}
```
*user_list生成 => Request URL:http://www.baidu.com/console/user/list*
*user_list2生成 => Request URL:http://www.baidu.com/user/list*




## api schema 配置

> 目的：为了解决服务端返回数据不可信问题, 业务场景如下
>> 期望的字段类型是 plan object=>{}, 但是服务端返回null, 或其他基本类型，获取属性时出现 the_key is not defined 错误，导致页面 block；plan array => [], 场景和 object 一致

>> 期望为Number类型 返回String 如：'33', '33' => 33

>> 测试同学可以通过 warn log 定位到 bug 根源，不必通过前端中转

> 处理，根据以上经常出现的问题，做了如下两步主要处理
>>  1. 抛错：抛出 warn 警告

>>  2. 重写：根据定义的类型重写返回字段

>>  响应结果如下：

![avatar](/assets/readme/schema_warn.png)

> 类型配置：服务端返回的JSON对象数据类型
>>  引用类型：Object=> {}、Array=> []

>>  基本类型：String、Number、Boolean

> *规则：添加验证规则的字段开启验证，未添加的忽略验证*
>>  *如下接口，在文档中有company字段，但验证规则中未添加company字段，则忽略company验证*

```js
export default {
    ...
    user_list:{
        get:'./user/info',
        // 这里既是schema配置
        schema:{
            data:{
                user:{
                    name:String
                },
                currentPermission:[Number],
                groupList:[{
                    companyId:Number,
                    companyName:String,
                    companyShortName:String
                    ...
                }]

            }
        }
    }
    ...
}
```

