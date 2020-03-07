<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-card class="samemargintop">
          <el-row>动漫</el-row>
          <el-divider></el-divider>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-card class="samemargintop">
          <el-row :gutter="20">
            <el-col
              v-for="(anime,i) in animes"
              v-bind:key="`${i}`"
              :xs="12"
              :sm="6"
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
    <el-row type="flex" justify="center">
      <el-pagination
        class="samemargintop pagination"
        :page-size="pageSize"
        :pager-count="7"
        :current-page="pageNum"
        @current-change="onPageChanged"
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Anime } from "../models/anime";
import AnimeAPI from "../api/anime-api";
import AnimeCover from "../components/AnimeCover.vue";
import { Route } from "vue-router";

@Component({
  components: { AnimeCover }
})
export default class AnimeView extends Vue {
  private animes: Anime[] = [];
  private total = 0;
  private pageSize = 30;
  private pageNum = 1;

  @Watch("$route")
  async onRouteChanged(route: Route) {
    this.pageNum = parseInt(route.params.pageNum);
    this.animes = await AnimeAPI.list(
      this,
      this.pageSize,
      this.pageNum - 1,
      ""
    );
  }

  async created() {
    this.pageNum = parseInt(this.$route.params.pageNum);
    this.total = await AnimeAPI.count(this);
    this.animes = await AnimeAPI.list(
      this,
      this.pageSize,
      this.pageNum - 1,
      ""
    );
  }

  async onPageChanged(page: number) {
    if (page != this.pageNum) {
      this.$router.push({ name: "Anime", params: { pageNum: `${page}` } });
    }
  }
}
</script>

<style lang="scss">
.samemargintop {
  margin-top: 20px;
}
.el-pager li {
  font-size: 18px;
}
.pagination {
  padding-bottom: 40px;
}
</style>