<template>
  <div class="rightSidebar">
    <div class="laneTitle">
      {{ getActiveTicket.name }}
    </div>
    <textarea v-model="getActiveTicket.description" class="ticketDescription">
    </textarea>
    <div class="ticketLane">
      <span>Lane:</span>
      <span>{{ getLaneName }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Lane, Ticket } from "@/interfaces";

export default defineComponent({
  props: {
    activeTicket: {
      required: true,
      type: [Array, Object],
    },
    lanes: [Array, Object],
  },
  data() {
    return {
      activeTicketItem: this.activeTicket as Ticket,
      lanesL: this.lanes as Lane[],
    };
  },
  computed: {
    getActiveTicket(): Ticket {
      return this.activeTicket as Ticket;
    },
    getLaneName(): string {
      return this.lanesL.filter((lane) => {
        return lane.id === (this.activeTicket as Ticket).lane;
      })[0].name;
    },
  },
});
</script>

<style lang="scss"></style>
