const neo4j = require('neo4j-driver').v1;


var driver = neo4j.driver(process.env.NEO4J_URL, neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD));
var session = driver.session();

function getAll(callback) {
    var stations = [];
    session
        .run('MATCH (n) RETURN n')
        .then((result) => {
            result.records.forEach(function (record) {
                stations.push({
                    name: record._fields[0].properties.name,
                    coord: {
                        lat: record._fields[0].properties.coord[0],
                        lon: record._fields[0].properties.coord[1]
                    }
                });
            });
            session.close();
            callback(stations)
        })
        .catch(err => console.log(err));
}

module.exports = getAll;