# javascript 事件循环-EventLoop

## 宏任务

## 微任务

```javascript
console.log('start');
setTimeout(() => {
  console.log('setTimeout');
}, 0);
new Promise(() => {
  let chain = Promise.resolve();
  chain.then(() => console.log('chain1'));
  chain.then(() => console.log('chain2'));
  chain.then(() => console.log('chain3'));
});
let chain = Promise.resolve();
chain.then(() => console.log('chain4'));
setTimeout(() => {
  let chain = Promise.resolve();
  chain.then(() => console.log('chain5'));
}, 0);
console.log('end');
// start end chain1 chain2 chain3 chain4 setTimeout chain5
```
