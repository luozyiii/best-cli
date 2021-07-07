const path = require('path');
const findUp = require('find-up');

(async () => {
  console.log(await findUp('package.json'));
  //=> '/Users/luozhiyi/Work/project/best-cli/lerna-best/package.json'

  console.log(await findUp(['rainbow.png', 'package.json']));
  //=> '/Users/luozhiyi/Work/project/best-cli/lerna-best/package.json'

  console.log(
    await findUp(
      async (directory) => {
        const hasUnicorns = await findUp.exists(path.join(directory, 'package.json'));
        return hasUnicorns && directory;
      },
      { type: 'directory' },
    ),
  );
  //=> '/Users/luozhiyi/Work/project/best-cli/lerna-best'
})();
