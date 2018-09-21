import keys from 'lodash/keys'

export const noErrors = (collection) => keys(collection)
.filter(value => !/(\$\w*)/g.test(value))
.reduce((acc, field) => {
    const fieldObj = collection[field];
    const anyErr = keys(fieldObj).filter(value => !/(\$\w*)/g.test(value))
        .reduce((acc, value) =>  fieldObj[value] && acc, true);
    return acc && anyErr;
}, true)


export const updateArray = (array, newItem) => {
    const objectWithKeys = array.reduce((acc, item) => Object.assign(acc, { [item.id] : item }), {})
    objectWithKeys[newItem.id] = newItem;
    return keys(objectWithKeys).reduce((acc, key) => acc.concat([ objectWithKeys[key] ]), [])
}