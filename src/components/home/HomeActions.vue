<template>
  <div class="home-actions">
    <div class="home-actions__content">
      <div class="home-actions__filters">
        <button class="home-actions__action">
          <base-icon class="home-actions__action-icon" name="FilterIcon"></base-icon>
        </button>
      </div>

      <div class="home-actions__divider"></div>

      <div class="home-actions__layout-actions">
        <button @click="changeLayout('grid')" class="home-actions__action" :class="{ ['home-actions__action--active']: layout === 'grid' }">
          <base-icon class="home-actions__action-icon" name="GridViewIcon"></base-icon>
        </button>

        <button @click="changeLayout('agenda')" class="home-actions__action" :class="{ ['home-actions__action--active']: layout === 'agenda' }">
          <base-icon class="home-actions__action-icon" name="AgendaViewIcon"></base-icon>
        </button>

        <button @click="changeLayout('column')" class="home-actions__action" :class="{ ['home-actions__action--active']: layout === 'column' }">
          <base-icon class="home-actions__action-icon" name="ColumnViewIcon"></base-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('ui', ['layout']),
  },
  methods: {
    ...mapActions('ui', ['changeLayout']),
  },
};
</script>

<style scoped lang="scss">
.home-actions {
  width: 100%;
  @include flex(row, center, flex-end);
}
.home-actions__content {
  @include flex(row, center, flex-end);
}

.home-actions__divider {
  width: 1px;
  height: 2rem;
  margin: 0 1.5rem;
  background-color: #ECEEF1;
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
  transition: background-color .3s ease-in-out;

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
  fill: #A2ACC0;
  transition: stroke .3s ease-in-out;
}
</style>
