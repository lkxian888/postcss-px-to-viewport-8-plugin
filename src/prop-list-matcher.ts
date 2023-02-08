const filterPropList = {
  exact(list: string[]) {
    return list.filter((m: string) => {
      return m.match(/^[^\*\!]+$/);
    });
  },
  contain(list: string[]) {
    return list
      .filter(m => {
        return m.match(/^\*.+\*$/);
      })
      .map(m => {
        return m.substr(1, m.length - 2);
      });
  },
  endWith(list: string[]) {
    return list
      .filter(m => {
        return m.match(/^\*[^\*]+$/);
      })
      .map(m => {
        return m.substr(1);
      });
  },
  startWith(list: string[]) {
    return list
      .filter(m => {
        return m.match(/^[^\*\!]+\*$/);
      })
      .map(m => {
        return m.substr(0, m.length - 1);
      });
  },
  notExact(list: string[]) {
    return list
      .filter(m => {
        return m.match(/^\![^\*].*$/);
      })
      .map(m => {
        return m.substr(1);
      });
  },
  notContain(list: string[]) {
    return list
      .filter(m => {
        return m.match(/^\!\*.+\*$/);
      })
      .map(m => {
        return m.substr(2, m.length - 3);
      });
  },
  notEndWith(list: string[]) {
    return list
      .filter(m => {
        return m.match(/^\!\*[^\*]+$/);
      })
      .map(m => {
        return m.substr(2);
      });
  },
  notStartWith(list: string[]) {
    return list
      .filter(m => {
        return m.match(/^\![^\*]+\*$/);
      })
      .map(m => {
        return m.substr(1, m.length - 2);
      });
  },
};

const createPropListMatcher = (propList: string[]) => {
  const hasWild = propList.indexOf('*') > -1;
  const matchAll = hasWild && propList.length === 1;
  const lists = {
    exact: filterPropList.exact(propList),
    contain: filterPropList.contain(propList),
    startWith: filterPropList.startWith(propList),
    endWith: filterPropList.endWith(propList),
    notExact: filterPropList.notExact(propList),
    notContain: filterPropList.notContain(propList),
    notStartWith: filterPropList.notStartWith(propList),
    notEndWith: filterPropList.notEndWith(propList),
  };
  return function(prop: string) {
    if (matchAll) return true;
    return (
      (hasWild ||
        lists.exact.indexOf(prop) > -1 ||
        lists.contain.some(m => {
          return prop.indexOf(m) > -1;
        }) ||
        lists.startWith.some(m => {
          return prop.indexOf(m) === 0;
        }) ||
        lists.endWith.some(m => {
          return prop.indexOf(m) === prop.length - m.length;
        })) &&
      !(
        lists.notExact.indexOf(prop) > -1 ||
        lists.notContain.some(m => {
          return prop.indexOf(m) > -1;
        }) ||
        lists.notStartWith.some(m => {
          return prop.indexOf(m) === 0;
        }) ||
        lists.notEndWith.some(m => {
          return prop.indexOf(m) === prop.length - m.length;
        })
      )
    );
  };
};
export { filterPropList, createPropListMatcher };
