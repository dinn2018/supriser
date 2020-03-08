<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <AnimeDetails v-if="anime.id" :anime="anime"></AnimeDetails>
        <el-row>
          <el-card style="margin-top:20px;">
            <el-row class="largefont" type="flex">
              <el-col :xs="16" :lg="20" :md="20">播放列表</el-col>
              <el-col :xs="8" :lg="4" :md="4" style="text-align:right;">
                <div @click="orderChangeds">
                  排序
                  <span>
                    <font-awesome-icon v-if="!orderUp" icon="arrow-down" />
                    <font-awesome-icon v-else icon="arrow-up" />
                  </span>
                </div>
              </el-col>
            </el-row>
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
        <el-row type="flex" justify="center">
          <el-pagination
            style="margin-bottom: 20px;margin-top: 20px;"
            :page-size="pageSize"
            :pager-count="7"
            :current-page="pageNum"
            @current-change="onPageChanged"
            layout="prev, pager, next"
            :total="total"
          ></el-pagination>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Anime, AnimeSeries } from "../models/anime";
import { HOSTURL } from "../config/config";
import AnimeDetails from "../components/AnimeDetails.vue";
import AnimeAPI from "../api/anime-api";

@Component({
  components: { AnimeDetails }
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
  private orderUp = false;
  private total = 0;
  private pageSize = 48;
  private pageNum = 1;

  getSeriesList() {
    AnimeAPI.seriesList(
      this,
      this.pageSize,
      this.pageNum - 1,
      parseInt(this.$route.params.id),
      this.orderUp
    ).then(res => {
      this.seriesList = res.data;
      this.total = res.count;
    });
  }

  created() {
    AnimeAPI.getAnime(this, parseInt(this.$route.params.id)).then(anime => {
      this.anime = anime;
    });
    this.getSeriesList();
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

  selectSeries(series: AnimeSeries) {
    this.$router.push({
      name: "AnimeVideo",
      params: { animeID: `${this.anime.id}`, seriesID: `${series.id}` },
      query: { pageNum: `${this.pageNum}` }
    });
  }

  onPageChanged(page: number) {
    if (page != this.pageNum) {
      this.pageNum = page;
      this.getSeriesList();
    }
  }

  orderChangeds() {
    this.orderUp = !this.orderUp;
    this.getSeriesList();
  }
}
</script>

<style lang="scss">
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