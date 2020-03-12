<template>
  <div>
    <el-col>
      <el-row style="margin-left: 2rem;margin-top: 1rem;">
        <el-col class="anime-series-name">
          {{anime.name}}
          <span style="font-size:0.7em;color:#11ad1e;">第{{currentSeries.num}}集</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="18" :lg="16">
          <Video
            style="margin-left:1rem;margin-right:1rem;margin-bottom:2rem;"
            v-if="currentSeries.url != ''"
            :url="currentSeries.url"
            :poster="poster"
          ></Video>
        </el-col>
        <el-col :xs="24" :sm="24" :md="6" :lg="8">
          <el-row style="margin-left:1rem;margin-right:1rem;">
            <el-col>
              <el-row :gutter="4">
                <el-col
                  v-for="(series,i) in seriesList"
                  v-bind:key="`series--${i}`"
                  :xs="6"
                  :sm="6"
                  :md="6"
                  :lg="6"
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
          </el-row>
          <el-row type="flex" justify="center" v-show="total > pageSize">
            <el-pagination
              style="margin-bottom: 2rem;margin-top:1rem;"
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
    </el-col>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Anime, AnimeSeries } from "../models/anime";
import AnimeAPI from "../api/anime-api";
import AnimeCover from "../components/AnimeCover.vue";
import Video from "../components/Video.vue";
import { HOSTURL } from "../config/config";
import { Dictionary } from "vue-router/types/router";
import { Meta } from "../decorators/decorators";
import { MetaInfo } from "vue-meta";

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
  private pageSize = 40;
  private pageNum = 1;
  private currentSeries: AnimeSeries = {
    id: 0,
    url: "",
    num: 0,
    animeID: 0
  };

  @Meta metaInfo(): MetaInfo {
    return {
      title: `${this.anime.name} 第${this.currentSeries.num}集,${this.anime.name} 第${this.currentSeries.num}集在线观看`,
      meta: [
        {
          name: "keywords",
          content: `${this.anime.name} 第${this.currentSeries.num}集,${this.anime.name} 第${this.currentSeries.num}集在线观看`
        },
        {
          name: "description",
          content: `${this.anime.description}`
        }
      ]
    };
  }

  async created() {
    const query = this.$route.query as Dictionary<string>;
    const page = query["pageNum"] as string;
    this.pageNum = parseInt(page || "1");
    this.orderUp = query["orderUp"] == "true";
    this.currentSeries.id = parseInt(this.$route.params.seriesID);
    AnimeAPI.series(this, this.currentSeries.id).then(series => {
      this.currentSeries = series;
      AnimeAPI.getAnime(this, parseInt(this.$route.params.animeID)).then(
        anime => {
          this.anime = anime;
        }
      );
    });
    this.getSeriesList();
  }

  compute(seriesNum: number) {
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
  margin-bottom: 1rem;
  font-weight: 800;
  font-size: 1.5em;
}

.inactive-series {
  margin-bottom: 4px;
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
  margin-bottom: 4px;
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