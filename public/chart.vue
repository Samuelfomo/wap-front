<template>

<!--  <div class="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">-->
<!--    &lt;!&ndash; Line Chart &ndash;&gt;-->
<!--    <div class="py-6" id="pie-chart"></div>-->

<!--  </div>-->



  <div class="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">

    <div id="column-chart"></div>
  </div>


</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const chart = ref(null)

const options = {
  colors: ["#70e825"],
  series: [
    {
      name: "Organic",
      color: "#44db1a",
      data: [
        { x : "Mon", y: 231 },
        { x : "Tue", y: 122 },
        { x : "Wed", y: 63 },
        { x : "Thu", y: 421 },
        { x : "Fri", y: 122 },
        { x : "Sat", y: 323 },
        { x : "Sun", y: 111 },
      ],
    },
  ],
  chart: {
    type: "bar",
    height: "320px",
    fontFamily: "Inter, sans-serif",
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "70%",
      borderRadiusApplication: "end",
      borderRadius: 8,
    },
  },
  tooltip: {
    shared: true,
    intersect: false,
    style: {
      fontFamily: "Inter, sans-serif",
    },
  },
  states: {
    hover: {
      filter: {
        type: "darken",
        value: 1,
      },
    },
  },
  stroke: {
    show: true,
    width: 0,
    colors: ["transparent"],
  },
  grid: {
    show: false,
    strokeDashArray: 4,
    padding: {
      left: 2,
      right: 2,
      top: -14
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  xaxis: {
    floating: false,
    labels: {
      show: true,
      style: {
        fontFamily: "Inter, sans-serif",
        cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
      }
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  fill: {
    opacity: 1,
  },
}

onMounted(() => {
  if(typeof ApexCharts !== 'undefined') {
    chart.value = new ApexCharts(document.getElementById("column-chart"), options);
    chart.value.render();
  } else {
  console.error("ApexCharts n'est pas chargé")
}

})

onBeforeUnmount(() => {
  if (chart.value) {
    chart.value.destroy()
  }
})
</script>