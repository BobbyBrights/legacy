/**
 * Created by stephen on 14/02/2014.
 */
module.exports = {
    live: {
        host: "eventure.pixiewebdesign.net",
        port: "27017",
        dbname: "eventure",
        options: {
            auto_reconnect: true,
            safe: false
        }
    },
    test: {
        host: "localhost",
        port: "27017",
        dbname: "eventure",
        options: {
            auto_reconnect: true,
            safe: false
        }
    }

}