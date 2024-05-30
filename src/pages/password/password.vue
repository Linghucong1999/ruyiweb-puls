<template>
  <div>
    <Header></Header>
    <div class="step-center">
      <Step
        v-if="active === 0 || active === 1"
        @next="selectFunc"
        :active="active"
      ></Step>
      <StepForm v-if="active === 2"></StepForm>
    </div>
  </div>
</template>

<script>
import Step from "./step/step.vue";
import StepForm from "./step-form/step-form.vue";
import Header from "./header/header.vue";
import userModel from "@/libs/userModel";
export default {
  components: {
    Step,
    Header,
    StepForm,
  },
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    //根据active变化选择执行函数
    selectFunc(value) {
      this.active === 0 ? this.stepNext(value) : this.passCodeNext(value);
    },
    async stepNext(value) {
      if (!value) {
        this.$message.error("请输入邮箱");
        return;
      }
      const data = { email: value };
      const res = await userModel.sendEmailAndCode(data);
      if (res.status === true) {
        this.active++;
      }
    },
    //邮箱和验证码都通过后的下一步
    passCodeNext(value) {
      this.active = value;
    },
  },
};
</script>
<style lang="less" scoped>
.step-center {
  height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
}
</style>