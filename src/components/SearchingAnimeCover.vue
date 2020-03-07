<template>
  <el-col :span="24">
    <el-row :span="24" class="anime-info">
      <el-col :lg="3">
        <Poster :url="poster" :fit="fit" @click="selectPoster"></Poster>
      </el-col>
      <el-col :lg="20">
        <el-row>
          {{anime.name}}
          <span class="anime-status">{{anime.status}}</span>
        </el-row>
        <el-row>
          <el-col class="anime-property-name">
            地区:
            <span class="anime-property">{{anime.region}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="anime-property-name">
            导演:
            <span class="anime-property">{{anime.director}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="anime-property-name">
            更新:
            <span class="anime-property">{{updateTime}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="anime-property-name">
            简介:
            <span class="anime-property">{{anime.description}}</span>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-col>
</template>
<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import Poster from "./Poster.vue";
import { HOSTURL } from "../config/config";
import { Anime } from "../models/anime";

@Component({ components: { Poster } })
export default class SearchingAnimeCover extends Vue {
  @Prop() private anime!: Anime;
  private url = "";
  private fit = "fit";

  created() {
    this.url = `${HOSTURL}${this.anime.poster}`;
  }

  async focusImage() {
    //TODO
  }

  get poster() {
    return `${HOSTURL}${this.anime.poster}`;
  }

  get updateTime() {
    const dateTime = new Date(this.anime.updateTime);
    return `${dateTime.getMonth() +
      1}/${dateTime.getDay()}/${dateTime.getFullYear()} ${dateTime.getHours()}:${dateTime.getMinutes()}`;
  }

  async focusPoster() {
    //TODO
  }

  async selectPoster() {
    this.$router.push({
      name: "AnimeInfo",
      params: { id: `${this.anime.id}` }
    });
  }
}
</script>

<style lang="scss">
.anime-info {
  padding-top: 20px;
  padding-bottom: 20px;
}
.anime-status {
  color: green;
  font-size: 12px;
}
.anime-property-name {
  color: #333333;
  font-size: 14px;
  padding-top: 10px;
}

.anime-property {
  color: #666666;
  font-size: 14px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.anime-description {
  color: #333333;
  font-size: 14px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.series {
  margin-top: 20px;
  border-radius: 5px;
  font-size: 20px;
  background-color: #11ad1e;
  font-weight: 700;
  color: #f8f1f1;
  text-align: center;
}
</style>