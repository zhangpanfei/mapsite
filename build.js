var ejs = require("ejs");
var fs = require("fs");
var path = require("path"); //解析需要遍历的文件夹
const tools = require("./tools");

var distType = 1;
if (global.process.env.npm_config_argv) {
  let npmConfig = JSON.parse(global.process.env.npm_config_argv);
  if (npmConfig["original"][2] && npmConfig["original"][2] === "t2") {
    distType = 2;
  }
}

function delDir(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath); //递归删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
    fs.rmdirSync(path);
  }
}

var viewPath = path.join(__dirname, "views");
var outputPath = path.join(__dirname, "dist");

delDir(outputPath);
//process.exit();

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath);
}

const view = (filename) => {
  return path.join(viewPath, filename + ".html");
};

var langFiles = fs.readdirSync(path.join(__dirname, "langs"));

if (distType === 1) {
  langFiles.forEach((file) => {
    var langPath = path.join(
      outputPath,
      file.substring(0, file.lastIndexOf("."))
    );
    if (!fs.existsSync(langPath)) {
      fs.mkdirSync(langPath);
    }
  });
  fs.readdir(viewPath, (err, files) => {
    files.forEach((file) => {
      let stats = fs.statSync(path.join(viewPath, file));
      if (stats.isFile()) {
        langFiles.forEach((langFile) => {
          var local = langFile.substring(0, langFile.lastIndexOf("."));
          var langs = require("./langs/" + local);
          let name = file.substring(0, file.lastIndexOf("."));
          ejs.renderFile(
            view(name),
            {
              ...langs[name],
              header: langs["header"],
              lang: langs.lang,
              route: name,
              footer: langs["footer"],
              url: tools.url(langs.lang),
              link: tools.link(langs.lang),
            },
            (err, str) => {
              fs.writeFile(path.join(outputPath, local, file), str, (err) => {
                if (err) {
                  console.log(`创建${path.join(outputPath, local, file)}失败`);
                } else {
                  console.log(`创建${path.join(outputPath, local, file)}成功`);
                }
              });
            }
          );
        });
      }
    });
  });
} else if (distType === 2) {
  fs.readdir(viewPath, (err, files) => {
    files.forEach((file) => {
      let stats = fs.statSync(path.join(viewPath, file));
      if (stats.isFile()) {
        langFiles.forEach((langFile) => {
          var local = langFile.substring(0, langFile.lastIndexOf("."));
          var langs = require("./langs/" + local);
          let name = file.substring(0, file.lastIndexOf("."));
          let tplPtah = path.join(outputPath, name);
          if (!fs.existsSync(tplPtah)) {
            fs.mkdirSync(tplPtah);
          }
          let tplLangPath = path.join(tplPtah, local);
          if (!fs.existsSync(tplLangPath)) {
            fs.mkdirSync(tplLangPath);
          }
          let tplLangPathFile = path.join(tplLangPath, "index.html");
          ejs.renderFile(
            view(name),
            {
              ...langs[name],
              header: langs["header"],
              footer: langs["footer"],
              url: tools.url(langs.lang),
            },
            (err, str) => {
              fs.writeFile(tplLangPathFile, str, (err) => {
                if (err) {
                  console.log(`创建${tplLangPathFile}失败`);
                } else {
                  console.log(`创建${tplLangPathFile}成功`);
                }
              });
            }
          );
        });
      }
    });
  });
}

const movePath = (fromPath, toPath) => {
  if (!fs.existsSync(toPath)) {
    fs.mkdirSync(toPath);
  }
  fs.readdir(fromPath, (err, files) => {
    files.forEach((file) => {
      let filePath = path.join(fromPath, file);
      if (fs.statSync(filePath).isDirectory()) {
        movePath(path.join(fromPath, file), path.join(toPath, file));
      } else {
        fs.readFile(filePath, (err, str) => {
          if (err) {
            console.log(`拷贝${filePath}失败`);
          } else {
            fs.writeFile(path.join(toPath, file), str, (err) => {
              if (err) {
                console.log(`创建${path.join(toPath, file)}失败`);
              } else {
                console.log(`创建${path.join(toPath, file)}成功`);
              }
            });
          }
        });
      }
    });
  });
};

movePath(
  path.join(__dirname, "public", "static"),
  path.join(outputPath, "static")
);
