<template>
  <div @click="selected">
    <el-col>
      <el-row>
        <Poster
          :url="url"
          @focus="focusImage"
          style="border-radius:10px; width:100%; height:200px;max-width:200px; margin-bottom:8px;"
        ></Poster>
      </el-row>
      <el-row>
        <el-col class="anime-name">{{anime.name}}</el-col>
      </el-row>
      <el-row>
        <el-col class="anime-director">最近更新: {{updateTime}}</el-col>
      </el-row>
    </el-col>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import Poster from "./Poster.vue";
import { HOSTURL } from "../config/config";
import { Anime } from "../models/anime";

@Component({ components: { Poster } })
export default class AnimeCover extends Vue {
  @Prop() private anime!: Anime;
  private url = "";

  created() {
    this.url = `${HOSTURL}${this.anime.poster}`;
  }

  async selected() {
    this.$router.push({
      name: "AnimeInfo",
      params: { id: `${this.anime.id}` }
    });
  }

  get updateTime() {
    const dateTime = new Date(this.anime.updateTime);
    return `${dateTime.getMonth() +
      1}/${dateTime.getDate()}/${dateTime.getFullYear()}`;
  }

  async focusImage() {
    //TODO
  }
}
</script>

<style lang="scss">
.anime-director {
  padding-bottom: 2rem;
  color: grey;
  font-size: 0.7rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline;
}

.anime-name {
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  font-size: 0.8rem;
  text-overflow: ellipsis;
}
</style>