<template>
  <div class="ruyi-iframe">
    <iframe
      :src="url"
      style="
        background-color: transparent;
        width: 100%;
        min-height: 100%;
        border: none;
      "
    ></iframe>
  </div>
</template>
<script>
export default {
  name: "RuyiIframe",
  props: {
    url: {
      type: String,
      default: "https://cn.vuejs.org/",
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>