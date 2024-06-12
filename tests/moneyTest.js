import {formatcurrency} from '../scripts/utils/money.js';

console.log('test suite : formatcurrency');
console.log('convert cents into dollars');

if(formatcurrency(2095)==='20.95'){
console.log('passed');
}
else{
  console.log('failed');
}

console.log('works with 0');

if(formatcurrency(0)==='0.00'){
  console.log('passed');
  }
  else{
    console.log('failed');
  }
  
console.log('rounds upto the nearest cents');

  if(formatcurrency(2000.5)==='20.01'){
    console.log('passed');
  }
  else{
    console.log('failed');
  }
  