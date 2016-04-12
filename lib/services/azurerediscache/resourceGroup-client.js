/* jshint camelcase: false */
/* jshint newcap: false */

var msRestAzure = require('ms-rest-azure');
// var AzureEnvironment = require('ms-rest-azure').AzureEnvironment;
var azureMgtResourceGroup = require('azure-arm-resource');

var resourceGroup;

exports.instantiate = function(azure) {

    // var options = {
    //     AzureEnvironment : AzureEnvironment.Azure
    // };
    // if (azure.environment === 'AzureChinaCloud') options.AzureEnvironment = AzureEnvironment.AzureChina;

    // var appTokenCreds = new msRestAzure.ApplicationTokenCredentials(
    //     azure.client_id, azure.tenant_id, azure.client_secret, options);

    var appTokenCreds = new msRestAzure.ApplicationTokenCredentials(
        azure.client_id, azure.tenant_id, azure.client_secret);

    var rc = new azureMgtResourceGroup.ResourceManagementClient(appTokenCreds, azure.subscription_id);
    resourceGroup = rc.resourceGroups;    

};

exports.createOrUpdate = function(resourceGroupName, groupParameters, next) {
    resourceGroup.createOrUpdate(resourceGroupName, groupParameters, function (err, result, request, response) {
        next(err, result);
    });
};

exports.checkExistence = function(resourceGroupName, next) {
    resourceGroup.checkExistence(resourceGroupName, function (err, result, request, response) {
        next(err, result);
    });
};