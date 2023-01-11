<template>
  <div class="todo-wrapper" :class="todoClassName">
    <div class="todo">
      <div class="todo__color" :style="{ backgroundColor: label.color }"></div>

      <div class="todo__label" :style="{ backgroundColor: `${label.color}33` }">
        <span class="todo__label-name" :style="{ color: label.color }">
          {{ label.name }}
        </span>
      </div>

      <h3 class="todo__name">{{ name }}</h3>

      <div class="todo__footer">
        <div class="todo__footer-counter">
          <base-icon class="todo__footer-counter-icon" name="CommentIcon"></base-icon>
          <span class="todo__footer-counter-text">{{ commentsCount }}</span>
        </div>

        <div class="todo__footer-counter">
          <base-icon class="todo__footer-counter-icon" name="AttachmentIcon"></base-icon>
          <span class="todo__footer-counter-text">{{ attachmentsCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: Object,
      required: true,
    },
    commentsCount: {
      type: Number,
      required: true,
    },
    attachmentsCount: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters('ui', ['layout']),
    todoClassName() {
      return {
        [`todo-wrapper--${this.layout}`]: true,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.todo-wrapper {
  width: calc(25% - 0.8rem);
  height: 12.5rem;
  transition: all .5s ease-in-out;

  &--agenda {
    width: 100%;
  }

  &--column {
    width: calc(50% - 0.6rem);
    height: 20rem;

    .todo__name {
      -webkit-line-clamp: 7;
    }
  }
}
.todo {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  padding: 1rem 0.75rem;
  background-color: $white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: box-shadow .3s ease-in-out, transform .3s ease-in-out;
  @include flex(column, flex-start, flex-start);

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(1.003);
  }
}

.todo__color {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.4rem;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  border-radius: 8px 8px 0 0;
}

.todo__label {
  margin-top: 0.25rem;
  border-radius: 3.3px;
  padding: 0.4rem 0.75rem;
}
.todo__label-name {
  word-break: break-word;
  line-height: initial;
  @include font(0.9rem, 500, initial);
}

.todo__name {
  line-height: 1.7rem;
  margin-top: 1rem;
  @include multilineEllipses(3);
  @include font(1rem, 400, $primary-text-color);
}

.todo__footer {
  margin-top: auto;
  width: 100%;
  column-gap: 0.7rem;
  @include flex(row, center, flex-start);
}
.todo__footer-counter {
  @include flex(row, center, center);
}
.todo__footer-counter-icon {
  width: 1.2rem;
  height: 1.2rem;
  fill: $secondary-text-color;
}
.todo__footer-counter-text {
  margin-left: 0.4rem;
  @include font(0.9rem, 400, $secondary-text-color);
}
</style>
