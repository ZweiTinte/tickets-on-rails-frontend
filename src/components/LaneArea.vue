<template>
  <div class="laneArea">
    <div class="lane" v-for="lane in getLanes" :key="lane.id">
      <div class="laneTitle">
        {{ lane.name }}
      </div>
      <div
        class="ticket"
        v-for="ticket in getTickets(lane.id)"
        :key="ticket.id"
      >
        {{ ticket.name }}
      </div>
    </div>
    <div class="laneAreaBlocker"></div>
  </div>
</template>

<script lang="ts">
import { Lane, Ticket } from "@/interfaces";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    lanes: { required: true, type: [Array, Object] },
    tickets: { required: true, type: [Array, Object] },
  },
  data() {
    return {
      lanesL: this.lanes as Lane[],
      ticketsL: this.tickets as Ticket[],
    };
  },
  computed: {
    getLanes(): Lane[] {
      return this.lanes as Lane[];
    },
    getTickets(): (laneId: number) => Ticket[] {
      return (laneId) => {
        return (this.tickets as Ticket[]).filter((ticket) => {
          return ticket.lane === laneId;
        });
      };
    },
  },
});
</script>

<style lang="scss"></style>
