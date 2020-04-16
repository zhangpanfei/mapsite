const tools = require('../tools');

var link = tools.link('zh_CN')
var url = tools.url('zh_CN')

module.exports = {
    lang: 'zh_CN',
    header: {
        title: '首页',
        navi: [
            {name:'首页',link:link('/index'),route:'index'},
            {name:'新闻',link:link('/news'),route:'news'},
        ],
    },
    footer: {

    },
    index: {	//首页
        title: '首页',
        visitor: {} 
    },
}