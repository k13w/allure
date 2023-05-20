import { lstat } from 'node:fs/promises'
import { cwd } from 'node:process'
import { ipcRenderer } from 'electron'

ipcRenderer.on('main-process-message', (_event, ...args) => {
  console.log('[Receive Main-process message]:', ...args)
})


ipcRenderer.invoke("open-file").then((fileData) => {
  if (fileData) {
    try {
      const jsonData = JSON.parse(fileData);
      console.log("invokeeee", jsonData)
    } catch (parseError) {
      console.error("Erro ao fazer o parse do JSON:", parseError);
    }
  }
});

const result = ipcRenderer.sendSync('async', 'ola render')
console.log("result", result)

lstat(cwd()).then(stats => {
  console.log('[fs.lstat]', stats)
}).catch(err => {
  console.error(err)
})
