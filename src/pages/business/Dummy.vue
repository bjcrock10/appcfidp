<script setup lang="ts">
import _ from "lodash";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import { FormSwitch, FormInput, FormSelect, InputGroup, FormLabel, FormTextarea} from "../../base-components/Form";
import Progress from "../../base-components/Progress";
import Lucide from "../../base-components/Lucide";
import StackedBarChart1 from "../../components/StackedBarChart1";
import SimpleLineChart from "../../components/SimpleLineChart";
import SimpleLineChart1 from "../../components/SimpleLineChart1";
import SimpleLineChart2 from "../../components/SimpleLineChart2";
import { Menu, Tab } from "../../base-components/Headless";
import TomSelect from "../../base-components/TomSelect";
import { Tab as HeadlessTab } from "@headlessui/vue";
import Table from "../../base-components/Table";
import LocationDataService from "../../services/LocationDataService";
import BusinessDataService from "../../services/BuisinessDataService";
import ClientDataService  from "../../services/ClientDataService"
import ResponseData from "../../types/response.d";
import { TransitionRoot } from "@headlessui/vue";
import { useClient } from "../../types/client.d";
import { useBusiness } from "../../types/business.d";
import { tabulatorFunc } from "../../types/tabulator.d";
import { useRouter } from "vue-router";
import { onMounted, ref, reactive, watch, provide, toRefs} from "vue";
import Notification from "../../base-components/Notification";
import { NotificationElement } from "../../base-components/Notification";
import Toastify from "toastify-js";
import { createIcons, icons } from "lucide";
import logoUrl from "../../assets/images/logo.png";
import Item from '../../base-components/Headless/Menu/Item.vue';
import { Disclosure } from "../../base-components/Headless";

const router = useRouter();
const {formClient, errorMessage, isError, columnData, addModal, rounded,  brgyDropdown,
        lnameDropdown, showSearchBrgy, hideSearchBrgy, showSearchLname, hideSearchLname, 
        message, messageDetail, buttonTitle, buttonIcon, setAddModal, select, brgy, sendButtonRef, ncfrs, tenurial,
        accreditation, organization, disNcfrs, disTenurial, disAccreditation, disOrganization, brgySelect, citySelect,
        clientList, addressSelect, checkBa, aNcfrs, dTenurial, dOrganization, dAccreditation, getClientInfo, 
        updateClientInfo, clientSubmit, patchClientInfo} = useClient();
const {formBusiness, formBusinessOwner, formEcommerce, formSocialMedia, hideSearchBrgyBusiness, hideSearchBrgyPlant, 
        showSearchBrgyBusiness, showSearchBrgyPlant, brgyDropdownBusiness, brgyDropdownPlant, addressSelectBus,
      checkBusinessBrgy, checkPlantBrgy, businessID, businessSubmit, getBusinessInfo, 
      selectBusinessOwner, selectLineOfBusiness, selectStandardCertification, selectSocialMed, selectEcommerce, selectBOwner} = useBusiness();
const {initTabulator, reInitOnResizeWindow, 
filter, onFilter, 
onExportCsv, onExportHtml, 
onExportJson, onExportXlsx, 
onPrint, onResetFilter, tabulator, loadingIcon} = tabulatorFunc();
const clientID = ref(router.currentRoute.value.params.id);
const tableClient = ref<HTMLDivElement>();
const successNotification = ref();
provide("bind[successNotification]", (el: any) => {
  // Binding
  successNotification.value = el;
  });
const item = reactive({
        'id' : '',
        'platForm' : '',
        'url' : '',
      })

