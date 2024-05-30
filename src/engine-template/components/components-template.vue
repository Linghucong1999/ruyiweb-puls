<template>
  <div class="ruyi-element-wrapper" @click="handleClick">
    <component
      :is="element.elName"
      class="ruyi-element"
      v-bind="element.propsValue"
    />
  </div>
</template>

<script>
import { ruyi_register_components_object } from "@/plugins/index";
import runAnimations from "@/common/js/runAnimations";
import elementEvents from "@/mixins/elementEvents";

export default {
  name: "components-template",
  components: {
    ...ruyi_register_components_object,
  },
  props: {
    element: {
      type: Object,
      require: true,
    },
  },
  mixins: [elementEvents],
  mounted() {
    let cssText = this.$el.style.cssText;
    let animations = this.element.animations || [];
    runAnimations(this.$el, animations, false, () => {
      this.$el.style.cssText = cssText;
    });
  },
  methods: {
    async handleClick() {
      this.$emit("handleElementClick", this.element.events, this.element);
    },
  },
};
</script>
