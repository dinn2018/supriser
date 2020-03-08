<template>
  <el-image style="cursor:pointer;" @click="click" :src="url" :fit="fit"></el-image>
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

