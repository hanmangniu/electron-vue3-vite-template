import { app, BrowserWindow } from "electron";
import path from "path";
import electron from "electron";

const ipc = electron.ipcMain;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    show: false,
    webPreferences: {
      contextIsolation: false, // 是否开启隔离上下文
      nodeIntegration: true, // 渲染进程使用Node API
      preload: path.join(__dirname, "../electron/preload.js"), // 需要引用js文件
    },
  });

  // 如果打包了，渲染index.html
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "../index.html"));
  } else {
    let url = "http://localhost:3000"; // 本地启动的vue项目路径
    win.loadURL(url);
  }
  //隐藏顶部菜单
  win.setMenu(null);
  //每次窗口渲染完成后会触发该事件
  win.once("ready-to-show", () => {
    win.show();
  });
  //测试时打开 打开开发者工具
  // win.webContents.openDevTools({ mode: "right" });
};

app.whenReady().then(() => {
  createWindow(); // 创建窗口
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 关闭窗口
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
