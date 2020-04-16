const tools = require('../tools');

var link = tools.link('zh_CN')
var url = tools.url('zh_CN')

module.exports = {
    lang: 'zh_CN',
    header: {
        title: 'Home',
        navi: [
            {name:'Home',link:link('/index'),route:'index'},
            {name:'News',link:link('/news'),route:'news'},
        ],
    },
    footer: {

    },
    index: {	//首页
        title: '首页',
        visitor: {} 
    },
}