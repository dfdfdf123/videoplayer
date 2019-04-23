import "@babel/polyfill";
import Example from './Example';

export default () => {
  const element = document.getElementById('videoplayer');
  const obj = new Example(element);
  obj.init();
};