let $filter = document.querySelectorAll(".storeifyapp_stores_tags_filter");
var myHeaders = new Headers();
myHeaders.append(
  "X-Api-Key",
  "19619fc5de9887a6504af77b4c480bc9:55ec7c4a5b995983c6973b6aea42021e:12e37dda911176995937787513b0eb4790c2aed77f8762fab1eac79ab12262e73d74f740957c260123f140c1090455a4a7abda14e7891643057b3bf9776ad62d13cb4680d5f8b34e6fc4c5fa3af94ebfb3ec53f7996da7dcf8780d4bc91f25f7c353db268c2eed93420ea77f1d0ec53ac8eeadb8dad066452f6a2f04c775c2eb64a659445da7ecaf1396fc3aed001882da4ea7ee3b94f0e3ccba17e8a2c617eff8955aada58250f8e894"
);
myHeaders.append("x-agx-store-alias", "awe-tuning.myshopify.com");
myHeaders.append("Content-Type", "application/json");
Array.from(document.querySelectorAll(".locator-close")).forEach((e) => {
  e.addEventListener("click", (e) => {
    document.querySelector(".popup-locator-form").style.display = "none";
  });

  /// get make - model - year

  var raw = JSON.stringify({
    query:
      " \n    query(\n      $withAllMakes: Boolean!\n      $withAllModels: Boolean!\n      $withAllYears: Boolean!\n      $withAllSubmodels: Boolean!\n      $withAllEngines: Boolean!\n      $withAllTransmissions: Boolean!\n      $uvdb_year_id: Int\n      $uvdb_make_id: ID!\n      $uvdb_model_id: ID!\n      $uvdb_submodel_id: ID!\n      $uvdb_engine_definition_id: ID!\n    ) {\n      uvdb {\n        allMakes: search_uvdb_makes(limit: 2000, vehicle_type: Default) @include(if: $withAllMakes){\n          items {\n            id\n            name\n          }\n        },\n        allModels: search_uvdb_models(limit: 2000, uvdb_make_id: $uvdb_make_id) @include(if: $withAllModels) {\n          items {\n            id\n            name\n          }\n        },\n        allYears: search_uvdb_years(limit: 2000, uvdb_make_id: $uvdb_make_id, uvdb_model_id: $uvdb_model_id) @include(if: $withAllYears) {\n          items {\n            id\n          }\n        },\n        allSubmodels: uvdb_additional_options(vehicle_instance: { uvdb_make_id: $uvdb_make_id, uvdb_model_id: $uvdb_model_id, uvdb_year_id: $uvdb_year_id },type: UvdbSubmodel) @include(if: $withAllSubmodels) {\n            suggestion_type\n            uvdb_dynamic_options {\n                id\n                name\n            }\n        },\n        allEngines: uvdb_additional_options(vehicle_instance: { uvdb_make_id: $uvdb_make_id, uvdb_model_id: $uvdb_model_id, uvdb_year_id: $uvdb_year_id, uvdb_submodel_id: $uvdb_submodel_id },type: UvdbEngineBase) @include(if: $withAllEngines) {\n            suggestion_type\n            uvdb_dynamic_options {\n                id\n                name\n            }\n        },\n        allTransmissions: uvdb_additional_options(vehicle_instance: { uvdb_make_id: $uvdb_make_id, uvdb_model_id: $uvdb_model_id, uvdb_year_id: $uvdb_year_id, uvdb_submodel_id: $uvdb_submodel_id, uvdb_engine_definition_id: $uvdb_engine_definition_id }, type: UvdbTransmissionControlType) @include(if: $withAllTransmissions) {\n            suggestion_type\n            uvdb_dynamic_options {\n                id\n                name\n            }\n        }\n      }\n    }\n  ",
    variables: {
      withAllMakes: true,
      withAllModels: true,
      withAllYears: true,
      withAllSubmodels: true,
      withAllEngines: true,
      withAllTransmissions: true,
      uvdb_make_id: "UMAK1332",
      uvdb_model_id: "",
      uvdb_year_id: 0,
      uvdb_submodel_id: "",
      uvdb_engine_definition_id: "",
    },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://api.partly.com/node-api/graphql", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      const data = result.data.uvdb;
      data.allMakes.items.forEach((item) => {
        let newOption = document.createElement("option");
        newOption.value = item.id;
        newOption.innerText = item.name;

        document.querySelector("#make").appendChild(newOption);
      });
    })
    .catch((error) => console.log("error", error));
});