const sameAddress = ref(false);
const disAbled = ref(false);
watch(sameAddress, (sameAddress, prevAddProjectModal) => {
  if(sameAddress===true){
    formBusiness.plantAddress = formBusiness.businessAddress
    formBusiness.plantBrgy = formBusiness.businessBrgy
    formBusiness.plantCity = formBusiness.businessCity
    formBusiness.plantProvince = formBusiness.businessProvince
    formBusiness.plantLatitude = formBusiness.businessLatitude
    formBusiness.plantLongitude = formBusiness.businessLongitude
    addressSelectBus.plantAddress = addressSelectBus.businessAddress
    disAbled.value = true
  }
  else{
    formBusiness.plantAddress = ""
    formBusiness.plantBrgy = ""
    formBusiness.plantCity = ""
    formBusiness.plantLatitude = ""
    formBusiness.plantLongitude = ""
    addressSelectBus.plantAddress = ""
    formBusiness.plantProvince = ""
    disAbled.value = false
  }
  
})
watch(
  () => (addressSelect.addressName), async(address, prevToe) => {
    if(address.length>4){
        LocationDataService.getBarangayVal(address).then((response: ResponseData)=>{
        brgySelect.value = response.data
        }).catch((e: Error)=>{
          console.log(citySelect.value)
        })
      }
    }
);
watch(
  () => (addressSelectBus.businessAddress), async(address, prevToe) => {
    if(address.length>4){
        LocationDataService.getBarangayVal(address).then((response: ResponseData)=>{
        brgySelect.value = response.data
        }).catch((e: Error)=>{
          console.log(citySelect.value)
        })
      }
    }
)
watch(
  () => (addressSelectBus.plantAddress), async(address, prevToe) => {
    if(address.length>4){
        LocationDataService.getBarangayVal(address).then((response: ResponseData)=>{
        brgySelect.value = response.data
        }).catch((e: Error)=>{
          console.log(citySelect.value)
        })
      }
    }
)
watch(
  () => (formBusinessOwner.lname), async(lname, prevToe) => {
    if(lname.length>4){
        ClientDataService.findByLname(lname).then((response: ResponseData)=>{
          clientList.value = response.data
        }).catch((e: Error)=>{
          console.log(clientList.value)
        })
      }
    }
)
const socialMedList = ref([])
const ecommerceList = ref([])
const businessOwnerList = ref([])
const loadBusiness = () => {
  getBusinessInfo(formClient.businessId)
  loadSocial(formClient.businessId)
  loadEcommerce(formClient.businessId)
  loadBusinessOwner(formClient.businessId)
}
const loadSocial = async (id:any) =>{
  BusinessDataService.getSocialByBusiness(id).then((response: ResponseData)=>{
    socialMedList.value = response.data
  })
}
const loadEcommerce = async (id:any) =>{
  BusinessDataService.getEcommerceByBusiness(id).then((response: ResponseData)=>{
    ecommerceList.value = response.data
  })
}
const loadBusinessOwner = async (id:any) =>{
  BusinessDataService.getOwnerByBusiness(id).then((response: ResponseData)=>{
    businessOwnerList.value = response.data
  })
}
const removeSocial = async (id: any) =>{
  BusinessDataService.deleteSocial(id).then((response: ResponseData)=>{
    loadSocial(formClient.businessId)
  }).catch((e:Error)=>{
    console.log(e.message)
  })
}
const removeEcommerce = async (id: any) =>{
  BusinessDataService.deleteEcommerce(id).then((response: ResponseData)=>{
    loadEcommerce(formClient.businessId)
  }).catch((e:Error)=>{
    console.log(e.message)
  })
}
const removeBusinessOwner = async (id: any) =>{
  BusinessDataService.deleteOwner(id).then((response: ResponseData)=>{
    loadBusinessOwner(formClient.businessId)
  }).catch((e:Error)=>{
    console.log(e.message)
  })
}
const onSubmit = () =>{
 updateClientInfo(clientID.value).then();
 if(clientSubmit.value===true){
    successNotification.value.showToast();
    messageDetail.value = "You successfully updated client profile..."
 }
};
const onAddBusiness = async () => {
  formBusiness.businessOwnership = selectBusinessOwner.value.toString();
  formBusiness.lineOfBusiness = selectLineOfBusiness.value.toString();
  formBusiness.standardCertification = selectStandardCertification.value.toString();
  formBusiness.plantBrgyAddress = addressSelectBus.plantAddress
  formBusiness.businessBrgyAddress = addressSelectBus.businessAddress
  if(formClient.businessId==="0"){
    BusinessDataService.create(formBusiness).then((response: ResponseData)=>{
      businessID.value = response.data.id
      patchClientInfo(clientID.value,{'businessId':businessID.value})
      successNotification.value.showToast();
      messageDetail.value = "You successfully business profile with a Business ID "+businessID.value
    }).catch((e:Error)=>{
      console.log(e.message)
    })
  }else{
    BusinessDataService.update(formClient.businessId, formBusiness).then((response: ResponseData)=>{
      businessID.value = response.data.id
      patchClientInfo(clientID.value,{'businessId':businessID.value})
      successNotification.value.showToast();
      messageDetail.value = "You successfully updated business profile with a Business ID "+businessID.value
    }).catch((e:Error)=>{
      console.log(e.message)
    })
  }
}
const onAddBSocial = async () => {
  formSocialMedia.business = formClient.businessId
  formSocialMedia.platForm = selectSocialMed.value.toString()
  BusinessDataService.createSocial(formSocialMedia).then((response: ResponseData)=>{
    loadSocial(formClient.businessId)
    formSocialMedia.url = ""
    selectSocialMed.value = ["1"]
  }).catch((e:Error)=>{
    console.log(e.message)
  })
}
const onAddBusinessOwner = async () => {
  formBusinessOwner.business = formClient.businessId
  BusinessDataService.createOwner(formBusinessOwner).then((response: ResponseData)=>{
    loadBusinessOwner(formClient.businessId)
    formBusinessOwner.lname = ""
    formBusinessOwner.designation = ""
    formBusinessOwner.business = "0"
    formBusinessOwner.contactNo = ""
    formBusinessOwner.email ="" 
  }).catch((e:Error)=>{
    console.log(e.message)
  })
}
const onAddEcommerce = async () => {
  formEcommerce.business = formClient.businessId
  formEcommerce.platForm = selectEcommerce.value.toString()
  BusinessDataService.createEcommerce(formEcommerce).then((response: ResponseData)=>{
    loadEcommerce(formClient.businessId)
    formEcommerce.url = ""
    selectEcommerce.value = ["1"]
  }).catch((e:Error)=>{
    console.log(e.message)
  })
}
onMounted(async () => {
  getClientInfo(clientID.value);
  if(sessionStorage.getItem('userId') === null){
      router.push({ path:'/login'})
      sessionStorage.clear()
    }
  if(sessionStorage.getItem("privileges")==="0"){
    successNotification.value.showToast();
    message.value = "Redirecting...."
    messageDetail.value = "You don't have access to this page. Redirecting you the landing page."
    router.push({path: "/dashboard"});
  }
});
const capitalized = (item: any) =>{
  const capitalizedFirst = item[0].toUpperCase();
  const rest = item.slice(1);

  return capitalizedFirst.trim() + rest.trim();
}

