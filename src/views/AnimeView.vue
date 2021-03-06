<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-card style="margin-top:2rem;margin-bottom:2rem">
          <el-col>
            <el-row>动漫</el-row>
            <el-divider></el-divider>
            <el-row type="flex" justify="left">
              <el-col :lg="1" :sm="2" :md="2" :xs="3">
                <span class="category">年份</span>
              </el-col>
              <el-col :xs="21" :sm="20" :md="20" :lg="14">
                <el-row>
                  <el-col :xs="4" :sm="2" :md="2" :lg="2">
                    <span
                      v-bind:class="{'hover-properties':1,'active-properties':selectedPostYears.length == 0}"
                      @click="selectPostYear('')"
                    >全部</span>
                  </el-col>
                  <el-col
                    :lg="2"
                    :xs="4"
                    :md="2"
                    :sm="2"
                    v-for="(postYear,i) in postYears"
                    v-bind:key="`${postYear}-${i}`"
                  >
                    <span
                      v-bind:class="{'hover-properties':1,'active-properties':selectedPostYears.length == 1 && selectedPostYears[0] == postYear}"
                      @click="selectPostYear(postYear)"
                    >{{postYear}}</span>
                  </el-col>
                  <el-col :xs="5" :sm="2" :md="2" :lg="2">
                    <span
                      v-bind:class="{'hover-properties':1,'active-properties':selectedPostYears.length>1}"
                      @click="selectPostYear('other')"
                    >其他</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row style="margin-top:2rem;margin-bottom:2rem" justify="left">
              <el-col :lg="1" :sm="2" :md="2" :xs="3">
                <span class="category">地区</span>
              </el-col>
              <el-col :xs="21" :sm="20" :md="20" :lg="14">
                <el-row>
                  <el-col :xs="4" :sm="2" :md="2" :lg="2">
                    <span
                      v-bind:class="{'hover-properties':1,'active-properties':selectedRegions.length == 0}"
                      @click="selectRegion('')"
                    >全部</span>
                  </el-col>
                  <el-col
                    :lg="2"
                    :xs="4"
                    :md="2"
                    :sm="2"
                    v-for="(region,i) in regions"
                    v-bind:key="`${region}-${i}`"
                  >
                    <span
                      v-bind:class="{'hover-properties':1,'active-properties':selectedRegions.length == 1 && selectedRegions[0] == region}"
                      @click="selectRegion(region)"
                    >{{region}}</span>
                  </el-col>
                  <el-col :xs="5" :sm="2" :md="2" :lg="2">
                    <span
                      v-bind:class="{'hover-properties':1,'active-properties':selectedRegions.length>1}"
                      @click="selectRegion('other')"
                    >其他</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-card>
          <el-row :gutter="20">
            <el-col
              v-for="(anime,i) in animes"
              v-bind:key="`${anime.name}-${i}`"
              :xs="12"
              :sm="8"
              :md="6"
              :lg="4"
              :xl="2"
            >
              <AnimeCover :anime="anime"></AnimeCover>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" v-if="total > pageSize">
      <el-pagination
        style="margin-bottom: 1rem;  margin-top: 1rem;"
        :page-size="pageSize"
        :pager-count="7"
        :current-page="pageNum"
        layout="prev, pager, next"
        @current-change="onPageChanged"
        :total="total"
      ></el-pagination>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { MetaInfo } from "vue-meta";
import { Meta } from "../decorators/decorators";
import { Anime } from "../models/anime";
import AnimeAPI from "../api/anime-api";
import AnimeCover from "../components/AnimeCover.vue";
import { Route } from "vue-router";
import { Dictionary } from "vue-router/types/router";

@Component({
  components: { AnimeCover }
})
export default class AnimeView extends Vue {
  private animes: Anime[] = [];
  private total = 0;
  private pageSize = 30;
  private pageNum = 1;
  private regions: string[] = [];
  private postYears: string[] = [];
  private selectedPostYears: string[] = [];
  private selectedRegions: string[] = [];

  @Meta metaInfo(): MetaInfo {
    return {
      title: "EX动漫社",
      meta: [
        { name: "keywords", content: "新番动漫,日本动漫,好看的动漫,漫社" },
        {
          name: "“description”",
          content:
            "EX动漫社收集整理最新好看的动漫动画片大全，提供内地、日本、欧美等最优质的动漫动画片视频，支持手机观看，致力打造专业在线动漫网站."
        },
        {
          name: "author",
          content: "Dinn"
        }
      ]
    };
  }

  @Watch("$route")
  async onRouteChanged(route: Route) {
    const page = route.params.pageNum;
    this.pageNum = parseInt(page || "1");
    const query = this.$route.query as Dictionary<string>;
    try {
      this.selectedPostYears = JSON.parse(query["postYears"]);
      this.selectedRegions = JSON.parse(query["regions"]);
    } catch (e) {
      this.selectedPostYears = [];
      this.selectedRegions = [];
    }
    this.getCategories();
    this.getAnimes();
  }

  getAnimes() {
    AnimeAPI.list(
      this,
      this.pageSize,
      this.pageNum - 1,
      "",
      this.selectedPostYears,
      this.selectedRegions
    ).then(res => {
      this.animes = res.data;
      this.total = res.count;
    });
  }

  getCategories() {
    AnimeAPI.animeCategories(this).then(res => {
      this.postYears = res.postYears;
      this.regions = res.regions;
    });
  }

  created() {
    const query = this.$route.query as Dictionary<string>;
    try {
      this.selectedPostYears = JSON.parse(query["postYears"]);
      this.selectedRegions = JSON.parse(query["regions"]);
    } catch (e) {
      this.selectedPostYears = [];
      this.selectedRegions = [];
    }
    this.pageNum = parseInt(this.$route.params.pageNum);
    this.getCategories();
    this.getAnimes();
  }

  onPageChanged(page: number) {
    if (page != this.pageNum) {
      this.$router.push({
        name: "Anime",
        params: { pageNum: `${page}` },
        query: {
          postYears: JSON.stringify(this.selectedPostYears),
          regions: JSON.stringify(this.selectedRegions)
        }
      });
    }
  }

  selectPostYear(postYear: string) {
    if (postYear == "") {
      this.selectedPostYears = [];
    } else if (postYear == "other") {
      for (const year of this.postYears) {
        this.selectedPostYears.push(year);
      }
    } else {
      this.selectedPostYears = [postYear];
    }
    this.relaceCurrentRoute();
  }

  selectRegion(region: string) {
    if (region == "") {
      this.selectedRegions = [];
    } else if (region == "other") {
      for (const r of this.regions) {
        this.selectedRegions.push(r);
      }
    } else {
      this.selectedRegions = [region];
    }
    this.relaceCurrentRoute();
  }
  relaceCurrentRoute() {
    this.$router.replace({
      name: "Anime",
      params: { pageNum: `${this.pageNum}` },
      query: {
        postYears: JSON.stringify(this.selectedPostYears),
        regions: JSON.stringify(this.selectedRegions)
      }
    });
  }
}
</script>

<style lang="scss">
.category {
  color: #cccccc;
  padding: 5px;
  border-radius: 0.1rem;
  font-size: 0.7rem;
}

.el-pager li {
  font-size: 1rem;
}

.hover-properties {
  cursor: pointer;
  font-size: 0.6rem;
  padding: 5px;
  margin-top: 5px;
}

.active-properties {
  background-color: #11ad1e;
  border-radius: 5px;
  color: white;
  padding: 5px;
  font-size: 0.6rem;
}
</style>