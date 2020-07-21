const onlyUniq = function (item, index, self) {
  return self.indexOf(item) === index;
};

const distinctBy = function (groupName) {
  return function (item, index, self) {
    return self.findIndex((el) => el[groupName] === item[groupName]) === index;
  };
};

Array.prototype.toArray = function (aggregateFieldName) {
  const _this = this.clone();
  return {
    groupBy: function (groupName) {
      return aggregate(_this, aggregateFieldName, groupName);
    },
  };
};

Array.prototype.sum = function (aggregateFieldName) {
  const _this = this.clone();
  const sum = function (values) {
    let ret = 0;
    values.map((value) => (ret += value));
    return ret;
  };
  return {
    groupBy: function (groupName) {
      return aggregate(_this, aggregateFieldName, groupName, sum);
    },
  };
};

Array.prototype.average = function (aggregateFieldName) {
  const _this = this.clone();
  const average = function (values) {
    let ret = 0;
    values.map((value) => (ret += value));
    return ret / values.length;
  };
  return {
    groupBy: function (groupName) {
      return aggregate(_this, aggregateFieldName, groupName, average);
    },
  };
};

Array.prototype.max = function (aggregateFieldName) {
  const _this = this.clone();
  const average = function (values) {
    let ret = -Infinity;
    values.map((value) => (ret = value > ret ? value : ret));
    return ret;
  };
  return {
    groupBy: function (groupName) {
      return aggregate(_this, aggregateFieldName, groupName, average);
    },
  };
};

Array.prototype.clone = function () {
  return JSON.parse(JSON.stringify(this));
};

Array.prototype.min = function (aggregateFieldName) {
  const _this = this.clone();
  const min = function (values) {
    let ret = Infinity;
    values.map((value) => (ret = value < ret ? value : ret));
    return ret;
  };
  return {
    groupBy: function (groupName) {
      return aggregate(_this, aggregateFieldName, groupName, min);
    },
  };
};

const aggregate = function (
  array,
  aggregateFieldName,
  groupName,
  aggregateFunc
) {
  const groupByFilter = function (item, index, self) {
    const foundIndex = self.findIndex(
      (el) => el[groupName] === item[groupName]
    );
    if (foundIndex > -1) {
      if (foundIndex === index) {
        self[foundIndex][aggregateFieldName] = [item[aggregateFieldName]];
      } else {
        self[foundIndex][aggregateFieldName].push(item[aggregateFieldName]);
      }
      return foundIndex === index;
    } else {
      return false;
    }
  };
  const groupedArray = array.filter(groupByFilter);
  if (aggregateFunc)
    groupedArray.map(
      (item) =>
        (item[aggregateFieldName] = aggregateFunc(item[aggregateFieldName]))
    );
  return groupedArray;
};

const input = [1, 1, 3, 4, 4, 5, 5, 7, "a", "b", "a"];
const inputObjects = [
  { name: "Ali", age: 341 },
  { name: "Ali1", age: 342 },
  { name: "Ali2", age: 343 },
  { name: "Ali2", age: 344 },
  { name: "Ali3", age: 345 },
  { name: "Ali3", age: 346 },
  { name: "Ali4", age: 347 },
  { name: "Ali4", age: 3 },
];
// console.log(input.filter(onlyUniq).join());
// console.log(inputObjects);
console.log(inputObjects.toArray("age").groupBy("name"));
console.log(inputObjects.min("age").groupBy("name"));
console.log(inputObjects.max("age").groupBy("name"));
console.log(inputObjects.average("age").groupBy("name"));
console.log(inputObjects.sum("age").groupBy("name"));
