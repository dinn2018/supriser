<template>
  <div>
    <el-image
      @click="click"
      style="border-radius:10px; width:150px;height:220px;"
      :src="url"
      :fit="fit"
    ></el-image>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class Poster extends Vue {
  @Prop() private url!: string;

  private fit = "fit";

  click() {
    this.$emit("click");
  }
}
</script>

