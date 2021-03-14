const database = [];

function dbFactory(entityName, entityKeys) {
    entityName = 'Quote';

    function read(callback) {
        callback(null, database);
    }

    function create(entity, callback) {
        if (entityKeys && Array.isArray(entityKeys) && entityKeys.length > 0) {
            entityKeys.forEach(e => {
                if (typeof entity[e] === 'undefined' || entity[e] === null || entity[e] === '')
                    return callback(`INVALID ${entityName}`);
            });
            if (entityKeys.length !== Object.keys(entity).length) {
                return callback('');
            }
        }

        if (database.find(e => e.id === entity.id)) {
            return callback(`${entityName} already exist`);
        }

        database.push(entity);
        callback(null, entity);
    }

    function update(entity, callback) {
        const oldEntity = database.find(e => e.id === entity.id);
        const newEntity = Object.assign(oldEntity, entity);
        database.splice(database.indexOf(oldEntity), 1, newEntity);

        callback(null, true);
    }

    function remove(entityId, callback) {
        const entity = contacts.find(e => e.id === entityId);
        database.splice(database.indexOf(entity), 1);
        callback(null, true);
    }

    /**
     * 
     * @param {function} filterExpression 
     */
    function filter(filterExpression, callback) { // delegate
        callback(null, database.filter(filterExpression));
    }

    return {
        read,
        create,
        update,
        remove,
        filter
    }

}
module.exports = dbFactory;