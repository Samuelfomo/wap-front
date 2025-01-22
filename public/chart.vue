<template>

<!--  <div class="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">-->
<!--    &lt;!&ndash; Line Chart &ndash;&gt;-->
<!--    <div class="py-6" id="pie-chart"></div>-->

<!--  </div>-->



<!--  <div class="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">-->

<!--    <div id="column-chart"></div>-->
<!--  </div>-->
  <div class="min-h-screen flex justify-center items-center bg-neutral-50">
    <button disabled type="button" class="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border
    border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700
    dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
      <svg aria-hidden="true" role="status" class="inline w-32 h-32 me-3 text-gray-200 animate-spin dark:text-gray-600"
           viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858
        0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50
        91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013
        9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167
        20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541
        46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717
        44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735
        17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781
        93.9676 39.0409Z" fill="#3AEA52"/>
      </svg>
      Loading...
    </button>
  </div>



</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const chart = ref(null)

const options = {
  colors: ["#44db1a"],
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