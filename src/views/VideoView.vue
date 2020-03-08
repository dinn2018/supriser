<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-row style="margin-top:20px;">
          <el-col>
            <Video v-if="currentSeries.url != ''" :url="currentSeries.url" :poster="poster"></Video>
          </el-col>
          <el-col style="margin-top:20px;">
            <el-row>
              <el-col class="anime-series-name">
                {{anime.name}}
                <span style="font-size:0.7em;color:#11ad1e;">第{{currentSeries.num}}集</span>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row style="height:400px;">
              <el-col
                v-for="(series,i) in seriesList"
                v-bind:key="`series--${i}`"
                :xs="8"
                :sm="8"
                :md="4"
                :lg="3"
                :xl="3"
              >
                <el-card
                  v-bind:class="{'active-series':series.num == currentSeries.num,'inactive-series':series.num != currentSeries.num }"
                  v-bind:body-style="{'padding':'0'}"
                  shadow="hover"
                  @click.native="selectSeries(series)"
                >{{compute(series.num)}}</el-card>
              </el-col>
            </el-row>
          </el-col>
          <el-col type="flex" align="middle" v-if="total > pageSize">
            <el-pagination
              style="margin-bottom: 1rem;margin-top:1rem;"
              :page-size="pageSize"
              :pager-count="7"
              :current-page="pageNum"
              @current-change="onPageChanged"
              :total="total"
            ></el-pagination>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Anime, AnimeSeries } from "../models/anime";
import AnimeAPI from "../api/anime-api";
import AnimeCover from "../components/AnimeCover.vue";
import Video from "../components/Video.vue";
import { HOSTURL } from "../config/config";

@Component({
  components: { AnimeCover, Video }
})
export default class VideoView extends Vue {
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
  private currentSeries: AnimeSeries = {
    id: 0,
    url: "",
    num: 0,
    animeID: 0
  };

  async created() {
    this.currentSeries.id = parseInt(this.$route.params.seriesID);
    AnimeAPI.series(this, this.currentSeries.id).then(series => {
      this.currentSeries = series;
    });
    AnimeAPI.getAnime(this, parseInt(this.$route.params.animeID)).then(
      anime => {
        this.anime = anime;
      }
    );
    this.getSeriesList();
  }

  compute(seriesNum: number) {
    if (seriesNum.toString().length < 2) {
      return `0${seriesNum}`;
    }
    return seriesNum;
  }

  get poster() {
    return `${HOSTURL}${this.anime.poster}`;
  }

  async selectSeries(series: AnimeSeries) {
    if (series.num != this.currentSeries.num) this.currentSeries = series;
  }

  getSeriesList() {
    AnimeAPI.seriesList(
      this,
      this.pageSize,
      this.pageNum - 1,
      parseInt(this.$route.params.animeID),
      this.orderUp
    ).then(res => {
      this.seriesList = res.data;
      this.total = res.count;
    });
  }

  async onPageChanged(page: number) {
    if (page != this.pageNum) {
      this.pageNum = page;
      this.getSeriesList();
    }
  }
}
</script>

<style lang="scss">
.anime-series-name {
  margin-left: 20px;
  font-weight: 800;
  font-size: 1.5em;
}

.inactive-series {
  margin-bottom: 20px;
  margin-left: 20px;
  border-radius: 5px;
  font-size: 1em;
  background-color: #0c110c;
  font-weight: 700;
  color: #f8f1f1;
  text-align: center;
  line-height: 45px;
  cursor: pointer;
}

.active-series {
  margin-bottom: 20px;
  margin-left: 20px;
  border-radius: 5px;
  font-size: 1em;
  background-color: #11ad1e;
  font-weight: 700;
  color: #f8f1f1;
  text-align: center;
  line-height: 45px;
  cursor: pointer;
}

.el-pager li {
  font-size: 1rem;
}
</style>