import { ref, reactive } from 'vue';
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { FormInput, FormSelect } from "../../base-components/Form";
import * as xlsx from "xlsx";
import { createIcons, icons } from "lucide";

export function tabulatorFunc(){
    const setFilter = (value: typeof filter) => {
        Object.assign(filter, value);
      };
      const tabulator = ref<Tabulator>();
      const filter = reactive({
        field: "name",
        type: "like",
        value: "",
      });
      const resp = ref([])
      const loadingIcon = ref(true)
      const initTabulator = (columnData, dataService, tableRef) => {
        tabulator.value = new Tabulator(tableRef.value, {
            data: [],
            paginationMode: "local",
            filterMode: "local",
            sortMode: "local",
            printAsHtml: true,
            printStyled: true,
            pagination: true,
            paginationSize: 10,
            paginationSizeSelector: [10, 20, 30, 40],
            layout: "fitColumns",
            responsiveLayout: "collapse",
            placeholder: "No matching records found",
            columns: columnData
        });
        if (tableRef.value) {
          dataService.getAll()
          .then((response: ResponseData) => {
            tabulator.value.setData(response.data)
          })
          .catch((e: Error)=>{
              console.log(e)
          })
          .finally(()=> {
            loadingIcon.value = false
          })
        }
        tabulator.value?.on("renderComplete", () => {
          createIcons({
            icons,
            attrs: {
              "stroke-width": 1.5,
            },
            nameAttr: "data-lucide",
          });
        });
        // tabulator.value?.on("rowClick",()=>{
        //   alert("bang")
        // })
      };
      
      // Redraw table onresize
      const reInitOnResizeWindow = () => {
        window.addEventListener("resize", () => {
          if (tabulator.value) {
            tabulator.value.redraw();
            createIcons({
              icons,
              attrs: {
                "stroke-width": 1.5,
              },
              nameAttr: "data-lucide",
            });
          }
        });
      };
      
      // Filter function
      const onFilter = () => {
        if (tabulator.value) {
          tabulator.value.setFilter(filter.field, filter.type, filter.value);
        }
      };
      
      // On reset filter
      const onResetFilter = () => {
        setFilter({
          ...filter,
          field: "name",
          type: "like",
          value: "",
        });
        onFilter();
      };
      
      // Export
      const onExportCsv = () => {
        if (tabulator.value) {
          tabulator.value.download("csv", "data.csv");
        }
      };
      
      const onExportJson = () => {
        if (tabulator.value) {
          tabulator.value.download("json", "data.json");
        }
      };
      
      const onExportXlsx = () => {
        if (tabulator.value) {
          (window as any).XLSX = xlsx;
          tabulator.value.download("xlsx", "data.xlsx", {
            sheetName: "Products",
          });
        }
      };
      
      const onExportHtml = () => {
        if (tabulator.value) {
          tabulator.value.download("html", "data.html", {
            style: true,
          });
        }
      };
      
      // Print
      const onPrint = () => {
        if (tabulator.value) {
          tabulator.value.print();
        }
      };
return{
    initTabulator,
    onExportCsv,
    onExportHtml,
    onExportJson,
    onExportXlsx,
    onFilter,
    onResetFilter,
    onPrint,
    reInitOnResizeWindow,
    filter,
    tabulator,
    loadingIcon
}
}