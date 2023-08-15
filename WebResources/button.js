var MyButton = window.MyButton || {};
(async function () {
    // Define some global variables
    var myUniqueId = '_myUniqueId'; // Define an ID for the notification
    var currentUserName = Xrm.Utility.getGlobalContext().userSettings.userName; // get current user name
    var message = currentUserName + ': Your JavaScript code in action!';

    // Code to run in the form OnLoad event
    this.formOnLoad = function (executionContext) {
        var formContext = executionContext.getFormContext();



const setEvent = async () => {
    let wrControl = formContext.getControl('WebResource_new_1');
    let contentWindow;
    if (wrControl) {
        contentWindow = await wrControl.getContentWindow();
    }

    if(contentWindow){
        // console.log('contentWindow', contentWindow);
        let btnElem = contentWindow.document.getElementById('btn');
        let btnElem2 = contentWindow.document.getElementById('btn2');
        if(btnElem && btnElem2){
            btnElem.addEventListener('click', function(){
                // Display the form level notification as an INFO
                formContext.ui.setFormNotification(message, 'INFO', myUniqueId);

                // Wait for 5 seconds before clearing the notification
                window.setTimeout(function () { formContext.ui.clearFormNotification(myUniqueId); }, 5000);
            });
            btnElem2.addEventListener('click', function(){
                formContext.getAttribute('ya_name').setValue('Updated!');
            });
            return;
        }
    }

    window.setTimeout(function () { setEvent() }, 500);
};
setEvent();



    }

    // Code to run in the column OnChange event 
    this.attributeOnChange = function (executionContext) {
        var formContext = executionContext.getFormContext();

        // Automatically set some column values if the account name contains 'Contoso'
        var recordName = formContext.getAttribute('name').getValue();
        if (recordName.toLowerCase().search('contoso') != -1) {
            formContext.getAttribute('name').setValue(recordName.toLowerCase());
        }
    }

    // Code to run in the form OnSave event 
    this.formOnSave = function () {
        // Display an alert dialog
        Xrm.Navigation.openAlertDialog({ text: 'Record saved.' });
    }
}).call(MyButton);
