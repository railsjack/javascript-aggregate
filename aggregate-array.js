Array.prototype.min = function () {
  let ret = Infinity;
  this.map((value) => {
    if (typeof value === "number") ret = value < ret ? value : ret;
  });
  return ret;
};

Array.prototype.max = function () {
  let ret = -Infinity;
  this.map((value) => {
    if (typeof value === "number") ret = value > ret ? value : ret;
  });
  return ret;
};

Array.prototype.average = function () {
  return this.sum() / this.countOnlyNumbers();
};

Array.prototype.sum = function () {
  let ret = 0;
  this.map((value) => {
    if (typeof value === "number") ret += value;
  });
  return ret;
};

Array.prototype.countOnlyNumbers = function () {
  let ret = 0;
  this.map((value) => {
    if (typeof value === "number") ret++;
  });
  return ret;
};

const input = ["a", "b", "d", "asdfads"];
const input2 = [0, 1, 2, 2, 12, 34, "asdfasd", 123, 1, 3, 41, 32];

console.log(input2.min());
console.log(input2.max());
console.log(input2.average());
console.log(input2.sum());
