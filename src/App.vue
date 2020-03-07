<template>
  <div id="app">
    <!-- <Nav></Nav> -->
    <el-row id="nav" type="flex" justify="center" align="middle">
      <el-col :span="4"></el-col>
      <el-col :span="4">
        <router-link to="/animes/pages/1" bold id="title-text-main">惊奇动漫社</router-link>
      </el-col>
      <el-col :span="2">
        <router-link to="/animes/pages/1" class="title-text">动漫</router-link>
      </el-col>
      <!-- <el-col> -->
      <el-input placeholder="输入关键词" v-model="keyword" @change="searchKeyword">
        <font-awesome-icon
          slot="prefix"
          style="color: grey;padding-top: 12px; padding-left:5px;"
          icon="search"
        />
      </el-input>
      <!-- </el-col> -->
      <el-col :span="4"></el-col>
    </el-row>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class App extends Vue {
  private keyword = "";

  searchKeyword(val: string) {
    if (val != "") {
      this.$router.push({
        name: "SearchingAnime",
        params: { pageNum: "1" },
        query: { keyword: val }
      });
    }
  }
}
</script>

<style lang="scss">
#nav {
  background-image: linear-gradient(70deg, orange, red, black);
  padding-top: 20px;
  padding-bottom: 20px;
}

#title-text-main {
  font-size: 27px;
  color: yellow;
}

.title-text {
  padding: 0;
  margin: 0;
  color: white;
}
a {
  text-decoration: none;
}
</style>

