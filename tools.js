let isBuild = false;

if (global.process.env.npm_config_argv) {
  let npmConfig = JSON.parse(global.process.env.npm_config_argv);
  if (npmConfig["original"][1] && npmConfig["original"][1] === "build") {
    isBuild = true;
  }
}

module.exports = {
  url: function (lang) {
    return function (path) {
      // return `/${lang}/static${path}`;
      if (isBuild) {
        return `./static/${path}`.replace("//", "/");
      } else {
        return `/static/${path}`.replace("//", "/");
      }
    };
  },
  link: function (lang) {
    return function (path) {
      // return `/${lang}/static${path}`;
      // return `/${lang}/${path}`.replace('//','/');
      if (isBuild) {
        if (path == "/") {
          path = "/index";
        }
        if (path.indexOf("#") > -1) {
          return `./${path}`.replace("//", "/").replace("#", ".html#");
        }
        return `./${path}`.replace("//", "/") + ".html";
      } else {
        return `/${path}`.replace("//", "/");
      }
    };
  },
};
