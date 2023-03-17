sap.ui.define(
    [
        "MyUI5WebApp/src/app/Controller",
        
    ], function(Controller){
        "use strict";

        return Controller.extend("MyUI5WebApp.src.pages.infoTarefas.InfoTarefas", {
            onInit : function () {
               console.log("deu certo");
            },
        })
        
    }
);