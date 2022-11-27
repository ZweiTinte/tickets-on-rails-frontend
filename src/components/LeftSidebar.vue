<template>
  <div class="leftSidebar">
    <div class="dropdownWrapper">
      <DropdownMenu
        @itemSlected="setItem"
        :dropdownItem="selectedProject"
        :dropdownData="projectList"
      ></DropdownMenu>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DropdownMenu from "./DropdownMenu.vue";

export default defineComponent({
  components: { DropdownMenu },
  data() {
    return {
      selectedProject: "Project 1",
      projectList: [
        { id: 1, value: "Project 1" },
        { id: 2, value: "Project 2" },
      ],
    };
  },
  methods: {
    setItem(item: string) {
      this.selectedProject = item;
    },
  },
});
</script>

<style lang="scss"></style>
