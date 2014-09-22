var config = {};

config.proxy = "http://username:password@10.11.19.40:8080";
config.jira = {
    api: {
        host: "http://jira.hok.io"
    },
    base64credentials: 'c3lzYWRtaW46c3RlcGhlbjIz',
    project: {
        key: "RYR"
    },
    originatorFieldId: "10101"
};


config.jira.api.ticket = config.jira.api.host + "/rest/api/2/issue";
config.jira.api.search = config.jira.api.host + "/rest/api/2/search?jql=cf[" + config.jira.originatorFieldId + "]~";
config.jira.http = config.jira.api.host + "/browse/";

config.ldap = {
    server: {
        url: "ldap://ldap.forumsys.com:389",
        adminDn: "cn=read-only-admin,dc=example,dc=com",
        adminPassword: "password",
        searchBase: "ou=scientists,dc=example,dc=com",
        searchFilter: "(uid={{username}})"
    }
}

module.exports = config;
