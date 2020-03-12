<template>
  <div id="app">
    <el-row id="nav" type="flex" justify="center" align="middle">
      <el-col :span="4"></el-col>
      <el-col>
        <el-row type="flex" justify="left" align="middle">
          <el-col :xs="12" :lg="4">
            <router-link to="/animes/pages/1" bold id="title-text-main">EX动漫社</router-link>
          </el-col>
          <el-col :xs="12" :lg="20">
            <el-input placeholder="输入关键词" v-model="keyword" @change="searchKeyword">
              <font-awesome-icon
                slot="prefix"
                style="color: grey;padding-top: 12px; padding-left:5px;"
                icon="search"
              />
            </el-input>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
    <el-row>
      <el-col>
        <router-view></router-view>
      </el-col>
    </el-row>
    <el-row id="footer" type="flex" justify="center" align="middle">
      <el-col :span="18">
        <el-row>
          本网站提供的最新动漫资源均系收集于各大网站，本网站只提供web页面服务，并不提供影片资源存储，也不参与录制、上传
          若本站收录的链接无意侵犯了贵司版权，请邮箱联系我们，我们会及时处理相关内容,
          邮箱: dingleiqxy@gmail.com
        </el-row>
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="padding:1rem;"
        >Copyright 2020-2021 exanime.tv All Rights Reserved</el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class App extends Vue {
  private keyword = "";

  searchKeyword(val: string) {
    if (val != "") {
      this.keyword = "";
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
  font-size: 1rem;
  color: yellow;
}

#footer {
  font-size: 0.8rem;
  padding-top: 2rem;
  padding-bottom: 1rem;
  background-color: #f5f0f0;
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

