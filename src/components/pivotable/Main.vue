<template>
    <div>Pivot</div>
</template>

<script>
import "../../assets/webdatarocks"
export default {
  name: "Pivot",
  props: {
    afterchartdraw: Function,
    aftergriddraw: Function,
    beforegriddraw: Function,
    beforetoolbarcreated: Function,
    cellclick: Function,
    celldoubleclick: Function,
    componentFolder: String,
    customizeCell: Function,
    customizeContextMenu: Function,
    datachanged: Function,
    dataerror: Function,
    datafilecancelled: Function,
    dataloaded: Function,
    fieldslistclose: Function,
    fieldslistopen: Function,
    filterclose: Function,
    filteropen: Function,
    fullscreen: Function,
    global: Object,
    jsonData: Object,
    slicer: Object,
    height: [String, Number],
    loadingdata: Function,
    loadinglocalization: Function,
    loadingolapstructure: Function,
    loadingreportfile: Function,
    localizationerror: Function,
    localizationloaded: Function,
    olapstructureerror: Function,
    olapstructureloaded: Function,
    openingreportfile: Function,
    querycomplete: Function,
    queryerror: Function,
    ready: Function,
    reportchange: Function,
    reportcomplete: Function,
    reportfilecancelled: Function,
    reportfileerror: Function,
    reportfileloaded: Function,
    runningquery: Function,
    toolbar: Boolean,
    update: Function,
    width: [Number, String]
  },
  mounted: function() {
    this.webdatarocks = new WebDataRocks({
      ...this.$props,
      report: {
          dataSource: {
            data: this.$props.jsonData,
            maxRequestSize: 5242880 // Increase maxRequestSize to 5 MB
          },
          slice: this.$props.slicer,
          formats: [{
            "name": "",
            "thousandsSeparator": ",",
            "decimalSeparator": ".",
            "decimalPlaces": 2,
            "currencySymbol": "P ",
            "currencySymbolAlign": "left",
            "nullValue": "0",
            "textAlign": "right",
            "isPercent": false
        }],
        options: {
          grid: {
            showTotals: "off"
          }
        }
	    },
      container: this.$el,
    });
  },
  beforeUpdate() {
    return false;
  }

};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../assets/webdatarocks/webdatarocks.min.css';
span .wdr-credits {
  text-align: center;
}
</style>