const selectClient = (item:any) =>{
  formBusinessOwner.client = item.id
  formBusinessOwner.lname = item.lname + ", " + item.fname + " " + item.mname
  formBusinessOwner.designation = item.designation
  formBusinessOwner.contactNo = item.telNo +"|"+item.mobileNo
  formBusinessOwner.email = item.email
}
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Profile Layout</h2>
  </div>
  <Tab.Group>
    <!-- BEGIN: Notification Content -->
    <Notification refKey="successNotification" :options="{
        duration: 3000,
        }" class="flex bg-slate-200">
        <Lucide icon="CheckCircle" class="block mx-auto" />
      <div class="ml-4 mr-4">
        <div class="font-medium">
          {{message}}
        </div>
        <div class="text-slate-500 mt-1">
          {{ messageDetail }}
        </div>
      </div>
    </Notification>
  <!-- END: Notification Content -->
    <!-- BEGIN: Profile Info -->
    <div class="px-5 pt-5 mt-5 intro-y box">
      <div
        class="flex flex-col pb-5 -mx-5 border-b lg:flex-row border-slate-200/60 dark:border-darkmode-400"
      >
        <div
          class="flex items-center justify-center flex-1 px-5 lg:justify-start"
        >
          <div
            class="relative flex-none w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 image-fit"
          >
            <img
              alt="CFIDP Template"
              class="rounded-full"
              :src="logoUrl"
            />
            <button
              class="absolute bottom-0 right-0 flex items-center justify-center p-2 mb-1 mr-1 rounded-full bg-primary hover:bg-slate-500"
            >
              <Lucide icon="Camera" class="w-4 h-4 text-white" />
            </button>
          </div>
          <div class="ml-5">
            <div
              class="w-24 text-lg font-medium truncate sm:w-40 sm:whitespace-normal"
            >
              {{formClient.fname + " " + formClient.mname.charAt(0) + ". " + formClient.lname }}
            </div>
            <div class="text-slate-500">{{ formClient.designation }}</div>
          </div>
        </div>
        <div
          class="flex-1 px-5 pt-5 mt-6 border-t border-l border-r lg:mt-0 border-slate-200/60 dark:border-darkmode-400 lg:border-t-0 lg:pt-0"
        >
          <div class="font-medium text-center lg:text-left lg:mt-3">
            Contact Details
          </div>
          <div
            class="flex flex-col items-center justify-center mt-4 lg:items-start"
          >
            <div class="flex items-center truncate sm:whitespace-normal">
              <Lucide icon="Mail" class="w-4 h-4 mr-2" />
              {{ formClient.email }}
            </div>
            <div class="flex items-center mt-3 truncate sm:whitespace-normal">
              <Lucide icon="Phone" class="w-4 h-4 mr-2" /> Tel. No.:
              {{ formClient.telNo }}
            </div>
            <div class="flex items-center mt-3 truncate sm:whitespace-normal">
              <Lucide icon="Phone" class="w-4 h-4 mr-2" /> Fax No.:
              {{ formClient.faxNo }}
            </div>
            <div class="flex items-center mt-3 truncate sm:whitespace-normal">
                <Lucide icon="Phone" class="w-4 h-4 mr-2" /> Mobile No.:
                {{ formClient.mobileNo }}
              </div>
          </div>
        </div>
      </div>
      <Tab.List
        variant="link-tabs"
        class="flex-col justify-center text-center sm:flex-row lg:justify-start"
      >
        <Tab :fullWidth="false">
            <Tab.Button class="flex items-center py-4 cursor-pointer">
            <Lucide icon="User" class="w-4 h-4 mr-2" /> Profile
            </Tab.Button>
        </Tab>
        <Tab :fullWidth="false">
            <Tab.Button class="flex items-center py-4 cursor-pointer" @click="loadBusiness">
            <Lucide icon="Shield" class="w-4 h-4 mr-2" /> Business Information
            </Tab.Button>
        </Tab>
        <Tab :fullWidth="false">
            <Tab.Button class="flex items-center py-4 cursor-pointer">
            <Lucide icon="Lock" class="w-4 h-4 mr-2" /> Assistance
            </Tab.Button>
        </Tab>
        <Tab :fullWidth="false">
            <Tab.Button class="flex items-center py-4 cursor-pointer">
            <Lucide icon="Settings" class="w-4 h-4 mr-2" /> Settings
            </Tab.Button>
        </Tab>
      </Tab.List>
    </div>
    <!-- END: Profile Info -->
    <Tab.Panels class="mt-5 intro-y">
      <Tab.Panel>
        <div class="grid grid-cols-12 gap-6">
          <!-- BEGIN: Top Categories -->
          <div class="col-span-12 intro-y box lg:col-span-12">
            <div class="p-5">
              <div class="flex flex-col sm:flex-row">
                <form class="validate-form" @submit.prevent="onSubmit">
                    <fieldset class="grid grid-cols-12 col-span-12 gap-4 gap-y-3 
                            border border-solid border-gray-300 p-2">
                            <legend class="text-sm font-bold">Personal Information</legend>
                            <div class="col-span-12 md:col-span-1">
                            <FormLabel htmlFor="modal-form-3"> Prefix </FormLabel>
                            <FormInput form-input-size="sm"  :rounded="rounded" v-model="formClient.prefix" type="text" placeholder="Ms./Mr./Mrs." />
                            </div>
                            <div class="col-span-12 md:col-span-3">
                                <FormLabel  htmlFor="modal-form-1"> Last Name </FormLabel>
                                <FormInput form-input-size="sm"  :rounded="rounded" 
                                v-model="formClient.lname" type="text" placeholder=""
                                required/>
                            </div>
                            <div class="col-span-12 md:col-span-4">
                                <FormLabel htmlFor="modal-form-2"> First Name </FormLabel>
                                <FormInput form-input-size="sm"  :rounded="rounded" 
                                v-model="formClient.fname" type="text" placeholder="" required/>
                            </div>
                            <div class="col-span-12 md:col-span-3">
                            <FormLabel htmlFor="modal-form-3">Middle Name</FormLabel>
                            <FormInput form-input-size="sm"  :rounded="rounded" v-model="formClient.mname" 
                                type="text" placeholder="M.I" />
                            </div>
                            <div class="col-span-12 md:col-span-1">
                            <FormLabel htmlFor="modal-form-3"> Suffix </FormLabel>
                            <FormInput form-input-size="sm"  :rounded="rounded" v-model="formClient.suffix" type="text" placeholder="Sr/Jr/III" />
                            </div>
                            <div class="col-span-12 md:col-span-2">
                                <FormLabel htmlFor="modal-form-3"> Sex </FormLabel>
                                <FormSelect form-select-size="sm"  v-model="formClient.gender" required>
                                <option value="FEMALE">Female</option>
                                <option value="MALE">Male</option>
                                <option value="Other">Other</option>
                                </FormSelect>
                            </div>
                            <div class="col-span-12 md:col-span-2">
                            <FormLabel htmlFor="modal-form-3"> Civil Status </FormLabel>
                            <FormSelect form-select-size="sm"  v-model="formClient.civilStatus" required>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Widowed">Widowed</option>
                                <option value="Legally Separated">Legally Separated</option>
                            </FormSelect>
                            </div>
                            <div class="col-span-12 md:col-span-2">
                            <FormLabel htmlFor="modal-form-3"> Social Classification </FormLabel>
                            <FormSelect form-select-size="sm"  v-model="formClient.socialClassification" required>
                                <option value="Abled">Abled</option>
                                <option value="Indigenous Person">Indigenous Person</option>
                                <option value="Differently-Abled (PWD)">Differently-Abled (PWD)</option>
                                <option value="Senior Citizen">Senior Citizen</option>
                            </FormSelect>
                            </div>
                            <div class="col-span-12 md:col-span-2">
                            <FormLabel  htmlFor="modal-form-1"> Age </FormLabel>
                            <FormSelect form-select-size="sm"  v-model="formClient.age" required>
                                <option value="18 - 35 years old">18 - 35 years old</option>
                                <option value="above 35 – below 60 years old">above 35 – below 60 years old</option>
                                <option value="60 years old and  above">60 years old and  above</option>
                            </FormSelect>
                            </div>
                            <div class="col-span-12 md:col-span-4">
                            <FormLabel  htmlFor="modal-form-1"> Job Position </FormLabel>
                            <FormInput form-input-size="sm"  :rounded="rounded" v-model="formClient.designation" type="text" placeholder=""/>
                            </div>
                            <fieldset class="grid grid-cols-12 col-span-12 gap-4 gap-y-3 border border-solid border-gray-300 p-3">
                            <legend class="text-xs">Address</legend>
                            <div class="col-span-12 md:col-span-6">
                                <FormLabel  htmlFor="modal-form-1"> House No./Street Name</FormLabel>
                                <FormInput form-input-size="sm"  v-model="formClient.address" type="text"
                                placeholder="House/Building No. / Room & Floor No./ Building Name" required/>
                            </div>
                            <div class="col-span-12 md:col-span-3">
                                <FormLabel  htmlFor="modal-form-3"> Longitude </FormLabel>
                                <FormInput form-input-size="sm"  v-model="formClient.longitude" type="text"
                                placeholder="If applicable"/>
                            </div>
                            <div class="col-span-12 md:col-span-3">
                                <FormLabel  htmlFor="modal-form-3"> Latitude </FormLabel>
                                <FormInput form-input-size="sm"  v-model="formClient.latitude" type="text"
                                placeholder="If applicable"/>
                            </div>
                            <!-- BEGIN: Search -->
                            <div class="col-span-12 md:col-span-12">
                                <div class="col-span-12 md:col-span-3">
                                <FormLabel  htmlFor="modal-form-1"> Barangay  </FormLabel>
                                <FormInput form-input-size="sm"
                                    type="text"
                                    placeholder="Search Barangay..."
                                    @focus="showSearchBrgy"
                                    @blur="hideSearchBrgy"
                                    v-model="addressSelect.addressName"
                                />
                            </div>
                                <TransitionRoot
                                as="template"
                                :show="brgyDropdown"
                                enter="transition-all ease-linear duration-150"
                                enterFrom="mt-5 invisible opacity-0 translate-y-1"
                                enterTo="mt-[3px] visible opacity-100 translate-y-0"
                                entered="mt-[3px]"
                                leave="transition-all ease-linear duration-150"
                                leaveFrom="mt-[3px] visible opacity-100 translate-y-0"
                                leaveTo="mt-5 invisible opacity-0 translate-y-1"
                                >
                                <div class="absolute right-100 z-50 mt-[3px]">
                                    <div class="w-auto p-5 box">
                                    <div class="mb-2 font-medium">List of Barangay</div>
                                    <div class="mb-5 hover:bg-slate-400" v-for="item in brgySelect" :key="item.id" :value="item.id" @click="checkBa(item)">
                                        <button href="" class="flex items-center" type="button">
                                        <div
                                            class="flex items-center justify-center w-8 h-8 rounded-full bg-success/20 dark:bg-success/10 text-success"
                                        >
                                            <Lucide icon="MapPin" class="w-4 h-4" />
                                        </div>
                                        <div class="ml-3">{{item.address}}</div>
                                        </button>
                                    </div>
                                    </div>
                                </div>
                                </TransitionRoot>
                            </div>
                            <!-- END: Search -->
                            </fieldset>
                            <fieldset class="grid grid-cols-12 col-span-12 gap-4 gap-y-3 border border-solid border-gray-300 p-3">
                            <legend class="text-xs">Contact Details</legend>
                            <div class="col-span-12 md:col-span-3">
                                <FormLabel  htmlFor="modal-form-3"> Landline Number </FormLabel>
                                <FormInput form-input-size="sm"  v-model="formClient.telNo" type="text"
                                placeholder="If applicable"/>
                            </div>
                            <div class="col-span-12 md:col-span-3">
                                <FormLabel  htmlFor="modal-form-3"> Mobile Number </FormLabel>
                                <FormInput form-input-size="sm"  v-model="formClient.mobileNo" type="text"
                                placeholder="If applicable"/>
                            </div>
                            <div class="col-span-12 md:col-span-3">
                                <FormLabel  htmlFor="modal-form-3"> Fax Number </FormLabel>
                                <FormInput form-input-size="sm"  v-model="formClient.faxNo" type="text"
                                placeholder="If applicable"/>
                            </div>
                            <div class="col-span-12 md:col-span-3">
                                <FormLabel  htmlFor="modal-form-3"> Email Address </FormLabel>
                                <FormInput form-input-size="sm"  v-model="formClient.email" type="email"
                                placeholder="If applicable"/>
                            </div>
                            </fieldset>
                            <fieldset class="grid grid-cols-12 col-span-12 gap-4 gap-y-3 
                        border border-solid border-gray-300 p-2">
                        <legend class="text-sm font-bold">CFIDP</legend>
                        <div class="col-span-12 md:col-span-4">
                            <FormLabel  htmlFor="modal-form-1"> Classification </FormLabel>
                            <FormSelect form-select-size="sm" v-model="formClient.classification" required>
                            <option value="Individual Farmer">Individual Farmer</option>
                            <option value="Association/Cooperative">Association/Cooperative</option>
                            <option value="MSME">MSME</option>
                            </FormSelect>
                        </div>
                        <div class="col-span-12 md:col-span-4">
                            <FormLabel  htmlFor="modal-form-1"> Are you NCFRS-Registered? </FormLabel>
                            <InputGroup class="grid grid-cols-12">
                                <FormSelect form-select-size="sm"  v-model="ncfrs" class="col-span-12 md:col-span-2 text-slate-50" @change="aNcfrs">
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                <option value="Not Sure">Not Sure</option>
                                </FormSelect>
                                <FormInput form-input-size="sm"  :rounded="rounded" v-model="formClient.farmerId" 
                                    type="text" placeholder="Farmer's ID" class="col-span-12 md:col-span-10" :disabled="disNcfrs" required/>
                            </InputGroup>
                        </div>
                        <div class="col-span-12 md:col-span-4">
                            <FormLabel  htmlFor="modal-form-1"> Tenurial Status </FormLabel>
                            <InputGroup class="grid grid-cols-12">
                            <FormSelect form-select-size="sm"  v-model="tenurial" class="col-span-12 md:col-span-2 text-slate-50" @change="dTenurial">
                                <option value="Owner">Owner</option>
                                <option value="Owner-Tiller">Owner-Tiller</option>
                                <option value="Grower">Grower</option>
                                <option value="Tenant">Tenant</option>
                                <option value="Tenant-Worker">Tenant-Worker</option>
                                <option value="Worker-Laborer">Worker-Laborer</option>
                                <option value="Others">Others</option>
                            </FormSelect>
                            <FormInput form-input-size="sm"  :rounded="rounded" v-model="formClient.tenurialStatus" 
                                type="text" placeholder="Please Specify......" class="col-span-12 md:col-span-10" :disabled="disTenurial" required/>
                            </InputGroup>
                        </div>
                        <div class="col-span-12 md:col-span-8">
                            <FormLabel  htmlFor="modal-form-1"> Are you a member of a farm/coconut organization? </FormLabel>
                            <InputGroup class="grid grid-cols-12">
                            <FormSelect form-select-size="sm"  v-model="organization" class="col-span-12 md:col-span-2 text-slate-50" @change="dOrganization">
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </FormSelect>
                            <FormInput form-input-size="sm"  :rounded="rounded" v-model="formClient.ipGroup" 
                                type="text" placeholder="Name of organization" class="col-span-12 md:col-span-10" :disabled="disOrganization" required/>
                            </InputGroup>
                        </div>
                        <div class="col-span-12 md:col-span-4">
                            <FormLabel  htmlFor="modal-form-1"> Is your organization accredited/registered? </FormLabel>
                            <InputGroup class="grid grid-cols-12">
                            <FormSelect form-select-size="sm"  v-model="accreditation" class="col-span-12 md:col-span-3" @change="dAccreditation">
                                <option value="PCA">PCA-</option>
                                <option value="CDA">CDA-</option>
                                <option value="SEC">SEC-</option>
                                <option value="No">No</option>
                            </FormSelect>
                            <FormInput form-input-size="sm"  :rounded="rounded" v-model="formClient.accreditation" 
                                type="text" placeholder="Accreditation/Registration Number..." class="col-span-12 md:col-span-9" :disabled="disAccreditation" required/>
                            </InputGroup>
                        </div>
                        </fieldset>
                    </fieldset>
                  <Button type="submit" variant="primary" elevated class="w-auto bg-primary">
                    <Lucide icon="Save" class="w-4 h-4 mr-2" />Update
                  </Button>
                  </form>
              </div>
            </div>
          </div>
          <!-- END: Top Categories -->
          <!-- BEGIN: Work In Progress -->
          <!-- <div class="col-span-12 intro-y box lg:col-span-4">
            <div class="p-5">
              <div class="flex flex-col sm:flex-row">
                <Button type="submit" variant="primary" elevated class="w-auto bg-primary">
                    <Lucide icon="Save" class="w-4 h-4 mr-2" />Update
                </Button>
              </div>
            </div>
          </div> -->
          <!-- END: Work In Progress -->
        </div>
      </Tab.Panel>
      <!-- BEGIN: Business Information -->
      <Tab.Panel>
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 intro-y box lg:col-span-7 sm:col-span-12 md:col-span-full">
            <div class="p-5">
              <form class="validate-form" @submit.prevent="onAddBusiness">
                <div class="grid grid-cols-12 col-span-12 gap-4 gap-y-3">
                  <div class="col-span-12 md:col-span-8">
                      <FormLabel htmlFor="modal-form-2">Registered Business Name</FormLabel>
                      <FormInput form-input-size="sm"  :rounded="rounded" 
                      v-model="formBusiness.businessName" type="text" placeholder="" required/>
                  </div>
                  <div class="col-span-12 md:col-span-4">
                    <FormLabel htmlFor="modal-form-3">Year Established</FormLabel>
                    <FormInput form-input-size="sm"  :rounded="rounded" v-model="formBusiness.yearEstablished" 
                        type="number" placeholder="" />
                  </div>
                  <div class="col-span-12 md:col-span-8">
                    <FormLabel htmlFor="modal-form-3">Business Ownership</FormLabel>
                    <TomSelect
                      v-model="selectBusinessOwner"
                      :options="{
                        placeholder: 'Select item below. If not exist please key it in.',
                      }"
                      class="w-full" multiple
                    >
                      <option value="Sole Proprietorship">Sole Proprietorship</option>
                      <option value="Partnership/Corporation">Partnership/Corporation</option>
                      <option value="Cooperative">Cooperative</option>
                      <option value="Association">Association (DOLE Registration No. _____________)</option>
                      <option :value="formBusiness.businessOwnership">{{formBusiness.businessOwnership}}</option>
                    </TomSelect>
                  </div>
                  <div class="col-span-12 md:col-span-4">
                    <FormLabel htmlFor="modal-form-3">Main Line of Business</FormLabel>
                    <TomSelect
                      v-model="selectLineOfBusiness"
                      :options="{
                        placeholder: 'Select item below. If not exist please key it in.',
                      }"
                      class="w-full" multiple
                    >
                      <option value="Farming">Farming</option>
                      <option value="Manufacturing/Processing">Manufacturing/Processing</option>
                      <option value="Trader/Consolidator">Trader/Consolidator</option>
                      <option :value="formBusiness.lineOfBusiness">{{formBusiness.lineOfBusiness}}</option>
                    </TomSelect>
                  </div>
                  <div class="col-span-12 md:col-span-8">
                    <FormLabel htmlFor="modal-form-3">Standard Certification/Accreditation</FormLabel>
                    <TomSelect
                      v-model="selectStandardCertification"
                      :options="{
                        placeholder: 'Select item below. If not exist please key it in.',
                      }"
                      class="w-full" multiple
                    >
                      <option value="FDA-LTO">FDA-LTO</option>
                      <option value="GMP">GMP</option>
                      <option value="HACCP">HACCP</option>
                      <option :value="formBusiness.standardCertification">{{formBusiness.standardCertification}}</option>
                    </TomSelect>
                  </div>
                  <div class="col-span-12 md:col-span-4">
                      <FormLabel htmlFor="modal-form-3 sm:text-xs text-xs"> Company Size/Capitalization</FormLabel>
                      <FormSelect  v-model="formBusiness.capitalization" required>
                        <option value="Micro (3M below)">Micro (3M below)</option>
                        <option value="Small (3M – 15M)">Small (3M – 15M)</option>
                        <option value="Cooperative (15M – 100M)">Cooperative (15M – 100M)</option>
                        <option value="Association (100M above)">Association (100M above)</option>
                      </FormSelect>
                  </div>
                  <div class="col-span-12 md:col-span-3">
                    <FormLabel htmlFor="modal-form-3"> No. of Outlet </FormLabel>
                    <FormInput form-input-size="sm"  v-model="formBusiness.noOutlets" type="number"
                        placeholder="" required/>
                  </div>
                  <div class="col-span-12 md:col-span-3">
                    <FormLabel htmlFor="modal-form-3"> No. of Employees </FormLabel>
                    <FormSelect form-select-size="sm"  v-model="formBusiness.noEmployee" required>
                        <option value="1-9">1-9</option>
                        <option value="10-99">10-99</option>
                        <option value="100-199">100-199</option>
                        <option value="200 and above">200 and above</option>
                    </FormSelect>
                  </div>
                  <div class="col-span-12 md:col-span-3">
                    <FormLabel  htmlFor="modal-form-3"> No. of Male </FormLabel>
                    <FormInput form-input-size="sm"  v-model="formBusiness.noOfMaleEmployee" type="text"
                    placeholder="If applicable"/>
                  </div>
                  <div class="col-span-12 md:col-span-3">
                    <FormLabel  htmlFor="modal-form-3"> No. of Female </FormLabel>
                    <FormInput form-input-size="sm"  v-model="formBusiness.noOfFemaleEmployee" type="text"
                    placeholder="If applicable"/>
                  </div>
                  <!-- <div class="col-span-12 md:col-span-8">
                    <FormLabel  htmlFor="modal-form-1"> No. of Male
                    </FormLabel>
                    <InputGroup>
                        <InputGroup.Text  id="input-group-email"> Male </InputGroup.Text>
                        <FormInput form-input-size="sm"  :rounded="rounded" v-model="formBusiness.noOfMaleEmployee" 
                            type="number" placeholder="Farmer's ID" class="col-span-12 md:col-span-6 mb-2 mr-2" />
                        <InputGroup.Text id="input-group-email"> Female </InputGroup.Text>
                        <FormInput form-input-size="sm"  :rounded="rounded" v-model="formBusiness.noOfFemaleEmployee" 
                            type="number" placeholder="Farmer's ID" class="col-span-12 md:col-span-6 mb-2 mr-2" />
                    </InputGroup>
                  </div> -->
                  <fieldset class="grid grid-cols-12 col-span-12 gap-4 gap-y-3 border border-solid border-gray-300 p-3">
                    <legend class="text-xs">Business Address</legend>
                    <div class="col-span-12 md:col-span-6">
                        <FormLabel  htmlFor="modal-form-1"> House No./Street Name</FormLabel>
                        <FormInput form-input-size="sm"  v-model="formBusiness.businessAddress" type="text"
                        placeholder="House/Building No. / Room & Floor No./ Building Name" required/>
                    </div>
                    <div class="col-span-12 md:col-span-3">
                        <FormLabel  htmlFor="modal-form-3"> Longitude </FormLabel>
                        <FormInput form-input-size="sm"  v-model="formBusiness.businessLongitude" type="text"
                        placeholder="If applicable"/>
                    </div>
                    <div class="col-span-12 md:col-span-3">
                        <FormLabel  htmlFor="modal-form-3"> Latitude </FormLabel>
                        <FormInput form-input-size="sm"  v-model="formBusiness.businessLatitude" type="text"
                        placeholder="If applicable"/>
                    </div>
                    <!-- BEGIN: Search -->
                    <div class="col-span-12 md:col-span-12">
                        <div class="col-span-12 md:col-span-3">
                            <FormLabel  htmlFor="modal-form-1"> Barangay  </FormLabel>
                            <FormInput form-input-size="sm"
                                type="text"
                                placeholder="Search Barangay..."
                                @focus="showSearchBrgyBusiness"
                                @blur="hideSearchBrgyBusiness"
                                v-model="addressSelectBus.businessAddress"
                            />
                        </div>
                        <TransitionRoot
                        as="template"
                        :show="brgyDropdownBusiness"
                        enter="transition-all ease-linear duration-150"
                        enterFrom="mt-5 invisible opacity-0 translate-y-1"
                        enterTo="mt-[3px] visible opacity-100 translate-y-0"
                        entered="mt-[3px]"
                        leave="transition-all ease-linear duration-150"
                        leaveFrom="mt-[3px] visible opacity-100 translate-y-0"
                        leaveTo="mt-5 invisible opacity-0 translate-y-1"
                        >
                        <div class="absolute right-100 z-50 mt-[3px]">
                            <div class="w-auto p-5 box">
                            <div class="mb-2 font-medium">List of Barangay</div>
                            <div class="mb-5 hover:bg-slate-400" v-for="item in brgySelect" :key="item.id" :value="item.id" @click="checkBusinessBrgy(item)">
                                <button href="" class="flex items-center" type="button">
                                <div
                                    class="flex items-center justify-center w-8 h-8 rounded-full bg-success/20 dark:bg-success/10 text-success"
                                >
                                    <Lucide icon="MapPin" class="w-4 h-4" />
                                </div>
                                <div class="ml-3">{{item.address}}</div>
                                </button>
                            </div>
                            </div>
                        </div>
                        </TransitionRoot>
                    </div>
                    <!-- END: Search -->
                  </fieldset>
                  <div class="col-span-12 md:col-span-6">
                    <FormSwitch>
                        <FormSwitch.Label htmlFor="checkbox-switch-7">
                          Is the Office and Factory/Plant Address the same? &nbsp;
                        </FormSwitch.Label>
                        <FormSwitch.Input v-model="sameAddress" type="checkbox" class="mr-5"/>
                      </FormSwitch>
                  </div>
                  <fieldset class="grid grid-cols-12 col-span-12 gap-4 gap-y-3 border border-solid border-gray-300 p-3">
                    <legend class="text-xs">Plant Address</legend>
                    <div class="col-span-12 md:col-span-6">
                        <FormLabel  htmlFor="modal-form-1"> House No./Street Name</FormLabel>
                        <FormInput form-input-size="sm"  v-model="formBusiness.plantAddress" type="text"
                        placeholder="House/Building No. / Room & Floor No./ Building Name" required :disabled="disAbled"/>
                    </div>
                    <div class="col-span-12 md:col-span-3">
                        <FormLabel  htmlFor="modal-form-3"> Longitude </FormLabel>
                        <FormInput form-input-size="sm"  v-model="formBusiness.plantLongitude" type="text"
                        placeholder="If applicable" :disabled="disAbled"/>
                    </div>
                    <div class="col-span-12 md:col-span-3">
                        <FormLabel  htmlFor="modal-form-3"> Latitude </FormLabel>
                        <FormInput form-input-size="sm"  v-model="formBusiness.plantLatitude" type="text"
                        placeholder="If applicable" :disabled="disAbled"/>
                    </div>
                    <!-- BEGIN: Search -->
                    <div class="col-span-12 md:col-span-12">
                        <div class="col-span-12 md:col-span-3">
                            <FormLabel  htmlFor="modal-form-1"> Barangay  </FormLabel>
                            <FormInput form-input-size="sm"
                                type="text"
                                placeholder="Search Barangay..."
                                @focus="showSearchBrgyPlant"
                                @blur="hideSearchBrgyPlant"
                                v-model="addressSelectBus.plantAddress" :disabled="disAbled"
                            />
                        </div>
                        <TransitionRoot
                            as="template"
                            :show="brgyDropdownPlant"
                            enter="transition-all ease-linear duration-150"
                            enterFrom="mt-5 invisible opacity-0 translate-y-1"
                            enterTo="mt-[3px] visible opacity-100 translate-y-0"
                            entered="mt-[3px]"
                            leave="transition-all ease-linear duration-150"
                            leaveFrom="mt-[3px] visible opacity-100 translate-y-0"
                            leaveTo="mt-5 invisible opacity-0 translate-y-1"
                            >
                            <div class="absolute right-100 z-50 mt-[3px]">
                                <div class="w-auto p-5 box">
                                <div class="mb-2 font-medium">List of Barangay</div>
                                <div class="mb-5 hover:bg-slate-400" v-for="item in brgySelect" :key="item.id" :value="item.id" @click="checkPlantBrgy(item)">
                                    <button href="" class="flex items-center" type="button">
                                    <div
                                        class="flex items-center justify-center w-8 h-8 rounded-full bg-success/20 dark:bg-success/10 text-success"
                                    >
                                        <Lucide icon="MapPin" class="w-4 h-4" />
                                    </div>
                                    <div class="ml-3">{{item.address}}</div>
                                    </button>
                                </div>
                                </div>
                            </div>
                          </TransitionRoot>
                    </div>
                    <!-- END: Search -->
                  </fieldset>
                  <fieldset class="grid grid-cols-12 col-span-12 gap-4 gap-y-3 border border-solid border-gray-300 p-3">
                    <legend class="text-xs">Contact Details</legend>
                    <div class="col-span-12 md:col-span-4">
                        <FormLabel  htmlFor="modal-form-3"> Landline Number </FormLabel>
                        <FormInput form-input-size="sm"  v-model="formBusiness.landlineNo" type="text"
                        placeholder="If applicable"/>
                    </div>
                    <div class="col-span-12 md:col-span-4">
                        <FormLabel  htmlFor="modal-form-3"> Mobile Number </FormLabel>
                        <FormInput form-input-size="sm"  v-model="formBusiness.mobileNo" type="text"
                        placeholder="If applicable"/>
                    </div>
                    <div class="col-span-12 md:col-span-4">
                        <FormLabel  htmlFor="modal-form-3"> Fax Number </FormLabel>
                        <FormInput form-input-size="sm"  v-model="formBusiness.faxNo" type="text"
                        placeholder="If applicable"/>
                    </div>
                    <div class="col-span-12 md:col-span-6">
                      <FormLabel  htmlFor="modal-form-3"> Website </FormLabel>
                      <FormInput form-input-size="sm"  v-model="formBusiness.website" type="text"
                      placeholder="If applicable"/>
                    </div>
                    <div class="col-span-12 md:col-span-6">
                        <FormLabel  htmlFor="modal-form-3"> Email Address </FormLabel>
                        <FormInput form-input-size="sm"  v-model="formBusiness.email" type="email"
                        placeholder="If applicable"/>
                    </div>
                  </fieldset>
                </div>
                  <Button type="submit" variant="primary" elevated class="w-auto bg-primary float-right">
                    <Lucide icon="Save" class="w-4 h-4 mr-2" />Save
                  </Button>
              </form>
            </div>
          </div>
          <!-- Social Media Section -->
            <Disclosure.Group variant="boxed" class="col-span-12 intro-y box lg:col-span-5 -ml-4">
              <Disclosure>
                  <Disclosure.Button>
                      Social Media Platform
                  </Disclosure.Button>
                  <Disclosure.Panel class="leading-relaxed text-slate-600 dark:text-slate-500">
                    <form class="validate-form p-2" @submit.prevent="onAddBSocial">
                        <div class="col-span-12 md:col-span-12">
                          <Table sm striped>
                            <Table.Thead>
                              <Table.Tr>
                                <Table.Th class="whitespace-nowrap w-auto sm:w-99 min-w-min"> Platform </Table.Th>
                                <Table.Th class="whitespace-nowrap w-auto sm:w-96 min-w-min"> URL </Table.Th>
                                <Table.Th class="w-1"></Table.Th>
                              </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                              <Table.Tr v-for="item in socialMedList" :key="item.id" :value="item.id" class="-p-10">
                                <Table.Td>
                                    <div class="flex flex-wrap p-0">
                                      <Button :variant="item.platForm" class="w-32 mb-2 mr-2">
                                        <Lucide :icon="capitalized(item.platForm)" class="w-4 h-4 mr-2" />{{capitalized(item.platForm)}}
                                      </Button>
                                    </div>
                                </Table.Td>
                                <Table.Td>{{item.url}}</Table.Td>
                                <Table.Td>
                                  <Button variant="danger" class="mb-2 mr-1" @click="removeSocial(item.id)">
                                    <Lucide icon="Trash2" class="w-4 h-4" />
                                  </Button>
                                </Table.Td>
                              </Table.Tr>
                              <Table.Tr>
                                <Table.Td>
                                  <TomSelect
                                    v-model="selectSocialMed"
                                    :options="{
                                      placeholder: 'Select item below. If not exist please key it in.',
                                    }"
                                    class="w-full col-span-12 md:col-span-12" multiple required
                                  >
                                    <option :value="formSocialMedia.platForm">Please Select.....</option>
                                    <option value="facebook">Facebook</option>
                                    <option value="instagram">Instagram</option>
                                    <option value="twitter">Twitter</option>
                                    <option value="linkedin">Linkedin</option>
                                  </TomSelect>
                                </Table.Td>
                                <Table.Td>
                                  <FormInput form-input-size="sm" :rounded="rounded" v-model="formSocialMedia.url" 
                                  type="text" placeholder="SocMed URL" class="col-span-12 md:col-span-12" required/>
                                </Table.Td>
                                <Table.Td>
                                  <Button type="submit" variant="primary" class="mb-2 mr-1">
                                    <Lucide icon="Plus" class="w-5 h-5" />
                                  </Button>
                                </Table.Td>
                              </Table.Tr>
                            </Table.Tbody>
                          </Table>
                        </div>
                    </form>
                  </Disclosure.Panel>
              </Disclosure>
              <Disclosure>
                  <Disclosure.Button>
                      Ecommerce Platform
                  </Disclosure.Button>
                  <Disclosure.Panel class="leading-relaxed text-slate-600 dark:text-slate-500">
                    <form class="validate-form p-2" @submit.prevent="onAddEcommerce">
                      <div class="col-span-12 md:col-span-12">
                        <Table sm striped>
                          <Table.Thead>
                            <Table.Tr>
                              <Table.Th class="whitespace-nowrap sm:w-40"> Platform </Table.Th>
                              <Table.Th class="whitespace-nowrap w-auto sm:w-96"> URL </Table.Th>
                              <Table.Th class="w-1"></Table.Th>
                            </Table.Tr>
                          </Table.Thead>
                          <Table.Tbody>
                            <Table.Tr v-for="item in ecommerceList" :key="item.id" :value="item.id" class="-p-10">
                              <Table.Td>
                                  <div class="flex flex-wrap p-0">
                                    <Button :variant="item.platForm" class="w-32 mb-2 mr-2">
                                      <Lucide icon="ShoppingBag" class="w-4 h-4 mr-2" />{{item.platForm}}
                                    </Button>
                                  </div>
                              </Table.Td>
                              <Table.Td>{{item.url}}</Table.Td>
                              <Table.Td>
                                <Button variant="danger" class="mb-2 mr-1" @click="removeEcommerce(item.id)">
                                  <Lucide icon="Trash2" class="w-4 h-4" />
                                </Button>
                              </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                              <Table.Td>
                                <TomSelect
                                  v-model="selectEcommerce"
                                  :options="{
                                    placeholder: 'Select item below. If not exist please key it in.',
                                  }"
                                  class="w-full col-span-12 md:col-span-12" multiple required
                                >
                                  <option :value="formEcommerce.platForm">Please Select.....</option>
                                  <option value="Shopee">Shopee</option>
                                  <option value="Lazada">Lazada</option>
                                </TomSelect>
                              </Table.Td>
                              <Table.Td>
                                <FormInput form-input-size="sm" :rounded="rounded" v-model="formEcommerce.url" 
                                type="text" placeholder="SocMed URL" class="col-span-12 md:col-span-12" required/>
                              </Table.Td>
                              <Table.Td>
                                <Button type="submit" variant="primary" class="mb-2 mr-1">
                                  <Lucide icon="Plus" class="w-5 h-5" />
                                </Button>
                              </Table.Td>
                            </Table.Tr>
                          </Table.Tbody>
                        </Table>
                      </div>
                  </form>
                  </Disclosure.Panel>
              </Disclosure>
              <Disclosure>
                  <Disclosure.Button>
                      Business Owner/s and Representative/s
                  </Disclosure.Button>
                  <Disclosure.Panel class="leading-relaxed text-slate-600 dark:text-slate-500 overflow-scroll">
                    <form class="validate-form p-2" @submit.prevent="onAddBusinessOwner">
                      <div class="col-span-12 md:col-span-12">
                        <Table sm striped>
                          <Table.Thead>
                            <Table.Tr>
                              <Table.Th class="whitespace-nowrap w-auto sm:w-96 min-w-min"> Name </Table.Th>
                              <Table.Th class="whitespace-nowrap w-auto sm:w-96 min-w-min"> Designation </Table.Th>
                              <Table.Th class="whitespace-nowrap w-auto sm:w-96 min-w-min"> Contact Number </Table.Th>
                              <Table.Th class="whitespace-nowrap w-auto sm:w-96 min-w-min"> Email </Table.Th>
                              <Table.Th class="w-1"></Table.Th>
                            </Table.Tr>
                          </Table.Thead>
                          <Table.Tbody>
                            <Table.Tr v-for="item in businessOwnerList" :key="item.id" :value="item.id" class="-p-10">
                              <Table.Td>{{item.lname}} </Table.Td>
                              <Table.Td>{{item.designation}}</Table.Td>
                              <Table.Td>{{item.contactNo}}</Table.Td>
                              <Table.Td>{{item.email}}</Table.Td>
                              <Table.Td>
                                <Button variant="danger" class="mb-2 mr-1" @click="removeBusinessOwner(item.id)">
                                  <Lucide icon="Trash2" class="w-4 h-4" />
                                </Button>
                              </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td>
                                  <FormInput form-input-size="sm" :rounded="rounded" v-model="formBusinessOwner.id" 
                                  type="text" placeholder="SocMed URL" class="col-span-12 md:col-span-12 hidden" required/>
                                  <!-- <FormLabel  htmlFor="modal-form-1"> Name </FormLabel> -->
                                  <FormInput  :rounded="rounded"  form-input-size="sm"
                                    v-model="formBusinessOwner.lname" type="text" placeholder="" 
                                    @focus="showSearchLname"
                                    @blur="hideSearchLname"
                                    required/>
                                  <TransitionRoot
                                    as="template"
                                    :show="lnameDropdown"
                                    enter="transition-all ease-linear duration-150"
                                    enterFrom="mt-5 invisible opacity-0 translate-y-1"
                                    enterTo="mt-[3px] visible opacity-100 translate-y-0"
                                    entered="mt-[3px]"
                                    leave="transition-all ease-linear duration-150"
                                    leaveFrom="mt-[3px] visible opacity-100 translate-y-0"
                                    leaveTo="mt-5 invisible opacity-0 translate-y-1"
                                    class="w-full h-40 overflow-scroll"
                                  >
                                    <div class="absolute right-100 z-10 mt-[3px]">
                                      <div class="w-auto p-5 box">
                                        <div class="mb-2 font-medium">Client Name List</div>
                                        <div class="mb-5 hover:blue" v-for="item in clientList" :key="item.id" :value="item.id" v-on:click="selectClient(item)">
                                          <button href="" class="flex items-center" type="button">
                                            <div
                                              class="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 dark:bg-success/10 text-success"
                                            >
                                              <Lucide icon="User" class="w-4 h-4" />
                                            </div>
                                            <div class="ml-3">{{item.lname + ", " + item.fname + " " + item.mname}}</div>
                                          </button>
                                        </div>
                                        </div>
                                    </div>
                                  </TransitionRoot>
                                </Table.Td>
                                <Table.Td>
                                  <FormInput form-input-size="sm" :rounded="rounded" v-model="formBusinessOwner.designation" 
                                  type="text" placeholder="Designation" class="col-span-12 md:col-span-12" required/>
                                </Table.Td>
                                <Table.Td>
                                  <FormInput form-input-size="sm" :rounded="rounded" v-model="formBusinessOwner.contactNo" 
                                  type="text" placeholder="Contact Nu,mber" class="col-span-12 md:col-span-12" required/>
                                </Table.Td>
                                <Table.Td>
                                  <FormInput form-input-size="sm" :rounded="rounded" v-model="formBusinessOwner.email" 
                                  type="text" placeholder="Email" class="col-span-12 md:col-span-12" required/>
                                </Table.Td>
                                <Table.Td>
                                  <Button type="submit" variant="primary" class="mb-2 mr-1">
                                    <Lucide icon="Plus" class="w-5 h-5" />
                                  </Button>
                                </Table.Td>
                              </Table.Tr>
                            </Table.Tbody>
                          </Table>
                        </div>
                    </form>
                  </Disclosure.Panel>
              </Disclosure>
              <Disclosure>
                  <Disclosure.Button>
                      Other Business Affiliates
                  </Disclosure.Button>
                  <Disclosure.Panel class="leading-relaxed text-slate-600 dark:text-slate-500">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five centuries,
                      but also the leap into electronic typesetting, remaining
                      essentially unchanged.
                  </Disclosure.Panel>
              </Disclosure>
          </Disclosure.Group>
        <!-- End of Social Media Section -->
        </div>
        
      </Tab.Panel>
      <!-- END: Business Information -->
      <Tab.Panel>
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 intro-y box lg:col-span-12">
            <div class="p-5">
                <form class="validate-form" @submit.prevent="onAddBusiness">
                  <fieldset class="grid grid-cols-12 col-span-12 gap-4 gap-y-3 
                            border border-solid border-gray-300 p-2">
                            <div class="overflow-x-auto">
                              <Table bordered>
                                <Table.Thead>
                                  <Table.Tr>
                                    <Table.Th class="whitespace-nowrap">#</Table.Th>
                                    <Table.Th class="whitespace-nowrap"> First Name </Table.Th>
                                    <Table.Th class="whitespace-nowrap"> Last Name </Table.Th>
                                    <Table.Th class="whitespace-nowrap"> Username </Table.Th>
                                  </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                  <Table.Tr>
                                    <Table.Td>1</Table.Td>
                                    <Table.Td>Angelina</Table.Td>
                                    <Table.Td>Jolie</Table.Td>
                                    <Table.Td>@angelinajolie</Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td>2</Table.Td>
                                    <Table.Td>Brad</Table.Td>
                                    <Table.Td>Pitt</Table.Td>
                                    <Table.Td>@bradpitt</Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td>3</Table.Td>
                                    <Table.Td>Charlie</Table.Td>
                                    <Table.Td>Hunnam</Table.Td>
                                    <Table.Td>@charliehunnam</Table.Td>
                                  </Table.Tr>
                                </Table.Tbody>
                              </Table>
                            </div>

                    <div class="col-span-12 md:col-span-8">
                      <FormLabel htmlFor="modal-form-2">Registered Business Name</FormLabel>
                      <FormInput form-input-size="sm"  :rounded="rounded" 
                      v-model="formBusiness.businessName" type="text" placeholder="" required/>
                    </div>
                    <div class="col-span-12 md:col-span-4">
                      <FormLabel htmlFor="modal-form-3">Year Established</FormLabel>
                      <FormInput form-input-size="sm"  :rounded="rounded" v-model="formBusiness.yearEstablished" 
                          type="number" placeholder="" />
                    </div>
                  </fieldset>
                </form>
            </div>
          </div>
        </div>
      </Tab.Panel>
    </Tab.Panels>
  </Tab.Group>
</template>
