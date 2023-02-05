<template>
  <a :href="path" target="_blank" class="todo-attachment">
    <div class="todo-attachment__preview">
      <img
        v-if="isImage"
        :src="path"
        alt="Image"
        class="todo-attachment__preview-image"
      />
      <span v-else class="todo-attachment__preview-type">
        {{ shortenedType }}
      </span>
    </div>

    <div class="todo-attachment__info">
      <p class="todo-attachment__info-name">
        {{ name }}
      </p>

      <span class="todo-attachment__info-size">
        {{ formattedSize }}
      </span>
    </div>

    <div class="todo-attachment__delete" @click="handleDelete">
      <base-icon
        class="todo-attachment__delete-icon"
        name="DeleteIcon"
      ></base-icon>
    </div>
  </a>
</template>

<script>
// Utils
import { formatBytes } from '@/utils';

export default {
  props: {
    id: String,
    name: String,
    type: String,
    size: Number,
    path: String,
  },
  emits: ['delete'],
  computed: {
    shortenedType() {
      return this.type.split('/')[1] || '';
    },
    isImage() {
      return this.type.split('/')[0] === 'image';
    },
    formattedSize() {
      return formatBytes(this.size);
    },
  },
  methods: {
    handleDelete(e) {
      e.preventDefault();
      e.stopPropagation();

      this.$emit('delete', this.id);
    },
  },
};
</script>

<style scoped lang="scss">
.todo-attachment {
  width: 100%;
  height: 6.25rem;
  background-color: $white;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  cursor: pointer;
  transform: scale(1);
  text-decoration: none;
  @include flex(row, center, flex-start);
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    transform: scale(1.005);
  }

  &:active {
    transform: scale(1.002);
  }
}
.todo-attachment__preview {
  width: 6.875rem;
  height: 6.25rem;
  background-color: #091e420a;
  border-radius: 6px 0 0 6px;
  @include flex(row, center, center);
}
.todo-attachment__preview-type {
  width: 100%;
  user-select: none;
  line-height: initial;
  padding: 0 0.5rem;
  @include ellipsis();
  @include font(1rem, 700, $secondary-text-color, center);
}
.todo-attachment__preview-image {
  border-radius: 6px 0 0 6px;
  @include image(100%, 100%, cover);
}

.todo-attachment__info {
  width: calc(100% - 10rem);
  height: 100%;
  margin-left: 1rem;
  padding: 1rem 0;
  @include flex(column, flex-start, flex-start);
}
.todo-attachment__info-name {
  width: 100%;
  line-height: initial;
  @include ellipsis();
  @include font(1rem, 500, $primary-text-color);
}
.todo-attachment__info-size {
  width: 100%;
  margin-top: auto;
  line-height: initial;
  @include ellipsis();
  @include font(0.875rem, 400, $secondary-text-color);
}

.todo-attachment__delete {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 1rem;
  margin-left: auto;
}
.todo-attachment__delete-icon {
  width: 100%;
  height: 100%;
  stroke: $primary-text-color;
}

@include small-desktop-media {
  .todo-attachment__delete {
    margin-right: 0.5rem;
  }
}
</style>
