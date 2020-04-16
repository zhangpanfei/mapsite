const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
var ejs = require('ejs');
const tools = require('./tools')

app.engine('html', ejs.__express);
app.set('view engine', 'html')
app.use(express.static(path.join(__dirname, 'public')));

// 配置
var CONFIG = {
	port: 100,
	lang: 'zh_CN'
}
var langs =  require('./langs/'+CONFIG.lang);

// 中间件
var setLang = (req, res, next) => {
  if (req.query.lang) {
  	CONFIG.lang = req.query.lang
  	langs =  require('./langs/'+CONFIG.lang);
  } else {
  	langs =  require('./langs/zh_CN');
  }
  console.log(req.url +' '+ (new Date()))
  next()
}
app.use(setLang)

fs.readdirSync(path.join(__dirname, 'views')).map(file=>{
	// 路由
	let route = file.substring(0,file.lastIndexOf('.'))
	if (route==='index') {
		app.get('/', (req, res) => {
		  res.render(file, {...langs[route],header:langs['header'],lang:langs.lang,route,footer:langs['footer'],url:tools.url(langs.lang),link:tools.link(langs.lang)})
		})
	}
	app.get('/'+route, (req, res) => {
	  res.render(file, {...langs[route],header:langs['header'],lang:langs.lang,route,footer:langs['footer'],url:tools.url(langs.lang),link:tools.link(langs.lang)})
	})
	console.log(file.substring(0,file.lastIndexOf('.')))
})


// 服务启动
app.listen(CONFIG.port, () => console.log(`app listening on port ${CONFIG.port}!`))