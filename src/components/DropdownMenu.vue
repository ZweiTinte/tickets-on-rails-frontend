<template>
  <div :class="dropdownStyle" ref="{ref}">
    <div class="dropdown" v-on:click="setOpen(!open)">{{ selected }}</div>
    <div v-if="open">
      <div
        class="dropdown"
        v-for="item in dropdownItems"
        :key="item.id"
        v-on:click="onClick(item.value)"
      >
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    dropdownItem: { required: true, type: String },
    dropdownData: {
      required: true,
      type: [Array, Object],
    },
  },
  data() {
    return {
      selectedItem: this.dropdownItem,
      dropdownItems: this.dropdownData,
      open: false,
      dropdownStyle: `colLayout dropdownBorder `,
    };
  },
  methods: {
    setOpen(openState: boolean) {
      this.open = openState;
      this.dropdownStyle = `colLayout dropdownBorder ${
        this.open ? "priority" : ""
      }`;
    },
    onClick(item: string) {
      console.log(item);
      this.selectedItem = (
        this.dropdownItems as Array<{ id: number; value: string }>
      ).filter(function (i) {
        return i.value === item;
      })[0].value;
      this.$emit("itemSelected", this.selectedItem);
      this.setOpen(false);
    },
  },
  computed: {
    selected() {
      return this.selectedItem;
    },
  },
});
</script>

<style lang="scss"></style>
