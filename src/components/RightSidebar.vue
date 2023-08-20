<template>
  <div class="rightSidebar">
    <div class="laneTitle">
      {{ getActiveTicket.name }}
    </div>
    <div class="ticketDescription">
      {{ getActiveTicket.description }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Ticket } from "@/interfaces";

export default defineComponent({
  props: {
    activeTicket: {
      required: true,
      type: [Array, Object],
    },
  },
  data() {
    return {
      activeTicketItem: this.activeTicket as Ticket,
    };
  },
  computed: {
    getActiveTicket(): Ticket {
      return this.activeTicket as Ticket;
    },
  },
});
</script>

<style lang="scss"></style>