function makeFc(event) {
  event.querySelector("#please-select").disabled = true;
  document.querySelector(".vehicles").style.border = "none";
  document.querySelector(".vehicles").style.backgroundColor = "none";
  document.querySelector(".vehicles").style.padding = "0";
  var graphql = JSON.stringify({
    query:
      "query (\n  $withAllMakes: Boolean!\n  $withAllModels: Boolean!\n  $withAllYears: Boolean!\n  $withAllSubmodels: Boolean!\n  $withAllEngines: Boolean!\n  $withAllTransmissions: Boolean!\n  $uvdb_year_id: Int\n  $uvdb_make_id: ID!\n  $uvdb_model_id: ID!\n  $uvdb_submodel_id: ID!\n  $uvdb_engine_definition_id: ID!\n) {\n  uvdb {\n    allMakes: search_uvdb_makes(limit: 2000, vehicle_type: Default)\n      @include(if: $withAllMakes) {\n      items {\n        id\n        name\n      }\n    }\n    allModels: search_uvdb_models(limit: 2000, uvdb_make_id: $uvdb_make_id)\n      @include(if: $withAllModels) {\n      items {\n        id\n        name\n      }\n    }\n    allYears: search_uvdb_years(\n      limit: 2000\n      uvdb_make_id: $uvdb_make_id\n      uvdb_model_id: $uvdb_model_id\n    ) @include(if: $withAllYears) {\n      items {\n        id\n      }\n    }\n    allSubmodels: uvdb_additional_options(\n      vehicle_instance: {\n        uvdb_make_id: $uvdb_make_id\n        uvdb_model_id: $uvdb_model_id\n        uvdb_year_id: $uvdb_year_id\n      }\n      type: UvdbSubmodel\n    ) @include(if: $withAllSubmodels) {\n      suggestion_type\n      uvdb_dynamic_options {\n        id\n        name\n      }\n    }\n    allEngines: uvdb_additional_options(\n      vehicle_instance: {\n        uvdb_make_id: $uvdb_make_id\n        uvdb_model_id: $uvdb_model_id\n        uvdb_year_id: $uvdb_year_id\n        uvdb_submodel_id: $uvdb_submodel_id\n      }\n      type: UvdbEngineBase\n    ) @include(if: $withAllEngines) {\n      suggestion_type\n      uvdb_dynamic_options {\n        id\n        name\n      }\n    }\n    allTransmissions: uvdb_additional_options(\n      vehicle_instance: {\n        uvdb_make_id: $uvdb_make_id\n        uvdb_model_id: $uvdb_model_id\n        uvdb_year_id: $uvdb_year_id\n        uvdb_submodel_id: $uvdb_submodel_id\n        uvdb_engine_definition_id: $uvdb_engine_definition_id\n      }\n      type: UvdbTransmissionControlType\n    ) @include(if: $withAllTransmissions) {\n      suggestion_type\n      uvdb_dynamic_options {\n        id\n        name\n      }\n    }\n  }\n}\n",
    variables: {
      withAllMakes: true,
      withAllModels: true,
      withAllYears: true,
      withAllSubmodels: true,
      withAllEngines: true,
      withAllTransmissions: true,
      uvdb_make_id: event.options[event.selectedIndex].value,
      uvdb_model_id: "",
      uvdb_year_id: 0,
      uvdb_submodel_id: "",
      uvdb_engine_definition_id: "",
    },
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
    redirect: "follow",
  };

  fetch("https://api.partly.com/node-api/graphql", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      const data = result.data.uvdb;
      let $model = document.querySelector("#model");
      $model.textContent = "";
      data.allModels.items.forEach((item) => {
        let newOption = document.createElement("option");
        newOption.value = item.id;
        newOption.innerText = item.name;
        $model.appendChild(newOption);
      });

      $model.onchange(() => $model);
    })
    .catch((error) => console.log("error", error));
}
function modelFc(event) {
  var graphql = JSON.stringify({
    query:
      "query (\n  $withAllMakes: Boolean!\n  $withAllModels: Boolean!\n  $withAllYears: Boolean!\n  $withAllSubmodels: Boolean!\n  $withAllEngines: Boolean!\n  $withAllTransmissions: Boolean!\n  $uvdb_year_id: Int\n  $uvdb_make_id: ID!\n  $uvdb_model_id: ID!\n  $uvdb_submodel_id: ID!\n  $uvdb_engine_definition_id: ID!\n) {\n  uvdb {\n    allMakes: search_uvdb_makes(limit: 2000, vehicle_type: Default)\n      @include(if: $withAllMakes) {\n      items {\n        id\n        name\n      }\n    }\n    allModels: search_uvdb_models(limit: 2000, uvdb_make_id: $uvdb_make_id)\n      @include(if: $withAllModels) {\n      items {\n        id\n        name\n      }\n    }\n    allYears: search_uvdb_years(\n      limit: 2000\n      uvdb_make_id: $uvdb_make_id\n      uvdb_model_id: $uvdb_model_id\n    ) @include(if: $withAllYears) {\n      items {\n        id\n      }\n    }\n    allSubmodels: uvdb_additional_options(\n      vehicle_instance: {\n        uvdb_make_id: $uvdb_make_id\n        uvdb_model_id: $uvdb_model_id\n        uvdb_year_id: $uvdb_year_id\n      }\n      type: UvdbSubmodel\n    ) @include(if: $withAllSubmodels) {\n      suggestion_type\n      uvdb_dynamic_options {\n        id\n        name\n      }\n    }\n    allEngines: uvdb_additional_options(\n      vehicle_instance: {\n        uvdb_make_id: $uvdb_make_id\n        uvdb_model_id: $uvdb_model_id\n        uvdb_year_id: $uvdb_year_id\n        uvdb_submodel_id: $uvdb_submodel_id\n      }\n      type: UvdbEngineBase\n    ) @include(if: $withAllEngines) {\n      suggestion_type\n      uvdb_dynamic_options {\n        id\n        name\n      }\n    }\n    allTransmissions: uvdb_additional_options(\n      vehicle_instance: {\n        uvdb_make_id: $uvdb_make_id\n        uvdb_model_id: $uvdb_model_id\n        uvdb_year_id: $uvdb_year_id\n        uvdb_submodel_id: $uvdb_submodel_id\n        uvdb_engine_definition_id: $uvdb_engine_definition_id\n      }\n      type: UvdbTransmissionControlType\n    ) @include(if: $withAllTransmissions) {\n      suggestion_type\n      uvdb_dynamic_options {\n        id\n        name\n      }\n    }\n  }\n}\n",
    variables: {
      withAllMakes: true,
      withAllModels: true,
      withAllYears: true,
      withAllSubmodels: true,
      withAllEngines: true,
      withAllTransmissions: true,
      uvdb_make_id: document.querySelector("#make").value,
      uvdb_model_id: event.options[event.selectedIndex].value,
      uvdb_year_id: 0,
      uvdb_submodel_id: "",
      uvdb_engine_definition_id: "",
    },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
    redirect: "follow",
  };

  fetch("https://api.partly.com/node-api/graphql", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      let $years = document.querySelector("#year");
      $years.textContent = "";
      const data = result.data.uvdb;
      data.allYears.items.forEach((item) => {
        let newOption = document.createElement("option");
        newOption.value = item.id;
        newOption.innerText = item.id;
        document.querySelector("#year").appendChild(newOption);
      });
      $years.onchange(() => $years);
    })
    .catch((error) => console.log("error", error));
}
function yearFc(event) {
  var graphql = JSON.stringify({
    query:
      "query (\n  $withAllMakes: Boolean!\n  $withAllModels: Boolean!\n  $withAllYears: Boolean!\n  $withAllSubmodels: Boolean!\n  $withAllEngines: Boolean!\n  $withAllTransmissions: Boolean!\n  $uvdb_year_id: Int\n  $uvdb_make_id: ID!\n  $uvdb_model_id: ID!\n  $uvdb_submodel_id: ID!\n  $uvdb_engine_definition_id: ID!\n) {\n  uvdb {\n    allMakes: search_uvdb_makes(limit: 2000, vehicle_type: Default)\n      @include(if: $withAllMakes) {\n      items {\n        id\n        name\n      }\n    }\n    allModels: search_uvdb_models(limit: 2000, uvdb_make_id: $uvdb_make_id)\n      @include(if: $withAllModels) {\n      items {\n        id\n        name\n      }\n    }\n    allYears: search_uvdb_years(\n      limit: 2000\n      uvdb_make_id: $uvdb_make_id\n      uvdb_model_id: $uvdb_model_id\n    ) @include(if: $withAllYears) {\n      items {\n        id\n      }\n    }\n    allSubmodels: uvdb_additional_options(\n      vehicle_instance: {\n        uvdb_make_id: $uvdb_make_id\n        uvdb_model_id: $uvdb_model_id\n        uvdb_year_id: $uvdb_year_id\n      }\n      type: UvdbSubmodel\n    ) @include(if: $withAllSubmodels) {\n      suggestion_type\n      uvdb_dynamic_options {\n        id\n        name\n      }\n    }\n    allEngines: uvdb_additional_options(\n      vehicle_instance: {\n        uvdb_make_id: $uvdb_make_id\n        uvdb_model_id: $uvdb_model_id\n        uvdb_year_id: $uvdb_year_id\n        uvdb_submodel_id: $uvdb_submodel_id\n      }\n      type: UvdbEngineBase\n    ) @include(if: $withAllEngines) {\n      suggestion_type\n      uvdb_dynamic_options {\n        id\n        name\n      }\n    }\n    allTransmissions: uvdb_additional_options(\n      vehicle_instance: {\n        uvdb_make_id: $uvdb_make_id\n        uvdb_model_id: $uvdb_model_id\n        uvdb_year_id: $uvdb_year_id\n        uvdb_submodel_id: $uvdb_submodel_id\n        uvdb_engine_definition_id: $uvdb_engine_definition_id\n      }\n      type: UvdbTransmissionControlType\n    ) @include(if: $withAllTransmissions) {\n      suggestion_type\n      uvdb_dynamic_options {\n        id\n        name\n      }\n    }\n  }\n}\n",
    variables: {
      withAllMakes: true,
      withAllModels: true,
      withAllYears: true,
      withAllSubmodels: true,
      withAllEngines: true,
      withAllTransmissions: true,
      uvdb_make_id: document.querySelector("#make").value,
      uvdb_model_id: document.querySelector("#model").value,
      uvdb_year_id: Number(event.options[event.selectedIndex].value),
      uvdb_submodel_id: "",
      uvdb_engine_definition_id: "",
    },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
    redirect: "follow",
  };

  fetch("https://api.partly.com/node-api/graphql", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      let $submodel = document.querySelector("#submodel");
      $submodel.textContent = "";
      const data = result.data.uvdb;
      data.allSubmodels.uvdb_dynamic_options.forEach((item) => {
        let newOption = document.createElement("option");
        newOption.value = item.id;
        newOption.innerText = item.name;
        document.querySelector("#submodel").appendChild(newOption);
      });
      $submodel.onchange(() => $submodel);
    })
    .catch((error) => console.log("error", error));
}
function submodelFc(event) {
  var graphql = JSON.stringify({
    query:
      "query (\n  $withAllMakes: Boolean!\n  $withAllModels: Boolean!\n  $withAllYears: Boolean!\n  $withAllSubmodels: Boolean!\n  $withAllEngines: Boolean!\n  $withAllTransmissions: Boolean!\n  $uvdb_year_id: Int\n  $uvdb_make_id: ID!\n  $uvdb_model_id: ID!\n  $uvdb_submodel_id: ID!\n  $uvdb_engine_definition_id: ID!\n) {\n  uvdb {\n    allMakes: search_uvdb_makes(limit: 2000, vehicle_type: Default)\n      @include(if: $withAllMakes) {\n      items {\n        id\n        name\n      }\n    }\n    allModels: search_uvdb_models(limit: 2000, uvdb_make_id: $uvdb_make_id)\n      @include(if: $withAllModels) {\n      items {\n        id\n        name\n      }\n    }\n    allYears: search_uvdb_years(\n      limit: 2000\n      uvdb_make_id: $uvdb_make_id\n      uvdb_model_id: $uvdb_model_id\n    ) @include(if: $withAllYears) {\n      items {\n        id\n      }\n    }\n    allSubmodels: uvdb_additional_options(\n      vehicle_instance: {\n        uvdb_make_id: $uvdb_make_id\n        uvdb_model_id: $uvdb_model_id\n        uvdb_year_id: $uvdb_year_id\n      }\n      type: UvdbSubmodel\n    ) @include(if: $withAllSubmodels) {\n      suggestion_type\n      uvdb_dynamic_options {\n        id\n        name\n      }\n    }\n    allEngines: uvdb_additional_options(\n      vehicle_instance: {\n        uvdb_make_id: $uvdb_make_id\n        uvdb_model_id: $uvdb_model_id\n        uvdb_year_id: $uvdb_year_id\n        uvdb_submodel_id: $uvdb_submodel_id\n      }\n      type: UvdbEngineBase\n    ) @include(if: $withAllEngines) {\n      suggestion_type\n      uvdb_dynamic_options {\n        id\n        name\n      }\n    }\n    allTransmissions: uvdb_additional_options(\n      vehicle_instance: {\n        uvdb_make_id: $uvdb_make_id\n        uvdb_model_id: $uvdb_model_id\n        uvdb_year_id: $uvdb_year_id\n        uvdb_submodel_id: $uvdb_submodel_id\n        uvdb_engine_definition_id: $uvdb_engine_definition_id\n      }\n      type: UvdbTransmissionControlType\n    ) @include(if: $withAllTransmissions) {\n      suggestion_type\n      uvdb_dynamic_options {\n        id\n        name\n      }\n    }\n  }\n}\n",
    variables: {
      withAllMakes: true,
      withAllModels: true,
      withAllYears: true,
      withAllSubmodels: true,
      withAllEngines: true,
      withAllTransmissions: true,
      uvdb_make_id: document.querySelector("#make").value,
      uvdb_model_id: document.querySelector("#model").value,
      uvdb_year_id: Number(document.querySelector("#year").value),
      uvdb_submodel_id: event.options[event.selectedIndex].value,
      uvdb_engine_definition_id: "",
    },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
    redirect: "follow",
  };

  fetch("https://api.partly.com/node-api/graphql", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      let $engine = document.querySelector("#engine");
      $engine.textContent = "";
      const data = result.data.uvdb;
      data.allEngines.uvdb_dynamic_options.forEach((item) => {
        let newOption = document.createElement("option");
        newOption.value = item.id;
        newOption.innerText = item.name;
        document.querySelector("#engine").appendChild(newOption);
      });
      $engine.onchange(() => $engine);
    })
    .catch((error) => console.log("error", error));
}
function engineFc(event) {
  var graphql = JSON.stringify({
    query:
      "query (\n  $withAllMakes: Boolean!\n  $withAllModels: Boolean!\n  $withAllYears: Boolean!\n  $withAllSubmodels: Boolean!\n  $withAllEngines: Boolean!\n  $withAllTransmissions: Boolean!\n  $uvdb_year_id: Int\n  $uvdb_make_id: ID!\n  $uvdb_model_id: ID!\n  $uvdb_submodel_id: ID!\n  $uvdb_engine_definition_id: ID!\n) {\n  uvdb {\n    allMakes: search_uvdb_makes(limit: 2000, vehicle_type: Default)\n      @include(if: $withAllMakes) {\n      items {\n        id\n        name\n      }\n    }\n    allModels: search_uvdb_models(limit: 2000, uvdb_make_id: $uvdb_make_id)\n      @include(if: $withAllModels) {\n      items {\n        id\n        name\n      }\n    }\n    allYears: search_uvdb_years(\n      limit: 2000\n      uvdb_make_id: $uvdb_make_id\n      uvdb_model_id: $uvdb_model_id\n    ) @include(if: $withAllYears) {\n      items {\n        id\n      }\n    }\n    allSubmodels: uvdb_additional_options(\n      vehicle_instance: {\n        uvdb_make_id: $uvdb_make_id\n        uvdb_model_id: $uvdb_model_id\n        uvdb_year_id: $uvdb_year_id\n      }\n      type: UvdbSubmodel\n    ) @include(if: $withAllSubmodels) {\n      suggestion_type\n      uvdb_dynamic_options {\n        id\n        name\n      }\n    }\n    allEngines: uvdb_additional_options(\n      vehicle_instance: {\n        uvdb_make_id: $uvdb_make_id\n        uvdb_model_id: $uvdb_model_id\n        uvdb_year_id: $uvdb_year_id\n        uvdb_submodel_id: $uvdb_submodel_id\n      }\n      type: UvdbEngineBase\n    ) @include(if: $withAllEngines) {\n      suggestion_type\n      uvdb_dynamic_options {\n        id\n        name\n      }\n    }\n    allTransmissions: uvdb_additional_options(\n      vehicle_instance: {\n        uvdb_make_id: $uvdb_make_id\n        uvdb_model_id: $uvdb_model_id\n        uvdb_year_id: $uvdb_year_id\n        uvdb_submodel_id: $uvdb_submodel_id\n        uvdb_engine_definition_id: $uvdb_engine_definition_id\n      }\n      type: UvdbTransmissionControlType\n    ) @include(if: $withAllTransmissions) {\n      suggestion_type\n      uvdb_dynamic_options {\n        id\n        name\n      }\n    }\n  }\n}\n",
    variables: {
      withAllMakes: true,
      withAllModels: true,
      withAllYears: true,
      withAllSubmodels: true,
      withAllEngines: true,
      withAllTransmissions: true,
      uvdb_make_id: document.querySelector("#make").value,
      uvdb_model_id: document.querySelector("#model").value,
      uvdb_year_id: Number(document.querySelector("#year").value),
      uvdb_submodel_id: document.querySelector("#submodel").value,
      uvdb_engine_definition_id: event.options[event.selectedIndex].value,
    },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
    redirect: "follow",
  };

  fetch("https://api.partly.com/node-api/graphql", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      let $transmission = document.querySelector("#transmission");
      $transmission.textContent = "";
      const data = result.data.uvdb;
      data.allTransmissions.uvdb_dynamic_options.forEach((item) => {
        let newOption = document.createElement("option");
        newOption.value = item.id;
        newOption.innerText = item.name;
        $transmission.appendChild(newOption);
      });
    })
    .catch((error) => console.log("error", error));
}
function contactForm(event) {
  event.preventDefault();
  let $form = document.querySelector("#general-contact-form");
  const make = event.target.elements["contact[vehicle_make]"];

  if (make.selectedIndex == 0) {
    document.querySelector(".vehicles").style.border = "1px solid red";
    document.querySelector(".vehicles").style.backgroundColor = "#ff00000a";
    document.querySelector(".vehicles").style.padding = "20px";
    return false;
  }
  var formdata = new FormData();

  for (let key of event.target.elements) {
    if (key.hasAttribute("name")) {
      formdata.append(key.getAttribute("name"), key.value);
    }
  }
  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch("https://hooks.zapier.com/hooks/catch/3563261/b827n4o", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);

      $form.querySelector(".alert-success").style.display = "block";
      $form.querySelector("[type=submit]").disabled = true;
      setTimeout(() => {
        document.querySelector(".popup-locator-form").style.display = "none";
        $form.reset();
        $form.querySelector(".alert-success").style.display = "none";
        $form.querySelector("[type=submit]").disabled = false;
        document.querySelector("#please-select").disabled = false;
        document.getElementById("make").selectedIndex = 0;
        document.querySelector("#model").innerHTML = "";
        document.querySelector("#submodel").innerHTML = "";
        document.querySelector("#engine").innerHTML = "";
        document.querySelector("#year").innerHTML = "";
        document.querySelector("#engine").innerHTML = "";
        document.querySelector("#transmission").innerHTML = "";
      }, 5000);
    })
    .catch((error) => console.log("error", error));
}

function dealerForm(event) {
  event.preventDefault();
  var formdata = new FormData();
  let $form = document.querySelector("#dealer-locator-form");

  for (let key of event.target.elements) {
    if (key.hasAttribute("name")) {
      if (key.getAttribute("type") == "checkbox") {
        if (key.checked == true) {
          formdata.append(key.getAttribute("name"), key.value);
        }
      } else {
        formdata.append(key.getAttribute("name"), key.value);
      }
    }
  }
  $form.querySelector('[type=submit]').disabled = true
  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };
  
  fetch(
    "https://hooks.zapier.com/hooks/catch/16755338/brnhca9/",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      $form.reset();
      $form.querySelector(".alert-success").style.display = "block";
      setTimeout(()=> {
        document.querySelector(".popup-locator-form").style.display = "none";
        $form.reset();
        $form.querySelector(".alert-success").style.display = "none";
        $form.querySelector("[type=submit]").disabled = false;
      },5000);
  
    })
    .catch((error) => console.log("error", error));
}
