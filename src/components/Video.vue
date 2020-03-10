<template>
  <div>
    <video-player
      ref="videoPlayer"
      class="video-player vjs-custom-skin"
      :playsinline="true"
      :options="playerOptions"
      :crossOrigin="crossOrigin"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
    />
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from "vue-property-decorator";
@Component
export default class Video extends Vue {
  @Prop() private url!: string;
  @Prop() private poster!: string;
  private crossOrigin = "*";

  @Watch("poster") async onPosterChanged(val: string) {
    if (val != "") {
      this.playerOptions.poster = val;
    }
  }

  @Watch("url") async onURLChanged(val: string) {
    if (val != "") {
      this.playerOptions.sources = [
        {
          type: "application/x-mpegURL", // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
          src: val // url地址
        }
      ];
    }
  }

  private playerOptions = {
    autoplay: true,
    muted: false,
    loop: false,
    preload: "auto",
    language: "zh-CN",
    aspectRatio: "16:9",
    fluid: true,
    sources: [
      {
        type: "application/x-mpegURL", // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
        src: this.url // url地址
      }
    ],
    hls: true,
    poster: this.poster, // 你的封面地址
    width: "100%", // 播放器宽度
    notSupportedMessage: "此视频暂时无法播放，请稍后再试",
    controlBar: {
      timeDivider: true,
      durationDisplay: true,
      remainingTimeDisplay: false,
      fullscreenToggle: true
    }
  };

  async onPlayerPlay(player: Event) {
    //TODO
    console.log("onPlayerPlay", player);
  }

  async onPlayerPause(player: Event) {
    //TODO
    console.log("onPlayerPause", player);
  }
}
</script>
