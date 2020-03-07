<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-row style="margin-top:20px;">
          <el-col :span="16">
            <Video v-if="currentSeries.url != ''" :url="currentSeries.url" :poster="poster"></Video>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col class="anime-series-name">
                {{anime.name}}
                <span
                  style="font-size:12px;color:#cccccc"
                >{{anime.region}}/{{anime.postYear}}</span>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row style="height:400px;">
              <el-col
                v-for="(series,i) in seriesList"
                v-bind:key="`series--${i}`"
                :xs="24"
                :sm="12"
                :md="6"
                :lg="6"
                :xl="6"
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
export default class SeriesView extends Vue {
  private anime: Anime = {
    id: 0,
    name: "",
    director: "",
    poster: "/static/images/a",
    region: "",
    lang: "",
    description: "",
    status: "",
    updateTime: 0
  };
  private fit = "fit";
  private seriesList: AnimeSeries[] = [];
  private currentSeries: AnimeSeries = {
    id: 0,
    url: "",
    num: 0,
    animeID: 0
  };

  async created() {
    AnimeAPI.series(this, parseInt(this.$route.params.seriesID)).then(
      series => {
        this.currentSeries = series;
      }
    );
    AnimeAPI.get(this, parseInt(this.$route.params.animeID)).then(anime => {
      this.anime = anime;
    });
    AnimeAPI.seriesList(this, parseInt(this.$route.params.animeID)).then(
      list => {
        this.seriesList = list;
      }
    );
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
}
</script>

<style lang="scss">
.anime-series-name {
  margin-left: 20px;
  font-weight: 800;
}

.inactive-series {
  margin-bottom: 20px;
  margin-left: 20px;
  border-radius: 5px;
  font-size: 20px;
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
  font-size: 20px;
  background-color: #11ad1e;
  font-weight: 700;
  color: #f8f1f1;
  text-align: center;
  line-height: 45px;
  cursor: pointer;
}
</style>