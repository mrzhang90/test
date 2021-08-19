const fs = require('fs-extra');
const git = require('simple-git');
const path = require('path');

//需要配置的信息
const dir = path.join(__dirname);
const dirRM = path.join(dir, `/recordLeah.js`);

const user = '张广森';
const email = '757927051@qq.com';

execProcess();

async function execProcess() {
  await writeFile();
}

async function writeFile() {
  try {
    const gitTarget = git(dir);
    gitTarget.pull('origin', 'test');
    //判断是否存在recordLeah.js文件 没有则创建
    await fs.ensureFile(dirRM);
    const record = `update${Date.now()}`;
    //添加内容
    await fs.appendFile(dirRM, `git auto commit: ${record} \n`);
    //一定要控制好异步操作同步化 要不然会只有一个commit
    await gitTarget.add('./*').commit(`git auto commit: ${record}`, {
      '--author': `"${user} <${email}>"`,
      '--date': `${Date.now()}`,
    });
    //多个commit合并成一次提交
    gitTarget.push('origin', 'test');
  } catch (error) {
    console.log('error', error);
  }
}
