Array.prototype.distinct = function () {
  return this.filter((item, index, self) => self.indexOf(item) === index);
};

Array.prototype.concatBy = function (aggregateFieldName) {
  const _this = this.clone2();
  return {
    groupBy: function (groupName) {
      return aggregate(_this, aggregateFieldName, groupName);
    },
  };
};

Array.prototype.distinctBy = function (groupName) {
  return this.filter(function (item, index, self) {
    return self.findIndex((el) => el[groupName] === item[groupName]) === index;
  });
};

Array.prototype.sumBy = function (aggregateFieldName) {
  const _this = this.clone2();
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

Array.prototype.averageBy = function (aggregateFieldName) {
  const _this = this.clone2();
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

Array.prototype.maxBy = function (aggregateFieldName) {
  const _this = this.clone2();
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
  return [...this];
};

Array.prototype.clone2 = function () {
  return JSON.parse(JSON.stringify(this));
};

Array.prototype.minBy = function (aggregateFieldName) {
  const _this = this.clone2();
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
console.log(input.distinct());
console.log(inputObjects.distinctBy("name"));
console.log(inputObjects.concatBy("age").groupBy("name"));
console.log(inputObjects.minBy("age").groupBy("name"));
console.log(inputObjects.maxBy("age").groupBy("name"));
console.log(inputObjects.averageBy("age").groupBy("name"));
console.log(inputObjects.sumBy("age").groupBy("name"));
