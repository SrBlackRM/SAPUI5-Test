sap.ui.define(
	[
		"MyUI5WebApp/src/app/BaseController",
		'MyUI5WebApp/model/RestModel',
		"sap/m/ColumnListItem",
	],
	function (BaseController, RestModel, ColumnListItem) {
	"use strict";
	
	let RM = new RestModel();

	RM.setUrl("https://jsonplaceholder.typicode.com");
	let objects = RM.get("todos");
	

	return BaseController.extend("MyUI5WebApp.src.pages.listaTarefas.ListaTarefas", {

		onInit : function () {	
			
			this.listObject("");
			
		},

		onSearch : function(oEvent){
			let sQuery = oEvent.getParameter("query");
			this.listObject(sQuery);
		},

		listObject : async function(filter) {
			let listStringsInFilter = filter.split();
			let oTable = this.getView().byId('table');
			
			oTable.removeAllItems();

			async function createListItems(result){			

				let oColumnListItem = await new ColumnListItem({
					type: "Navigation",
					press: onItemListPress,
					cells: [
						new sap.m.ObjectIdentifier({ title:result.id, text:"Status:"}),
						new sap.m.Text({ text: result.title }),
					],
					//id: `id${result.id}`,
				});
				oTable.addItem(oColumnListItem);

				function onItemListPress(oEvent){
					let sPath = oEvent.getSource().getBindingContext().getPath();
					let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					let sId = this.getView().getModel().getProperty(sPath + "/Detail");

					oRouter.navTo("infoTarefas",{
						id: sId,
					});
				}
			}


			if(filter === ""){
				objects.then(resp => resp.map(result => {				
					createListItems(result);

				}))
			}else{
				objects.then(resp => resp.map(result => {
					let listStringsInRespTitle = result.title.split(' ');
					if(filter !== ""){
						for(let i=0; i<listStringsInRespTitle.length; i++){
							if(filter === listStringsInRespTitle[i]){
								createListItems(result);
							}
						}

						if(filter === result.title){
							createListItems(result);
						}

						if(filter === `${result.id}`){
							createListItems(result);
						}
					}
					
				}));
			}
		},

	});

});
