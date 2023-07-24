import { ref, reactive} from "vue"
import { stringToHTML } from "../utils/helper";
import BusinessDataService from '../services/BuisinessDataService';
import ResponseData from "./response";
export function useBusiness(){
    const formBusiness = reactive({
        'id' : '0',
        'clientId' : '0',
        'businessName': '',
        'yearEstablished': '',
        'businessOwnership': '',
        'businessRegNo': '',
        'lineOfBusiness': '',
        'standardCertification':'',
        'capitalization':'',
        'noOfMaleEmployee':'',
        'noOfFemaleEmployee':'',
        'noEmployee':'',
        'businessAddress': '',
        'businessBrgy':'',
        'businessBrgyAddress':'',
        'businessCity':'',
        'businessProvince':'',
        'businessZipcode':'',
        'businessLongitude':'',
        'businessLatitude':'',
        'noOutlets':'',
        'plantAddress':'',
        'plantBrgy':'',
        'plantBrgyAddress':'',
        'plantCity':'',
        'plantProvince':'',
        'plantZipcode': '',
        'plantLongitude':'',
        'plantLatitude':'',
        'landlineNo':'',
        'faxNo':'',
        'email':'0',
        'mobileNo': '',
        'website':'',
        'socialMedia':'',
        'socialUrl':'',
        'businessId':'',
        'ecommerce': '',
        'ecommerceUrl': '',
        'sourcing': '',
        'rawMatsSources': '',
        'estimatedVolume': '',
        'volumeUom':'0',
        'encodedBy': sessionStorage.getItem('userId'),
        'encodedByName': sessionStorage.getItem('name'),
        'encodedDate':'',
        'recStat':'0',
    });
    const formSocialMedia = reactive({
        'id' : '0',
        'business' : '0',
        'platForm' : '0',
        'url' : '0',
        'recStat' : '0',
    });
    const formEcommerce = reactive({
        'id' : '0',
        'business' : '0',
        'platForm' : '0',
        'url' : '0',
        'recStat' : '0',
    });
    const formBusinessOwner = reactive({
        'id' : '0',
        'business' : '0',
        'client' : '0',
        'designation' : '',
        'lname' : '',
        'fname' : '',
        'mname' : '',
        'contactNo' : '',
        'email' : '',
        'recStat' : '0',
    });
    const formMarketPlan = reactive({
        'id' : '0',
        'business' : '0',
        'marketPlan' : '',
        'specific' : '',
        'encodedBy': sessionStorage.getItem('userId'),
        'encodedByName': sessionStorage.getItem('name'),
        'encodedDate':'',
        'recStat':'0',
    });
    const formMarketTraining = reactive({
        'id' : '0',
        'business' : '0',
        'training' : '',
        'targetYear' : '',
        'encodedBy': sessionStorage.getItem('userId'),
        'encodedByName': sessionStorage.getItem('name'),
        'encodedDate':'',
        'recStat':'0',
    });
    const brgyDropdownBusiness = ref(false);
    const brgyDropdownPlant = ref(false);
    const showSearchBrgyBusiness = () => {
        brgyDropdownBusiness.value = true;
    };
    const hideSearchBrgyBusiness = () => {
        brgyDropdownBusiness.value = false;
    };
    const showSearchBrgyPlant = () => {
        brgyDropdownPlant.value = true;
    };
    const hideSearchBrgyPlant = () => {
        brgyDropdownPlant.value = false;
    };
    const addressSelectBus = reactive({
        'businessAddress':'',
        'plantAddress':'',
      })
    const checkBusinessBrgy = (item: any) => {
        formBusiness.businessCity = item.cityName
        formBusiness.businessBrgy = item.barangayName
        formBusiness.businessProvince = item.provinceName
        addressSelectBus.businessAddress = item.address
    }
    const checkPlantBrgy = (item: any) => {
        formBusiness.plantCity = item.cityName
        formBusiness.plantBrgy = item.barangayName
        formBusiness.plantProvince = item.provinceName
        addressSelectBus.plantAddress = item.address
    }
    const businessID = ref(0)
    const businessSubmit = ref(false)
    const createBusinessInfo =async (data:any) => {
        BusinessDataService.create(data).then((response: ResponseData)=>{
            businessID.value = response.data.id
            businessSubmit.value = true
          }).catch((e:Error)=>{
            businessSubmit.value = false
            businessID.value = 0
            console.log(e.message)
          })
    }
    const updateBusinessInfo = async (id:any, data:any) => {
        BusinessDataService.update(id, data).then((response: ResponseData)=>{
            businessID.value = response.data.id
            businessSubmit.value = true
        }).catch((e:Error)=>{
            businessSubmit.value = false
            businessID.value = 0
            console.log(e.message)
        })
        return {
            businessSubmit
        }
    }
    const getBusinessInfo = async (id:any) => {
        BusinessDataService.get(id).then((response: ResponseData)=>{
            formBusiness.clientId = response.data[0].clientId
            formBusiness.businessName = response.data[0].businessName
            formBusiness.yearEstablished = response.data[0].yearEstablished
            formBusiness.businessOwnership = response.data[0].businessOwnership
            formBusiness.businessRegNo = response.data[0].businessRegNo
            formBusiness.lineOfBusiness = response.data[0].lineOfBusiness
            formBusiness.standardCertification = response.data[0].standardCertification
            formBusiness.capitalization = response.data[0].capitalization
            formBusiness.noOfMaleEmployee = response.data[0].noOfMaleEmployee
            formBusiness.noOfFemaleEmployee = response.data[0].noOfFemaleEmployee
            formBusiness.noEmployee = response.data[0].noEmployee
            formBusiness.businessAddress = response.data[0].businessAddress
            formBusiness.businessBrgy = response.data[0].businessBrgy
            formBusiness.businessBrgyAddress = response.data[0].businessBrgyAddress
            formBusiness.businessCity = response.data[0].businessCity
            formBusiness.businessProvince = response.data[0].businessProvince
            formBusiness.businessZipcode = response.data[0].businessZipcode
            formBusiness.businessLongitude = response.data[0].businessLongitude
            formBusiness.businessLatitude = response.data[0].businessLatitude
            formBusiness.noOutlets = response.data[0].noOutlets
            formBusiness.plantAddress = response.data[0].plantAddress
            formBusiness.plantBrgy = response.data[0].plantBrgy
            formBusiness.plantBrgyAddress = response.data[0].plantBrgyAddress
            formBusiness.plantCity = response.data[0].plantCity
            formBusiness.plantProvince = response.data[0].plantProvince
            formBusiness.plantZipcode = response.data[0].plantZipcode
            formBusiness.plantLongitude = response.data[0].plantLongitude
            formBusiness.plantLatitude = response.data[0].plantLatitude
            formBusiness.landlineNo = response.data[0].landlineNo
            formBusiness.mobileNo = response.data[0].mobileNo
            formBusiness.faxNo = response.data[0].faxNo
            formBusiness.email = response.data[0].email
            formBusiness.website = response.data[0].website
            addressSelectBus.businessAddress = response.data[0].businessBrgyAddress
            addressSelectBus.plantAddress = response.data[0].plantBrgyAddress
            businessID.value = response.data[0].id
            selectBusinessOwner.value = ([formBusiness.businessOwnership]);
            selectLineOfBusiness.value = ([formBusiness.lineOfBusiness]);
            selectStandardCertification.value = ([formBusiness.standardCertification]);
        }).catch((e: Error)=>{
            console.log(e.message)
            businessID.value = 0
        })
    }
    const selectBusinessOwner = ref([formBusiness.businessOwnership]);
    const selectLineOfBusiness = ref([formBusiness.lineOfBusiness]);
    const selectStandardCertification = ref([formBusiness.standardCertification]);
    const selectSocialMed = ref(["1"]);
    const selectEcommerce = ref(["1"]);
    const selectBOwner = ref(["1"]);
    const selectMarketPlan = ref(["1"]);
    const selectMarketTraining = ref(["1"]);
    const columnDataSocial = ref([
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
              title: "Platform",
              minWidth: 100,
              maxWidth: 100,
              field: "platForm",
              hozAlign: "center",
              headerHozAlign: "center",
              vertAlign: "middle",
              print: false,
              download: false
            },
            {
              title: "URL",
              minWidth: 100,
              maxWidth: 150,
              field: "url",
              hozAlign: "center",
              headerHozAlign: "center",
              vertAlign: "middle",
              print: false,
              download: false,
            },
            {
            title: "",
            minWidth: 200,
            responsive: 0,
            field: "action",
            hozAlign: "center",
            headerHozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            },
    ]);
    const businessDropdown = ref(false);
    const businessList = ref();
    const showSearchBusiness = () => {
        businessDropdown.value = true;
    };
    const hideSearchBusiness = () => {
        businessDropdown.value = false;
    };
    return {
        formBusiness,
        formSocialMedia,
        formBusinessOwner,
        formEcommerce,
        brgyDropdownBusiness,
        brgyDropdownPlant,
        showSearchBrgyBusiness,
        showSearchBrgyPlant,
        hideSearchBrgyBusiness,
        hideSearchBrgyPlant,
        addressSelectBus,
        checkBusinessBrgy,
        checkPlantBrgy,
        businessID,
        getBusinessInfo,
        businessSubmit,
        createBusinessInfo,
        updateBusinessInfo,
        selectBusinessOwner,
        selectLineOfBusiness,
        selectStandardCertification,
        selectSocialMed,
        selectEcommerce,
        selectBOwner,
        columnDataSocial,
        businessDropdown,
        businessList,
        showSearchBusiness,
        hideSearchBusiness,
        formMarketPlan,
        formMarketTraining,
        selectMarketPlan,
        selectMarketTraining
    }
}