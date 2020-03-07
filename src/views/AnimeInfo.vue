<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-row class="anime-info">
          <el-col :lg="3">
            <Poster @click="selectPoster" :url="poster" :fit="fit" @focus="focusPoster"></Poster>
          </el-col>
          <el-col :lg="9">
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
        <el-row>
          <el-card class="samemargintop">
            <el-row class="largefont">播放列表</el-row>
            <el-divider></el-divider>
            <el-row :gutter="20">
              <el-col
                v-for="(series,i) in seriesList"
                v-bind:key="`series-${i}`"
                :xs="6"
                :sm="4"
                :md="3"
                :lg="2"
                :xl="2"
              >
                <el-card
                  v-bind:class="'active-series'"
                  v-bind:body-style="{'padding':'0'}"
                  shadow="hover"
                  @click.native="selectSeries(series)"
                >{{compute(series.num)}}</el-card>
              </el-col>
            </el-row>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Anime, AnimeSeries } from "../models/anime";
import { HOSTURL } from "../config/config";
import Poster from "../components/Poster.vue";
import AnimeAPI from "../api/anime-api";

@Component({
  components: { Poster }
})
export default class AnimeInfo extends Vue {
  private anime: Anime = {
    id: 0,
    name: "",
    director: "",
    poster: "",
    region: "",
    lang: "",
    description: "",
    status: "",
    updateTime: 0
  };
  private fit = "fit";
  private seriesList: AnimeSeries[] = [];

  created() {
    AnimeAPI.get(this, parseInt(this.$route.params.id)).then(anime => {
      this.anime = anime;
    });
    AnimeAPI.seriesList(this, parseInt(this.$route.params.id)).then(list => {
      this.seriesList = list;
    });
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
    //TODO
  }

  compute(seriesNum: number) {
    if (seriesNum.toString().length < 2) {
      return `0${seriesNum}`;
    }
    return seriesNum;
  }

  async selectSeries(series: AnimeSeries) {
    this.$router.push({
      name: "AnimeSeries",
      params: { animeID: `${this.anime.id}`, seriesID: `${series.id}` }
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
  // padding-bottom: 10px;
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

.active-series {
  margin-bottom: 20px;
  margin-left: 20px;
  padding-top: 0;
  padding-bottom: 0;
  border-radius: 5px;
  font-size: 20px;
  background-color: #11ad1e;
  font-weight: 700;
  color: #f8f1f1;
  text-align: center;
  line-height: 45px;
  cursor: pointer;
}
</style>