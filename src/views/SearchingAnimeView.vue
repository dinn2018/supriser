<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-card style="margin-bottom:2rem;margin-top:2rem;">
          <el-row style="font-size:1.2rem;font-weight:700;">{{keyword}}</el-row>
          <el-divider></el-divider>
          <el-col>
            <el-row
              style="margin-bottom:2rem"
              :span="24"
              v-for="(anime,i) in animes"
              v-bind:key="`${i}`"
              :xs="12"
              :sm="6"
              :md="6"
              :lg="4"
              :xl="2"
            >
              <AnimeDetails :anime="anime"></AnimeDetails>
            </el-row>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" v-if="total > pageSize">
      <el-pagination
        style="margin-bottom: 1rem;"
        :page-size="pageSize"
        :pager-count="7"
        :current-page="pageNum"
        @current-change="onPageChanged"
        :total="total"
      ></el-pagination>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Anime } from "../models/anime";
import AnimeAPI from "../api/anime-api";
import AnimeDetails from "../components/AnimeDetails.vue";
import { Route } from "vue-router";
import { Dictionary } from "vue-router/types/router";

@Component({
  components: { AnimeDetails }
})
export default class SearchingAnimeView extends Vue {
  private animes: Anime[] = [];
  private total = 0;
  private pageSize = 10;
  private pageNum = 1;
  private keyword = "";

  @Watch("$route")
  async onRouteChanged(route: Route) {
    this.pageNum = parseInt(route.params.pageNum);
    this.keyword = (route.query as Dictionary<string>)["keyword"];
    this.getSearchingAnimes();
  }

  getSearchingAnimes() {
    AnimeAPI.list(this, this.pageSize, this.pageNum - 1, this.keyword).then(
      res => {
        this.animes = res.data;
        this.total = res.count;
      }
    );
  }

  created() {
    this.pageNum = parseInt(this.$route.params.pageNum);
    this.keyword = (this.$route.query as Dictionary<string>)["keyword"];
    this.getSearchingAnimes();
  }

  onPageChanged(page: number) {
    if (page != this.pageNum) {
      this.$router.push({
        name: "SearchingAnime",
        params: { pageNum: `${page}` },
        query: { keyword: this.keyword }
      });
    }
  }
}
</script>

<style lang="scss">
.el-pager li {
  font-size: 1rem;
}
</style>