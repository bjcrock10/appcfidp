import { ref, reactive} from "vue"
import { stringToHTML } from "../utils/helper";
export function useClient(){
    interface Response {
      name?: string;
      jobs?: string;
      email?: string;
      status?: string;
    }
    const columnData = ref([
      {
      title: "",
      formatter: "responsiveCollapse",
      width: 40,
      minWidth: 30,
      hozAlign: "center",
      resizable: false,
      headerSort: false,
      },

      // For HTML table
      {
        title: "No",
        minWidth: 100,
        maxWidth: 100,
        field: "id",
        hozAlign: "center",
        headerHozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false
      },
      {
        title: "Farmers Id",
        minWidth: 100,
        maxWidth: 150,
        field: "farmerId",
        hozAlign: "center",
        headerHozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
            return `<div>
                <div class="font-medium whitespace-nowrap">${cell.getData().farmerId}</div>
                
            </div>`;
        },
      },
      {
      title: "Name",
      minWidth: 200,
      responsive: 0,
      field: "name",
      hozAlign: "center",
      headerHozAlign: "center",
      vertAlign: "middle",
      print: false,
      download: false,
      mutator: (value, data) => data.lname + ', ' + data.fname + " " + data.mname,
      },
      {
      title: "Province",
      minWidth: 200,
      field: "province",
      hozAlign: "center",
      headerHozAlign: "center",
      vertAlign: "middle",
      print: false,
      download: false,
      formatter(cell) {
          return `<div>
              <div class="font-medium whitespace-nowrap">${cell.getData().province}</div>
              
          </div>`;
      }
      },
      {
      title: "Address",
      minWidth: 200,
      field: "address",
      hozAlign: "center",
      headerHozAlign: "center",
      vertAlign: "middle",
      print: false,
      download: false,
      formatter(cell) {
        return `<div>
            <div class="font-medium whitespace-nowrap">${cell.getData().address}</div>
                <div class="text-slate-500 text-xs whitespace-nowrap"><label>LGU: </label>${
                  cell.getData().lgu
                }</div>
                <div class="text-slate-500 text-xs whitespace-nowrap"><label>Barangay: </label>${
                  cell.getData().barangay
                }</div>
            </div>`;
        },
      },

      // For print format
      {
        title: "No.",
        field: "id",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "Farmers ID",
        field: "farmerId",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "First NAme",
        field: "fname",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "Middle Name",
        field: "mname",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "Last Name",
        field: "lname",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "Suffix",
        field: "suffix",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "Province",
        field: "province",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "LGU",
        field: "lgu",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "barangay",
        field: "barangay",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "address",
        field: "address",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "age/bdate",
        field: "age",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "gender",
        field: "gender",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "civilStatus",
        field: "civilStatus",
        visible: false,
        print: true,
        download: true
      },
      {
        title: "education",
        field: "education",
        visible: false,
        print: true,
        download: true
      },
  ])

    const formClient = reactive({
        'id' : '0',
        'farmerId' : '0',
        'fname': '',
        'lname': '',
        'mname': '',
        'suffix': '',
        'province': '',
        'lgu':'',
        'barangay':'',
        'address':'',
        'age':'',
        'gender': '',
        'civilStatus':'',
        'education':'',
        'religion':'',
        'motherMaidenName':'',
        'personNotify':'',
        'socialClassification':'',
        'disability':'',
        'pwdSpecify':'',
        'ip':'',
        'ipGroup':'',
        'ipSpecify':'',
        'tenurialStatus': '',
        'farmSize':'',
        'mobileNo':'',
        'email':'0',
        'yearStarted': '',
        'zipcode':'',
        'businessId':'',
        'clientCode': '',
        'prefix': '',
        'designation': '',
        'encodedBy': sessionStorage.getItem('userId'),
        'encodedByName': sessionStorage.getItem('name'),
        'encodedDate':'',
        'recStat':'1',
    });
    const addModal = ref(false);
    const rounded = ref(false);
    const errorMessage = ref();
    const isError = ref(false);
    return {
        columnData,
        formClient,
        addModal,
        errorMessage,
        isError,
        rounded
    }
}

// export default interface User {
//     id : null;
//     fname: string;
//     lname: string;
//     mname: string;
//     suffix: string;
//     gender: string;
//     homeAddress: string;
//     currentAddress:string;
//     province:string;
//     zipcode:string;
//     bDate: string;
//     companyId:string;
//     jobs: string;
//     office: string;
//     division: string;
//     uMid: string;
//     privileges: string;
//     email:string;
//     username:string;
//     password:string;
//     recStat: number;
//   }