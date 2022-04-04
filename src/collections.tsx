import { parse } from "date-fns";


export const coalesce = (...args) => args.find((_) => ![null, undefined].includes(_));


export const parsedDate = (item) => {
  const deliveryDateKey = "Delivery Date (from Order)";
  const dateStr = item[deliveryDateKey] ? item[deliveryDateKey][0] : null;
  if (dateStr) {
    // return parse(dateStr[0], "MMddyyyy", new Date());
    return parse(dateStr, "yyyy-MM-dd", new Date());
  }
  return dateStr;
};



function alphabetically(ascending) {
  return function (a, b) {
    // equal items sort equally
    if (a === b) {
      return 0;
    }
    // nulls sort after anything else
    else if (a === null) {
      return 1;
    } else if (b === null) {
      return -1;
    }
    // otherwise, if we're ascending, lowest sorts first
    else if (ascending) {
      return a < b ? -1 : 1;
    }
    // if descending, highest sorts first
    else {
      return a < b ? 1 : -1;
    }
  };
}



export const byDeliveryDate = (orderA, orderB) => {
  const a = orderA.deliveryDate;
  const b = orderB.deliveryDate;
  // equal items sort equally
  if (a === b) {
    return 0;
  }
  // nulls sort after anything else
  else if (a == null) {
    return 1;
  } else if (b == null) {
    return -1;
  }
  return a - b;
};



export const groupOrders = (items) => {
  return items.reduce(function (storage, item) {
    const orderId = item["Order #"][0];
    const recordId = item["Order"][0];
    const readyToPickup = item["Ready to pickup"] == true;
    const handledToDriver = item["Handled to driver"] == true;
    let el = storage.find((r) => r && r.orderId === orderId);
    const deliveryDate = parsedDate(item);
    if (el) {
      el.orders.push(item);
      el.deliveryDate = deliveryDate;
    } else {
      const orders = [item];
      storage.push({ deliveryDate, orderId, orders, readyToPickup, handledToDriver, recordId });
    }
    return storage;
  }, []);
};




var groupBy = function (data, key) {
  // `data` is an array of objects, `key` is the key (or property accessor) to group by
  // reduce runs this anonymous function on each element of `data` (the `item` parameter,
  // returning the `storage` parameter at the end
  // {Object.entries<[]>(groups).map(([key, items], _index) => (
  //   <OrdersGroup key={key} orders={items} groupId={key} />
  // ))}
  return data.reduce(function (storage, item) {
    // get the first instance of the key by which we're grouping
    var group = item[key];
    // set `storage` for this instance of group to the outer scope (if not empty) or initialize it
    storage[group] = storage[group] || [];
    // add this item to its group within `storage`
    storage[group].push(item);
    // return the updated storage to the reduce function, which will then loop through the next
    return storage;
  }, {}); // {} is the initial value of the storage
};



