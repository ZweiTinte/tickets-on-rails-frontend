<template>
  <LeftSidebar></LeftSidebar>
  <LaneArea></LaneArea>
  <RightSidebar></RightSidebar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LeftSidebar from "./components/LeftSidebar.vue";
import RightSidebar from "./components/RightSidebar.vue";
import LaneArea from "./components/LaneArea.vue";

export default defineComponent({
  name: "App",
  components: {
    LeftSidebar,
    RightSidebar,
    LaneArea,
  },
});
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 0;
}
</style>
