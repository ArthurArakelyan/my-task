<template>
  <div class="home-actions">
    <div class="home-actions__content">
      <div class="home-actions__filters">
        <button class="home-actions__action" @click="$emit('add')">
          <base-icon
            class="home-actions__action-icon"
            name="PlusIcon"
          ></base-icon>
        </button>

        <button class="home-actions__action">
          <base-icon
            class="home-actions__action-icon"
            name="FilterIcon"
          ></base-icon>
        </button>
      </div>

      <div v-if="!isMobile" class="home-actions__divider"></div>

      <div v-if="!isMobile" class="home-actions__layout-actions">
        <button
          @click="changeLayout('grid')"
          class="home-actions__action"
          :class="{ ['home-actions__action--active']: layout === 'grid' }"
        >
          <base-icon
            class="home-actions__action-icon"
            name="GridViewIcon"
          ></base-icon>
        </button>

        <button
          @click="changeLayout('agenda')"
          class="home-actions__action"
          :class="{ ['home-actions__action--active']: layout === 'agenda' }"
        >
          <base-icon
            class="home-actions__action-icon"
            name="AgendaViewIcon"
          ></base-icon>
        </button>

        <button
          @click="changeLayout('column')"
          class="home-actions__action home-actions__action--column"
          :class="{ ['home-actions__action--active']: layout === 'column' }"
        >
          <base-icon
            class="home-actions__action-icon"
            name="ColumnViewIcon"
          ></base-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  emits: ['add'],
  computed: {
    ...mapGetters('ui', ['layout', 'isMobile']),
  },
  methods: {
    ...mapActions('ui', ['changeLayout']),
  },
  watch: {
    isMobile(current) {
      if (current) {
        this.changeLayout('grid');
      }
    },
  },
};
</script>

<style scoped lang="scss">
.home-actions {
  width: 100%;
  margin-top: 1rem;
  @include flex(row, center, flex-end);
}
.home-actions__content {
  @include flex(row, center, flex-end);
}

.home-actions__divider {
  width: 1px;
  height: 2rem;
  margin: 0 1.5rem;
  background-color: #eceef1;
}

.home-actions__layout-actions,
.home-actions__filters {
  column-gap: 0.8rem;
  @include flex(row, center, flex-end);
}

.home-actions__action {
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;
  background-color: $white;
  box-shadow: 0 0 5px rgb(240, 240, 240);
  cursor: pointer;
  outline: none;
  border: none;
  padding: 0;
  @include flex(row, center, center);
  transition: background-color 0.3s ease-in-out;

  &--active {
    background-color: $primary-color;

    .home-actions__action-icon {
      fill: $white;
    }

    &:hover {
      background-color: $primary-color-hover !important;
    }

    &:active {
      background-color: $primary-color-active !important;
    }
  }

  &:hover {
    background-color: rgb(250, 250, 250);
  }

  &:active {
    background-color: rgb(245, 245, 245);
  }
}
.home-actions__action-icon {
  width: 1.5rem;
  height: 1.5rem;
  fill: #a2acc0;
  transition: stroke 0.3s ease-in-out;
}

@media (max-width: 600px) {
  .home-actions__action {
    &--column {
      display: none;
    }
  }
}

@include mobile-media {
  .home-actions {
    margin-top: 0;
  }
}
</style>
