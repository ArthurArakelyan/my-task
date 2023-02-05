<template>
  <svg :style="{ width: size, height: size }">
    <circle
      :cx="center"
      :cy="center"
      fill="transparent"
      :r="radius"
      :stroke="trackColor"
      :stroke-width="trackWidth"
    />

    <circle
      :cx="center"
      :cy="center"
      fill="transparent"
      :r="radius"
      :stroke="indicatorColor"
      :stroke-width="trackWidth"
      :stroke-dasharray="dashArray"
      :stroke-dashoffset="dashOffset"
      stroke-linecap="round"
    />
  </svg>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      required: true,
    },
    size: {
      type: Number,
      required: false,
      default: 34,
    },
    trackColor: {
      type: String,
      required: false,
      default: '#cccccc',
    },
    lineWidth: {
      type: Number,
      required: false,
      default: 2,
    },
    indicatorColor: {
      type: String,
      required: false,
      default: '#1665D8',
    },
  },
  computed: {
    indicatorWidth() {
      return this.lineWidth;
    },
    trackWidth() {
      return this.lineWidth;
    },
    center() {
      return this.size / 2;
    },
    radius() {
      return (
        this.center -
        (this.trackWidth > this.indicatorWidth
          ? this.trackWidth
          : this.indicatorWidth)
      );
    },
    dashArray() {
      return 2 * Math.PI * this.radius;
    },
    dashOffset() {
      return this.dashArray * ((100 - this.percent) / 100);
    },
  },
};
</script>
