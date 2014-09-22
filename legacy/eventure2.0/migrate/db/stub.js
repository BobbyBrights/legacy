exports.populatePromoters = function(db) {
    console.log("Populating Promoters.. ");
    var records = [
        {
            "name": "Aiken",
        },
        {
            "name": "MCD Promotions",
        }
    ];
    db.collection('promoters', function(err, collection) {
        collection.insert(records, {safe:true}, function(err, result) {});
    });
};

exports.populateEvents = function(db) {
    console.log("Populating Events.. ");
    var records = [
        {
            "name": "Electric Picnic",
            "max_capacity": 120000,
            "date_from": "11/08/2014",
            "date_to": "13/08/2014",
        },
        {
            "name": "Oxegen",
            "max_capacity": 120000,
            "date_from": "11/08/2014",
            "date_to": "13/08/2014",
            "promoter_id": 1,
        }
    ];

    db.collection('events', function(err, collection) {
        collection.insert(records, {safe:true}, function(err, result) {

        });
    });
};
